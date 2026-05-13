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

export const Route = createFileRoute("/lesson/$moduleId/$lessonId")({
  component: LessonPage,
});

function LessonPage() {
  const { moduleId, lessonId } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const progress = useProgress();
  const data = findLesson(moduleId, lessonId);

  if (!data) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Lesson not found.</p>
          <Button asChild className="mt-4"><Link to="/course">Back to curriculum</Link></Button>
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
      setTimeout(() => navigate({ to: "/lesson/$moduleId/$lessonId", params: next }), 250);
    }
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="container mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
            <Link
              to="/course"
              className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> All modules
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {module.title}
            </p>
            <ul className="mt-3 space-y-1">
              {module.lessons.map((l) => {
                const active = l.id === lesson.id;
                const done = progress.isDone(l.id);
                return (
                  <li key={l.id}>
                    <Link
                      to="/lesson/$moduleId/$lessonId"
                      params={{ moduleId, lessonId: l.id }}
                      className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                        active
                          ? "bg-primary/15 text-foreground"
                          : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] ${
                          done ? "bg-primary text-primary-foreground" : "border border-border"
                        }`}
                      >
                        {done && <Check className="h-2.5 w-2.5" />}
                      </span>
                      <span className="truncate">{l.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* Content */}
        <article>
          <p className="font-mono text-xs uppercase tracking-wider text-primary">{module.title}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{lesson.title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> {lesson.duration}
          </p>

          <LessonChecklist content={lesson.content} />

          <div className="mt-8">
            <LessonContent source={lesson.content} />
          </div>

          {/* Footer nav */}
          <div className="mt-12 flex flex-col gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {prev ? (
                <Button asChild variant="ghost" size="sm">
                  <Link to="/lesson/$moduleId/$lessonId" params={prev}>
                    <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                  </Link>
                </Button>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={isDone ? "outline" : "default"}
                onClick={onComplete}
              >
                {isDone ? (
                  <><Check className="mr-1.5 h-4 w-4" /> Completed</>
                ) : (
                  "Mark complete"
                )}
              </Button>
              {next ? (
                <Button asChild>
                  <Link to="/lesson/$moduleId/$lessonId" params={next}>
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline">
                  <Link to="/course">Finish course</Link>
                </Button>
              )}
            </div>
          </div>
        </article>
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
