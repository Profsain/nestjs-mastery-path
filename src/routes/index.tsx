import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { modules, totalLessons } from "@/lib/course-data";
import * as Icons from "lucide-react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-border/60"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {totalLessons} interactive lessons · 4 modules
            </div>
            <h1 className="text-balance text-5xl font-bold tracking-tight md:text-6xl">
              Master <span style={{ color: "var(--primary)" }}>NestJS</span> backend development —
              from beginner to production.
            </h1>
            <p className="mt-6 text-balance text-lg text-muted-foreground md:text-xl">
              A focused course on the four things that turn juniors into senior backend engineers:
              architecture, databases, containers, and tests.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="shadow-[var(--shadow-glow)]">
                <Link to="/course">
                  Start learning <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/login">Create free account</Link>
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Hands-on code", "Progress tracking", "Production patterns"].map((f) => (
                <li key={f} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What you'll learn</h2>
          <p className="mt-3 text-muted-foreground">Four modules. Zero filler.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {modules.map((m, i) => {
            const Icon = (Icons as any)[m.icon] ?? Icons.BookOpen;
            return (
              <Link
                key={m.id}
                to="/course"
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[var(--shadow-card)]"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    Module {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-xl font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.tagline}</p>
                <p className="mt-4 text-xs text-muted-foreground">{m.lessons.length} lessons</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Ready to ship better backends?</h2>
          <p className="mt-3 text-muted-foreground">Sign in to track your progress as you go.</p>
          <Button asChild size="lg" className="mt-7">
            <Link to="/course">Open the curriculum</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        Built with NestJS principles in mind.
      </footer>
    </div>
  );
}
