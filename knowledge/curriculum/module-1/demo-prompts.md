# Demo prompts — 2026-04-12 beta

Pre-written prompts for the volunteer demo (Block 2) and the closer script (Block 7). Paste these. Never type live -- typos kill momentum.

**Design principle:** The demo prompt must be short. The run-of-show promises "the instruction was four sentences." The power is a brief instruction producing a long, multi-step, agentic output -- Claude going out and doing things on real data, not just generating text. The starters (Block 5) are where the craft lives. The demo prompt is where the magic lives.

**Saturday dry-run:** Lock the primary based on the dry-run result. If the primary produces clean output on Jess's real calendar data, use it. Fall back in order.

---

## Block 2 — Volunteer demo (Jess's calendar)

### Which prompt to use

| Dry-run result | Prompt | Why |
|---|---|---|
| Calendar connector works, clean output | **Primary** | Four sentences. Highest impact. |
| Calendar connector works, messy output | **Structured fallback** | Same task, more guardrails on Claude's output shape |
| Calendar connector fails, docs available | **Document synthesis** | Needs pre-loaded files, no calendar |
| Nothing works | **Web research only** | No connectors needed. Lowest impact for the room. |

---

### Primary — four sentences

> Look at every meeting on my calendar this week. For each one, go research the person I'm meeting with and the organization they're from -- pull anything from the last 30 days: recent news, funding, leadership changes, announcements. Then write me a one-page prep brief for each meeting: who they are, what's happening at their organization right now, three talking points I should be ready for, and two smart questions I could ask. If you can't find anything on someone, say so -- don't make it up.

Four sentences. The room reads it on the projector in 10 seconds. Triggers three visible agentic steps: read calendar, search the web per person, synthesize into structured output. The single "don't make it up" constraint shows the concept without over-engineering.

---

### Structured fallback

Same task, more structure. Use if the primary produces disorganized output -- the numbered format gives Claude cleaner output rails. Still under 90 seconds to read on the projector.

> Look at every meeting on my calendar this week. For each meeting:
>
> 1. Identify who I'm meeting with and what organization they're from.
> 2. Search the web for that person and their organization. Pull recent news, recent funding or grants, leadership changes, major announcements -- anything from the last 30 days.
> 3. Write a prep brief with:
>    - Who they are (one sentence)
>    - The 3 most relevant things happening at their organization right now
>    - 3 talking points I should be ready for in this meeting
>    - 2 questions I could ask that would show I did my homework
>
> Use the real meeting titles from my calendar. If you can't find recent info on someone, say so -- don't fabricate.

---

### Document synthesis — no calendar connector

Use if the calendar connector fails entirely. Requires 3-4 of Jess's real client deliverables or project briefs pre-loaded into the Claude Project before the session.

> Read every document in this project. Find the open questions and unresolved decisions across all of them. Group them by topic. For each group, write a one-paragraph status memo I could send to my team: what's decided, what's still open, what needs a decision this week. Use real document names. If a decision isn't clearly resolved in the docs, flag it as open -- don't assume.

Still shows multi-step agentic behavior (read multiple documents, cross-reference, synthesize), but misses the web-research "going outside" moment that makes the calendar prompts stronger for the room.

---

### Web research only — no connectors at all

Nuclear fallback. No connectors, no file uploads, just autonomous web search. Use only if both calendar and document paths fail in the dry-run.

**Version A — Jess's domain (cultural sector):**

> I'm a strategy consultant advising a mid-size performing arts center that's considering expanding into a second venue. They want to know who's done this successfully and who's failed. Research this: find 5 cultural institutions that expanded from one venue to multiple locations in the last 10 years. For each, tell me what they did, whether it worked, and what went wrong if it didn't. Then give me three strategic questions my client should answer before they commit. Cite your sources. If you can't verify something, say so.

**Version B — if Jess prefers not to use her domain:**

> I'm preparing for a board meeting next week where we're presenting competitive landscape analysis. Research the top 5 cultural-sector strategy consulting firms globally. For each: what they specialize in, their 2-3 most notable recent projects, where they're growing, and where they're vulnerable. Then tell me: if I were positioning against them, what's the one thing each of them can't credibly claim? Cite sources. Don't fabricate firm names or project details.

---

### While Claude runs — narration beats

Don't just stare at the screen. Say what's happening out loud so the room sees the steps.

**For calendar-based prompts (primary or structured):**
- *"See what it just did? It looked at her real calendar -- not a template, her actual meetings this week."*
- *"Now it's going out to the web. Three different searches, one per person. She didn't write code. She wrote four sentences."*

**For document synthesis:**
- *"It's reading all four documents at once... now it's cross-referencing across them... now it's pulling out the open questions."*

**For web research:**
- *"No calendar, no files -- just a question. Watch how many searches it runs on its own."*

---

### After the output — four beats in order

**1. Capture the reaction.** Read the output on the projector. Pause. Look at Jess. The room's eyes follow her face -- her face is the lesson. If she doesn't react out loud, ask: *"Would you actually use this before your next client call?"*

**2. 30-second theory beat.** Drop this after the output, not during the run. Don't interrupt the thing creating the emotional reaction. Proof first, then explanation:

> *"Same Claude. Same model you all have on your laptops. The first way everyone uses it asks it to predict the most likely next words. What I just did gave it a job, real data, and a goal. That's the entire difference."*

Keep it to 30 seconds. The matrix section comes next.

**3. Redirect follow-ups.** If Jess starts asking "wait, can it also do X?": *"Hold that thought -- that's exactly what you're about to build."*

**4. Bridge to the matrix:**

> *"What you just watched took six minutes to run but ninety seconds to build. The instruction was four sentences. Now I'm going to show you the framework that makes this possible."*

---

## Block 7 — Closer (competitive intel scraper on Bill's real account)

The scraper is at hpc-markets.com. Pre-loaded in a browser tab.

### Setup

Turn to Bill:

> *"Bill -- name a real account you're trying to close right now. One where the company has a public web presence."*

He names it. Type the company name into the scraper.

> *"This is a tool I built that I run every Monday morning at Digital Realty. I'm pointing it at [account name] right now."*

### Narrate the 6 steps as they fire

1. **Site crawl** -- *"It's reading their corporate site -- about page, leadership, recent press releases."*
2. **Press scan** -- *"Searching business press. Last 90 days of coverage."*
3. **LinkedIn signals** -- *"LinkedIn next. Job postings, team growth, org changes."*
4. **News synthesis** -- *"Pulling everything together into a single picture."*
5. **Competitive context** -- *"Cross-referencing against what we already know about our positioning."*
6. **Brief generation** -- *"And here's the brief. One page. Ready for a Monday morning call."*

### When it finishes

Read the brief on the projector. Pause. Then:

> *"This is what I used to spend two hours doing on a Monday morning. It takes ninety seconds now."*

### Name the constraint

> *"This works when the target has a public web presence. For a stealth startup or a private company with no press, you'd build a different version -- one that leans on peer-company research or interview prep instead of direct intel."*

### Generalize to each person

> *"Tommy, you could run one of these on every competitor in the Housecall Pro landscape -- Jobber, ServiceTitan, FieldEdge -- every Monday. Zeshawn, this is a diligence pre-screen on any acquisition target with a public footprint. Jess, point it at a peer institution before a client pitch. Alan, run it on any company you're about to sell consulting to. Same bones, different target."*

### Bridge to the program

> *"Same primitives you just used. Custom instructions, structured input, real data, multi-step. I chained six steps instead of one. The distance between one step and six steps is not talent, and it's not code. It's the next three sessions of this program. By Hour 4, each of you builds one of these for your own work. I'm showing you the destination, not showing off."*

### Cadence beat

> *"The Project you built today is a starting point. Run it once this week on a real task. Next week, update the instructions based on what it got wrong. Build, run, tighten. That's the loop."*

Don't pitch further. Pivot to the debrief.

### Backup

If the scraper doesn't run cleanly on Bill's account in the Saturday dry-run:
- Tommy's competitor (ServiceTitan or Jobber -- guaranteed public web presence)
- Jess's peer institution (Kennedy Center, Lincoln Center -- large public digital footprint)
- A DLR-specific workflow Shubham actually uses at work
