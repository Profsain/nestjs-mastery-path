/**
 * Validates every lesson contains required pedagogical fields:
 *   - summary  → "## Lesson Objective" | "## Lesson Introduction" | "## Lesson Outro"
 *   - keySections → at least 2 additional `## ` headings (beyond summary)
 *   - exerciseOrQuiz → "## Assignment" | "## Practical Exercise" | "## Quick Knowledge Check" | "## Exercise" | "## Final assignment"
 *   - non-empty content (>200 chars)
 *
 * Run: bun scripts/validate-lessons.ts
 */
import { modules, allLessons } from "../src/lib/course-data";

type Issue = { moduleId: string; lessonId: string; missing: string[] };

const SUMMARY_RE = /^##\s+(Lesson Objective|Lesson Introduction|Lesson Outro)\b/m;
const QUIZ_RE =
  /^##\s+(Assignment|Practical Exercise|Quick Knowledge Check|Exercise|Final assignment)\b/m;

const issues: Issue[] = [];
let totalSections = 0;

for (const mod of modules) {
  for (const lesson of mod.lessons) {
    const c = lesson.content ?? "";
    const headings = (c.match(/^##\s+/gm) ?? []).length;
    totalSections += headings;
    const missing: string[] = [];

    if (c.trim().length < 200) missing.push("content (too short)");
    if (!SUMMARY_RE.test(c)) missing.push("summary (Lesson Objective/Introduction/Outro)");
    if (headings < 3) missing.push(`key sections (only ${headings} ## headings)`);
    if (!QUIZ_RE.test(c)) missing.push("quiz/checklist (Assignment/Exercise/Knowledge Check)");

    if (missing.length) issues.push({ moduleId: mod.id, lessonId: lesson.id, missing });
  }
}

const total = allLessons.length;
const ok = total - issues.length;

console.log(`\nLesson validation report`);
console.log(`========================`);
console.log(`Modules:        ${modules.length}`);
console.log(`Lessons total:  ${total}`);
console.log(`Lessons valid:  ${ok}`);
console.log(`Lessons w/issues: ${issues.length}`);
console.log(`Avg ## sections per lesson: ${(totalSections / total).toFixed(1)}`);

if (issues.length) {
  console.log(`\nIssues:`);
  for (const i of issues) {
    console.log(`  - ${i.moduleId}/${i.lessonId}: ${i.missing.join("; ")}`);
  }
  process.exit(1);
}
console.log(`\n✅ All lessons pass validation.`);
