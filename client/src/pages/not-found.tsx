import { Link } from "wouter";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-12 pb-8 space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-4xl font-bold">404</h1>
              <p className="text-xl text-muted-foreground">Page Not Found</p>
            </div>

            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track to better health.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/">
                <Button className="gap-2 w-full sm:w-auto" data-testid="button-go-home">
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => window.history.back()}
                data-testid="button-go-back"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
