import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Activity,
  Heart,
  LogOut,
  Menu,
  User,
  Users,
  Home,
  Info,
  Phone,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";

const publicNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/health-info", label: "Health Topics", icon: Info },
  { href: "/contact", label: "Contact", icon: Phone },
];

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden font-serif text-xl font-semibold sm:inline-block">
            WellnessPortal
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {publicNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={location === item.href ? "secondary" : "ghost"}
                size="sm"
                className="gap-2"
                data-testid={`nav-link-${item.label.toLowerCase().replace(" ", "-")}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isAuthenticated && user ? (
            <>
              {/* Dashboard Link */}
              <Link href={user.role === "provider" ? "/provider" : "/dashboard"}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden gap-2 md:flex"
                  data-testid="nav-link-dashboard"
                >
                  {user.role === "provider" ? (
                    <>
                      <Users className="h-4 w-4" />
                      Provider Dashboard
                    </>
                  ) : (
                    <>
                      <Activity className="h-4 w-4" />
                      My Dashboard
                    </>
                  )}
                </Button>
              </Link>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9 rounded-full"
                    data-testid="button-user-menu"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem
                      className="cursor-pointer gap-2"
                      data-testid="menu-item-profile"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link href={user.role === "provider" ? "/provider" : "/dashboard"}>
                    <DropdownMenuItem
                      className="cursor-pointer gap-2"
                      data-testid="menu-item-dashboard"
                    >
                      {user.role === "provider" ? (
                        <>
                          <Stethoscope className="h-4 w-4" />
                          Provider Dashboard
                        </>
                      ) : (
                        <>
                          <Activity className="h-4 w-4" />
                          My Dashboard
                        </>
                      )}
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                    onClick={handleLogout}
                    data-testid="menu-item-logout"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden md:block">
                <Button variant="ghost" size="sm" data-testid="nav-link-login">
                  Log in
                </Button>
              </Link>
              <Link href="/register" className="hidden md:block">
                <Button size="sm" data-testid="nav-link-register">
                  Get Started
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                data-testid="button-mobile-menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  WellnessPortal
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-2">
                {publicNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={location === item.href ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      data-testid={`mobile-nav-${item.label.toLowerCase().replace(" ", "-")}`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                ))}

                {isAuthenticated && user ? (
                  <>
                    <div className="my-2 border-t" />
                    <Link
                      href={user.role === "provider" ? "/provider" : "/dashboard"}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2"
                        data-testid="mobile-nav-dashboard"
                      >
                        {user.role === "provider" ? (
                          <>
                            <Users className="h-4 w-4" />
                            Provider Dashboard
                          </>
                        ) : (
                          <>
                            <Activity className="h-4 w-4" />
                            My Dashboard
                          </>
                        )}
                      </Button>
                    </Link>
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2"
                        data-testid="mobile-nav-profile"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-destructive"
                      onClick={handleLogout}
                      data-testid="mobile-nav-logout"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="my-2 border-t" />
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        data-testid="mobile-nav-login"
                      >
                        Log in
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        className="w-full"
                        data-testid="mobile-nav-register"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
