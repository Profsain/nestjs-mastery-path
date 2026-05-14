import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { useProgress } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { Flame, LogOut, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function SiteHeader() {
  const { user, signOut, loading } = useAuth();
  const { level, levelProgress, totalXp, xpToNextLevel } = useProgress();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground shadow-sm shadow-primary/30">
            <Flame className="h-4 w-4" />
          </span>
          <span>NestMastery</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link
            to="/course"
            className="rounded-md px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Curriculum
          </Link>
          <Link
            to="/path"
            className="rounded-md px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Mastery Path
          </Link>

          {loading ? null : user ? (
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="hidden sm:flex flex-col items-end gap-1 cursor-help">
                      <div className="flex items-center gap-1.5">
                        <Trophy className="h-3.5 w-3.5 text-yellow-500" />
                        <span className="font-mono text-xs font-bold uppercase tracking-wider">
                          Level {level}
                        </span>
                      </div>
                      <Progress value={levelProgress} className="h-1 w-20 bg-muted" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-popover text-popover-foreground border-border/50">
                    <p className="text-xs font-bold">{totalXp} Total XP</p>
                    <p className="text-[10px] text-muted-foreground">
                      {xpToNextLevel} XP to Level {level + 1}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button variant="ghost" size="sm" onClick={signOut} className="h-9 px-3">
                <LogOut className="mr-2 h-3.5 w-3.5" /> Sign out
              </Button>
            </div>
          ) : (
            <Button asChild size="sm" className="shadow-lg shadow-primary/20">
              <Link to="/login">Sign in</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
