import { randomUUID } from "crypto";
import type {
  User,
  InsertUser,
  Goal,
  InsertGoal,
  UpdateGoal,
  Reminder,
  InsertReminder,
  AuditLog,
  PublicContent,
  HealthTip,
  SafeUser,
  PatientSummary,
  UpdateProfile,
} from "@shared/schema";
import bcrypt from "bcryptjs";

// This interface defines all the things our database needs to do.
// By defining it here, we can easily swap out the "real" database later.
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: UpdateProfile): Promise<SafeUser | undefined>;
  getSafeUser(id: string): Promise<SafeUser | undefined>;

  // Goal operations
  getGoals(userId: string): Promise<Goal[]>;
  getGoal(id: string): Promise<Goal | undefined>;
  createGoal(userId: string, goal: InsertGoal): Promise<Goal>;
  updateGoal(id: string, updates: UpdateGoal): Promise<Goal | undefined>;
  deleteGoal(id: string): Promise<boolean>;

  // Reminder operations
  getReminders(userId: string): Promise<Reminder[]>;
  getReminder(id: string): Promise<Reminder | undefined>;
  createReminder(userId: string, reminder: InsertReminder): Promise<Reminder>;
  updateReminder(id: string, updates: Partial<Reminder>): Promise<Reminder | undefined>;
  deleteReminder(id: string): Promise<boolean>;

  // Provider operations
  getPatients(providerId: string): Promise<PatientSummary[]>;
  getPatientDetails(patientId: string): Promise<{
    id: string;
    name: string;
    email: string;
    goals: Goal[];
    reminders: Reminder[];
    profile: User["profile"];
  } | undefined>;

  // Audit log operations
  createAuditLog(log: Omit<AuditLog, "id" | "timestamp">): Promise<AuditLog>;
  getAuditLogs(userId: string): Promise<AuditLog[]>;

  // Health tip
  getHealthTip(): Promise<HealthTip>;

  // Public content
  getPublicContent(): Promise<PublicContent[]>;
}

// Sample health tips
const healthTips: HealthTip[] = [
  {
    id: "1",
    tip: "Stay hydrated! Aim to drink at least 8 glasses of water per day for optimal health.",
    category: "hydration",
    icon: "droplets",
  },
  {
    id: "2",
    tip: "Take a 5-minute stretch break every hour to reduce muscle tension and improve circulation.",
    category: "exercise",
    icon: "activity",
  },
  {
    id: "3",
    tip: "Prioritize sleep! Adults need 7-9 hours of quality sleep for optimal health and cognitive function.",
    category: "sleep",
    icon: "moon",
  },
  {
    id: "4",
    tip: "Add more colorful vegetables to your plate. Different colors provide different nutrients.",
    category: "nutrition",
    icon: "apple",
  },
  {
    id: "5",
    tip: "Practice deep breathing for 5 minutes daily to reduce stress and improve mental clarity.",
    category: "mental-health",
    icon: "brain",
  },
];

// This class implements the storage interface using simple in-memory Maps.
// Think of it like a temporary database that lives in RAM.
// If you restart the server, this data disappears.
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private goals: Map<string, Goal>;
  private reminders: Map<string, Reminder>;
  private auditLogs: Map<string, AuditLog>;
  private publicContent: PublicContent[];

  constructor() {
    this.users = new Map();
    this.goals = new Map();
    this.reminders = new Map();
    this.auditLogs = new Map();
    this.publicContent = [];

    // Seed demo data
    this.seedDemoData();
  }

  private async seedDemoData() {
    const now = new Date().toISOString();
    const today = new Date().toISOString().split("T")[0];

    // Create a demo provider
    const providerId = randomUUID();
    const providerPasswordHash = await bcrypt.hash("provider123", 10);
    const provider: User = {
      id: providerId,
      email: "provider@wellness.com",
      passwordHash: providerPasswordHash,
      name: "Dr. Sarah Johnson",
      role: "provider",
      profile: {
        allergies: [],
        medications: [],
      },
      dataConsent: true,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(providerId, provider);

    // Create demo patients
    const patientPasswordHash = await bcrypt.hash("patient123", 10);

    const patient1Id = randomUUID();
    const patient1: User = {
      id: patient1Id,
      email: "david@example.com",
      passwordHash: patientPasswordHash,
      name: "David Miller",
      role: "patient",
      profile: {
        dateOfBirth: "1985-06-15",
        allergies: ["Penicillin", "Peanuts"],
        medications: ["Aspirin 100mg"],
        bloodType: "A+",
        emergencyContact: "555-0123",
      },
      providerId,
      dataConsent: true,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(patient1Id, patient1);

    const patient2Id = randomUUID();
    const patient2: User = {
      id: patient2Id,
      email: "emma@example.com",
      passwordHash: patientPasswordHash,
      name: "Emma Wilson",
      role: "patient",
      profile: {
        dateOfBirth: "1990-03-22",
        allergies: [],
        medications: ["Vitamin D"],
        bloodType: "O+",
      },
      providerId,
      dataConsent: true,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(patient2Id, patient2);

    const patient3Id = randomUUID();
    const patient3: User = {
      id: patient3Id,
      email: "james@example.com",
      passwordHash: patientPasswordHash,
      name: "James Brown",
      role: "patient",
      profile: {
        dateOfBirth: "1978-11-08",
        allergies: ["Sulfa drugs"],
        medications: ["Metformin 500mg", "Lisinopril 10mg"],
        bloodType: "B+",
      },
      providerId,
      dataConsent: true,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(patient3Id, patient3);

    // Create goals for patients
    const goals: Omit<Goal, "id" | "createdAt" | "updatedAt">[] = [
      { userId: patient1Id, goalType: "steps", targetValue: 8000, progressValue: 6240, unit: "steps", date: today },
      { userId: patient1Id, goalType: "water", targetValue: 8, progressValue: 6, unit: "glasses", date: today },
      { userId: patient1Id, goalType: "sleep", targetValue: 8, progressValue: 7.5, unit: "hours", date: today },
      { userId: patient1Id, goalType: "activeTime", targetValue: 60, progressValue: 45, unit: "minutes", date: today },
      { userId: patient2Id, goalType: "steps", targetValue: 10000, progressValue: 8500, unit: "steps", date: today },
      { userId: patient2Id, goalType: "water", targetValue: 10, progressValue: 8, unit: "glasses", date: today },
      { userId: patient3Id, goalType: "steps", targetValue: 6000, progressValue: 2000, unit: "steps", date: today },
      { userId: patient3Id, goalType: "sleep", targetValue: 7, progressValue: 5, unit: "hours", date: today },
    ];

    for (const goal of goals) {
      const id = randomUUID();
      this.goals.set(id, { ...goal, id, createdAt: now, updatedAt: now });
    }

    // Create reminders for patients
    const reminders: Omit<Reminder, "id" | "createdAt" | "updatedAt">[] = [
      {
        userId: patient1Id,
        title: "Annual blood test",
        description: "Fasting blood work at City Medical Center",
        dueDate: "2025-01-15",
        status: "pending",
        category: "checkup",
      },
      {
        userId: patient1Id,
        title: "Flu vaccination",
        description: "Get seasonal flu shot",
        dueDate: "2025-01-10",
        status: "pending",
        category: "vaccination",
      },
      {
        userId: patient2Id,
        title: "Eye exam",
        description: "Annual vision check",
        dueDate: "2025-02-01",
        status: "pending",
        category: "checkup",
      },
      {
        userId: patient3Id,
        title: "A1C test",
        description: "Quarterly diabetes monitoring",
        dueDate: "2024-12-20",
        status: "missed",
        category: "checkup",
      },
      {
        userId: patient3Id,
        title: "Cardiology follow-up",
        description: "Review heart health with Dr. Smith",
        dueDate: "2025-01-25",
        status: "pending",
        category: "checkup",
      },
    ];

    for (const reminder of reminders) {
      const id = randomUUID();
      this.reminders.set(id, { ...reminder, id, createdAt: now, updatedAt: now });
    }
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const passwordHash = await bcrypt.hash(insertUser.password, 10);

    const user: User = {
      id,
      email: insertUser.email,
      passwordHash,
      name: insertUser.name,
      role: insertUser.role,
      profile: {
        allergies: [],
        medications: [],
      },
      dataConsent: insertUser.dataConsent,
      createdAt: now,
      updatedAt: now,
    };

    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: UpdateProfile): Promise<SafeUser | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser: User = {
      ...user,
      name: updates.name || user.name,
      profile: {
        ...user.profile,
        ...updates.profile,
      },
      updatedAt: new Date().toISOString(),
    };

    this.users.set(id, updatedUser);

    const { passwordHash, ...safeUser } = updatedUser;
    return safeUser;
  }

  async getSafeUser(id: string): Promise<SafeUser | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  // Goal operations
  async getGoals(userId: string): Promise<Goal[]> {
    return Array.from(this.goals.values())
      .filter((goal) => goal.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getGoal(id: string): Promise<Goal | undefined> {
    return this.goals.get(id);
  }

  async createGoal(userId: string, insertGoal: InsertGoal): Promise<Goal> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const today = new Date().toISOString().split("T")[0];

    const goal: Goal = {
      id,
      userId,
      goalType: insertGoal.goalType,
      targetValue: insertGoal.targetValue,
      progressValue: insertGoal.progressValue || 0,
      unit: insertGoal.unit,
      date: insertGoal.date || today,
      createdAt: now,
      updatedAt: now,
    };

    this.goals.set(id, goal);
    return goal;
  }

  async updateGoal(id: string, updates: UpdateGoal): Promise<Goal | undefined> {
    const goal = this.goals.get(id);
    if (!goal) return undefined;

    const updatedGoal: Goal = {
      ...goal,
      progressValue: updates.progressValue,
      updatedAt: new Date().toISOString(),
    };

    this.goals.set(id, updatedGoal);
    return updatedGoal;
  }

  async deleteGoal(id: string): Promise<boolean> {
    return this.goals.delete(id);
  }

  // Reminder operations
  async getReminders(userId: string): Promise<Reminder[]> {
    return Array.from(this.reminders.values())
      .filter((reminder) => reminder.userId === userId)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  async getReminder(id: string): Promise<Reminder | undefined> {
    return this.reminders.get(id);
  }

  async createReminder(userId: string, insertReminder: InsertReminder): Promise<Reminder> {
    const id = randomUUID();
    const now = new Date().toISOString();

    const reminder: Reminder = {
      id,
      userId,
      title: insertReminder.title,
      description: insertReminder.description,
      dueDate: insertReminder.dueDate,
      status: "pending",
      category: insertReminder.category || "other",
      createdAt: now,
      updatedAt: now,
    };

    this.reminders.set(id, reminder);
    return reminder;
  }

  async updateReminder(id: string, updates: Partial<Reminder>): Promise<Reminder | undefined> {
    const reminder = this.reminders.get(id);
    if (!reminder) return undefined;

    const updatedReminder: Reminder = {
      ...reminder,
      ...updates,
      id: reminder.id,
      userId: reminder.userId,
      updatedAt: new Date().toISOString(),
    };

    this.reminders.set(id, updatedReminder);
    return updatedReminder;
  }

  async deleteReminder(id: string): Promise<boolean> {
    return this.reminders.delete(id);
  }

  // Provider operations
  async getPatients(providerId: string): Promise<PatientSummary[]> {
    const patients = Array.from(this.users.values()).filter(
      (user) => user.role === "patient" && user.providerId === providerId
    );

    return Promise.all(
      patients.map(async (patient) => {
        const goals = await this.getGoals(patient.id);
        const reminders = await this.getReminders(patient.id);
        const today = new Date().toISOString().split("T")[0];

        const todayGoals = goals.filter((g) => g.date === today);
        const completedGoals = todayGoals.filter((g) => g.progressValue >= g.targetValue).length;
        const pendingReminders = reminders.filter((r) => r.status === "pending");
        const missedReminders = reminders.filter((r) => r.status === "missed");

        let complianceStatus: PatientSummary["complianceStatus"] = "on-track";
        if (missedReminders.length > 0) {
          complianceStatus = "missed-checkup";
        } else if (todayGoals.length > 0 && completedGoals < todayGoals.length / 2) {
          complianceStatus = "needs-attention";
        }

        return {
          id: patient.id,
          name: patient.name,
          email: patient.email,
          lastActivity: patient.updatedAt,
          complianceStatus,
          goalsCompleted: completedGoals,
          totalGoals: todayGoals.length,
          upcomingReminders: pendingReminders.length,
          missedReminders: missedReminders.length,
        };
      })
    );
  }

  async getPatientDetails(patientId: string) {
    const patient = this.users.get(patientId);
    if (!patient || patient.role !== "patient") return undefined;

    const goals = await this.getGoals(patientId);
    const reminders = await this.getReminders(patientId);

    return {
      id: patient.id,
      name: patient.name,
      email: patient.email,
      goals,
      reminders,
      profile: patient.profile,
    };
  }

  // Audit log operations
  async createAuditLog(log: Omit<AuditLog, "id" | "timestamp">): Promise<AuditLog> {
    const id = randomUUID();
    const auditLog: AuditLog = {
      ...log,
      id,
      timestamp: new Date().toISOString(),
    };

    this.auditLogs.set(id, auditLog);
    return auditLog;
  }

  async getAuditLogs(userId: string): Promise<AuditLog[]> {
    return Array.from(this.auditLogs.values())
      .filter((log) => log.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  // Health tip
  async getHealthTip(): Promise<HealthTip> {
    const index = Math.floor(Math.random() * healthTips.length);
    return healthTips[index];
  }

  // Public content
  async getPublicContent(): Promise<PublicContent[]> {
    return this.publicContent;
  }
}

export const storage = new MemStorage();
