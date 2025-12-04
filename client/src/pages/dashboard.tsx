import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth-context";
import { Navigation } from "@/components/navigation";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Footprints,
  Moon,
  Flame,
  Droplets,
  Bell,
  Plus,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
  Trash2,
} from "lucide-react";
import type { Goal, Reminder, InsertGoal } from "@shared/schema";
import { useState } from "react";
import { format, isToday, parseISO } from "date-fns";

export default function DashboardPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch goals
  const { data: goals, isLoading: goalsLoading } = useQuery<Goal[]>({
    queryKey: ["/api/goals"],
  });

  // Fetch reminders
  const { data: reminders, isLoading: remindersLoading } = useQuery<Reminder[]>({
    queryKey: ["/api/reminders"],
  });

  // Add goal mutation
  const addGoalMutation = useMutation({
    mutationFn: async (goal: InsertGoal) => {
      return apiRequest("POST", "/api/goals", goal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/goals"] });
      toast({ title: "Goal added" });
    },
  });

  // Update goal mutation
  const updateGoalMutation = useMutation({
    mutationFn: async ({ id, progressValue }: { id: string; progressValue: number }) => {
      return apiRequest("PUT", `/api/goals/${id}`, { progressValue });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/goals"] });
    },
  });

  const handleAddGoal = (goal: InsertGoal) => {
    addGoalMutation.mutate(goal);
  };

  const handleUpdateGoal = (id: string, value: number) => {
    updateGoalMutation.mutate({ id, progressValue: value });
  };

  const todayGoals = goals?.filter((g) => isToday(parseISO(g.date))) || [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome, {user?.name?.split(" ")[0]}
          </h1>
          <p className="text-slate-600">
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Today's Goals</h2>
              <AddGoalDialog onAdd={handleAddGoal} />
            </div>

            {goalsLoading ? (
              <p>Loading goals...</p>
            ) : todayGoals.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {todayGoals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} onUpdate={handleUpdateGoal} />
                ))}
              </div>
            ) : (
              <Card className="bg-white border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Target className="h-12 w-12 text-slate-300 mb-4" />
                  <p className="text-slate-500 mb-4">No goals set for today.</p>
                  <AddGoalDialog onAdd={handleAddGoal} />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white shadow-sm border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="h-5 w-5 text-blue-600" />
                  Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {remindersLoading ? (
                  <p>Loading...</p>
                ) : reminders && reminders.length > 0 ? (
                  <div className="space-y-4">
                    {reminders.filter(r => r.status === 'pending').map((reminder) => (
                      <div key={reminder.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-slate-900">{reminder.title}</p>
                          <p className="text-sm text-slate-500">
                            {format(parseISO(reminder.dueDate), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    ))}
                    {reminders.filter(r => r.status === 'pending').length === 0 && (
                      <p className="text-sm text-slate-500">No pending reminders.</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No reminders.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function GoalCard({ goal, onUpdate }: { goal: Goal; onUpdate: (id: string, value: number) => void }) {
  const icons = {
    steps: Footprints,
    sleep: Moon,
    activeTime: Flame,
    water: Droplets,
  };
  const Icon = icons[goal.goalType as keyof typeof icons] || Target;
  const isComplete = goal.progressValue >= goal.targetValue;

  return (
    <Card className={`bg-white shadow-sm ${isComplete ? "border-green-200 bg-green-50" : ""}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isComplete ? "bg-green-100 text-green-600" : "bg-blue-50 text-blue-600"}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-slate-900 capitalize">{goal.goalType.replace(/([A-Z])/g, ' $1').trim()}</p>
              <p className="text-sm text-slate-500">Target: {goal.targetValue} {goal.unit}</p>
            </div>
          </div>
          {isComplete && <CheckCircle className="h-5 w-5 text-green-600" />}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Progress</span>
            <span className="font-medium text-slate-900">{goal.progressValue} / {goal.targetValue}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${isComplete ? "bg-green-500" : "bg-blue-500"}`}
              style={{ width: `${Math.min((goal.progressValue / goal.targetValue) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const newValue = prompt("Enter new value:", goal.progressValue.toString());
                if (newValue && !isNaN(parseInt(newValue))) {
                  onUpdate(goal.id, parseInt(newValue));
                }
              }}
            >
              Update
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AddGoalDialog({ onAdd }: { onAdd: (goal: InsertGoal) => void }) {
  const [open, setOpen] = useState(false);
  const [goalType, setGoalType] = useState<string>("");
  const [targetValue, setTargetValue] = useState("");

  const handleSubmit = () => {
    if (goalType && targetValue) {
      onAdd({
        goalType: goalType as any,
        targetValue: parseInt(targetValue),
        progressValue: 0,
        unit: goalType === 'water' ? 'glasses' : goalType === 'sleep' ? 'hours' : goalType === 'activeTime' ? 'minutes' : 'steps',
      });
      setOpen(false);
      setGoalType("");
      setTargetValue("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Add Goal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Goal Type</label>
            <Select value={goalType} onValueChange={setGoalType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="steps">Steps</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="sleep">Sleep</SelectItem>
                <SelectItem value="activeTime">Active Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {goalType && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Target</label>
              <Input
                type="number"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                placeholder="Enter target value"
              />
            </div>
          )}
          <Button onClick={handleSubmit} disabled={!goalType || !targetValue} className="w-full bg-blue-600 hover:bg-blue-700">
            Save Goal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
