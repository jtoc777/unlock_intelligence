# 2026-04-12 — First live run of Module 1 (cross-industry friends beta)

**Status:** Pre-run. Retro section (bottom of file) gets filled in Sunday evening after the run.
**Date:** Sunday 2026-04-12, 10:30am – 11:45am CT
**Venue:** 1 West Superior, Chicago IL
**Canonical reference:** `../run-of-show.md`
**Round 1 persona test:** `/knowledge/learnings/2026-04-07-persona-beta-test-2026-04-12-demo.md`
**Round 2 persona test:** `/knowledge/learnings/2026-04-08-persona-beta-test-round-2-new-lineup.md`

This is the first-ever live run of Module 1. It ships the **v1 structure** (demo first, no framework opener, expanded matrix, deliberate failure moment in the build phase, constraint callout in the closer) based on two rounds of synthetic persona testing. Everything Sunday-specific — the five attendees, the venue, the dates — becomes retro notes after the run.

---

## Cohort context

Five friends across industries, all mid-career. Plus Jordan (actor in career transition, not attending but receiving feedback remotely).

| Attendee | Role | Notes |
|---|---|---|
| **Zeshawn Qadir** | General Counsel at a multi-state cannabis operator (~$3B mcap) | Chicago-based. Ex-Polsinelli Private Equity M&A Shareholder (~10 years at the firm). Joined the GC role ~1 month ago. This is his first in-house corporate job. Strong M&A framework from Big Law, but at Polsinelli the investment bankers ran the diligence tooling for him — he's never had to build his own scaffolding. |
| **Alan** | Founder — AI consulting firm + solo app-based startups | Actively running both at once. Fragmented. Classic founder problem: needs focus, not more ideas. |
| **Thomas "Tommy" Nathan** | Product Marketer at Housecall Pro | Vertical SaaS for home service businesses (HVAC, plumbing, electrical, cleaning). Permira-owned. Tommy's buyer is a plumber or HVAC contractor running a small business — "main street SMB," not a tech buyer. Competes with Jobber, ServiceTitan, FieldEdge, Workiz. |
| **Jess Nickelman** | Strategy Consultant at AEA Consulting | Rare combination: ex-L.E.K. Consulting (tier-one strategy rigor) plus first-hand venue management experience at the Podlasie Club in Chicago. AEA is a global cultural-sector strategy firm (museums, performing arts centers, cultural districts). She brings both the analytical frame and the felt knowledge of actually running a cultural space. |
| **Bill McCue** | Senior Account Executive at Workday | Enterprise HCM/Financials SaaS. Deals $1M–$10M+, 18–24 month cycles, heavy research burden per account. |

**Format:** In-person at 1 West Superior, Chicago. Everyone brings a laptop with Claude Pro.
**Pre-work:** 3 items from `../../pre-class-setup.md` — Claude Pro signup, bookmark the shared Google Doc, think of one recurring task worth killing.
**Conversion goal:** Validate the lesson format. Testimonials are promised already. The real test is whether these five walk out genuinely thinking it was worth their Sunday morning.

---

## What v1 changed from v0

The run ships the changes surfaced across two rounds of persona testing:

1. **Cut the "plant framework + bad-prompt/good-prompt" verbal opener entirely.** Four of five round-1 personas flagged it as 2023-era YouTube filler.
2. **Lead with the live demo**, not the framework.
3. **Matrix expanded from ~3 to ~6–8 min**, mapped during or just after the demo instead of standalone.
4. **Deliberate failure-and-recovery moment** baked into the build phase. Five of six round-2 personas named this as the strongest trust-building move in the lesson. Not negotiable.
5. **Closer scraper names its constraint out loud** ("this works when the target has a public web presence, here's what we'd do if they didn't").

---

## Run sheet — 8 beats, ~75 minutes

> Rough durations. Read the room, follow the energy, adapt. The one hard constraint: start Block 7 (closer) with at least 10 minutes left in the room.

### 1. Welcome + frame (~3 min)

Name each person by first name, name each industry, joke about the spread (GC, founder, PMM, cultural-sector consultant, enterprise SaaS AE — this is a dinner party crowd, not a business audience). Set the expectation:

> *"By the end of today, each of you walks out with a Claude Project that's reading your real files and doing actual work for you. Not prompts. Tools. You're the first 5 people to ever sit through this — I want your honest feedback at the end."*

### 2. ★ Live volunteer demo on real meeting data (~15 min)

**Volunteer: Jess.** Her work is research-heavy and obviously knowledge-work shaped, which makes her the "easy case" for the demo. Her cultural-sector focus also shows the demo generalizing beyond typical B2B examples, which is a nice side benefit for the room.

Three phases: setup → run → react/bridge. Detailed breakdown below. Lock the demo path with Jess by Wednesday via text (dummy account pre-loaded with her 3 real meetings, or live OAuth if her work laptop allows it).

### 3. The 5-component matrix (~6–8 min)

Show the matrix visual. Map Jess's task across People / Tools / Trainings / Guardrails / Metrics — before and after. Verbal, fast. Tie to the horizontal frame:

> *"Most AI training picks a person and gives them a tool — 'how do I get my people to use AI?' We just rebuilt the whole row. The horizontal question is: which of my processes should I redesign?"*

Give it real time. If the demo runs fast, the matrix gets 8 minutes. If the demo runs long, 5 minutes is the floor. Don't let it shrink below that — the persona tests flagged it as underinvested even at 6 minutes.

### 4. UI walkthrough (~60 sec)

Screen-share Claude on the projector, walk through it once: "Click Projects, click New Project, paste here, drop files here." Eat the navigation friction once for everyone.

### 5. ★ Build phase — each person personalizes their starter (~25–30 min)

Direct them to the shared Google Doc. Each attendee finds a Claude Project starter built for them personally, with a "WHY THIS WORKS" annotation block underneath. Say aloud:

> *"Here's an example I built for you and here's why it's good. Paste it in and personalize it, or write your own using this as a model. Either way, the structure is the lesson. File upload is optional — paste a paragraph of context instead if you can't share a file."*

**Circulate order:** Zeshawn first (new industry, new role, highest uncertainty, most confidentiality-sensitive), Alan second (fragmented founder — his starter is a kill-list, which requires honest self-reporting), then Tommy, Jess, Bill. Hard cases get the most 1:1 attention.

**Deliberate failure moment (don't skip):** Somewhere in this block, surface a real Claude failure and catch it publicly. Either naturally (it'll happen — narrate when it does) or deliberately (ask Claude something just outside its confidence and let it fabricate, then show the fix). Say aloud:

> *"See that? It just fabricated that number. Watch how I fix it."*

Tighten the instructions, rerun, show the corrected output. Five of six round-2 personas named this as the single most trust-building moment of the whole lesson. It's what separates "sales demo" from "training."

Around the 5-minute-left mark: *"Don't sweat it if you're not done — I'll help anyone stalled in the 15 minutes after we wrap."*

### 6. Show-and-tell (~7–10 min)

Quick tour around the table. Each person shows their Project's output on the projector. Default 90 sec each; drop to 60 sec if you're over time.

### 7. ★ Closer — competitive intel scraper on Bill's real account (~7 min)

**Target: Bill's real prospect.** Three reasons he's the right closer subject:

- His job is literally enterprise account research — the scraper does exactly what he needs
- He'll get the biggest "I could use this Monday" reaction, which makes the closer land for the whole room
- He's the attendee whose work most directly maps to the scraper's output shape

Three phases: bridge → run → connect. Detailed breakdown below.

**Watch-out from round 2:** Priya (consultant persona) flagged that the closer can accidentally undercut what attendees just built — "is what I built the kiddie version?" Tighten the "this is Hour 4 of the full program, you'll build one of these in session 2" bridge to prevent that read. Jordan (actor persona) flagged that the closer can feel isolating for attendees who don't have "an account to close." Mitigation: name that the scraper pattern generalizes (Tommy could run one on competitor press, Zeshawn on diligence targets, Jess on peer institutions) so nobody feels "not invited."

### 8. Honest debrief + exit survey (~7–8 min)

Two parts:

- **Live round-table (~5 min):** Three questions from `../../discussion-questions.md`. Ask in order Q2 → Q1 → Q3 (emotional → behavioral → social). Take visible handwritten notes. Don't defend anything.
- **Exit survey (~3 min):** Hand out the paper survey from `../../exit-survey.md`. Say: *"Last thing. Five minutes. No names. Please fill it out before you leave — if you take it home, you won't."* Envelope at the door.

---

## The 5 personalized starters

**Extracted to:** `starters.md` (same folder)

On Saturday, copy the starters from that file into the shared Google Doc with each attendee's real name as the section heading.

---

## ★ Volunteer demo — three phases (the headline beat)

### Phase A — Setup

Jess at the projector with her laptop mirrored. If dummy-account path (likely), open the pre-loaded account with her 3 real meetings already in the Calendar. If live-OAuth path, walk her through Claude → Settings → Connectors → Google Calendar → Authorize.

Calming line during any load time: *"Claude doesn't store your data — it reads it when you ask, then forgets."*

### Phase B — Run the demo

Frame in one sentence: *"I'm going to ask Claude to do something it would take you 30 minutes to do by hand on a Sunday night. Watch what it DOES, not just what it says."*

Paste the pre-written Option D prompt (below). Hit send.

Claude pulls her calendar, hits the web for each meeting attendee/organization, synthesizes prep notes. **Narrate as it works.** Don't just stare:

> *"See what it just did? It just looked at her real calendar."*
>
> *"Now it's going OUT to the web for each person she's meeting with. Three different searches in a row. She didn't write code. She wrote an instruction."*

Drop the 30-second theory beat mid-run:

> *"Same Claude. Same model you all have on your laptops. The first prompt I showed you asked it to predict the most likely next words. This one gave it a job, real data, and a goal. That's the entire difference."*

### Phase C — React + bridge

Read the output. Pause. **Look at Jess. Capture her reaction.** The room's eyes follow her face.

If she doesn't react out loud, ask: *"Would you actually use this before your next client call?"*

Bridge to build:

> *"What you just watched took six minutes to run but ninety seconds to build. The instruction was four sentences. Now turn to your laptops — I have one of these waiting for each of you."*

---

## The work-laptop problem + dummy account pattern

Many professionals can't authorize Claude on their work laptop — locked-down devices, IT policies, privacy concerns. This will keep coming up. The recurring solution: build a dummy Google account ahead of time. Ask the volunteer for 3 real meeting names + people + organizations. Pre-populate the dummy's Calendar with those exact meetings. On the day, the demo runs on the dummy account — but the data on the projector is the volunteer's real meetings.

**Important nuance from round-2 personas (Alex flagged this):** Don't frame the dummy account to the room as "a workaround because her laptop doesn't allow OAuth." That accidentally signals "this won't work at your company." Treat it as a clean demo environment. Save any "here's how this works on your real calendar" talk for later in the lesson when trust is higher.

---

## Pre-written demo prompts

**Extracted to:** `../../demo-prompts.md`. Open this in a browser tab on Sunday — Plans A/B/C for the volunteer demo and the closer script.

---

## ★ Closer demo — three phases

### Phase A — Bridge

*"What each of you just built is ONE Project doing ONE task. That's Hour 1 of the full program. Let me show you what Hour 4 looks like — and this is something I actually built and use every Monday at Digital Realty, not a prop."*

### Phase B — Set up + run the scraper

Open the scraper (pre-loaded in a tab). Turn to **Bill**:

> *"Bill — name a real account you're trying to close. One where the company has a public web presence."*

He names it. Type it in. *"This is a tool I built that I run every Monday morning. I'm pointing it at [account] right now."*

Narrate the 6 autonomous steps (site → press → LinkedIn → news → synthesis → brief). When it finishes: *"This is what I used to spend two hours doing on a Monday morning. It takes ninety seconds now."*

**Name the constraint out loud:** *"This works when the target has a public web presence. For a stealth startup or a private company with no press, you'd build a different version that leans on peer-company research or interview prep instead."*

### Phase C — Connect to the program (no pitch)

*"What you just watched is THE SAME primitives you built thirty minutes ago. Custom instructions, structured prompts, real data, multi-step. The only difference is I chained six steps instead of one. The full 8-hour program is exactly that — teaching you to chain steps for your own work. Hour 4 is everyone in the cohort building one of THESE for themselves. Hours 5–8 connect them to your team's systems. That's all I'll say about the program for now — questions later."*

Pivot straight into the debrief.

**Backup option:** If the scraper doesn't run cleanly on Bill's real account in the Saturday dry-run, swap in a different target — Tommy's competitor, Jess's peer institution, or a DLR-specific workflow.

---

## Pre-work email

**Extracted to:** `email.md` (same folder). Copy-paste into Gmail. The attached 1-pager is `../../pre-class-setup.md`.

---

## To-do list

**Canonical to-do list is at `todo.md` (same folder).** This section was the original to-do but is now superseded. Use `todo.md` for all prep tracking.

---

## Stall absorbers baked into the build phase

| Mechanism | What it absorbs |
|---|---|
| 5 personalized annotated starters (drafted above) | Blank-page paralysis. Cuts per-person build time by ~60%. |
| 60-second UI walkthrough on the projector | First-timer confusion with Claude Projects UI |
| Show-and-tell flexible 60–90 sec each | Buffer if the build runs long |
| "File upload is optional" said aloud | Confidentiality freeze (Zeshawn especially) — paste a paragraph of context instead |
| "I'll help anyone stalled in the 15 min after we wrap" said aloud | Performance anxiety |

---

## Risks and what to watch for

- **Connector authorization fails on the projector.** The dummy-account path eliminates this. Have the dummy ready even if you're planning live OAuth.
- **Build phase runs long.** Cut show-and-tell to 60 sec; offer post-wrap stay-after for anyone unfinished.
- **Zeshawn confidentiality freeze.** He's 1 month into a GC role at a cannabis company. He will not upload real documents, and his starter explicitly acknowledges this. Be ready to talk to Claude's data policy verbally if he pushes.
- **Alan's projects are in flux.** His kill-list starter works only if he brings real data about where his time is actually going. If he brings vague "I have a few ideas" framing, push him to be specific when you circulate.
- **Bill's account might not scrape well.** Fallback: if the scraper doesn't produce a clean brief on his real account in the Saturday dry-run, pick a different attendee's closer target (Tommy's competitor, Jess's peer institution).
- **The matrix is still the weakest block.** Two rounds of personas agreed. Accept it's imperfect this cohort. Watch the real-room reaction carefully and fix for v2 after the retro.
- **Dummy account framing risk.** Alex-persona flagged that framing the dummy as a "workaround because her laptop doesn't allow OAuth" accidentally signals "this won't work at your company." Don't describe it that way to the room. Treat it as a clean demo environment.
- **Closer undercut risk.** Priya-persona flagged that the scraper closer can accidentally make the attendees' Projects feel like "the kiddie version." Tighten the "this is Hour 4, you'll build one in session 2" bridge.

---

## Persona beta test results (two rounds)

Two rounds of synthetic persona testing informed this plan:

**Round 1 — 2026-04-07.** Five personas (Maya litigator, Jordan actor, Priya consultant, Alex PMM, Sam founder) reacted to v0 structure. Key findings: cut bad-prompt/good-prompt contrast (4/5), expand matrix (3/5), add deliberate failure moment (3/5), lead with the demo (3/5), confidentiality gap for regulated professions (1/5, critical severity). These became the v1 changes above.

**Round 2 — 2026-04-08.** Six personas (Jordan actor-in-transition remote, Priya consultant, Alex PMM, Raj GC, Mira founder-wanna-be, Kasey salesperson) reacted to v1 with a new attendee mix. Validated the deliberate failure moment as the strongest single element (5/6). Surfaced new issues: dummy account framing as accidental demo theater, closer undercutting the build for observers, maintenance/cadence gap, task-vs-decision use case gap, the "transition user with no door" problem from Jordan.

Full findings:

- `/knowledge/learnings/2026-04-07-persona-beta-test-2026-04-12-demo.md`
- `/knowledge/learnings/2026-04-08-persona-beta-test-round-2-new-lineup.md`

---

## Retro (fill in Sunday evening 4/12)

*To be written Sunday evening 2026-04-12. Cover:*

- *What worked (specific moments, not generalities)*
- *What didn't (specific moments)*
- *Where I checked out as an instructor — where I felt myself wanting to change course live*
- *What surprised me about the attendees' reactions*
- *What the exit surveys said (summary + standout quotes)*
- *What the discussion questions surfaced*
- *What to promote to the canonical `run-of-show.md`*
- *What stays cohort-specific*
- *Whether the v1 changes landed the way the personas predicted*
- *Which attendee was most impressed, which was least, and why*
- *Anything Jordan (absent) said when I shared the recap*
