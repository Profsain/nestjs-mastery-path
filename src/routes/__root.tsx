import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">This lesson doesn't exist yet.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NestMastery — Master NestJS, from beginner to production" },
      {
        name: "description",
        content:
          "An interactive course covering NestJS, PostgreSQL with Prisma, Docker, and testing — from first principles to production.",
      },
      { property: "og:title", content: "NestMastery — Master NestJS, from beginner to production" },
      {
        property: "og:description",
        content:
          "NestJS, databases, Docker, and testing — taught the way senior engineers actually build.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "NestMastery — Master NestJS, from beginner to production" },
      { name: "description", content: "Learn Nest.js backend development from beginner to mastery with this comprehensive online course." },
      { property: "og:description", content: "Learn Nest.js backend development from beginner to mastery with this comprehensive online course." },
      { name: "twitter:description", content: "Learn Nest.js backend development from beginner to mastery with this comprehensive online course." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f72ff02e-bae5-41d3-871b-eb995c1724ec/id-preview-1807eccc--127849ba-b02d-4046-a426-b1775d5020bb.lovable.app-1778745221552.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f72ff02e-bae5-41d3-871b-eb995c1724ec/id-preview-1807eccc--127849ba-b02d-4046-a426-b1775d5020bb.lovable.app-1778745221552.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
