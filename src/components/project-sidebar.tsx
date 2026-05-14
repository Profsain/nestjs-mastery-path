import { useProgress } from "@/lib/progress";
import { modules } from "@/lib/course-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Circle,
  Rocket,
  Terminal,
  Layers,
  Database,
  Shield,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const moduleIcons: Record<string, any> = {
  foundations: Terminal,
  "rest-apis": Layers,
  "auth-security": Shield,
  database: Database,
  microservices: Rocket,
  performance: Zap,
};

export function ProjectSidebar() {
  const { completedIds, count } = useProgress();

  // Only show modules that actually have assignments/milestones
  const projectModules = modules.filter((m) =>
    m.lessons.some(
      (l) => l.content.includes("## Assignment") || l.content.includes("## Practical Exercise"),
    ),
  );

  const totalLessonsWithProject = projectModules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completionPercentage = Math.round((count / totalLessonsWithProject) * 100) || 0;

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <Card className="border-2 border-primary/10 shadow-lg bg-primary/5">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-primary text-primary-foreground font-mono text-[10px]">
              Active Project
            </Badge>
            <span className="text-xs font-bold text-primary">{completionPercentage}%</span>
          </div>
          <CardTitle className="text-xl">Enterprise E-Learning API</CardTitle>
          <CardDescription>
            Applying each module's skills to a production-grade backend.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="h-2 mb-4" />
          <div className="grid grid-cols-2 gap-2 text-[10px] font-medium text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              {count} Milestones Done
            </div>
            <div className="flex items-center gap-1">
              <Circle className="w-3 h-3" />
              {totalLessonsWithProject - count} Remaining
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground px-1">
          Project Roadmap
        </h3>
        <div className="space-y-1.5">
          {projectModules.map((module) => {
            const Icon = moduleIcons[module.id] || Terminal;
            const moduleLessons = module.lessons;
            const completedInModule = moduleLessons.filter((l) => completedIds.has(l.id)).length;
            const isFullyCompleted = completedInModule === moduleLessons.length;
            const isStarted = completedInModule > 0;

            return (
              <div
                key={module.id}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl border p-3 transition-all hover:shadow-md",
                  isFullyCompleted ? "bg-green-500/5 border-green-500/20" : "bg-card border-border",
                  !isStarted && "opacity-60 grayscale-[0.5]",
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border shadow-sm transition-colors",
                    isFullyCompleted
                      ? "bg-green-500 text-white border-green-600"
                      : "bg-background text-primary border-border",
                  )}
                >
                  {isFullyCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-bold uppercase tracking-tight">
                      {module.title}
                    </p>
                    {isFullyCompleted && (
                      <Badge
                        variant="secondary"
                        className="bg-green-500/10 text-green-600 text-[9px] px-1.5 py-0 h-4"
                      >
                        Mastered
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all duration-500",
                          isFullyCompleted ? "bg-green-500" : "bg-primary",
                        )}
                        style={{ width: `${(completedInModule / moduleLessons.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono tabular-nums text-muted-foreground">
                      {completedInModule}/{moduleLessons.length}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Card className="border-dashed border-2 bg-transparent">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Rocket className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold">Deployment Ready?</p>
            <p className="text-[10px] text-muted-foreground">
              Finish 4 more modules to unlock CI/CD.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
