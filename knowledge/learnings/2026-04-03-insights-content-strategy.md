# Insights Content Strategy — Session Learnings

**Date:** 2026-04-03
**Context:** Designed and built the /insights section with 5 McKinsey-style articles.

## Key Decisions

### Format: McKinsey "Insights," not a blog
- Shubham's preference is McKinsey-style: data-led, structured for skimming, executive-friendly, zero fluff
- Called "Insights" not "Blog" — matches the brand positioning and avoids content-marketing connotations
- No dates on articles (evergreen content — dates create staleness)
- No author bios on articles (credential is established on landing page)

### Voice is observation-first, data-supported
- Articles lead with Shubham's firsthand observations, not statistics
- Stats validate observations, they don't drive them
- Specific language over generic: "LinkedIn Learning feels like 90s onboarding videos" not "self-paced platforms have low engagement"
- VP forwarding test: every article must be something an HR Director would email to their CFO without embarrassment

### The 5 articles form a buyer journey funnel
1. "Your AI Training Budget Is a Line Item, Not a Strategy" — Awareness
2. "Stop Teaching People to Prompt. Teach Them to Build." — Evaluation
3. "Why AI Adoption Dies in Three Weeks" — Evaluation
4. "The Same Mistake Everyone Makes With AI" — Awareness (broadest, most shareable)
5. "What Do You Hate, Why Do You Hate It, and Who Do You Wish Could Do It?" — Justification

## Shubham's Unique Insights (extracted via grill-me interview)

These are the firsthand observations that make the articles unfakeable:

1. **Wrong mental model:** Students and enterprise teams both treat AI like Google search — accept surface-level first output, never give context. The fix isn't better prompting, it's reframing what AI is.

2. **The real unlock is BUILDING, not prompting:** Non-technical people can build custom GPTs and automated workflows. The "I made that" ownership moment is when skeptics convert.

3. **Adoption dies in 3 weeks:** Hype > first bad output > loss of trust > nobody checks > silent abandonment. Fix: embed AI in existing workflows + measure results.

4. **Same mistakes everywhere:** UChicago students and Fortune 500 teams make identical errors. Skill gap is universal regardless of seniority.

5. **Training is backwards:** Should start with "What do you hate, why, and who do you wish could do it?" — Socratic group discussion creates shared energy before building.

6. **What doesn't work:** LinkedIn Learning = 90s onboarding videos. Lunch-and-learns = free lunch. Prompt workshops = taught by whoever has time, not experts.

7. **Two aha moments:** Time savings shock (2 hrs -> 10 min) + ownership ("I built this").

8. **Shubham leads AI efforts at Digital Realty** AND trains internal users on the AI products he builds. Not just deploying — building AND teaching. UChicago Socratic method is his pedagogical approach.

## Content Infrastructure Decisions

- Articles stored as TypeScript objects in `src/data/insights.ts` — no CMS, no MDX
- Static generation via `generateStaticParams()` for each article
- Components in `src/components/insights/` — self-contained
- Enterprise patterns from market research enriched articles (blinded, no attribution, no quotes)

## What Worked Well

- Grill-me interview extracted specific, unique observations that generic content planning would have missed
- Multi-agent swarm for parallel implementation (components, content, pages, nav)
- Having the knowledge base as context before planning avoided re-suggesting rejected ideas
