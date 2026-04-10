# 2026-04-10: Module 1 curriculum prep session

## Context
Full review and prep session for the 2026-04-12 beta demo. Reviewed run-of-show, all artifacts, syllabus, and to-do list. Ran instructor agent, QA agents, and content/voice agents. Rewrote the worksheet. Reorganized the file structure. Attempted Gamma presentation generation.

## Key insights

### 1. The worksheet was a sales document, not a session companion
**What we learned:** The original worksheet was written for a v0 lesson plan (framework-first, not demo-first), addressed "your team" (HR buyer), and had no build-phase reference. It was essentially a sales excerpt, not something useful in the room.
**Why it matters:** A handout has exactly three moments of use: the flip-through when you hand it out, the build phase when they're stuck, and Monday morning when they pull it from their bag. If it doesn't serve all three, it's recycling.
**Action taken:** Rewrote as a 4-page session companion: orientation page (wifi/Google Doc QR), blank matrix (fill in during Block 3), build-phase step-by-step with troubleshooting, and take-home anatomy card with "build, run, tighten" cadence.

### 2. Content agents catch different things than QA agents
**What we learned:** QA agents found structural bugs (wrong numbers, stale references, ordering mismatches). They missed whether the content actually lands for a non-technical audience. The instructor agent and writer agent caught voice problems, cognitive load issues, and energy management gaps. Engineers think like engineers — content review needs content people.
**Why it matters:** For curriculum and copy work, default to instructor/writer agents first. QA agents are useful for cross-referencing consistency but shouldn't lead the review.
**Action taken:** Saved as a process note for future reviews.

### 3. Gamma MCP: let it generate, don't try to preserve
**What we learned:** `textMode: "preserve"` fights Gamma's layout engine. Prescriptive spatial layout instructions in `additionalInstructions` don't translate — Gamma renders how it renders regardless. `textMode: "generate"` with a short conceptual outline lets Gamma pick smart diagrams and layouts, which produces better results. Also: `illustration` style gives cleaner conceptual diagrams than `abstract` (which tends toward decorative blobs).
**Why it matters:** Saves time on future Gamma generations. Stop writing 500-word layout specs. Write 50-word concept descriptions per slide and let the AI figure out the visual.
**Action taken:** Version 5 generated with `generate` mode and short outline. Still iterating.

### 4. Reusable artifacts vs. cohort-specific files — separation matters
**What we learned:** The beta run sheet was a 580-line mega-file mixing reusable teaching materials (demo prompts, exit survey, discussion questions) with cohort-specific files (personalized starters, prep checklist, pre-work email). Editing one meant scrolling past the other. Finding anything took too long.
**Why it matters:** As we run more cohorts, the reusable artifacts evolve while run-specific files freeze after the retro. Mixing them makes both harder to maintain.
**Action taken:** Extracted to standalone files. Reusable artifacts live at `module-1/` level. Cohort-specific files live in `runs/2026-04-12-beta/` subfolder. Cross-references updated.

### 5. The deliberate failure moment needs to be pre-built for first runs
**What we learned:** "Surface a failure organically" is too vague for a first-time instructor. After 5+ runs, you know what failures to expect. On run 1, script it. Best approach: ask Claude about a cannabis state licensing transfer timeline or 280E ruling in Zeshawn's domain — it will fabricate a plausible deadline. Have it in a browser tab, ready to trigger during the build phase if no natural failure occurs by minute 15.
**Why it matters:** Five of six round-2 personas named the failure moment as the single most important trust-building beat. Can't leave the most important beat to chance on the first run.
**Action taken:** Added specific failure prompt prep to Friday and Saturday to-do. Scripted in the run-of-show.

### 6. Humanizer should be standard for all new non-code documents
**What we learned:** User explicitly requested that every new document (not code) run through the humanizer skill before shipping. The pre-class setup doc was the voice gold standard — warm, direct, funny, zero corporate. The worksheet and discussion questions had residual AI tells (thesis-landing, cognitive shift, cross-referential) that the humanizer caught and fixed.
**Why it matters:** Consistency. The voice standard exists (pre-class setup doc). Everything else should match it.
**Action taken:** Saved as a feedback memory. Humanizer pass applied to worksheet and discussion questions.

## What worked
- Instructor agent review was the highest-value single action in the session — surfaced things synthetic personas couldn't (room logistics, energy management, stall patterns, show-and-tell dead air)
- Grilling format (me asking hard questions, Shubham answering) was more productive than a passive review walkthrough
- Extracting artifacts to standalone files made the beta run sheet dramatically more navigable

## What didn't work
- QA agents reviewing content docs — they think like engineers, not like teachers or writers
- Gamma with `textMode: preserve` and prescriptive layout instructions — produces identical mediocre results regardless of specificity
- First two Gamma generations (wrong theme, too text-heavy, no visuals)

## Open questions
- Best Gamma approach for consulting-quality visual decks still unresolved — version 5 pending review
- Whether to use Google Slides/Keynote instead of Gamma for full layout control
- Module 4 Claude Code overnight exercise — concept is right but needs design

## References
- Instructor review: `knowledge/learnings/2026-04-10-instructor-review-module-1.md`
- Updated run-of-show: `knowledge/curriculum/module-1/run-of-show.md`
- Rewritten worksheet: `knowledge/curriculum/module-1/worksheet.md`
- Module 1 folder structure: `knowledge/curriculum/module-1/README.md`
