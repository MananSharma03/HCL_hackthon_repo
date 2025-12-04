import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  insertUserSchema,
  loginSchema,
  insertGoalSchema,
  updateGoalSchema,
  insertReminderSchema,
  updateProfileSchema,
} from "@shared/schema";
import { z } from "zod";

// Secret key for signing tokens (should be in env vars in production)
const JWT_SECRET = process.env.SESSION_SECRET || "wellness-portal-secret-key";
const JWT_EXPIRES_IN = "24h";

// Middleware to verify JWT token
// This checks if the user is logged in before allowing access
interface AuthRequest extends Request {
  userId?: string;
  userRole?: "patient" | "provider";
}

function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    req.userId = decoded.userId;
    req.userRole = decoded.role as "patient" | "provider";
    next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

// Role-based access control middleware
// Ensures only users with a specific role (e.g., "provider") can access a route
function requireRole(role: "patient" | "provider") {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.userRole !== role) {
      return res.status(403).json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ============================================
  // Authentication Routes
  // ============================================

  // Register: Create a new user account
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      // Validate input data
      const validatedData = insertUserSchema.parse(req.body);

      // Check if email already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Create user in database
      const user = await storage.createUser(validatedData);

      // Generate login token
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Create audit log for security
      await storage.createAuditLog({
        userId: user.id,
        action: "login",
        targetResource: "auth",
        metadata: { method: "register" },
      });

      // Return user without password
      const { passwordHash, ...safeUser } = user;
      res.status(201).json({ user: safeUser, token });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Registration error:", error);
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  // Login: Authenticate existing user
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const validatedData = loginSchema.parse(req.body);

      // Find user by email
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(validatedData.password, user.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate token
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Create audit log
      await storage.createAuditLog({
        userId: user.id,
        action: "login",
        targetResource: "auth",
      });

      // Return user without password
      const { passwordHash, ...safeUser } = user;
      res.json({ user: safeUser, token });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Login error:", error);
      res.status(500).json({ message: "Failed to login" });
    }
  });

  // ============================================
  // User Routes
  // ============================================

  // Get current user profile
  app.get("/api/users/me", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const user = await storage.getSafeUser(req.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Create audit log
      await storage.createAuditLog({
        userId: req.userId!,
        action: "viewProfile",
        targetResource: `user:${req.userId}`,
      });

      res.json(user);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Update current user profile
  app.put("/api/users/me", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const validatedData = updateProfileSchema.parse(req.body);
      const updatedUser = await storage.updateUser(req.userId!, validatedData);

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Create audit log
      await storage.createAuditLog({
        userId: req.userId!,
        action: "updateProfile",
        targetResource: `user:${req.userId}`,
      });

      res.json(updatedUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Update user error:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // ============================================
  // Goal Routes
  // ============================================

  // Get all goals for current user
  app.get("/api/goals", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const goals = await storage.getGoals(req.userId!);

      // Create audit log
      await storage.createAuditLog({
        userId: req.userId!,
        action: "viewGoals",
        targetResource: "goals",
      });

      res.json(goals);
    } catch (error) {
      console.error("Get goals error:", error);
      res.status(500).json({ message: "Failed to get goals" });
    }
  });

  // Create a new goal
  app.post("/api/goals", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const validatedData = insertGoalSchema.parse(req.body);
      const goal = await storage.createGoal(req.userId!, validatedData);

      // Create audit log
      await storage.createAuditLog({
        userId: req.userId!,
        action: "createGoal",
        targetResource: `goal:${goal.id}`,
        metadata: { goalType: goal.goalType },
      });

      res.status(201).json(goal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Create goal error:", error);
      res.status(500).json({ message: "Failed to create goal" });
    }
  });

  // Update a goal
  app.put("/api/goals/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const validatedData = updateGoalSchema.parse(req.body);

      // Verify ownership
      const goal = await storage.getGoal(id);
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      if (goal.userId !== req.userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      const updatedGoal = await storage.updateGoal(id, validatedData);

      // Create audit log
      await storage.createAuditLog({
        userId: req.userId!,
        action: "updateGoal",
        targetResource: `goal:${id}`,
        metadata: { newProgress: validatedData.progressValue },
      });

      res.json(updatedGoal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Update goal error:", error);
      res.status(500).json({ message: "Failed to update goal" });
    }
  });

  // Delete a goal
  app.delete("/api/goals/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      // Verify ownership
      const goal = await storage.getGoal(id);
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      if (goal.userId !== req.userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      await storage.deleteGoal(id);

      // Create audit log
      await storage.createAuditLog({
        userId: req.userId!,
        action: "deleteGoal",
        targetResource: `goal:${id}`,
      });

      res.status(204).send();
    } catch (error) {
      console.error("Delete goal error:", error);
      res.status(500).json({ message: "Failed to delete goal" });
    }
  });

  // ============================================
  // Reminder Routes
  // ============================================

  // Get all reminders for current user
  app.get("/api/reminders", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const reminders = await storage.getReminders(req.userId!);

      // Create audit log
      await storage.createAuditLog({
        userId: req.userId!,
        action: "viewReminders",
        targetResource: "reminders",
      });

      res.json(reminders);
    } catch (error) {
      console.error("Get reminders error:", error);
      res.status(500).json({ message: "Failed to get reminders" });
    }
  });

  // Create a new reminder
  app.post("/api/reminders", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const validatedData = insertReminderSchema.parse(req.body);
      const reminder = await storage.createReminder(req.userId!, validatedData);

      // Create audit log
      await storage.createAuditLog({
        userId: req.userId!,
        action: "createReminder",
        targetResource: `reminder:${reminder.id}`,
      });

      res.status(201).json(reminder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Create reminder error:", error);
      res.status(500).json({ message: "Failed to create reminder" });
    }
  });

  // Update a reminder
  app.put("/api/reminders/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      // Verify ownership
      const reminder = await storage.getReminder(id);
      if (!reminder) {
        return res.status(404).json({ message: "Reminder not found" });
      }
      if (reminder.userId !== req.userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      const updatedReminder = await storage.updateReminder(id, req.body);

      // Create audit log
      await storage.createAuditLog({
        userId: req.userId!,
        action: "updateReminder",
        targetResource: `reminder:${id}`,
      });

      res.json(updatedReminder);
    } catch (error) {
      console.error("Update reminder error:", error);
      res.status(500).json({ message: "Failed to update reminder" });
    }
  });

  // Delete a reminder
  app.delete("/api/reminders/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      // Verify ownership
      const reminder = await storage.getReminder(id);
      if (!reminder) {
        return res.status(404).json({ message: "Reminder not found" });
      }
      if (reminder.userId !== req.userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      await storage.deleteReminder(id);

      // Create audit log
      await storage.createAuditLog({
        userId: req.userId!,
        action: "deleteReminder",
        targetResource: `reminder:${id}`,
      });

      res.status(204).send();
    } catch (error) {
      console.error("Delete reminder error:", error);
      res.status(500).json({ message: "Failed to delete reminder" });
    }
  });

  // ============================================
  // Provider Routes
  // ============================================

  // Get all patients for provider
  app.get(
    "/api/provider/patients",
    authenticateToken,
    requireRole("provider"),
    async (req: AuthRequest, res: Response) => {
      try {
        const patients = await storage.getPatients(req.userId!);

        // Create audit log
        await storage.createAuditLog({
          userId: req.userId!,
          action: "viewPatients",
          targetResource: "patients",
        });

        res.json(patients);
      } catch (error) {
        console.error("Get patients error:", error);
        res.status(500).json({ message: "Failed to get patients" });
      }
    }
  );

  // Get patient details
  app.get(
    "/api/provider/patients/:id",
    authenticateToken,
    requireRole("provider"),
    async (req: AuthRequest, res: Response) => {
      try {
        const { id } = req.params;
        const patient = await storage.getPatientDetails(id);

        if (!patient) {
          return res.status(404).json({ message: "Patient not found" });
        }

        // Create audit log
        await storage.createAuditLog({
          userId: req.userId!,
          action: "viewPatientDetails",
          targetResource: `patient:${id}`,
        });

        res.json(patient);
      } catch (error) {
        console.error("Get patient details error:", error);
        res.status(500).json({ message: "Failed to get patient details" });
      }
    }
  );

  // ============================================
  // Health Tip Route
  // ============================================

  app.get("/api/health-tip", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const tip = await storage.getHealthTip();
      res.json(tip);
    } catch (error) {
      console.error("Get health tip error:", error);
      res.status(500).json({ message: "Failed to get health tip" });
    }
  });

  // ============================================
  // Public Content Route
  // ============================================

  app.get("/api/public/health-info", async (req: Request, res: Response) => {
    try {
      const content = await storage.getPublicContent();
      res.json(content);
    } catch (error) {
      console.error("Get public content error:", error);
      res.status(500).json({ message: "Failed to get public content" });
    }
  });

  return httpServer;
}
