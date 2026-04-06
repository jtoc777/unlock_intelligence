# Multi-Agent Design Review Framework

How we use parallel AI agents to review and improve marketing copy, design, and positioning. This process produces significantly better output than any single review pass.

---

## The Framework

### Round 1 -- Independent Reviews (5 agents in parallel)

Each agent reviews the same artifact independently, with no knowledge of the others' opinions.

| Agent | Lens | What they evaluate |
|---|---|---|
| **Visionary** (Jony Ive / Rick Rubin) | Visual and emotional identity | Is the brand right for the buyer? Does it feel premium? Would an HR leader forward this? |
| **UX Designer** | User journey and conversion flow | Navigation paths, friction points, mobile experience, information hierarchy |
| **Business Analyst** | ICP alignment and sales logic | Does this speak to the actual buyer? Are objections addressed? Does the pitch match the sales motion? |
| **Design Excellence Auditor** | Typography, spacing, color, accessibility | Craft quality, WCAG compliance, visual consistency, responsive behavior |
| **Product Manager** | Conversion funnel and positioning | Pricing strategy, competitive positioning, CTA effectiveness, feature communication |

**How to prompt Round 1:** Give each agent the full business context -- ICP, company stage, pricing status, competitive landscape. Without this, agents optimize for the wrong buyer.

**Time:** ~15-20 minutes for all 5 to complete.

### Round 2 -- Debate (5 agents respond to each other)

Each agent reads all other agents' Round 1 reviews. They must:

1. **Defend** their original position with evidence
2. **Concede** where another agent made a stronger argument
3. **Challenge** specific disagreements with counter-arguments

This is where the best insights emerge. Agents kill each other's weak ideas.

**Example from our review:** The PM recommended adding Stripe self-service checkout. In the debate round, after reading the Business Analyst's objections about pre-launch risk, the PM killed his own recommendation and conceded that engineering time should go to conversion infrastructure instead.

**Time:** ~10 minutes.

### Round 3 -- Copy-Specific Review (3 agents)

After design and strategy are settled, run a focused copy pass:

| Agent | Task |
|---|---|
| **Marketing Agent** | Section-by-section copy audit. Score each section 1-10. Provide exact replacement text for anything below 7. |
| **Growth Agent** | Conversion power scoring. Flag friction in every CTA. Analyze the full click path from landing to form submission. |
| **Visionary** | Voice and tone consistency check. Run the "forwarding test" -- would an HR professional send this to their VP without embarrassment? |

**Time:** ~10 minutes.

**Total time for a full review: ~40 minutes.**

---

## When to Use This

- **Major redesigns or messaging pivots.** Run the full 3-round process.
- **Before launch or after significant content changes.** At minimum, run Round 1 + Round 3.
- **When the team disagrees on direction.** Let agents argue it out with structured debate. The concession pattern resolves disagreements faster than team discussion.
- **New landing pages or campaign copy.** Round 3 alone is sufficient for incremental copy changes.

---

## Key Learnings

**Agents concede when presented with strong counter-arguments.** The debate round is not theater -- agents genuinely update their positions. This is why Round 2 produces 3-5x better recommendations than solo reviews.

**Always provide full business context.** When agents don't know the company stage, ICP, or pricing status, they default to generic SaaS advice. Our Visionary recommended a light theme redesign until the Design Auditor cited Reforge/Maven precedent for dark themes in professional education. Context changed the recommendation.

**Demand exact replacement text.** "Consider making the CTA more action-oriented" is useless. "Change 'Reserve Your Seat' to 'Get Your Custom Proposal'" is actionable. Prompt agents to provide the specific words they want on the page.

**The debate round surfaces hidden trade-offs.** Individual reviews miss conflicts between objectives (e.g., "be bold" vs. "be credible for enterprise"). The debate forces agents to resolve these conflicts explicitly.

**Run Round 3 last.** Copy reviews are wasted effort if the strategy or design changes. Settle structure and positioning first, then polish the words.
