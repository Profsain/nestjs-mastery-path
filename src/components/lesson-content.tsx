import { Fragment } from "react";

type Block =
  | { type: "p" | "h2" | "h3" | "ul" | "ol"; value: string }
  | { type: "code"; value: string; lang?: string }
  | { type: "video"; value: string }
  | { type: "table"; header: string[]; rows: string[][] }
  | { type: "hr" };

/**
 * Markdown-style renderer: ## h2, ### h3, fenced code, paragraphs, - / 1. lists,
 * tables (| a | b |), --- hr, **bold**, `inline`.
 */
export function LessonContent({ source }: { source: string }) {
  const blocks: Block[] = [];
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

    if (/^\s*---\s*$/.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // Table: header row | --- row | body rows
    if (line.includes("|") && lines[i + 1] && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1])) {
      const parseRow = (s: string) =>
        s
          .replace(/^\s*\|/, "")
          .replace(/\|\s*$/, "")
          .split("|")
          .map((c) => c.trim());
      const header = parseRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim() !== "") {
        rows.push(parseRow(lines[i]));
        i++;
      }
      blocks.push({ type: "table", header, rows });
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", value: line.slice(3) });
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", value: line.slice(4) });
      i++;
      continue;
    }

    if (line.startsWith("- ")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        buf.push(lines[i].slice(2));
        i++;
      }
      blocks.push({ type: "ul", value: buf.join("\n") });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        buf.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push({ type: "ol", value: buf.join("\n") });
      continue;
    }

    if (line.startsWith("[video:")) {
      const id = line.slice(7, -1).trim();
      blocks.push({ type: "video", value: id });
      i++;
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }
    blocks.push({ type: "p", value: line });
    i++;
  }

  return (
    <div className="prose-lesson">
      {blocks.map((b, idx) => {
        if (b.type === "video")
          return (
            <div key={idx} className="my-8 aspect-video overflow-hidden rounded-xl border border-border shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${b.value}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          );

        if (b.type === "h2") return <h2 key={idx}>{b.value}</h2>;
        if (b.type === "h3") return <h3 key={idx}>{b.value}</h3>;
        if (b.type === "hr") return <hr key={idx} />;
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
        if (b.type === "ol")
          return (
            <ol key={idx}>
              {b.value.split("\n").map((li, j) => (
                <li key={j}>{renderInline(li)}</li>
              ))}
            </ol>
          );
        if (b.type === "table")
          return (
            <div key={idx} className="lesson-table-wrap">
              <table>
                <thead>
                  <tr>
                    {b.header.map((h, j) => (
                      <th key={j}>{renderInline(h)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((c, ci) => (
                        <td key={ci}>{renderInline(c)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        return <p key={idx}>{renderInline(b.value)}</p>;
      })}
    </div>
  );
}

function renderInline(text: string) {
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
