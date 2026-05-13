import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SkillTree } from "@/components/skill-tree";

export const Route = createFileRoute("/path")({
  component: MasteryPathPage,
});

function MasteryPathPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4">
        <SkillTree />
      </div>
    </div>
  );
}
