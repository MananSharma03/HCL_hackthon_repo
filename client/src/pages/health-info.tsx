import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Syringe,
  Brain,
  Apple,
  Dumbbell,
  HeartPulse,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";

const healthTopics = [
  {
    id: "covid",
    title: "COVID-19 Updates",
    description: "Stay informed about the latest COVID-19 guidelines and vaccination information.",
    icon: Syringe,
    color: "bg-blue-500",
    category: "Vaccination",
    content: [
      "Get vaccinated and boosted as recommended by health authorities.",
      "Stay home when sick and get tested if you have symptoms.",
      "Wash hands frequently with soap and water for at least 20 seconds.",
      "Wear a mask in crowded indoor settings, especially if immunocompromised.",
      "Improve ventilation in indoor spaces when possible.",
      "Monitor local COVID-19 levels and adjust precautions accordingly.",
    ],
    resources: [
      { title: "CDC COVID-19 Guidelines", type: "Official" },
      { title: "Vaccine Finder", type: "Tool" },
      { title: "Testing Locations", type: "Resource" },
    ],
  },
  {
    id: "flu",
    title: "Seasonal Flu Prevention",
    description: "Learn steps to prevent seasonal flu and when to get vaccinated.",
    icon: Shield,
    color: "bg-teal-500",
    category: "Prevention",
    content: [
      "Get your annual flu vaccine - ideally before flu season peaks.",
      "Avoid close contact with people who are sick.",
      "Cover your mouth and nose when coughing or sneezing.",
      "Clean and disinfect frequently touched surfaces.",
      "Stay hydrated and get adequate sleep to support your immune system.",
      "Consider antiviral medications if prescribed by your doctor.",
    ],
    resources: [
      { title: "Flu Shot Locator", type: "Tool" },
      { title: "Flu vs. Cold Symptoms", type: "Guide" },
      { title: "When to See a Doctor", type: "Checklist" },
    ],
  },
  {
    id: "mental-health",
    title: "Mental Health Awareness",
    description: "Explore resources and support options for maintaining good mental health.",
    icon: Brain,
    color: "bg-purple-500",
    category: "Wellness",
    content: [
      "Practice mindfulness and meditation for stress reduction.",
      "Maintain regular sleep schedules for better mental health.",
      "Stay connected with friends and family for social support.",
      "Exercise regularly - physical activity boosts mood and reduces anxiety.",
      "Seek professional help if experiencing persistent symptoms.",
      "Take breaks from news and social media when feeling overwhelmed.",
    ],
    resources: [
      { title: "Crisis Helpline: 988", type: "Emergency" },
      { title: "Find a Therapist", type: "Tool" },
      { title: "Self-Care Checklist", type: "Guide" },
    ],
  },
  {
    id: "nutrition",
    title: "Healthy Nutrition",
    description: "Discover balanced eating habits for optimal health and energy.",
    icon: Apple,
    color: "bg-green-500",
    category: "Lifestyle",
    content: [
      "Eat a variety of fruits and vegetables daily.",
      "Choose whole grains over refined grains.",
      "Limit processed foods, added sugars, and sodium.",
      "Stay hydrated - aim for 8 glasses of water per day.",
      "Include lean proteins and healthy fats in your diet.",
      "Practice portion control and mindful eating.",
    ],
    resources: [
      { title: "MyPlate Guidelines", type: "Official" },
      { title: "Meal Planning Tips", type: "Guide" },
      { title: "Nutrition Calculator", type: "Tool" },
    ],
  },
  {
    id: "exercise",
    title: "Physical Activity",
    description: "Guidelines for staying active and maintaining physical fitness.",
    icon: Dumbbell,
    color: "bg-orange-500",
    category: "Fitness",
    content: [
      "Aim for 150 minutes of moderate aerobic activity per week.",
      "Include strength training exercises at least 2 days per week.",
      "Take regular breaks from sitting - move every hour.",
      "Find activities you enjoy to make exercise sustainable.",
      "Start slowly and gradually increase intensity.",
      "Listen to your body and rest when needed.",
    ],
    resources: [
      { title: "Exercise Guidelines", type: "Official" },
      { title: "Workout Videos", type: "Resource" },
      { title: "Activity Tracker Tips", type: "Guide" },
    ],
  },
  {
    id: "heart-health",
    title: "Heart Health",
    description: "Tips for maintaining a healthy heart and cardiovascular system.",
    icon: HeartPulse,
    color: "bg-red-500",
    category: "Prevention",
    content: [
      "Monitor blood pressure regularly and keep it in healthy range.",
      "Maintain healthy cholesterol levels through diet and exercise.",
      "Quit smoking and avoid secondhand smoke.",
      "Manage stress through relaxation techniques.",
      "Get regular health screenings as recommended.",
      "Maintain a healthy weight through balanced lifestyle.",
    ],
    resources: [
      { title: "Heart Risk Calculator", type: "Tool" },
      { title: "Blood Pressure Guide", type: "Guide" },
      { title: "Heart-Healthy Recipes", type: "Resource" },
    ],
  },
];

const quickTips = [
  { icon: CheckCircle, text: "Stay up to date on vaccinations", color: "text-chart-3" },
  { icon: Info, text: "Schedule annual wellness checkups", color: "text-chart-1" },
  { icon: AlertCircle, text: "Know the warning signs of common conditions", color: "text-chart-5" },
];

export default function HealthInfoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/30 to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">Health Resources</Badge>
            <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Health Information & Resources
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Access trusted health information, preventive care guidelines, and wellness resources to help you make informed decisions about your health.
            </p>
          </div>

          {/* Quick Tips */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {quickTips.map((tip, index) => (
              <Card key={index} className="bg-background/80 backdrop-blur">
                <CardContent className="flex items-center gap-3 p-4">
                  <tip.icon className={`h-5 w-5 ${tip.color}`} />
                  <span className="text-sm font-medium">{tip.text}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {healthTopics.map((topic) => (
              <Card key={topic.id} id={topic.id} className="overflow-hidden scroll-mt-24">
                <div className="md:flex">
                  {/* Topic Header */}
                  <div className={`${topic.color} p-6 md:w-64 md:shrink-0 flex flex-col justify-center items-center text-white`}>
                    <topic.icon className="h-12 w-12 mb-4" />
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      {topic.category}
                    </Badge>
                  </div>

                  {/* Topic Content */}
                  <div className="flex-1">
                    <CardHeader>
                      <CardTitle className="text-xl md:text-2xl">{topic.title}</CardTitle>
                      <CardDescription className="text-base">
                        {topic.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Key Points */}
                      <div>
                        <h4 className="font-medium mb-3">Key Recommendations</h4>
                        <ul className="grid gap-2 md:grid-cols-2">
                          {topic.content.map((point, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-chart-3 mt-0.5 shrink-0" />
                              <span className="text-muted-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      {/* Resources */}
                      <div>
                        <h4 className="font-medium mb-3">Helpful Resources</h4>
                        <div className="flex flex-wrap gap-2">
                          {topic.resources.map((resource, index) => (
                            <Badge
                              key={index}
                              variant={resource.type === "Emergency" ? "destructive" : "secondary"}
                              className="cursor-pointer"
                            >
                              {resource.title}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Privacy & Data Protection</h3>
                  <p className="text-sm text-muted-foreground">
                    WellnessPortal is committed to protecting your health information. We follow healthcare privacy standards and use industry-standard encryption to secure your data. Your personal health information is never shared without your explicit consent. For more details, please review our{" "}
                    <a href="/privacy" className="text-primary underline">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            The information provided is for educational purposes only and should not replace professional medical advice.
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} WellnessPortal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
