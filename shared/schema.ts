import { z } from "zod";

// User roles
export type UserRole = "patient" | "provider";

// User schema
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  passwordHash: z.string(),
  name: z.string(),
  role: z.enum(["patient", "provider"]),
  profile: z.object({
    dateOfBirth: z.string().optional(),
    allergies: z.array(z.string()).default([]),
    medications: z.array(z.string()).default([]),
    emergencyContact: z.string().optional(),
    bloodType: z.string().optional(),
  }).default({}),
  providerId: z.string().optional(), // For patients assigned to a provider
  dataConsent: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const insertUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["patient", "provider"]),
  dataConsent: z.boolean().refine(val => val === true, {
    message: "You must consent to data usage to register"
  }),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Goal types
export type GoalType = "steps" | "water" | "sleep" | "activeTime";

// Goal schema
export const goalSchema = z.object({
  id: z.string(),
  userId: z.string(),
  goalType: z.enum(["steps", "water", "sleep", "activeTime"]),
  targetValue: z.number(),
  progressValue: z.number().default(0),
  unit: z.string(), // "steps", "glasses", "hours", "minutes"
  date: z.string(), // ISO date string
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Goal = z.infer<typeof goalSchema>;

export const insertGoalSchema = z.object({
  goalType: z.enum(["steps", "water", "sleep", "activeTime"]),
  targetValue: z.number().positive("Target must be a positive number"),
  progressValue: z.number().min(0).default(0),
  unit: z.string(),
  date: z.string().optional(),
});

export type InsertGoal = z.infer<typeof insertGoalSchema>;

export const updateGoalSchema = z.object({
  progressValue: z.number().min(0),
});

export type UpdateGoal = z.infer<typeof updateGoalSchema>;

// Reminder status
export type ReminderStatus = "pending" | "completed" | "missed";

// Reminder schema
export const reminderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.string(), // ISO date string
  status: z.enum(["pending", "completed", "missed"]),
  category: z.enum(["checkup", "vaccination", "medication", "other"]).default("other"),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Reminder = z.infer<typeof reminderSchema>;

export const insertReminderSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string(),
  category: z.enum(["checkup", "vaccination", "medication", "other"]).default("other"),
});

export type InsertReminder = z.infer<typeof insertReminderSchema>;

// Audit log schema
export const auditLogSchema = z.object({
  id: z.string(),
  userId: z.string(),
  action: z.enum([
    "login",
    "logout",
    "viewProfile",
    "updateProfile",
    "viewGoals",
    "createGoal",
    "updateGoal",
    "deleteGoal",
    "viewReminders",
    "createReminder",
    "updateReminder",
    "deleteReminder",
    "viewPatients",
    "viewPatientDetails",
  ]),
  targetResource: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  timestamp: z.string(),
  ipAddress: z.string().optional(),
});

export type AuditLog = z.infer<typeof auditLogSchema>;

// Public content schema
export const publicContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  summary: z.string(),
  category: z.enum(["covid", "flu", "mental-health", "nutrition", "exercise", "other"]),
  imageUrl: z.string().optional(),
  tags: z.array(z.string()),
  publishedAt: z.string(),
  updatedAt: z.string(),
});

export type PublicContent = z.infer<typeof publicContentSchema>;

// Patient compliance status for provider view
export type ComplianceStatus = "on-track" | "needs-attention" | "missed-checkup";

export const patientSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  lastActivity: z.string().optional(),
  complianceStatus: z.enum(["on-track", "needs-attention", "missed-checkup"]),
  goalsCompleted: z.number(),
  totalGoals: z.number(),
  upcomingReminders: z.number(),
  missedReminders: z.number(),
});

export type PatientSummary = z.infer<typeof patientSummarySchema>;

// Update profile schema
export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  profile: z.object({
    dateOfBirth: z.string().optional(),
    allergies: z.array(z.string()).optional(),
    medications: z.array(z.string()).optional(),
    emergencyContact: z.string().optional(),
    bloodType: z.string().optional(),
  }).optional(),
});

export type UpdateProfile = z.infer<typeof updateProfileSchema>;

// Health tip of the day
export const healthTipSchema = z.object({
  id: z.string(),
  tip: z.string(),
  category: z.string(),
  icon: z.string(),
});

export type HealthTip = z.infer<typeof healthTipSchema>;

// Auth response
export const authResponseSchema = z.object({
  user: userSchema.omit({ passwordHash: true }),
  token: z.string(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

// Safe user (without password)
export type SafeUser = Omit<User, "passwordHash">;
