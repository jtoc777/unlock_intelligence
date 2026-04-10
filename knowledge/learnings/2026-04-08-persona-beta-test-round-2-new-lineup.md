# Persona beta test — round 2 — new attendee lineup

**Date run:** 2026-04-08
**Reacting to:** The v1 run-of-show (demo first, no framework opener, expanded matrix, deliberate failure moment in the build phase, constraint callout in the closer) with the updated attendee mix for the 2026-04-12 Sunday run at 1 West Superior, Chicago.
**Previous round:** `2026-04-07-persona-beta-test-2026-04-12-demo.md`

Round 2 was run after the round-1 changes had already been baked into the canonical run-of-show. The goal wasn't to discover new structural changes — it was to pressure-test v1 against a different audience mix and see which v1 changes held up.

## The six personas I ran

Five simulated attendees plus one remote voice. None of these are the real people attending Sunday — they're stand-ins for the approximate archetypes the real attendees represent.

| Round-2 persona | Approximates real attendee | Notes |
|---|---|---|
| Jordan (actor, in career transition, **remote — not attending**) | Jordan (real friend, real-world actor considering a career change, really not attending) | Same person, same situation. Jordan asked for feedback even though he isn't coming. |
| Priya (ex-Big 3 strategy consultant, cultural sector) | Jess Nickelman (AEA Consulting) | Both strategy consultants. Jess is ex-L.E.K. and works in the cultural sector; Priya was modeled as cross-industry boutique strategy. Close but not identical. |
| Alex (AI-fluent product marketer) | Thomas "Tommy" Nathan (Housecall Pro) | Both senior PMMs. The real Tommy works in home-services vertical SaaS, which is a specific wrinkle — Alex's generic PMM framing probably underestimates how different the "tradesperson buyer" market is. |
| Raj (GC at a SaaS company) | Zeshawn Qadir (cannabis MSO, ex-Polsinelli PE M&A) | Both senior lawyers. Raj was modeled as an in-house SaaS GC; Zeshawn is a corporate PE-M&A attorney recently moved in-house at a cannabis company. The "confidentiality as deal-killer" critique is shared, but Zeshawn's real focus is closer to deal diligence than to contract review. |
| Mira (founder-wanna-be, still employed) | Alan (actively running a consulting firm + app startups) | Imperfect match. Mira was "thinking about quitting"; Alan has already quit and is doing two things at once. His starter needed to be retuned from "should I quit?" to "which of my projects should I kill so I can focus." |
| Kasey (mid-market B2B AE) | Bill McCue (Workday enterprise AE) | Both sales. Bill is enterprise ($1M–$10M+ deals, 18–24 month cycles), Kasey was modeled as mid-market. The enterprise variant changes the starter — more depth per account, different stakeholder shape — but the core "account research + discovery prep" frame still applies. |

None of these are pixel-perfect matches. What matters is that the archetypes are close enough that the directional feedback holds.

## What round 2 actually validated

### The deliberate failure-and-recovery moment is the single strongest element

Five of six personas named "catching Claude hallucinate and teaching into it" as the most trust-building move in the lesson. This was the v1 addition the first round suggested. It's working even harder than predicted.

> "The most trust-building move you made all day." — Alex
> "The most honest thing in the whole workshop." — Mira
> "The 'verification' line in the starter isn't a footnote anymore — it's the whole game." — Kasey
> "Most vendors bury that conversation. You surfaced it. I trust you more because of it." — Raj
> "A machine gave me an actable choice. I'm still a little freaked out about it." — Mira (reacting to her starter's output specifically)

**Implication:** protect this beat at all costs. If something has to get cut for time, do not cut this.

### The personalized annotated starters are still the #1 asset (6 of 6 named it)

Same signal as round 1. The "WHY THIS WORKS" annotation block is what separates this workshop from prompting content on Twitter.

> "You're teaching AI the way good writing teachers teach writing: artifact-first, annotation-driven, horizontal not vertical. That's genuinely differentiated." — Alex
> "The custom starter plus annotation block is the whole thing. That's the asset." — Sam (round 1) / Raj (round 2) — both said it.

### Leading with the demo (not the framework) held up

Round 1's "invert the opening" recommendation landed. None of the round-2 personas complained about the opening structure. The bad-prompt/good-prompt cut stayed cut. v1 change validated.

## What round 2 surfaced that round 1 didn't

### Alex caught the dummy account as accidental demo theater

Nobody in round 1 flagged this. Alex (round 2) did, sharply:

> "'Her laptop doesn't allow OAuth so I texted him her meetings' — Shubham, come on. Half this room just learned that the magic requires a workaround their IT will never approve. You're selling a Ferrari and the test drive is in a parking lot."

This is important because the dummy account was celebrated in round 1 as "the single best move of the hour." Alex isn't saying the pattern is wrong — she's saying **the framing is wrong**. The more you explain the dummy as a workaround, the more you accidentally signal "this won't work at your company." The fix is to stop narrating the workaround and just treat the dummy as a clean demo environment. The beta run file at `../curriculum/module-1/runs/2026-04-12-beta-cross-industry.md` has been updated with this nuance.

### The closer has unintended side effects for observers

In round 1, the closer was broadly loved. In round 2, it split.

- **Kasey (the subject of the closer)** — "That competitive intel thing you ran on my actual account at the end? That's the moment I stopped being skeptical."
- **Priya (observer)** — "The Block 7 closer with the six-step competitive scraper was impressive but it almost undercut you — for a split second I thought 'wait, is what I just built the kiddie version?'"
- **Jordan (remote)** — "The closer is a flex, not a promise. It lands for the salesperson in the room. For anyone watching who doesn't have 'an account they're trying to close,' it's a magic trick you're not invited to learn. It made me feel smaller, not bigger."

Fix: strengthen the "this is literally Hour 4 of the program — you will build one of these in session 2" bridge. Don't let the scraper feel like the instructor's special toy. Make it feel like what each attendee is about to become capable of.

### Maintenance and cadence are missing

Two personas (Priya and Mira) flagged that the lesson teaches how to build a Project but not how to keep it useful over time.

> "I want a clearer answer on maintenance. You showed me how to build it. You didn't show me what happens in week 3 when Claude's tool behavior shifts, or when my template stops matching my engagement mix. Teach me the upkeep loop." — Priya
> "What's the loop? Do I run it weekly? Do I feed it the experiment results? When does it stop being useful?" — Mira

The fix isn't a whole new block. It's 60 seconds at the end of the debrief that names the cadence explicitly: "here's how you keep this tool useful in week 3." Could be a 2-line addition to the closer or debrief transition.

### Task vs decision use cases

Mira made a distinction that nobody in round 1 raised:

> "The demo was a consultant prepping for meetings. Cool, legible, safe. But the people in that room who are in transition — starting something, changing something, betting something — we needed one example of someone using these primitives on a decision, not a task. The starter saved you, but the demo didn't set it up."

The workshop teaches tool-building for recurring workflows (tasks). Mira's point is that some attendees have one-time high-stakes decisions, not recurring tasks, and the workshop doesn't have a clean pattern for those. Her starter was "Idea Validation" and it worked for her use case, but the demo (consultant prepping for meetings) was a task-class example and didn't show someone using Claude on a decision-class problem.

For the 2026-04-12 Sunday run, this mostly affects Alan — his kill-list starter is decision-flavored, and the demo is task-flavored. The starter does the heavy lifting, but the disconnect is worth knowing about.

### Jordan's absent-person insight

Jordan's the most interesting voice in the batch because he's the only one reading the plan with distance — he isn't attending, so he's evaluating it purely as an outside observer.

> "This is really good and I felt completely outside of it."
> "Every single example assumes the person has a job they like and a calendar full of meetings that matter. I read it and thought — what if my 'real task I brought' is updating my resume for the first time in a decade and I don't even know what industry I'm applying to? There's no door in this room for me."
> "Shubham — you built a workshop for the person you used to be at Digital Realty, not the person you actually are now. The people who need you most right now aren't the ones with a Friday calendar. Make a door for us."

This doesn't change the 2026-04-12 plan — everyone actually attending is currently employed and optimizing. It matters for future cohorts and for how the program is positioned. "Who is this for, who isn't it for yet" is a marketing question the workshop needs to answer, eventually.

## Standout quotes from round 2

> "Annoyingly good, actually." — Raj (after his full skeptical debrief)
> "You're teaching AI the way good writing teachers teach writing: artifact-first, annotation-driven, horizontal not vertical." — Alex
> "I'd come to hour 4." — Alex
> "That competitive intel thing you ran on my actual account at the end? That's the moment I stopped being skeptical." — Kasey
> "A machine gave me an actable choice. I'm still a little freaked out about it." — Mira
> "You're not solving my problem, you're solving a harder one. And as far as I can tell on one session, you actually are." — Sam (round 1, echoed by Raj in round 2)
> "Make a door for us." — Jordan

## What to change for the 2026-04-12 run (implications for the beta file)

Ranked by signal strength:

1. **Reframe the dummy account.** Don't sell it as a workaround to the room. Treat it as a clean demo environment. Internal reference for Shubham — external explanation for attendees should skip the "her laptop doesn't allow OAuth" narration.
2. **Tighten the closer bridge.** The "this is Hour 4, you'll build one in session 2" framing needs to land hard enough to prevent the "kiddie version" read. Practice the exact wording.
3. **Add a 2-minute cadence moment.** At the end of the debrief or the closer, explicitly name how attendees keep their Projects useful in week 3. Doesn't need to be a whole block.
4. **Keep the deliberate failure moment.** Validated harder in round 2 than in round 1. Five of six named it.
5. **Build the confidentiality one-pager (still pending).** Round 1 raised it, round 2 confirmed it through Raj. For Zeshawn specifically, the beta file now includes a confidentiality note in his starter, but a standalone one-pager would be higher trust.

Full round-2 implementation details already live in the beta run file at `../curriculum/module-1/runs/2026-04-12-beta-cross-industry.md`.

## Caveats

- These are synthetic personas. The round-2 set is an approximation of the real Sunday attendees, not a match. The directional signal is useful; the specific quotes are not evidence about the real people.
- Running round 2 after round 1's changes had already been applied means this round was a confirmation pass, not a discovery pass. That's by design — we didn't need more structural critique, we needed to validate the structural changes.
- Jordan is the only round-2 persona who is also the real-world person. His reaction is the only one in this set that's grounded in an actual human voice, and even that is filtered through a fictional prompt describing the workshop.
- Do not treat persona consensus as consensus among real people. Three personas saying the same thing is weak signal on its own — the value is in catching obvious misses before the expensive real run.

## Related files

- Round 1: `2026-04-07-persona-beta-test-2026-04-12-demo.md`
- Beta run sheet: `../curriculum/module-1/runs/2026-04-12-beta-cross-industry.md`
- Persona library: `../personas/2026-04-12-demo-personas.md`
