/**
 * What: Insight article types and all article content.
 * Why: Data-driven insights pages without a CMS.
 * How: Typed arrays plus slug lookup helper functions.
 * Deps: None; imported by app/insights and Playwright.
 */
export interface StatHighlight {
  value: string;
  label: string;
  source: string;
}

export interface ComparisonRow {
  label: string;
  left: string;
  right: string;
}

export interface InsightSection {
  heading: string;
  paragraphs: string[];
  callout?: string;
  stats?: StatHighlight[];
  bullets?: { bold: string; text: string }[];
  comparison?: {
    leftHeader: string;
    rightHeader: string;
    rows: ComparisonRow[];
  };
}

export interface InsightArticle {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  readingTime: string;
  category: string;
  keyTakeaways: string[];
  sections: InsightSection[];
  cta: {
    text: string;
    href: string;
  };
  relatedSlugs: string[];
}

export const insights: InsightArticle[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // Article 1
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "ai-training-budget-line-item",
    title: "Your AI Training Budget Is a Line Item, Not a Strategy",
    subtitle:
      "86% of companies are spending more on AI training. Only 35% see results.",
    author: "Shubham Chandra, Head of Curriculum",
    readingTime: "8 min read",
    category: "Workforce Strategy",
    keyTakeaways: [
      "86% of companies are increasing AI budgets. Only 35% have a mature upskilling strategy. That gap compounds every quarter.",
      "Platform licenses, lunch-and-learns, and prompt workshops all share one problem: none of them measure whether anyone works differently after.",
      "The same skill gap shows up in a University of Chicago classroom and a Fortune 500 conference room. It's not a knowledge problem. It's a workflow problem.",
      "Training becomes a strategy when it starts with a specific pain point and someone measures what changes.",
    ],
    sections: [
      {
        heading: "Three common investments, one shared failure",
        stats: [
          { value: "86%", label: "of companies increasing AI budgets", source: "Deloitte, 2026" },
          { value: "35%", label: "have a mature upskilling program", source: "Deloitte, 2026" },
          { value: "5\u201315%", label: "completion rate on self-paced platforms", source: "Training Industry" },
        ],
        paragraphs: [
          "Most AI training budgets go to three things: platform licenses (LinkedIn Learning, Coursera), lunch-and-learns, and prompt workshops. While 86% of companies are spending more, only 35% describe their programs as mature. That gap is where the money disappears.",
          "Platform licenses are the default move. L&D signs a deal, sends an email, and waits. Completion rates for self-paced AI courses run between 5% and 15%. For comparison, instructor-led programs see above 85%.",
          "Six months in, 80% of employees haven't logged in since week one. The license renews anyway. Canceling it would mean admitting the initiative failed.",
          "Lunch-and-learns have a different problem. They're led by whoever's available, not by someone who's built AI into real work. I've talked to L&D directors who run these monthly. Not one has followed up to check whether anyone applied a single thing.",
          "Prompt workshops are the newest thing. Half-day sessions on crafting the perfect prompt. But prompting is to AI what typing is to writing. Teaching someone to prompt better without showing them where AI fits in their work is like teaching someone to type faster without teaching them what to write.",
          "What all three have in common: nobody measures whether anything changed. Ask how training went and you hear \"people seem more comfortable\" or \"engagement was positive.\" That's sentiment. It doesn't tell you whether anyone works differently.",
        ],
      },
      {
        heading: "What a training strategy looks like",
        paragraphs: [
          "A strategy starts with a specific pain point, not \"AI awareness.\" Which tasks eat the most time for the least value? The operations team compiling weekly status reports. The legal team reviewing vendor contracts. The finance team writing monthly commentary. Start there.",
          "The measurement changes too. Completion rates tell you who clicked through. Login rates tell you who remembered their password. Neither tells you whether work changed.",
          "The best programs track one metric: can someone now do in 30 minutes what used to take 3 hours? If yes, training worked. If they can't name a task that changed, it didn't.",
          "When AI gets embedded into existing workflows, adoption becomes invisible. Nobody has to remember to \"use the AI tool.\" The AI is the workflow. That's the difference between \"we trained on AI\" and \"AI is how we work now.\"",
        ],
      },
      {
        heading: "The line-item test",
        paragraphs: [
          "Look at where AI training sits in your L&D budget. If it's next to compliance training and the annual leadership retreat, it will deliver the same results: a checkbox.",
          "Compliance training protects the company from liability. Leadership retreats make people feel valued. Neither changes how work gets done. AI training that sits alongside them inherits the same expectation: attend, check the box, move on.",
          "How you frame it matters. Call it an investment and someone asks about returns. Call it a perk and nobody does.",
        ],
        callout:
          "If you can't name three workflows your team does differently since the last training, the training didn't work.",
      },
      {
        heading: "The skill gap looks the same in a classroom and a conference room",
        paragraphs: [
          "I teach 75+ students at the University of Chicago and lead AI at a $40B enterprise. The skill gap is the same on both sides.",
          "A 22-year-old graduate student and a senior VP with two decades of experience make the same mistakes. They hit the same walls and have the same breakthrough moments. The VP just takes a little longer to admit they're stuck.",
          "It's not a knowledge problem. Everyone's heard of AI. Most have tried ChatGPT. The gap is a workflow problem: nobody has shown them where AI fits in their specific work. The reports they write every week, the follow-up emails they send after every meeting.",
          "Until training gets that specific, it stays theoretical. And theoretical training is what a line item buys.",
        ],
      },
    ],
    cta: {
      text: "See how this program is structured",
      href: "/#how-it-works",
    },
    relatedSlugs: ["stop-teaching-prompting", "ai-adoption-dies-three-weeks"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Article 2
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "stop-teaching-prompting",
    title: "Stop Teaching People to Prompt. Teach Them to Build.",
    subtitle:
      "Prompting is a tactic. Building custom AI tools is the skill that sticks.",
    author: "Shubham Chandra, Head of Curriculum",
    readingTime: "8 min read",
    category: "Training Design",
    keyTakeaways: [
      "Prompting is to AI what typing is to writing. It's the input, not the skill.",
      "Non-technical professionals can build custom AI assistants in an afternoon, without writing code.",
      "Two moments convert skeptics: the time savings shock (2 hours to 10 minutes) and the ownership moment (\"I built this\").",
      "Tools imposed from above see single-digit daily usage. Tools people build themselves see 70%+ weekly engagement.",
    ],
    sections: [
      {
        heading: "The prompting trap",
        stats: [
          { value: "2.5 hrs", label: "wasted per knowledge worker, per week, on tasks AI could handle", source: "McKinsey Global Institute" },
          { value: "$9,750", label: "per employee per year in recoverable productivity", source: "At $75/hr fully loaded" },
        ],
        paragraphs: [
          "Everyone is teaching prompting. Workshops, webinar series, certification programs. It has become the default answer to \"how do we upskill on AI.\"",
          "But prompting is to AI what typing is to writing. You wouldn't send your team to a typing workshop and call it a communications program. Yet that's what most prompt courses deliver: a faster way to interact with a tool, without addressing whether the tool is being applied to the right problem.",
          "McKinsey estimates the average knowledge worker spends 2.5 hours per week on tasks AI could handle. At $75/hour, that's $9,750 per employee per year in recoverable time. Prompt workshops aren't capturing it because they aren't changing what people do with their working hours.",
        ],
      },
      {
        heading: "What building looks like for non-technical people",
        bullets: [
          { bold: "HR coordinator", text: "Builds a custom GPT that drafts job descriptions in the company's voice and tone" },
          { bold: "Marketing lead", text: "Builds one that turns campaign data into exec summaries for the Monday standup" },
          { bold: "Ops manager", text: "Builds one that generates weekly status reports from project notes, replacing a 90-minute Friday task" },
          { bold: "Sales team", text: "Connects their CRM to an AI workflow that drafts follow-up emails from call notes" },
          { bold: "Finance team", text: "Automates monthly variance commentary that used to mean pulling data from three different systems" },
        ],
        paragraphs: [
          "None of these require code. They're custom GPTs and automated workflows, tuned to a specific role and a recurring task.",
          "When you tell someone \"you're going to learn to build AI tools,\" they picture software engineering. When you show them it takes two hours and zero code, the resistance disappears. The afternoon project becomes the thing they show their manager the next morning.",
        ],
        callout:
          "Your team can already prompt. Can they build something that saves them two hours every week?",
      },
      {
        heading: "The two moments that convert skeptics",
        paragraphs: [
          "The first is the time savings shock. A task that took two hours takes ten minutes. The report they write every Friday, done before the coffee gets cold. You can see it on their faces.",
          "The second is ownership. \"I built this.\" They didn't watch a demo. They sat down, made something with their own hands, and it worked. That's the moment skeptics convert.",
          "These two moments explain a pattern. AI tools that IT rolls out with a company-wide email see single-digit daily usage. Teams that build their own custom assistants show 70%+ weekly engagement.",
          "The difference is ownership. You can't get ownership from a platform license.",
        ],
      },
      {
        heading: "Why this changes the adoption math",
        comparison: {
          leftHeader: "Tools imposed from above",
          rightHeader: "Tools built from within",
          rows: [
            { label: "Daily active usage", left: "Single-digit %", right: "70%+ weekly engagement" },
            { label: "Adoption timeline", left: "Excitement for 2-3 weeks, then abandonment", right: "Usage grows as people refine their tools" },
            { label: "Maintenance", left: "IT owns it; users submit tickets", right: "Builders iterate on their own" },
            { label: "Knowledge retention", left: "Forgot the training by Friday", right: "Built something they use every day" },
          ],
        },
        paragraphs: [
          "When people build their own tools, they use them. When you hand them someone else's tool, they abandon it in weeks.",
          "Instructor-led training sees 85-95% completion rates, compared to 5-15% for self-paced platforms. But completion isn't the goal. The goal is people doing something different on Monday.",
          "The programs that produce behavior change are the ones where people leave with something they built. Something they'll open again on Tuesday morning.",
        ],
      },
    ],
    cta: {
      text: "See what participants build",
      href: "/#curriculum",
    },
    relatedSlugs: ["same-mistake-everyone-makes", "what-do-you-hate"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Article 3
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "ai-adoption-dies-three-weeks",
    title: "Why AI Adoption Dies in Three Weeks",
    subtitle:
      "The pattern is predictable. The fix isn't more training. It's a different kind.",
    author: "Shubham Chandra, Head of Curriculum",
    readingTime: "8 min read",
    category: "AI Adoption",
    keyTakeaways: [
      "AI adoption follows a predictable arc: excitement in week one, broken trust in week two, silent abandonment by week three.",
      "The root cause isn't the technology. It's deploying tools without teaching people what AI is good at or embedding it into how they already work.",
      "The companies sustaining 70%+ weekly AI usage all made one decision: they assigned functional leads to drive adoption within their own teams.",
      "The gap between \"we trained on AI\" and \"AI is how we work\" comes down to whether anyone checked.",
    ],
    sections: [
      {
        heading: "The three-week pattern",
        paragraphs: [
          "Week one is excitement. The CEO sends an all-hands email. Everyone tries ChatGPT. Slack channels pop up. Someone in marketing drafts a blog post in ten minutes. Momentum feels real.",
          "Week two is reality. Someone pastes AI-generated text into a client deliverable without checking it. A draft goes out with hallucinated statistics. Trust cracks. The enthusiasts keep going. Everyone else gets quiet.",
          "Week three is silence. People go back to the old way. Nobody checks. Nobody notices. Six months later, the license renewal comes around and someone in procurement asks \"are people even using this?\"",
          "While 59% of enterprise leaders acknowledge the AI skills gap, only 53% say they're doing anything about it. That six-point gap sounds small. It represents millions of employees in organizations that see the problem and still haven't acted.",
        ],
      },
      {
        heading: "Why this happens (it's not the technology)",
        paragraphs: [
          "Nobody teaches what AI is good at, and what it isn't. Without that calibration, every bad output feels like betrayal. People don't think \"I gave it bad context.\" They think \"this doesn't work.\"",
          "AI gets positioned as a separate activity. \"Use AI more\" is not a workflow instruction. It's a guilt trip. When someone has to open a different tool, figure out what to ask, then figure out what to do with the answer, most people just do it the old way.",
          "There's no accountability loop. Leadership asked for training. Training happened. Box checked. Nobody measured whether anyone works differently three weeks later.",
        ],
        callout:
          "Nobody ever checked. That's the tell. If leadership doesn't ask \"show me what changed,\" nothing will.",
      },
      {
        heading: "What makes adoption stick",
        bullets: [
          { bold: "Embed AI into existing workflows", text: "If someone has to leave their primary tool to use AI, you've lost. It has to feel like work, not a detour." },
          { bold: "Designate AI champions by function", text: "Not IT staff. Ops leads, finance managers, marketing directors who drive adoption within their own teams. They know the workflows. They have the credibility." },
          { bold: "Measure outcomes, not activity", text: "How much time did finance save on monthly reporting? \"Number of people trained\" is an input metric. Time saved on real tasks is the one that justifies the investment." },
        ],
        paragraphs: [
          "The companies where AI stuck treated it as an operational change. The companies where it fizzled treated it as an IT deployment.",
        ],
      },
      {
        heading: "The enterprise reality",
        paragraphs: [
          "I've watched this pattern play out across departments, geographies, and seniority levels at a $40B enterprise. The teams that adopt permanently are never the ones with the most training hours. They're the ones where AI became part of the workflow.",
          "You can buy training the way you buy a gym membership and get the same results. Habits form from structured practice on real problems, with someone checking whether anything changed.",
        ],
      },
    ],
    cta: {
      text: "See how the program is structured",
      href: "/#how-it-works",
    },
    relatedSlugs: ["ai-training-budget-line-item", "stop-teaching-prompting"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Article 4
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "same-mistake-everyone-makes",
    title: "The Same Mistake Everyone Makes With AI",
    subtitle:
      "It happens in university classrooms and Fortune 500 conference rooms. The error is the same.",
    author: "Shubham Chandra, Head of Curriculum",
    readingTime: "7 min read",
    category: "AI Adoption",
    keyTakeaways: [
      "The biggest barrier to AI adoption isn't the technology. It's the mental model. People treat AI like a search engine and judge it on search engine terms.",
      "This pattern is the same across students and executives. Seniority doesn't fix it. Structured practice does.",
      "AI isn't search. It's a capable but context-starved collaborator. Brief it like a colleague, not a search bar.",
    ],
    sections: [
      {
        heading: "The universal error",
        stats: [
          { value: "81%", label: "of hiring managers prioritize AI skills", source: "Microsoft, 2026" },
          { value: "56%", label: "salary premium for AI-literate professionals", source: "PwC, 2026" },
        ],
        paragraphs: [
          "Ask AI a vague question. Get a surface-level answer. Conclude it's not that useful. Stop using it. This takes about forty-eight hours.",
          "I've seen it in a University of Chicago classroom and in a Fortune 500 conference room. Students ask AI to \"analyze this\" and get back observations they already knew. They accept it as the ceiling. So do VPs.",
          "The twenty-two-year-old and the C-suite executive walk away thinking the same thing: \"it's just giving me what I already know.\" Neither realizes the problem is the question, not the answer.",
          "While 81% of hiring managers say they prioritize AI skills, what they mean is judgment: where AI fits in real work, when to trust its output, when to push back. That doesn't come from a tutorial.",
        ],
      },
      {
        heading: "Why the search engine metaphor breaks everything",
        paragraphs: [
          "Google rewards keywords. AI rewards context. Google gives you THE answer. AI gives you A starting point. Most people apply the first model to the second tool, then blame the tool.",
          "When people treat AI like search, they write queries instead of having conversations. No context about who they are or what they need. They accept the first result instead of iterating.",
          "So you end up with professionals who tried AI once, got a mediocre result, and now quietly think it's overhyped. They're wrong, but for an understandable reason. Nobody corrected the metaphor.",
        ],
        callout:
          "The gap between a bad AI interaction and a useful one is almost never the tool. It's the thirty seconds of context the person didn't provide.",
      },
      {
        heading: "The reframe that helps",
        paragraphs: [
          "Think of AI as a capable but context-starved collaborator who just walked into the room. Fast on their feet, but unaware of your situation, your constraints, and your definition of \"good.\"",
          "Brief it like you'd brief a smart colleague on their first day. Your role, your audience, what success looks like, what you've already tried. When people make this shift, output quality jumps from generic to useful. Not because the technology improved. Because the input improved.",
          "Most training programs skip this. They start with \"here are the features of ChatGPT\" instead of \"here's how to think about what you're doing.\" Features change every quarter. The mental model compounds for years.",
        ],
      },
      {
        heading: "What this means for training",
        paragraphs: [
          "The tools work fine. ChatGPT, Copilot, Claude, Gemini are all capable enough. The mental model is what's broken. You can't fix a mental model with a lunch-and-learn.",
          "You fix it with practice on real problems. The report due Friday. The analysis the board wants next week. The proposal that's been half-written for a month. When someone works through a real task with AI, the mental model shifts.",
          "PwC reports a 56% salary premium for AI-literate professionals. That premium isn't for knowing what buttons to click. It's for knowing when AI helps and when it doesn't. The people earning that premium got there by doing the work differently, over and over, until the new way became the default.",
        ],
      },
    ],
    cta: {
      text: "See what the program covers",
      href: "/contact",
    },
    relatedSlugs: ["stop-teaching-prompting", "ai-adoption-dies-three-weeks"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Article 5
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "what-do-you-hate",
    title:
      "What Do You Hate, Why Do You Hate It, and Who Do You Wish Could Do It?",
    subtitle:
      "The best AI training doesn't start with AI. It starts with a question.",
    author: "Shubham Chandra, Head of Curriculum",
    readingTime: "8 min read",
    category: "Training Design",
    keyTakeaways: [
      "The most effective AI training opens with frustration, not technology: \"What do you hate about your job, why, and who do you wish could do it?\"",
      "When an entire room realizes they all waste hours on the same kind of task, skepticism turns into urgency.",
      "Participants build tools for the specific problems they just named: custom assistants, automated workflows, role-specific playbooks.",
      "Organizations with the highest AI ROI started with workflow pain points, not \"AI awareness.\"",
    ],
    sections: [
      {
        heading: "The question that starts every program",
        paragraphs: [
          "Nobody opens with \"what is a large language model.\" The first thing participants hear is three questions: What do you hate about your job? Why do you hate it? And who do you wish could do it?",
          "The answers are consistent across roles and industries. Repetitive work that someone wishes they could hand off. Reformatting data between systems. Writing the same status update in three formats. Drafting boilerplate that nobody reads carefully but everyone demands.",
          "That \"someone\" they wish could do it? More often than not, an AI can. But nobody has drawn the line between \"I hate writing weekly status reports\" and \"a custom assistant can generate those from your project notes in ninety seconds.\"",
        ],
      },
      {
        heading: "Why the Socratic method works for AI training",
        paragraphs: [
          "Borrowed from the University of Chicago tradition. Discussion, not lecture. Questions, not slides. The instructor's job isn't to hand people answers. It's to set up the conditions where they work through it themselves.",
          "When a room full of professionals shares their pain points out loud, two things happen. First, they realize the frustration is universal. The operations manager hates the same kind of work the marketing director hates.",
          "Second, that shared recognition creates energy. The room shifts from passive audience to active problem-solvers. That energy carries people from \"I'm not sure AI is relevant\" to \"I built a custom assistant for my team\" in a single day.",
        ],
        callout:
          "The moment a room realizes they all waste three hours a week on the same kind of task, skepticism turns into urgency.",
      },
      {
        heading: "From pain to product in 8 hours",
        paragraphs: [
          "The first hour is frustration and discovery. The next two are calibration: what AI is good at, what it isn't, why your first attempt probably disappointed you. The rest is building.",
          "By the end of the day, three deliverables walk out the door:",
        ],
        bullets: [
          { bold: "An AI integration blueprint", text: "mapping where AI fits in their team\u2019s actual processes, not generic templates" },
          { bold: "A workflow map", text: "showing where AI fits in their daily work, which tasks to automate, which to augment" },
          { bold: "A 90-day AI strategy", text: "concrete actions with timelines, no IT approval needed" },
        ],
      },
      {
        heading: "Why this scales",
        paragraphs: [
          "Organizations with the strongest AI ROI share a starting point. They didn't begin with \"AI awareness\" campaigns. They started by identifying repetitive, time-consuming tasks and working backward to the solution.",
          "The Socratic method scales from ten people in a room to a thousand-person rollout. The question is always the same: what do you hate, and who do you wish could do it? When people name their own problem, they own the solution.",
        ],
      },
      {
        heading: "Why this is the article to forward to your boss",
        paragraphs: [
          "If your team can answer \"what do you hate\" but can't answer \"what AI tools have you built to fix it,\" that tells you where the gap is.",
          "The AI training market is projected to grow from $1.2 billion to $6 billion by 2033. Most of that spend will go to platforms nobody finishes. The programs that deliver ROI start with real problems and end with tools people use the following week.",
          "The gap isn't awareness. It's the bridge between \"AI could probably help\" and \"here's the tool I built last Tuesday that saves me three hours a week.\"",
        ],
      },
    ],
    cta: {
      text: "Get a proposal for your team",
      href: "/contact",
    },
    relatedSlugs: ["stop-teaching-prompting", "ai-training-budget-line-item"],
  },
];

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return insights.find((a) => a.slug === slug);
}

export function getRelatedInsights(slugs: string[]): InsightArticle[] {
  return slugs
    .map((s) => insights.find((a) => a.slug === s))
    .filter(Boolean) as InsightArticle[];
}
