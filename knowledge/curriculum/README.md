# Curriculum

All teaching materials for the Unlock Intelligence program. Lesson plans, worksheets, syllabi, exercises, run-of-show documents, historical logs of live instances, and audience-specific learnings.

Marketing materials (messaging, positioning, landing page copy) live in `knowledge/artifacts/`. Research and strategy live in `knowledge/strategy/`. Dated, cross-cutting insights live in `knowledge/learnings/`. This folder is teaching only.

## Structure

```
knowledge/curriculum/
├── README.md                       ← you are here
├── syllabus.md                     ← whole 8-hour program overview
├── module-1/                       ← Module 1: The Process Matrix
│   ├── README.md                   ← module index
│   ├── run-of-show.md              ← the live plan (canonical)
│   ├── worksheet.md                ← participant-facing handout
│   ├── runs/                       ← log of every live instance
│   │   ├── README.md
│   │   └── 2026-04-12-beta-cross-industry.md
│   └── audience-learnings/         ← cross-cutting synthesis by profession
│       └── README.md
├── module-2/                       ← (not yet written)
├── module-3/                       ← (not yet written)
... and so on through module-8
```

## The per-module pattern

Every module follows the same layout. Three tiers of content.

**Tier 1 — Canonical.** The `run-of-show.md` and `worksheet.md` are the living source of truth for how the module is taught today. The run-of-show is instructor-facing (block-by-block teaching moves, key lines, materials). The worksheet is participant-facing (what attendees read and fill in). Both evolve as the lesson improves.

**Tier 2 — Historical.** The `runs/` folder logs every live instance. One file per cohort, with pre-run context, the plan as executed, cohort-specific decisions, and a retro. This is the evidence base. Anyone proposing a change to the canonical run-of-show should be able to point at runs to justify it.

**Tier 3 — Synthesis.** The `audience-learnings/` folder captures cross-cutting patterns per professional audience (lawyers, accountants, consultants, healthcare workers, etc.). Not a log of runs. A synthesis of what lands for each audience across multiple runs. When a single audience file accumulates enough distinct patterns that the canonical lesson would need meaningful overrides to work for them, that's the trigger to fork the module into a variant — for example, creating a sibling `module-1-accountants/` folder with its own adapted run-of-show, grounded in the audience-learnings evidence.

This is how a generic lesson grows into a family of specialized lessons over time, without losing the generic version and without losing track of where the adaptations came from.

## What's here today

**At the top level:**

- `syllabus.md` — the full 8-hour program structure, all 8 modules, learning objectives, deliverables, pricing. Marketing-adjacent but lives here because it's the source of truth for what the program actually teaches.

**In `module-1/`:**

- `run-of-show.md` — canonical instructor plan (draft v0.1, refined through persona testing and instructor review)
- `worksheet.md` — 4-page participant handout (orientation, matrix, build reference, take-home)
- `pre-class-setup.md`, `demo-prompts.md`, `discussion-questions.md`, `exit-survey.md`, `matrix-visual.md` — reusable teaching artifacts
- `runs/2026-04-12-beta/` — first live run (cross-industry friends beta), with run sheet, personalized starters, prep checklist, and email
- `audience-learnings/` — empty, starts filling in after the first few real runs

## What's missing (to build as the program develops)

- `module-1/instructor-notes.md` — write after 2026-04-12 beta retro. **Target: weekend of 2026-04-18.**
- `module-1/confidentiality-for-regulated-professions.md` — write after 2026-04-12 beta, informed by Zeshawn's real questions. **Target: weekend of 2026-04-18.**
- `module-2/` run-of-show and artifacts — first new module. Can't start until Module 1 is validated by the beta. **Target: weekend of 2026-04-25** if beta goes well.
- Modules 3 through 8 — depends on iteration pace after the beta. No dates yet.
- Shared exercise templates that get referenced across modules, probably in a future `shared/` subfolder — premature until 2-3 modules are built.

## Module prep notes

Notes on things to resolve when building each module's run-of-show.

- **Module 4:** The closer in Module 1 promises "by Hour 4, each of you builds one of these" (a multi-step tool, not just a Project). Current thinking: attendees use Claude Code desktop app to build a real multi-step workflow. This requires a pre-Session-2 setup: download Claude Code + complete a dummy exercise overnight between Session 1 and Session 2, so they arrive ready to build. The overnight exercise serves the same function as Module 1's pre-work (Claude Pro signup) — eat the friction before class, not during. Needs: design the dummy exercise, write the pre-Session-2 setup doc, decide what "build a tool" actually means for non-technical people in Claude Code.
- **Module 5:** The "Identify-Automate-Amplify-Lead" (IAAL) framework is named in the syllabus as the organizing structure for this module, but it's a placeholder name — not yet developed into a full teaching framework. When building the Module 5 run-of-show, decide whether to keep the IAAL name as-is (it's fine for prospects and reads well in the syllabus) or rename it. Either way, the framework needs to be fleshed out with: a clear definition of each stage, examples per stage, a worksheet or scoring rubric, and how it connects back to the process matrix from Module 1. The name ships in the current syllabus — the substance doesn't exist yet.

## Conventions

- One folder per module (`module-1/` through `module-8/`), not flat files
- Canonical files named by function (`run-of-show.md`, `worksheet.md`), not by content
- Historical runs named `YYYY-MM-DD-cohort-descriptor.md`
- Audience-learnings named `audience-name.md`
- Dated files (retros, learnings, one-off observations) belong in `knowledge/learnings/`, not here. This folder is living reference material, not a log of past work.
