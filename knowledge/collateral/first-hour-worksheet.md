# Unlock Intelligence

## Session 1, Hour 1: The Workflow Shift

*This is an excerpt from the Unlock Intelligence training program. It represents the first 60 minutes of Session One --- what your team will experience on day one.*

---

## Start here: the weekly report

Before we talk about how AI works, we're going to use it.

Think about a task your team does every week. Something recurring. Something that eats real time. For this exercise, we'll use one that nearly every team has:

> **The weekly status report.** Someone on your team spends 45 minutes to an hour every week pulling numbers from different sources, summarizing progress, and writing a narrative update for leadership.

Here's what happens when most people try to hand this task to AI:

**The typical attempt:**

*"Write me a weekly status report."*

**What AI returns:**

> This week, the team made significant progress across several key initiatives. Project deliverables remain on track, with milestones being met according to schedule. Team collaboration has been strong, and stakeholder engagement continues to improve. Looking ahead, we will focus on maintaining momentum and addressing any emerging challenges.

Four sentences. Zero information. It could describe any team at any company in any industry. The person who tried this concludes that AI "doesn't really work for my job" and goes back to writing the report by hand.

This is where most AI adoption stalls. Not because the technology is bad, but because the interaction was wrong.

**Now watch what happens when you structure the same request differently:**

*"You are a senior operations analyst at a commercial real estate firm. I'm going to give you this week's data from three sources: our CRM pipeline summary, our project tracker, and our client satisfaction scores. Draft a weekly leadership update that (1) leads with the three most significant changes from last week, (2) flags any metrics that moved more than 10% in either direction, (3) recommends one action item for the leadership team based on the data, and (4) keeps the entire update under 300 words."*

**What AI returns:**

> **Weekly Operations Update -- Week of March 24**
>
> **Three biggest changes from last week:**
> 1. Pipeline value increased 23% ($4.2M to $5.2M) driven by the Meridian portfolio re-entry.
> 2. Client satisfaction dropped 11% in the Enterprise segment (82 to 73). Three tickets were escalated to VP level, all related to delayed maintenance responses at the Ashburn facility.
> 3. The Southfield renovation project moved from yellow to green after the permit issue resolved Thursday.
>
> **Metrics outside 10% tolerance:**
> - Enterprise CSAT: -11% (flag: this is the second consecutive weekly decline)
> - Pipeline value: +23% (positive, but concentration risk -- 60% of new value is one deal)
>
> **Recommended action:** Schedule a 30-minute review of the Ashburn maintenance escalation process before the next Enterprise QBR. Two of three escalated tickets trace to the same root cause (delayed vendor dispatch). Fixing the dispatch workflow would likely recover 5-8 CSAT points.

Same AI. Same task. The output is specific, actionable, and takes 90 seconds to review instead of 45 minutes to draft from scratch. The recommended action at the bottom is something a leadership team can actually act on.

**What happened between those two prompts?**

The first prompt treats AI like a search engine: put a vague request in, hope something useful comes back. The second prompt treats AI as a component in a workflow. It has a defined role (operations analyst), specific inputs (three data sources), explicit success criteria (four numbered requirements), and a constraint (300 words).

That distinction, between treating AI as a question box and treating AI as a workflow component, is what this program teaches. The first version is how most people use AI today. The second version is where the productivity actually lives.

---

## Why the first prompt failed (and why it always will)

This is not a prompting trick. It reveals something about how AI actually works, and your team needs to understand it before any technique or tool will stick.

**AI is probabilistic.** It generates the most likely next word, then the next, then the next. It is not looking up answers. It is not retrieving facts from a database. It is predicting what text should come next based on patterns in the data it was trained on.

When you type "Write me a weekly status report," the AI predicts what a generic status report looks like based on the millions of status reports it has seen. The result is an average of all status reports: vague, positive, devoid of specifics. It is the most statistically likely status report, which is exactly the kind nobody wants to read.

When you type the structured version, you narrow the prediction space. "Commercial real estate firm" eliminates predictions about software companies. "CRM pipeline, project tracker, client satisfaction" tells the AI what data matters. "Three most significant changes" forces a ranking. "Under 300 words" forces brevity. Each constraint makes the output more specific, more useful, and harder for the AI to fill with filler.

Three practical consequences for your team:

**1. The same question produces different answers every time.** Summarize a document twice, get two different summaries. This is how the technology works. Once your team understands this, they stop expecting AI to be a calculator and start treating it as a collaborator that produces drafts, not finished products.

**2. AI is confidently wrong at a predictable rate.** It states incorrect information with the same tone and formatting as correct information. This is called hallucination, and it happens because AI optimizes for plausible-sounding text, not factual accuracy. In the weekly report example, the AI invented specific numbers ($4.2M, 82 to 73 CSAT). If you fed it real data, those numbers would be real. Without data, it fabricated them convincingly. Your team needs to know when to trust and when to verify.

**3. Context controls output quality.** This is not a soft guideline. It is mechanical. More specific context narrows the prediction space. The structured prompt produced a useful report for the same reason that asking a new hire "summarize this quarter" produces worse work than handing them a template with specific fields to fill in. The AI needs the same things a competent employee needs: role clarity, input data, success criteria, and constraints.

**The practical takeaway:** AI is a power tool with no judgment of its own. The person directing it determines whether the output is useful or waste. That gap between the two prompts is not talent or intuition. It is a learnable, repeatable skill.

---

## A second example: the deal review

The weekly report is a writing task. But the workflow shift applies to thinking tasks too.

**Scenario:** Your team reviews potential deals, vendors, or partnerships. Someone spends an hour pulling together a summary before a review meeting.

**The typical attempt:**

*"Summarize this vendor proposal for our team meeting."*

AI produces a generic summary that reads like the vendor's own marketing copy. No one finds it useful.

**The workflow version:**

*"You are a procurement analyst evaluating this vendor proposal for a mid-size commercial real estate firm. We care about three things: (1) total cost of ownership over 3 years including hidden fees, (2) implementation risk based on their reference customers and timeline claims, and (3) how this compares to our current solution on the five criteria in our evaluation rubric. Flag anything in the proposal that contradicts their reference customer reviews. Be skeptical, not promotional."*

The output is a working first draft of your deal review. It probably catches something you would have missed reading the proposal yourself at 4pm on a Friday. It takes 2 minutes to generate and 5 minutes to review instead of an hour to produce from scratch.

**The pattern:** Every time you move from "do this task" to "here is your role, here are the inputs, here is what success looks like, here are the constraints," the output quality jumps. This pattern works across writing, analysis, research, planning, and communication tasks. It is not specific to any industry or role.

---

## Exercise: your team's weekly workflow audit

*10 minutes. Individual work, then group discussion.*

**Step 1:** List three tasks you or your team perform every week. Not projects, not one-off work --- recurring tasks that eat recurring time.

| # | Weekly Task | Time Spent | Who Does It |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

**Step 2:** For each task, answer honestly:

| Task | Has anyone tried AI for this? | What happened? |
|---|---|---|
| 1 | Yes / No | |
| 2 | Yes / No | |
| 3 | Yes / No | |

Most teams find that at least one person tried AI for at least one of these tasks and was disappointed. That disappointment almost always traces back to the same place: they used the "first prompt" approach (vague request, generic output) instead of the "structured prompt" approach (defined role, specific inputs, clear criteria).

**Step 3:** Pick one task. We'll redesign it now.

| | Your answer |
|---|---|
| **The task:** | |
| **What AI will do:** | |
| **What you'll still do yourself:** | |
| **How you'll verify the output:** | |
| **Estimated time saved per week:** | |

That last row matters. If the task currently takes 45 minutes and the AI-assisted version takes 10 minutes of prompting plus 5 minutes of review, your team just recovered 30 minutes per person per week on one task. Multiply that across the three tasks you listed. Multiply across your team size. That is the ROI case for the rest of this program.

---

## The workflow shift

That exercise, splitting a task into what AI does, what you do, and how you verify, is the foundation for everything else in this program.

Most organizations think about AI vertically: pick a person, give them a tool, hope they get more productive. That is the "Can AI do my job?" framing. It leads to a team that knows how to use ChatGPT but hasn't changed how the organization actually operates.

This program teaches your team to think horizontally. Every business process has five components: **People, Tools, Trainings, Guardrails, and Metrics.** When you map a process across all five, you stop seeing AI as something one person uses and start seeing where it fits across the entire workflow.

Here is the weekly report, mapped across all five — before and after:

```
THE WEEKLY REPORT — BEFORE AI

  People       Analyst spends 45 min pulling data, writing narrative
  Tools        Spreadsheets, email, a dashboard
  Trainings    Learned by watching the last person do it
  Guardrails   Manager reads it before sending. That's it.
  Metrics      None. Nobody measures time spent or whether it's read.
```

```
THE WEEKLY REPORT — AFTER PROCESS REDESIGN

  People       Analyst reviews AI draft (5 min), adds judgment, sends
  Tools        AI drafts from structured prompt; agent pulls data from 3 sources
  Trainings    Analyst trained on structured prompting + verification
  Guardrails   Automated check flags metrics outside tolerance; manager reviews
  Metrics      Time to produce, accuracy vs. manual version, leadership read rate
```

Most AI training touches one column: give the person a better tool. This program maps the full row. Who should be involved? What tools fit? What training do they need? Where do you put guardrails? How do you know it's working? Those are five different questions, and answering all five is what turns an AI experiment into a reliable process.

We call it thinking in processes instead of thinking in tools. The rest of this program teaches your team how to do it.

---

## What the first hour just proved

In 60 minutes, your team:

- Saw the gap between untrained and trained AI use (the two prompts)
- Learned why that gap exists (probabilistic prediction, context controls quality)
- Identified three recurring tasks that are candidates for AI-assisted redesign
- Designed a first-draft workflow for one of them
- Estimated the ROI on that single task

The remaining seven hours apply this framework at increasing scale: from one task to a full AI integration blueprint for your team's processes, from individual prompting skill to organizational strategy, from a single workflow redesign to a 90-day implementation roadmap.

---

## What comes next

| Hour | Module | What Your Team Does |
|---|---|---|
| **Hour 1** | The Process Matrix | *You are here.* Learn the framework. See the gap between untrained and trained AI use. |
| **Hour 2** | The AI Toolkit | Prompting, agents, and specialized tools — learn where each fits in a process. |
| **Hour 3** | Reading a Process | Map a real process from your team end to end. Mark AI insertion points. |
| **Hour 4** | Building Your First AI Workflow | Build the AI-assisted version of your process. Walk out with something that works. |
| **Hours 5-6** | AI Strategy for Your Team | Score your top 10 processes for AI leverage. Prioritize. Draft the business case. |
| **Hour 7** | Workflow Guardrails + Building AI Culture | Add verification layers. Build the environment for your team to adopt AI. |
| **Hour 8** | Your Team's 90-Day AI Roadmap | Build the implementation plan. Peer review. Certificate. |

---

*This worksheet is an excerpt from the Unlock Intelligence training program. To discuss how the full program fits your team's needs, contact hello@unlockintelligence.ai or visit unlockintelligence.ai.*
