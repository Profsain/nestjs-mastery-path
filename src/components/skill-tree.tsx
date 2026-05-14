import { modules } from "@/lib/course-data";
import { useProgress } from "@/lib/progress";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import {
  Terminal,
  Layers,
  Shield,
  Database,
  Rocket,
  Zap,
  FlaskConical,
  Container,
  Trophy,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  foundations: Terminal,
  "rest-apis": Layers,
  "auth-security": Shield,
  database: Database,
  microservices: Rocket,
  performance: Zap,
  testing: FlaskConical,
  docker: Container,
  capstone: Trophy,
};

export function SkillTree() {
  const { completedIds } = useProgress();

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_100%)] from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative flex flex-col items-center">
        <h2 className="text-3xl font-black text-center mb-16 tracking-tight sm:text-5xl">
          The <span className="text-primary italic">Mastery</span> Path
        </h2>

        <div className="flex flex-col items-center gap-16 w-full">
          {modules.map((module, index) => {
            const Icon = iconMap[module.id] || Terminal;
            const lessons = module.lessons;
            const completedCount = lessons.filter((l) => completedIds.has(l.id)).length;
            const isCompleted = completedCount === lessons.length;
            const isStarted = completedCount > 0;

            // Logic to check if previous module is completed (unlocking system)
            const isUnlocked =
              index === 0 ||
              (() => {
                const prevModule = modules[index - 1];
                return prevModule.lessons.every((l) => completedIds.has(l.id));
              })();

            return (
              <div key={module.id} className="relative flex flex-col items-center w-full group">
                {/* Vertical Connector */}
                {index < modules.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-full h-16 w-1 -translate-x-1/2 left-1/2 transition-colors duration-500",
                      isCompleted ? "bg-primary" : "bg-muted",
                    )}
                  />
                )}

                <Link
                  to="/lesson/$moduleId/$lessonId"
                  params={{ moduleId: module.id, lessonId: module.lessons[0].id }}
                  disabled={!isUnlocked}
                  className={cn(
                    "relative flex flex-col items-center p-8 rounded-3xl border-4 transition-all duration-300 w-full max-w-md group-hover:scale-[1.02]",
                    isUnlocked
                      ? isCompleted
                        ? "bg-primary/10 border-primary shadow-xl shadow-primary/10"
                        : "bg-card border-primary/20 shadow-lg hover:border-primary"
                      : "bg-muted/50 border-muted opacity-60 cursor-not-allowed",
                  )}
                >
                  {/* Icon Badge */}
                  <div
                    className={cn(
                      "absolute -top-6 h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg transition-all",
                      isUnlocked
                        ? isCompleted
                          ? "bg-primary text-white"
                          : "bg-background text-primary border-2 border-primary/20"
                        : "bg-muted text-muted-foreground border-2 border-border",
                    )}
                  >
                    {isUnlocked ? <Icon className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
                  </div>

                  <div className="mt-2 text-center">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      Module {index + 1}
                    </p>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{module.tagline}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {isUnlocked ? (
                      <>
                        <Badge
                          variant={isCompleted ? "default" : "outline"}
                          className="text-[10px] py-0 px-2 h-5"
                        >
                          {isCompleted ? "Mastered" : `${completedCount}/${lessons.length} Skills`}
                        </Badge>
                        {isStarted && !isCompleted && (
                          <Badge variant="secondary" className="text-[10px] py-0 px-2 h-5">
                            In Progress
                          </Badge>
                        )}
                      </>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-[10px] py-0 px-2 h-5 border border-dashed"
                      >
                        Complete previous module to unlock
                      </Badge>
                    )}
                  </div>

                  {isCompleted && (
                    <div className="absolute -right-3 -top-3 bg-background rounded-full p-1 shadow-lg border border-primary/20">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </Link>

                {/* Visual Glow */}
                {isUnlocked && !isCompleted && (
                  <div className="absolute -z-10 w-64 h-32 bg-primary/10 blur-3xl opacity-50 rounded-full animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
