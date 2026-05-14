/**
 * Auto-generates a per-lesson completion checklist from the lesson content,
 * mirroring the validation rules in scripts/validate-lessons.ts.
 */
export type ChecklistItem = {
  id: "summary" | "keySections" | "quiz";
  label: string;
  detail: string;
  done: boolean;
};

const SUMMARY_RE = /^##\s+(Lesson Objective|Lesson Introduction|Lesson Outro)\b/m;
const QUIZ_RE =
  /^##\s+(Assignment|Practical Exercise|Quick Knowledge Check|Exercise|Final assignment)\b/m;

export function buildLessonChecklist(content: string): ChecklistItem[] {
  const headings = content.match(/^##\s+.+/gm) ?? [];
  const sectionTitles = headings.map((h) => h.replace(/^##\s+/, "").trim());

  const hasSummary = SUMMARY_RE.test(content);
  const hasQuiz = QUIZ_RE.test(content);
  const keyCount = headings.length;

  return [
    {
      id: "summary",
      label: "Read the lesson summary",
      detail: hasSummary
        ? "Objective / introduction / outro included."
        : "No summary section found.",
      done: hasSummary,
    },
    {
      id: "keySections",
      label: `Cover ${Math.max(keyCount, 3)} key sections`,
      detail: sectionTitles.slice(0, 6).join(" · ") || "No section headings found.",
      done: keyCount >= 3,
    },
    {
      id: "quiz",
      label: "Complete the quiz / assignment",
      detail: hasQuiz
        ? "Knowledge check or assignment available below."
        : "No quiz or assignment found in this lesson.",
      done: hasQuiz,
    },
  ];
}
