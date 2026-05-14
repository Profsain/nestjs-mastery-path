import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { findLesson } from "@/lib/course-data";
import { LessonContent } from "@/components/lesson-content";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/lib/progress";
import { useAuth } from "@/lib/auth";
import { buildLessonChecklist } from "@/lib/lesson-checklist";
import { Check, ChevronLeft, ChevronRight, Circle, Clock } from "lucide-react";
import { toast } from "sonner";
import { ProjectSidebar } from "@/components/project-sidebar";
import React from "react";
import { cn } from "@/lib/utils";
import { FolderCode } from "lucide-react";

export const Route = createFileRoute("/lesson/$moduleId/$lessonId")({
  component: LessonPage,
});

function LessonPage() {
  const { moduleId, lessonId } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const progress = useProgress();
  const data = findLesson(moduleId, lessonId);
  const [focusMode, setFocusMode] = React.useState(false);

  if (!data) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Lesson not found.</p>
          <Button asChild className="mt-4">
            <Link to="/course">Back to curriculum</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { module, lesson, prev, next } = data;
  const isDone = progress.isDone(lesson.id);

  const onComplete = () => {
    if (!user) {
      toast("Sign in to save your progress");
      navigate({ to: "/login" });
      return;
    }
    progress.toggle(lesson.id, !isDone);
    if (!isDone && next) {
      if ("type" in next && next.type === "project") {
        setTimeout(
          () => navigate({ to: "/project/$moduleId", params: { moduleId: next.moduleId } }),
          250,
        );
      } else {
        setTimeout(() => navigate({ to: "/lesson/$moduleId/$lessonId", params: next as any }), 250);
      }
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500">
      <SiteHeader />
      <div
        className={cn(
          "container mx-auto grid gap-10 px-4 py-10 transition-all duration-500",
          focusMode ? "max-w-3xl grid-cols-1" : "max-w-[1440px] lg:grid-cols-[260px_1fr_320px]",
        )}
      >
        {/* Left Sidebar: Navigation */}
        {!focusMode && (
          <aside className="hidden lg:block">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
              <Link
                to="/course"
                className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> All modules
              </Link>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                {module.title}
              </p>
              <ul className="mt-4 space-y-1">
                {module.lessons.map((l) => {
                  const active = l.id === lesson.id;
                  const done = progress.isDone(l.id);
                  return (
                    <li key={l.id}>
                      <Link
                        to="/lesson/$moduleId/$lessonId"
                        params={{ moduleId, lessonId: l.id }}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all ${
                          active
                            ? "bg-primary/10 font-medium text-foreground shadow-sm ring-1 ring-primary/20"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        }`}
                      >
                        <span
                          className={`grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full text-[10px] ${
                            done
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "border-2 border-muted"
                          }`}
                        >
                          {done && <Check className="h-3 w-3" />}
                        </span>
                        <span className="truncate">{l.title}</span>
                      </Link>
                    </li>
                  );
                })}
                {module.project && (
                  <li className="mt-4 pt-4 border-t border-border/40">
                    <Link
                      to="/project/$moduleId"
                      params={{ moduleId }}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-primary font-bold hover:bg-primary/5 transition-all"
                    >
                      <FolderCode className="h-4 w-4" />
                      Module Project
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </aside>
        )}

        {/* Center: Content */}
        <article className="min-w-0">
          <div className="flex items-center justify-between gap-4 mb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
              {module.title}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFocusMode(!focusMode)}
              className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground h-8 px-2"
            >
              {focusMode ? "Exit Focus" : "Focus Mode"}
            </Button>
          </div>
          <h1
            className={cn(
              "font-extrabold tracking-tight transition-all duration-500",
              focusMode ? "text-5xl sm:text-6xl text-center mt-10" : "text-4xl sm:text-5xl mt-3",
            )}
          >
            {lesson.title}
          </h1>
          <div
            className={cn(
              "mt-4 flex items-center gap-4 text-sm text-muted-foreground transition-all duration-500",
              focusMode && "justify-center",
            )}
          >
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {lesson.duration}
            </span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
            <span className="font-medium text-primary/80">Interactive Lesson</span>
          </div>

          <LessonChecklist content={lesson.content} />

          <div className="mt-10 border-t border-border/40 pt-10">
            <LessonContent source={lesson.content} quizzes={lesson.quizzes} />
          </div>

          {/* Footer nav */}
          <div className="mt-16 flex flex-col gap-4 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {prev ? (
                <Button asChild variant="ghost" size="sm" className="h-10 px-4">
                  <Link to="/lesson/$moduleId/$lessonId" params={prev}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous Lesson
                  </Link>
                </Button>
              ) : null}
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={isDone ? "outline" : "default"}
                onClick={onComplete}
                className={cn(
                  "h-10 px-6 font-semibold transition-all",
                  !isDone && "shadow-lg shadow-primary/20 hover:shadow-primary/30",
                )}
              >
                {isDone ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Lesson Completed
                  </>
                ) : (
                  "Mark as Finished"
                )}
              </Button>
              {next ? (
                "type" in next && next.type === "project" ? (
                  <Button
                    asChild
                    className="h-10 px-6 font-semibold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90"
                  >
                    <Link to="/project/$moduleId" params={{ moduleId: next.moduleId }}>
                      Module Project <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="h-10 px-6 font-semibold shadow-lg shadow-primary/10">
                    <Link to="/lesson/$moduleId/$lessonId" params={next as any}>
                      Next Lesson <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )
              ) : (
                <Button asChild variant="outline" className="h-10 px-6 font-semibold">
                  <Link to="/course">Finish Course</Link>
                </Button>
              )}
            </div>
          </div>
        </article>

        {/* Right Sidebar: Project Progress */}
        {!focusMode && (
          <aside className="hidden xl:block">
            <div className="sticky top-20">
              <ProjectSidebar />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function LessonChecklist({ content }: { content: string }) {
  const items = buildLessonChecklist(content);
  const done = items.filter((i) => i.done).length;
  return (
    <section
      aria-label="Lesson completion checklist"
      className="mt-6 rounded-xl border border-border/60 bg-accent/20 p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Completion checklist
        </h2>
        <span className="text-xs text-muted-foreground">
          {done}/{items.length} ready
        </span>
      </div>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <span
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                item.done
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {item.done ? <Check className="h-3 w-3" /> : <Circle className="h-2.5 w-2.5" />}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-tight">{item.label}</p>
              <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
