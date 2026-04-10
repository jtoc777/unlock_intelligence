# Persona beta test: 2026-04-12 demo

2026-04-07. I ran five synthetic personas through the full 75-minute Module 1 plan and asked what they'd actually say about it.

## What this is

The plan sits at `knowledge/curriculum/module-1/runs/2026-04-12-beta-cross-industry.md` (it was in `~/.claude/plans/drifting-mixing-perlis.md` at the time of the test, and has since been promoted into the repository). I gave it to five parallel persona agents, each briefed as a character — who they are, what they care about, what would lose them, how they talk. Each one read a beat-by-beat walkthrough of the workshop and wrote a reaction plus a debrief. The five:

- Maya, 35, commercial litigator. Skeptical. Got burned once by ChatGPT hallucinating case citations and never went back.
- Jordan, 32, working actor. Warm, craft-focused, pretty sure this workshop is going to be for everyone else at the table.
- Priya, 34, boutique strategy consultant. The designated live-demo volunteer.
- Alex, 31, senior product marketer. Uses AI daily. Hardest person at the table to impress on prompting.
- Sam, 36, founder and former staff engineer. Technical. Stand-in for the real 5th attendee, who we haven't picked yet.

This isn't the real Saturday run. It's a cheaper test that's supposed to catch things the real run would catch at a much higher cost.

## The loudest signals

### Beat 2 is where the workshop almost dies

Four of the five personas flagged the same thing. The bad-prompt-vs-good-prompt verbal contrast in Beat 2 is 2023-era content. Everyone in the room has already seen it. It eats the most expensive five minutes of attention in the entire session.

> "Everyone in the room has done that exercise on Twitter. Cut it or compress it to 60 seconds. You're burning your best five minutes of attention on something we already know." (Priya)

> "It made the first five minutes feel like a 2023 webinar and I almost checked out before the demo saved you." (Alex)

> "2023 YouTube filler. I checked out for about 90 seconds." (Sam)

> "I'd cut the jargon." (Maya)

The move is to cut it or compress it to under 30 seconds. Whatever time that frees up, spend it on the matrix below.

### The matrix is the best thing in the workshop, and it gets three minutes

Three personas said the 5-component matrix (People / Tools / Trainings / Guardrails / Metrics) is the strongest original idea in the plan. They also said it's buried.

> "Flew by in three minutes and deserved ten. That's the actual product. Don't bury it." (Maya)

> "I want ten minutes. I want to see the before row for three different roles side-by-side so the horizontal thesis lands structurally, not just emotionally. Right now it's a slide. It should be the backbone." (Alex)

> "Guardrails and metrics are where every real AI rollout actually dies. Embedding the failure modes into the framework is the one slide I'd photograph." (Sam)

Give it 5 to 8 minutes. Map the volunteer's workflow across the 5 columns while the demo is running, not after. Try showing two attendees' "before" rows side-by-side so the cross-industry point lands visually instead of as an assertion.

### Nothing failed, and that's the problem

Three personas independently said that every output in the walkthrough worked flawlessly, which made the whole thing feel like a sales demo instead of a training. They want to see Claude fail. More importantly, they want to see the recovery.

> "Show one failure case. Right now it feels like a sales demo; one honest failure would make it a training." (Priya)

> "Non-technical people need to see the failure and see you recover. That's how they build calibrated trust instead of blind trust, and blind trust is the thing that'll get them fired." (Sam)

Bake in one deliberate failure moment. Two options. Claude fabricates a news item during the live demo and Shubham catches it and reruns with tighter constraints. Or a Build-phase attendee's first run is mediocre and Shubham publicly diagnoses it as the teaching moment. The first is more dramatic. The second is more honest.

### The opening is backwards

Three personas said the same structural thing: lead with the live demo, not the framework.

> "Open cold with the live demo. No framework, no bad/good prompt. Sit the consultant down, run the calendar prep, let the room feel the 'oh', then pull back and say 'here's the framework that made that possible.' You're burying your lede by eight minutes. Marketing 101, and you know it." (Alex)

> "Move the closer to minute 10. Lead with the hour 4 vision, then teach hour 1. I spent the first fifteen minutes wondering if this was worth my Saturday." (Maya)

> "The framework section almost lost me before the demo saved you." (Priya)

Invert it. Current order: Welcome → Framework → Verbal opener → Live demo → Matrix → Build → Show → Closer. Better order: Welcome → Live demo → Matrix (expanded) → Build → Show → Closer. It's worth also previewing the closer scraper in the opening minutes so the "hour 4" vision lands early instead of as a reveal.

### Confidentiality is a deal-killer for regulated professions

Only Maya raised this, but she raised it as the single biggest gap in the workshop.

> "You had me ready to trust the tool and then left the single biggest blocker for my profession unaddressed. I still cannot upload a pleading to this thing on Monday and you did not tell me how to think about that. That's the gap." (Maya)

> "Build that one-pager and my answer becomes an unqualified yes."

Write a one-page "Confidentiality for regulated professions" doc. It should cover Claude's data policy, what "don't train on my data" actually means in writing, the difference between Pro and Enterprise tiers, and a yes/no answer on client files with the conditions attached. Reference it during the Build phase when Maya gets to her Project. It's also a forwardable artifact for every future cohort that has someone in law, healthcare, or finance who has to justify the tool to their compliance team.

## What's working (protect these)

### The annotated personalized starters

Three personas named this as the single strongest move in the workshop. It isn't "custom prompts." It's prompts that come with a "WHY THIS WORKS" annotation block next to them, so attendees learn the craft by reverse-engineering an example built for their exact world.

> "That's your actual IP. Nobody else is teaching prompting by handing people a finished artifact and decomposing why every line is there. That's how writing is taught at good MFAs." (Alex)

> "The custom starter plus annotation block is the whole thing. That's the asset. Everything else is scaffolding around that. If you cut half the workshop and doubled down on build-phase time, it would be better." (Sam)

If something has to get cut for time, cut from anywhere else.

### The dummy Google account

Three personas said they were going to steal this trick for their own demos. It solves a real problem (locked-down work laptops, OAuth friction, privacy concerns) elegantly, and it works as a reusable pattern for every future cohort demo.

> "The single best move of the hour." (Alex)

> "I'm stealing this." (Sam)

Keep it as the default path, not a fallback.

### The competitive-intel scraper closer

Broadly loved. One technical caveat from Sam:

> "I'd push back on whether the scraper is actually generalizable, or whether you just picked Maya because you knew her firm had a public competitor to scrape. Name the constraint out loud: 'this works when the competitor has a public site; here's what we'd do if they didn't.' That de-risks it."

One sentence named out loud during the demo closes the risk. It takes ten seconds.

## The judgment call

Jordan suggested swapping the demo volunteer from the consultant to the actor. The current plan picks Priya as the "easy case" to reduce demo risk. Jordan's case for flipping it:

> "Swap the order. Do MY demo first. Open with the audition prep. Watch every business person in that room lean forward going 'wait, if it can do THAT for her, what can it do for me.' You'd hook the creatives AND the suits in the same move. Right now you're hooking the suits and hoping the creative hangs on."

Sam agreed from the observer seat. The emotional peak of the whole simulated workshop for him was watching Jordan read Claude's audition notes out loud.

This is a real trade-off. The easy case gives you a demo that works for sure. The hard case, if it works, makes the universality argument land forty minutes earlier than it does in the current plan. I don't know which is right. Shubham's the only one who can judge whether the risk is worth the lift.

## Quotes worth keeping

From the simulation, the lines I'd hold onto:

> "Annoyingly good, actually." (Maya, after her full skeptical debrief)

> "A machine gave me an actable choice. I'm still a little freaked out about it." (Jordan)

> "Once I saw 6 steps chained, I stopped thinking 'cute workshop' and started thinking 'what would I pay for this.'" (Priya)

> "You're teaching AI the way good writing teachers teach writing: artifact-first, annotation-driven, horizontal not vertical." (Alex)

> "Trust the artifact. Trust the annotations. Trust us." (Alex)

> "I'd come to hour 4." (Alex)

> "You're not solving my problem, you're solving a harder one. And as far as I can tell on one session, you actually are." (Sam)

## Ranked action list

1. Compress or cut the bad-prompt/good-prompt contrast in Beat 2. Four personas flagged. Trivial effort.
2. Expand the matrix beat to 5 to 8 minutes. Map the volunteer's workflow across it during the demo. Three personas. Low effort.
3. Add one deliberate failure and recovery. Three personas. Medium effort.
4. Invert the opening so the live demo comes before the framework. Three personas. Low effort, pure reorder.
5. Write the one-page confidentiality doc for regulated professions. One persona but deal-killer severity. Medium effort.
6. Decide whether to swap the demo volunteer from the consultant to the actor. Judgment call. No effort either way, just a decision.
7. Add one sentence to the scraper closer naming its constraint. One persona. Trivial.
8. Have the volunteer circle on paper what she'd actually use on Monday. One persona. Trivial, and it gives you a photographable testimonial artifact.

## Caveats

These are synthetic personas, not the real attendees. The feedback is educated guesses, not ground truth. The fact that parallel agents converge on similar points is a weak signal on its own. The items worth taking seriously are the ones where three or more personas independently raised the same point, and those are the five listed at the top.

The Sam persona is a stand-in. If the real 5th attendee isn't technical, that persona's feedback is less representative and the simulation should be rerun for the actual person.

The exception to that rule is Maya's confidentiality gap. She's one voice out of five, but the gap is specific, it names a concrete artifact she could forward to her own compliance team, and it's the kind of thing that stays invisible until someone in a regulated profession actually says it out loud. Every future cohort with a lawyer, a doctor, or an analyst in the room will surface the same question. Worth building the one-pager now and having it ready.

## Files

- Beta run sheet (the object these personas reacted to): `knowledge/curriculum/module-1/runs/2026-04-12-beta-cross-industry.md`
- Canonical Module 1 run of show: `knowledge/curriculum/module-1/run-of-show.md`
- Module 1 participant worksheet: `knowledge/curriculum/module-1/worksheet.md`
- Program syllabus: `knowledge/curriculum/syllabus.md`
- Structured persona library (companion file): `knowledge/personas/2026-04-12-demo-personas.md`
