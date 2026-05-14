import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { modules, totalLessons } from "@/lib/course-data";
import { useProgress } from "@/lib/progress";
import { useAuth } from "@/lib/auth";
import { Progress } from "@/components/ui/progress";
import { LessonContent } from "@/components/lesson-content";
import { Check, Lock, PlayCircle, Youtube, FolderCode } from "lucide-react";
import * as Icons from "lucide-react";

export const Route = createFileRoute("/course")({
  component: CoursePage,
  head: () => ({
    meta: [
      { title: "Curriculum — NestMastery" },
      {
        name: "description",
        content: "All modules and lessons: NestJS, database, Docker, and testing.",
      },
    ],
  }),
});

function CoursePage() {
  const { user } = useAuth();
  const progress = useProgress();
  const pct = user ? Math.round((progress.count / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Curriculum</h1>
          <p className="mt-2 text-muted-foreground">
            {totalLessons} lessons across {modules.length} modules. Take them in order or jump
            anywhere.
          </p>
          {user ? (
            <div className="mt-6 rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Your progress</span>
                <span className="font-mono font-medium">
                  {progress.count} / {totalLessons} · {pct}%
                </span>
              </div>
              <Progress value={pct} className="mt-3" />
            </div>
          ) : (
            <div className="mt-6 rounded-lg border border-dashed border-border bg-card/40 p-4 text-sm text-muted-foreground">
              <Link
                to="/login"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Sign in
              </Link>{" "}
              to track your progress as you complete lessons.
            </div>
          )}
        </header>

        <div className="space-y-8">
          {modules.map((m, mi) => {
            const Icon = (Icons as any)[m.icon] ?? Icons.BookOpen;
            const doneInModule = m.lessons.filter((l) => progress.isDone(l.id)).length;
            return (
              <section key={m.id}>
                <div className="mb-3 flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      Module {String(mi + 1).padStart(2, "0")}
                    </p>
                    <h2 className="text-lg font-semibold">{m.title}</h2>
                  </div>
                  {user && (
                    <span className="font-mono text-xs text-muted-foreground">
                      {doneInModule}/{m.lessons.length}
                    </span>
                  )}
                </div>

                {/* Module overview from the book */}
                <div className="mb-4 rounded-lg border border-border bg-card p-5">
                  <LessonContent source={m.overview} />
                </div>

                {/* YouTube tutorial card */}
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(m.video.query)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-4 flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Youtube className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      Watch on YouTube · {m.video.channel}
                    </p>
                    <p className="font-medium">{m.video.title}</p>
                  </div>
                  <PlayCircle className="h-5 w-5 text-muted-foreground" />
                </a>

                <ul className="overflow-hidden rounded-lg border border-border bg-card">
                  {m.lessons.map((l, li) => {
                    const done = progress.isDone(l.id);
                    return (
                      <li key={l.id} className="border-b border-border/60 last:border-b-0">
                        <Link
                          to="/lesson/$moduleId/$lessonId"
                          params={{ moduleId: m.id, lessonId: l.id }}
                          className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-accent/40"
                        >
                          <div
                            className={`grid h-7 w-7 place-items-center rounded-full text-xs font-mono ${
                              done
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {done ? <Check className="h-3.5 w-3.5" /> : li + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{l.title}</p>
                            <p className="text-xs text-muted-foreground">{l.duration}</p>
                          </div>
                          {user ? (
                            <PlayCircle className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                  {m.project && (
                    <li className="bg-primary/5 border-t border-primary/10">
                      <Link
                        to="/project/$moduleId"
                        params={{ moduleId: m.id }}
                        className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-primary/10"
                      >
                        <div className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground shadow-sm">
                          <FolderCode className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-primary">
                            Guided Project: {m.project.title}
                          </p>
                          <p className="text-[10px] uppercase tracking-wider text-primary/70 font-mono">
                            Module Practical Capstone
                          </p>
                        </div>
                        <div className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary uppercase">
                          Practice
                        </div>
                      </Link>
                    </li>
                  )}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
