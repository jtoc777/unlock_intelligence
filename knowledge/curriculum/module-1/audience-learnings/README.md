# Audience learnings: cross-cutting synthesis by profession

This folder is where patterns for specific professional audiences accumulate as Module 1 gets run for more varied groups.

## What this is

One file per audience. Each file is a living document that accumulates observations across runs where that audience was represented. Not a log of runs (that's `../runs/`). Not generic teaching notes (those live in the run-of-show itself, or in a future `../instructor-notes.md`). Not the canonical plan.

## Naming convention

`audience-name.md` — lowercase, plural where it reads better.

Examples (none exist yet — this folder starts empty and fills in as the module is run for real audiences):

- `lawyers.md`
- `accountants.md`
- `consultants.md`
- `healthcare-workers.md`
- `product-marketers.md`
- `creatives.md`
- `engineers.md`
- `executives.md`

## What each file should capture

- **Language that lands and language that doesn't.** Some audiences hate "process" and love "workflow." Some prefer "playbook" to either. Capture the vocabulary that resonates.
- **Examples that resonate.** The default weekly-status-report example works for knowledge workers. It falls flat for actors. Accountants might need a journal-entry example. Lawyers want case-research examples. Capture what anchors each audience.
- **Pain points that come up repeatedly.** Lawyers raise confidentiality every time. Accountants raise audit trail. Healthcare raises HIPAA. Engineers raise determinism. Capture the pattern after you've seen it twice.
- **Stalls unique to this audience.** Where does this audience get stuck that others don't?
- **Wins unique to this audience.** What makes this audience light up that wouldn't move another audience?
- **Confidentiality and compliance constraints.** What CAN'T they upload? What tools does their IT actually allow? What has to be addressed before they'll engage?
- **Vocabulary mismatches.** The word "agent" means something different to a lawyer (someone authorized to act on your behalf) than to a tech person (an autonomous AI workflow). Catalog these.
- **References to the runs where this audience was represented.** So future instructors and content writers can trace the evidence back to specific cohorts.

## When to spin up a variant

When an audience file accumulates enough distinct patterns that the standard run-of-show would need multiple meaningful overrides to work for them, it's time to fork the module. That probably means:

- Five or more distinct pattern observations that would change the lesson
- Examples that are meaningfully different from the default cross-industry examples
- Compliance or confidentiality treatment specific to the audience
- At least three runs for that audience to have signal, not anecdote

When those conditions are met, create a sibling folder — `knowledge/curriculum/module-1-accountants/` (or equivalent) — fork the canonical `../run-of-show.md` into it, and adapt. The audience-learnings file becomes the justification for the fork, and can continue to accumulate observations specific to that audience after the fork exists.
