import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Flame, LogOut } from "lucide-react";

export function SiteHeader() {
  const { user, signOut, loading } = useAuth();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <Flame className="h-4 w-4" />
          </span>
          <span>NestMastery</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/course"
            className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Curriculum
          </Link>
          {loading ? null : user ? (
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="mr-1.5 h-3.5 w-3.5" /> Sign out
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link to="/login">Sign in</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
