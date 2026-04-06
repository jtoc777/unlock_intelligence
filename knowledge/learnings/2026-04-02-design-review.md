# 2026-04-02: Multi-Agent Design Review

## Context
Five design agents independently reviewed the site, then debated each other's positions. Three copy review agents then audited all text. This was prompted by the realization that the site was speaking to the wrong buyer.

## Key Insights

### 1. The site was talking to the wrong person
**What we learned:** The entire site was written for an individual with career anxiety ("Become the AI Expert Your Company Didn't Know It Needed"). Our actual buyer is an HR professional evaluating training for their company.
**Action taken:** Rewrote every section for organizational capability, not personal empowerment.

### 2. "Cohort 5" was a credibility landmine
**What we learned:** Saying "Cohort 5" with zero customers is a lie an HR professional will catch — they'll Google us, find nothing, and lose trust instantly.
**Action taken:** Changed to "Founding Cohort — Spring 2026." Honest, exclusive, and creates real urgency.

### 3. "Dangerous" doesn't fly with HR
**What we learned:** "Become dangerous with the tools engineers build" is startup-Twitter language. HR professionals are risk-averse by function — "dangerous" connotes liability, not competence.
**Action taken:** Changed to "confident, competent users."

### 4. "Built Different. On Purpose." is a meme
**What we learned:** All 3 copy agents flagged this independently. It's a TikTok/sneaker-brand phrase. An HR director evaluating training vendors finds it immature.
**Action taken:** Changed to "Why This Program Works." Plain, confident, lets the content do the persuading.

### 5. Without customers, instructor credentials ARE the proof
**What we learned:** You can't have testimonials at pre-launch. But Shubham's UChicago teaching + Digital Realty AI work is the single strongest trust signal. It was buried at section 8 of 11.
**Action taken:** Added "Led by a University of Chicago instructor" as a hero trust indicator. Moved Team section up. Added institutional logos to credibility bar.

### 6. Copy reframe BEFORE social proof
**What we learned:** PM wanted testimonials first. Analyst argued: "Don't add social proof to a site with the wrong messaging." Adding an individual testimonial to a page selling to teams creates dissonance. Message shapes what proof you need.
**Action taken:** Rewrote all copy first, then planned proof strategy.

### 7. Dark theme: keep it, strip the developer decoration
**What we learned:** The Visionary wanted to kill the dark theme. Design Auditor cited Reforge/Maven as precedent. UX Designer broke the tie: the issue isn't dark vs. light — it's that code-comment labels (`// the-reality`) signal "for developers."
**Action taken:** Kept dark theme, removed all code-comment labels, toned down parallax orbs.

### 8. CTAs are doors, not sales pitches
**What we learned:** 7-section dead zone between Hero and Enroll with zero CTAs. An HR buyer convinced by Section 3 had to scroll through 4 more sections to act. CTAs should be contextual invitations, not aggressive.
**Action taken:** Added "Talk to Us About Your Team" after Problem, "Request a Curriculum Walkthrough" after Curriculum.

### 9. "Reserve Your Seat" is a trust violation
**What we learned:** You can't reserve anything — it's a contact form. Senior buyers have a preternatural sense for false urgency. It damages everything around it.
**Action taken:** Standardized to "Get a Custom Proposal" — specific, honest, tells the buyer what happens next.

### 10. The agent debate format produces dramatically better output
**What we learned:** When agents challenge each other directly, the quality of recommendations jumps. The PM killed his own Stripe recommendation. The Design Auditor conceded on code labels. This wouldn't happen in solo reviews.
**Action taken:** Documented the framework in `playbooks/multi-agent-review.md` for reuse.

## What Worked
- 5 independent reviews → debate → 3 copy-specific reviews (escalating depth)
- Giving agents full business context (ICP, stage, pricing status)
- Demanding exact replacement text, not vague direction
- The debate format where agents concede or defend

## What Didn't Work
- First round agents assumed 4 completed cohorts (we corrected mid-review)
- Some agents over-indexed on enterprise procurement when our buyer is an HR champion
- Initial headline suggestions were too descriptive ("AI Mastery for Business Leaders") — needed conviction

## Open Questions
- Should we A/B test the headline?
- When to add a /teams page (after how many enterprise clients?)
- Whether to show pricing pre-launch or keep behind contact form
