import { Link } from "wouter";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  Shield,
  Bell,
  Users,
  ArrowRight,
  Heart,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-white border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            Simple Health Tracking
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Track your daily goals, set reminders, and stay healthy. No complicated features, just what you need.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Activity}
              title="Track Goals"
              description="Monitor your steps, sleep, and water intake daily."
            />
            <FeatureCard
              icon={Bell}
              title="Reminders"
              description="Get notified about appointments and medications."
            />
            <FeatureCard
              icon={Shield}
              title="Private"
              description="Your data is stored locally and securely."
            />
            <FeatureCard
              icon={Users}
              title="Connect"
              description="Share progress with your healthcare provider."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} WellnessPortal. Simple & Secure.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <Card className="border-none shadow-sm bg-white">
      <CardHeader>
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <CardTitle className="text-lg font-semibold text-slate-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}
