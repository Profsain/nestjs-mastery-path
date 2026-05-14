import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { findProject } from "@/lib/course-data";
import { LessonContent } from "@/components/lesson-content";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Layout, Target, ListChecks, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

export const Route = createFileRoute("/project/$moduleId")({
  component: ProjectPage,
});

function ProjectPage() {
  const { moduleId } = Route.useParams();
  const data = findProject(moduleId);
  const [activeStep, setActiveStep] = React.useState(0);

  if (!data) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Project not found.</p>
          <Button asChild className="mt-4">
            <Link to="/course">Back to curriculum</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { module, project, prev, next } = data;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="container mx-auto grid max-w-[1440px] gap-10 px-4 py-10 lg:grid-cols-[300px_1fr]">
        {/* Sidebar: Steps */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
            <Link
              to="/course"
              className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> All modules
            </Link>
            <div className="mb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70 mb-2">
                {module.title}
              </p>
              <h2 className="text-xl font-bold tracking-tight">Module Project</h2>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveStep(-1)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-all",
                  activeStep === -1
                    ? "bg-primary/10 font-medium text-foreground ring-1 ring-primary/20"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                <Layout className="h-4 w-4 shrink-0" />
                Project Overview
              </button>

              <div className="my-4 h-px bg-border/40 px-4" />

              <p className="px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                Implementation Steps
              </p>

              {project.steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-all",
                    activeStep === index
                      ? "bg-primary/10 font-medium text-foreground ring-1 ring-primary/20"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                      activeStep === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="truncate">{step.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0">
          {activeStep === -1 ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary mb-6">
                <Trophy className="h-3 w-3" /> Guided Project
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
                {project.description}
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
                <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <Target className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold mb-2">Primary Objective</h3>
                  <p className="text-sm text-muted-foreground">{project.objective}</p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                    <ListChecks className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold mb-2">Project Scope</h3>
                  <p className="text-sm text-muted-foreground">
                    {project.steps.length} implementation phases from setup to final delivery.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                    <Layout className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold mb-2">Deliverables</h3>
                  <p className="text-sm text-muted-foreground">
                    A fully functional, structured, and tested NestJS application.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-muted/30 p-8 border border-border/40">
                <h2 className="text-2xl font-bold mb-4">Are you ready?</h2>
                <p className="text-muted-foreground mb-6">
                  This project will challenge you to apply everything you've learned in this module.
                  Take your time, focus on quality, and follow the steps.
                </p>
                <Button
                  size="lg"
                  onClick={() => setActiveStep(0)}
                  className="rounded-xl shadow-lg shadow-primary/20"
                >
                  Start Implementation <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold mb-1">
                    Step {activeStep + 1} of {project.steps.length}
                  </p>
                  <h2 className="text-3xl font-extrabold tracking-tight">
                    {project.steps[activeStep].title}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveStep(Math.max(-1, activeStep - 1))}
                    disabled={activeStep === -1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (activeStep < project.steps.length - 1) {
                        setActiveStep(activeStep + 1);
                      }
                    }}
                    disabled={activeStep === project.steps.length - 1}
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>

              <div className="prose prose-neutral dark:prose-invert max-w-none border-t border-border/40 pt-10">
                <LessonContent source={project.steps[activeStep].content} />
              </div>

              <div className="mt-16 flex items-center justify-between border-t border-border/40 pt-10">
                <Button asChild variant="ghost">
                  <Link to="/lesson/$moduleId/$lessonId" params={prev!}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to last lesson
                  </Link>
                </Button>

                {activeStep === project.steps.length - 1 ? (
                  next ? (
                    <Button asChild className="shadow-lg shadow-primary/20">
                      <Link to="/lesson/$moduleId/$lessonId" params={next}>
                        Next Module <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild variant="outline">
                      <Link to="/course">Finish Course</Link>
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="shadow-lg shadow-primary/20"
                  >
                    Next Step <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
