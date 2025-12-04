import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth-context";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Search,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Activity,
  Calendar,
  User,
  Mail,
  Bell,
  Target,
  Footprints,
  Moon,
  Droplets,
  Flame,
} from "lucide-react";
import type { PatientSummary, Goal, Reminder } from "@shared/schema";
import { format, parseISO } from "date-fns";

const statusConfig = {
  "on-track": {
    label: "On Track",
    color: "bg-chart-3/10 text-chart-3",
    icon: CheckCircle,
  },
  "needs-attention": {
    label: "Needs Attention",
    color: "bg-chart-5/10 text-chart-5",
    icon: AlertCircle,
  },
  "missed-checkup": {
    label: "Missed Checkup",
    color: "bg-destructive/10 text-destructive",
    icon: Clock,
  },
};

interface PatientDetails {
  id: string;
  name: string;
  email: string;
  goals: Goal[];
  reminders: Reminder[];
  profile: {
    allergies: string[];
    medications: string[];
    bloodType?: string;
  };
}

function PatientCard({
  patient,
  onClick,
}: {
  patient: PatientSummary;
  onClick: () => void;
}) {
  const status = statusConfig[patient.complianceStatus];
  const StatusIcon = status.icon;
  const completionRate = patient.totalGoals > 0
    ? Math.round((patient.goalsCompleted / patient.totalGoals) * 100)
    : 0;

  return (
    <Card
      className="cursor-pointer hover-elevate transition-all"
      onClick={onClick}
      data-testid={`patient-card-${patient.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary">
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-medium truncate">{patient.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{patient.email}</p>
              </div>
              <Badge className={`shrink-0 gap-1 ${status.color}`}>
                <StatusIcon className="h-3 w-3" />
                {status.label}
              </Badge>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold">{patient.goalsCompleted}</p>
                <p className="text-xs text-muted-foreground">Goals Met</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{patient.upcomingReminders}</p>
                <p className="text-xs text-muted-foreground">Upcoming</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-destructive">
                  {patient.missedReminders}
                </p>
                <p className="text-xs text-muted-foreground">Missed</p>
              </div>
            </div>
            {patient.totalGoals > 0 && (
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Goal Completion</span>
                  <span>{completionRate}%</span>
                </div>
                <Progress value={completionRate} className="h-1.5" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PatientDetailsDialog({
  patientId,
  open,
  onClose,
}: {
  patientId: string | null;
  open: boolean;
  onClose: () => void;
}) {
  const { data: patient, isLoading } = useQuery<PatientDetails>({
    queryKey: ["/api/provider/patients", patientId],
    enabled: !!patientId && open,
  });

  const goalIcons: Record<string, typeof Footprints> = {
    steps: Footprints,
    sleep: Moon,
    activeTime: Flame,
    water: Droplets,
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : patient ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                {patient.name}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {patient.email}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="goals" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="goals" className="gap-2">
                  <Target className="h-4 w-4" />
                  Goals
                </TabsTrigger>
                <TabsTrigger value="reminders" className="gap-2">
                  <Bell className="h-4 w-4" />
                  Reminders
                </TabsTrigger>
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
              </TabsList>

              <TabsContent value="goals" className="mt-4 space-y-4">
                {patient.goals.length > 0 ? (
                  patient.goals.map((goal) => {
                    const Icon = goalIcons[goal.goalType] || Target;
                    const percentage = Math.min(
                      (goal.progressValue / goal.targetValue) * 100,
                      100
                    );
                    return (
                      <div
                        key={goal.id}
                        className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium capitalize">
                              {goal.goalType.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {goal.progressValue}/{goal.targetValue} {goal.unit}
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2 mt-2" />
                        </div>
                        {percentage >= 100 && (
                          <CheckCircle className="h-5 w-5 text-chart-3 shrink-0" />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No goals recorded
                  </p>
                )}
              </TabsContent>

              <TabsContent value="reminders" className="mt-4 space-y-4">
                {patient.reminders.length > 0 ? (
                  patient.reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{reminder.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Due: {format(parseISO(reminder.dueDate), "MMM d, yyyy")}
                        </p>
                      </div>
                      <Badge
                        variant={reminder.status === "completed" ? "secondary" : "outline"}
                        className={
                          reminder.status === "completed"
                            ? "bg-chart-3/10 text-chart-3"
                            : reminder.status === "missed"
                            ? "bg-destructive/10 text-destructive"
                            : ""
                        }
                      >
                        {reminder.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No reminders found
                  </p>
                )}
              </TabsContent>

              <TabsContent value="profile" className="mt-4 space-y-4">
                <div className="grid gap-4">
                  {patient.profile.bloodType && (
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Blood Type</p>
                      <p className="font-medium">{patient.profile.bloodType}</p>
                    </div>
                  )}
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-2">Allergies</p>
                    {patient.profile.allergies.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {patient.profile.allergies.map((allergy, i) => (
                          <Badge key={i} variant="secondary">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm">No known allergies</p>
                    )}
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-2">Medications</p>
                    {patient.profile.medications.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {patient.profile.medications.map((med, i) => (
                          <Badge key={i} variant="secondary">
                            {med}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm">No current medications</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            Patient not found
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function ProviderDashboardPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: patients, isLoading } = useQuery<PatientSummary[]>({
    queryKey: ["/api/provider/patients"],
  });

  const filteredPatients = patients?.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || patient.complianceStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate summary stats
  const stats = {
    total: patients?.length || 0,
    onTrack: patients?.filter((p) => p.complianceStatus === "on-track").length || 0,
    needsAttention:
      patients?.filter((p) => p.complianceStatus === "needs-attention").length || 0,
    missedCheckup:
      patients?.filter((p) => p.complianceStatus === "missed-checkup").length || 0,
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold" data-testid="text-provider-welcome">
            Provider Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome, Dr. {user?.name?.split(" ").pop()}. Monitor your patients' wellness compliance.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Patients</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10">
                <CheckCircle className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.onTrack}</p>
                <p className="text-sm text-muted-foreground">On Track</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-5/10">
                <AlertCircle className="h-6 w-6 text-chart-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.needsAttention}</p>
                <p className="text-sm text-muted-foreground">Needs Attention</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <Clock className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.missedCheckup}</p>
                <p className="text-sm text-muted-foreground">Missed Checkups</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-patients"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: "all", label: "All" },
              { value: "on-track", label: "On Track" },
              { value: "needs-attention", label: "Needs Attention" },
              { value: "missed-checkup", label: "Missed Checkup" },
            ].map((filter) => (
              <Button
                key={filter.value}
                variant={statusFilter === filter.value ? "secondary" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(filter.value)}
                data-testid={`filter-${filter.value}`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Patient List */}
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPatients && filteredPatients.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onClick={() => setSelectedPatient(patient.id)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">
                {searchQuery || statusFilter !== "all"
                  ? "No patients match your search"
                  : "No patients assigned"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Patients will appear here once assigned to you"}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Patient Details Dialog */}
        <PatientDetailsDialog
          patientId={selectedPatient}
          open={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      </main>
    </div>
  );
}
