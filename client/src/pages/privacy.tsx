import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Lock,
  Eye,
  Database,
  FileCheck,
  UserCheck,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "Personal identification information (name, email address)",
      "Health-related data you choose to share (wellness goals, medications, allergies)",
      "Usage data and analytics to improve our services",
      "Device and browser information for security purposes",
    ],
  },
  {
    icon: Lock,
    title: "How We Protect Your Data",
    content: [
      "All data is encrypted at rest and in transit using industry-standard encryption",
      "Access controls limit who can view your information",
      "Regular security audits and vulnerability assessments",
      "Secure authentication with JWT tokens and session management",
    ],
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      "To provide and maintain our wellness tracking services",
      "To allow healthcare providers to monitor your health compliance",
      "To send preventive care reminders and health tips",
      "To improve and personalize your experience",
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "Access your personal data at any time through your profile",
      "Request correction of inaccurate information",
      "Delete your account and associated data",
      "Export your health records in a portable format",
    ],
  },
  {
    icon: FileCheck,
    title: "Data Sharing",
    content: [
      "We never sell your personal health information",
      "Data is only shared with healthcare providers you authorize",
      "We may use anonymized, aggregated data for research",
      "Legal requirements may require disclosure in certain circumstances",
    ],
  },
];

const hipaaPoints = [
  "Administrative safeguards to manage security policies",
  "Physical safeguards to protect electronic systems",
  "Technical safeguards including encryption and access controls",
  "Audit controls to monitor access to health information",
  "Breach notification procedures if unauthorized access occurs",
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/30 to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">Legal</Badge>
            <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal and health information.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg mb-2">Our Commitment to Privacy</h2>
                  <p className="text-muted-foreground">
                    WellnessPortal is committed to protecting your personal health information. 
                    We understand the sensitive nature of health data and have implemented 
                    comprehensive measures to ensure your information is secure, private, and 
                    used only in ways you have authorized.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-chart-3 mt-1 shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* HIPAA Compliance Section */}
          <Card className="mt-8 border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                HIPAA Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                We implement safeguards consistent with the Health Insurance Portability and 
                Accountability Act (HIPAA) to protect your health information:
              </p>
              <ul className="space-y-3">
                {hipaaPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Consent Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Data Usage Consent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                By creating an account and checking the data consent box during registration, 
                you acknowledge that you have read and agree to this privacy policy. You consent to:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-chart-3 mt-1 shrink-0" />
                  The collection and storage of your health-related information
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-chart-3 mt-1 shrink-0" />
                  Sharing your data with authorized healthcare providers
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-chart-3 mt-1 shrink-0" />
                  Receiving wellness reminders and health tips
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                You may withdraw your consent at any time by deleting your account. 
                Please note that this will result in the removal of your data from our systems.
              </p>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="mt-8 bg-muted/50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Questions About Privacy?</h3>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this privacy policy or how we handle your data, 
                please contact our privacy team:
              </p>
              <div className="space-y-1 text-sm">
                <p><strong>Email:</strong> privacy@wellnessportal.com</p>
                <p><strong>Phone:</strong> 1-800-WELLNESS (ext. 3)</p>
                <p><strong>Mail:</strong> Privacy Officer, WellnessPortal, 123 Health Avenue, Healthcare City, HC 12345</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} WellnessPortal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
