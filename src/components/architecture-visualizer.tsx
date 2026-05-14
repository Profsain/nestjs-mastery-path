import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share2 } from "lucide-react";

mermaid.initialize({
  startOnLoad: true,
  theme: "neutral",
  securityLevel: "loose",
  fontFamily: "var(--font-mono)",
  themeVariables: {
    primaryColor: "#0ea5e9",
    primaryTextColor: "#fff",
    primaryBorderColor: "#0ea5e9",
    lineColor: "#64748b",
    secondaryColor: "#f8fafc",
    tertiaryColor: "#f1f5f9",
  },
});

interface ArchitectureVisualizerProps {
  definition: string;
  title?: string;
}

export function ArchitectureVisualizer({
  definition,
  title = "System Blueprint",
}: ArchitectureVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

  useEffect(() => {
    if (containerRef.current) {
      mermaid.render(chartId, definition).then(({ svg }) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      });
    }
  }, [definition, chartId]);

  return (
    <Card className="my-8 overflow-hidden border-2 border-primary/5 shadow-xl bg-muted/5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-muted/20">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-primary" />
          <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
            {title}
          </CardTitle>
        </div>
        <Badge variant="outline" className="font-mono text-[10px] bg-background">
          Architecture
        </Badge>
      </CardHeader>
      <CardContent className="pt-8 flex justify-center overflow-x-auto">
        <div
          ref={containerRef}
          className="mermaid-container animate-in fade-in zoom-in duration-500"
        />
      </CardContent>
    </Card>
  );
}
