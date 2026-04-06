# 2026-04-06: ROI Card Reads as Price Tag

## Context
Shubham flagged that the $9,750 ROI stat in the Problem section could be mistaken for the program's cost by visitors scanning quickly. UX Designer agent confirmed the risk and provided a detailed breakdown of why.

## Key Insights

### 1. Large dollar figures in centered bordered cards = pricing card pattern
**What we learned:** Eye-tracking research shows visitors anchor on large dollar amounts within ~200ms — before reading any surrounding text. A centered, bordered card with a big number is the universal visual language of a pricing card. The $9,750 ROI figure was visually identical to an enrollment pricing card.
**Why it matters:** If a visitor mentally anchors on $9,750 as "the price" (vs. the actual ~$1,095-$1,295/seat), they bounce before reaching the real enrollment section. A negative price frame is very hard to undo.
**Action taken:** Five changes — (1) added lead-in text "What inaction costs, per person, per year" above the number, (2) shrunk the number from text-5xl/6xl to text-3xl/4xl, (3) left-aligned the card, (4) added TrendingDown icon to signal loss, (5) replaced bordered card with left-border accent to differentiate from pricing cards.

### 2. Source diversity matters in stat strips
**What we learned:** Citing the same source (DataCamp) for 2 of 3 industry stats looks like over-reliance on a single source. Undermines the "multiple independent signals" framing.
**Action taken:** Replaced the second DataCamp stat ("2× higher AI ROI") with a Deloitte stat ("86% of companies increasing AI budgets in 2026"). Now three distinct sources: DataCamp, IDC, Deloitte.

### 3. No all-caps text on the page
**What we learned:** User explicitly rejected uppercase label treatment. "Never all caps on a page." This applies even for small uppercase labels (the kind used for section sub-headers). Sentence-case lead-in text works better for this site's editorial tone.

## What Worked
- UX Designer agent gave a precise, actionable diagnosis with ranked recommendations
- Five-part fix was approved as a package — all changes reinforce each other
- The "pricing card pattern" framing made the problem immediately clear

## What Didn't Work
- Initial proposal used an uppercase label — user rejected it. Should have known from the site's editorial tone that all-caps wouldn't fit.

## References
- `src/components/sections/problem.tsx` — the modified file
- `knowledge/strategy/competitive-positioning.md` line 90 — source for Deloitte stat
- Commit `b5ae769` — the fix
