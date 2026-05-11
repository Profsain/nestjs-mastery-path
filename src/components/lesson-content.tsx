import { Fragment } from "react";

/**
 * Tiny markdown renderer — supports: ## heading, ### subheading,
 * fenced code blocks ```lang ... ```, paragraphs, - lists, **bold**, `inline`.
 */
export function LessonContent({ source }: { source: string }) {
  const blocks: { type: "p" | "h2" | "h3" | "ul" | "code"; value: string; lang?: string }[] = [];
  const lines = source.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ type: "code", value: buf.join("\n"), lang });
      continue;
    }
    if (line.startsWith("## ")) { blocks.push({ type: "h2", value: line.slice(3) }); i++; continue; }
    if (line.startsWith("### ")) { blocks.push({ type: "h3", value: line.slice(4) }); i++; continue; }
    if (line.startsWith("- ")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        buf.push(lines[i].slice(2));
        i++;
      }
      blocks.push({ type: "ul", value: buf.join("\n") });
      continue;
    }
    if (line.trim() === "") { i++; continue; }
    // paragraph (single line)
    blocks.push({ type: "p", value: line });
    i++;
  }

  return (
    <div className="prose-lesson">
      {blocks.map((b, idx) => {
        if (b.type === "h2") return <h2 key={idx}>{b.value}</h2>;
        if (b.type === "h3") return <h3 key={idx}>{b.value}</h3>;
        if (b.type === "code")
          return (
            <pre key={idx}>
              <code>{b.value}</code>
            </pre>
          );
        if (b.type === "ul")
          return (
            <ul key={idx}>
              {b.value.split("\n").map((li, j) => (
                <li key={j}>{renderInline(li)}</li>
              ))}
            </ul>
          );
        return <p key={idx}>{renderInline(b.value)}</p>;
      })}
    </div>
  );
}

function renderInline(text: string) {
  // Split by `code` first, then **bold** inside each non-code chunk.
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    const boldSplit = part.split(/(\*\*[^*]+\*\*)/g);
    return (
      <Fragment key={i}>
        {boldSplit.map((seg, j) =>
          seg.startsWith("**") && seg.endsWith("**") ? (
            <strong key={j}>{seg.slice(2, -2)}</strong>
          ) : (
            <Fragment key={j}>{seg}</Fragment>
          ),
        )}
      </Fragment>
    );
  });
}
