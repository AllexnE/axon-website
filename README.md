# ⬡ Axon Website

> Intelligence wired into every tool.

The official marketing website for the [Axon Platform](https://axon.dev) — built with **Next.js 15**, **TypeScript**, and deployed on **Vercel**.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | CSS Variables + inline styles |
| Fonts | Sora + JetBrains Mono |
| Deployment | Vercel |
| CI | GitHub Actions |

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Install & run locally

```bash
# 1. Clone
git clone https://github.com/axon-platform/axon-website
cd axon-website

# 2. Install
npm install

# 3. Copy env vars
cp .env.example .env.local

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
axon-website/
├── app/                    ← Next.js App Router pages
│   ├── layout.tsx          ← Root layout (Nav + Footer + metadata)
│   ├── page.tsx            ← Homepage (/)
│   ├── pricing/page.tsx    ← Pricing page (/pricing)
│   ├── docs/page.tsx       ← Docs page (/docs)
│   └── download/page.tsx   ← Download page (/download)
│
├── components/             ← React components (one per concern)
│   ├── Nav.tsx             ← Sticky navigation + login modal
│   ├── Footer.tsx          ← Site footer
│   ├── Cursor.tsx          ← Custom cursor (client-only)
│   ├── ScrollProgress.tsx  ← Scroll progress bar
│   ├── Modal.tsx           ← Reusable modal overlay
│   ├── Hero.tsx            ← Hero section + particles + typewriter
│   ├── Marquee.tsx         ← Infinite scrolling tag strip
│   ├── Stats.tsx           ← Animated stat counters
│   ├── Products.tsx        ← Horizontal-scroll product cards
│   ├── Features.tsx        ← Bento grid feature showcase
│   ├── HowItWorks.tsx      ← 3-layer AI architecture cards
│   ├── Pricing.tsx         ← Pricing cards + monthly/annual toggle
│   ├── Docs.tsx            ← Sidebar docs navigator
│   ├── Download.tsx        ← Platform download cards + modal
│   ├── Testimonials.tsx    ← Testimonial cards
│   ├── CtaBanner.tsx       ← Bottom CTA section
│   └── useReveal.ts        ← Intersection Observer scroll reveal hook
│
├── lib/                    ← Shared data and utilities
│   ├── constants.ts        ← ALL site data (products, pricing, platforms...)
│   ├── docs.ts             ← All documentation content
│   └── utils.ts            ← Helpers (cn, copyToClipboard, animateNumber)
│
├── styles/
│   └── globals.css         ← Design tokens, reset, shared utilities
│
├── public/                 ← Static assets
│   └── axon-logo.svg
│
├── .github/workflows/
│   └── ci.yml              ← GitHub Actions CI (type-check + lint + build)
│
├── .env.example            ← Environment variable template
├── next.config.js          ← Next.js config
└── tsconfig.json
```

---

## How to edit content

**All site content lives in `lib/constants.ts`.** You never need to hunt through component files to update text.

```ts
// Add a new product
PRODUCTS.push({
  id: 'radar',
  name: 'Axon Radar',
  icon: '📡',
  status: 'soon',
  tagline: 'Real-time dependency monitor.',
  // ...
})

// Update pricing
PRICING[1].monthlyPrice = 12

// Add a testimonial
TESTIMONIALS.push({ ... })
```

**Documentation content lives in `lib/docs.ts`.**

---

## Commands

```bash
npm run dev        # Start dev server at localhost:3000
npm run build      # Production build
npm run start      # Serve production build locally
npm run lint       # ESLint
npm run type-check # TypeScript check (no emit)
```

---

## Deployment

### Vercel (automatic)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Add New Project → Import repo
3. Vercel auto-detects Next.js — click Deploy
4. Every push to `main` deploys automatically

### Environment variables in Vercel

Go to Project → Settings → Environment Variables and add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://axon.dev` |
| `RESEND_API_KEY` | From resend.com (for contact form) |

### Custom domain

Project → Settings → Domains → Add `axon.dev`
Copy the DNS records to your registrar (Cloudflare recommended).

---

## CI/CD Pipeline

Every push triggers `.github/workflows/ci.yml`:

```
Push to GitHub
    ↓
GitHub Actions runs:
  1. npm ci          (install)
  2. type-check      (TypeScript)
  3. lint            (ESLint)
  4. build           (Next.js)
    ↓
If all pass → Vercel deploys automatically
If any fail → Deploy blocked, you get an email
```

---

## Design System

All design tokens are CSS variables in `styles/globals.css`:

```css
--void:      #03030a   /* deepest background */
--v1:        #7c3aed   /* primary violet */
--grad:      linear-gradient(135deg, #7c3aed, #6366f1, #3b82f6)
--font-display: 'Sora', sans-serif
--font-mono:    'JetBrains Mono', monospace
```

---

## License

MIT © 2026 Axon Platform
