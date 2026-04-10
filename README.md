# Unlock Intelligence

Marketing website for [Unlock Intelligence](https://unlockintelligence.co) — a cohort-based AI program that helps teams build real AI fluency in focused live sessions.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, TypeScript, static export) |
| UI | [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) (Base UI) |
| Motion | [Framer Motion](https://www.framer.com/motion/) |
| Forms | [Web3Forms](https://web3forms.com/) (free tier) |
| Fonts | Inter + JetBrains Mono via `next/font` |
| Unit tests | [Vitest](https://vitest.dev/) + Testing Library |
| E2E | [Playwright](https://playwright.dev/) (`e2e/`) |

Output is a **static site** (`output: "export"` → `out/`), suitable for static hosts.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build → `out/` |
| `npm run start` | Serves production build locally (after `build`) |
| `npm run lint` | ESLint |
| `npm test` | Vitest (unit / component tests) |
| `npm run vercel` | Vercel CLI (pass args after `--`) |
| `npm run vercel:env` | Pull dev env from linked Vercel project → `.env.local` |
| `npm run vercel:pull` | Sync Vercel project settings for local `vercel build` |

**Playwright:** start the dev server, then e.g. `npx playwright test` (or target `e2e/*.spec.ts`).

## Project structure

```
src/
├── app/                    # App Router pages & layouts
│   ├── layout.tsx          # Root layout (fonts, metadata, shell)
│   ├── page.tsx            # Marketing homepage
│   ├── globals.css         # Tokens, Tailwind, utilities
│   ├── contact/            # Contact / lead page
│   └── insights/           # Thought-leadership articles (SSG)
├── components/
│   ├── layout/             # Navbar, footer, sticky mobile CTA
│   ├── sections/           # Homepage sections (hero, curriculum, enroll, …)
│   ├── insights/           # Article layout, cards, CTAs
│   ├── contact/            # Contact form & process steps
│   └── ui/                 # Shared primitives (custom + shadcn)
├── data/
│   └── insights.ts         # Article content & types (no CMS)
└── lib/
    ├── utils.ts            # `cn()` helper
    └── constants.ts        # Pricing / cohort copy constants
```

Agent-facing conventions also live in [`CLAUDE.md`](./CLAUDE.md). Optional Cursor rules are under [`.cursor/rules/`](./.cursor/rules/).

## Design system

Dark-first UI with indigo / violet accents. Key ideas:

- CSS variables: `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`
- Brand helpers: `text-[var(--indigo)]`, `text-[var(--violet)]`, `text-[var(--emerald)]`
- Light blocks: wrap with `.theme-light` to flip tokens locally

## Deployment

**Primary:** [Cloudflare Pages](https://pages.cloudflare.com/) — push to `main` runs [GitHub Actions](.github/workflows/deploy-pages.yml) (`npm ci && npm run build`, publish `out/`).

**GitHub Actions secrets**

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

**Optional:** the repo can be linked to Vercel for previews or a second host (`vercel link`, `.vercel/` gitignored). Production in this repo is still oriented around Cloudflare + static `out/`.

## Environment variables

Create `.env.local` for local development:

```env
# Web3Forms — https://web3forms.com
NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
```

If you use Vercel env sync, `npm run vercel:env` can populate `.env.local` from the linked project (never commit secrets).

## License

All rights reserved.
