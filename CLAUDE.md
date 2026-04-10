# Unlock Intelligence — Claude Code Instructions

## Project Overview

Marketing website and internal cockpit for Unlock Intelligence, a cohort-based AI education program. Next.js 16 (App Router) with TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, and Supabase.

## Commands

- `npm run dev` — Start dev server (http://localhost:3000)
- `npm run build` — Production build
- `npm test` — Run tests with Vitest
- `npm run lint` — ESLint
- `npm run vercel -- deploy --prod --yes` — Deploy to production (unlockintelligencehq.com)
- `npm run vercel:env` — Pull env vars from Vercel to `.env.local`

## Architecture

- **App Router** — Pages in `src/app/`, layouts in `layout.tsx`
- **Server Components by default** — Only add `"use client"` when the component needs browser APIs, state, or event handlers
- **Section-based composition** — Landing page sections in `src/components/sections/`
- **shadcn/ui** — Primitives in `src/components/ui/`. Add new: `npx shadcn@latest add <component>`
- **Hybrid rendering** — Marketing pages statically generated. Cockpit routes (`/cockpit`) dynamic with Supabase
- **Route groups** — `(marketing)/` wraps public pages with Navbar/Footer/CTA. `cockpit/` has its own layout

## Code Conventions

### TypeScript
- Strict mode. Use `interface` for props, not `type`. Named exports (except pages). No `any`.

### Styling (Tailwind CSS v4 + shadcn)
- Tailwind utilities only, no custom CSS (except globals.css tokens)
- shadcn variables: `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`
- Brand colors: `text-[var(--indigo)]`, `text-[var(--violet)]`, `text-[var(--emerald)]`
- `cn()` from `@/lib/utils` for conditional classes
- Dark theme default. Light sections use `.theme-light` wrapper. Mobile-first, `md:` for desktop.

### Components
- Section components are self-contained with their own copy
- `ScrollReveal` for scroll animations, `SectionWrapper` for padding/max-width, `GlassCard` for cards, `GradientText` for gradients
- `lucide-react` icons, `next/image` for images, `next/link` for links

### Animations
- Framer Motion. Subtle: 0.6s, ease-out. ScrollReveal: once-only, 12% threshold, -40px margin. No layout shift.

## Git

Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`). Atomic. Branch: `feat/x`, `fix/x`. Never commit `.env.local`, `node_modules/`, `.next/`, `out/`. Squash merge preferred.

## Deployment

Production via Vercel. Ship with `npm run vercel -- deploy --prod --yes` to unlockintelligencehq.com. Cloudflare Pages pipeline is deprecated.

## Cockpit Task API

Internal task board at `/cockpit` backed by Supabase. Claude Code can manage tasks via API:

```
POST   /api/cockpit/tasks              — Create task
GET    /api/cockpit/tasks?status=&owner= — List (filters: status, category, owner, priority)
PATCH  /api/cockpit/tasks/:id          — Update task
DELETE /api/cockpit/tasks/:id          — Delete task
POST   /api/cockpit/tasks/:id/notes    — Add note
GET    /api/cockpit/tasks/:id/notes    — List notes
```

**Fields:** category: `product|curriculum|business-gtm|ops`. Status: `todo|in-progress|blocked|at-risk|postponed|complete`. Priority: `low|medium|high|urgent`. Owner: `shubham|jt|null`. Note author: `shubham|jt|claude`.

## Do NOT

- Add CSS preprocessors, state management libraries, or analytics without permission
- Modify shadcn source files in `ui/` — extend via wrappers
- Use `dangerouslySetInnerHTML` unless absolutely necessary

## Knowledge Base

Shared KB at `/knowledge/`. Use `/update-kb` after productive sessions (agent reviews, strategy discussions, copy changes, plan creation) — don't wait to be asked.

**Before recommending:** Check `knowledge/strategy/icp-and-buyer-personas.md` and `knowledge/ideas/backlog.md` — don't re-suggest rejected ideas or misalign with ICP.

**Before writing article copy:** Read `knowledge/learnings/2026-04-03-mckinsey-style-editorial.md` and apply McKinsey-style standards. Check `knowledge/learnings/2026-04-03-article1-rewrite-before-after.md` for calibration.
