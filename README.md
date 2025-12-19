# GospelQuote — Next.js + Sanity (CMS) Starter

This project converts your current GospelQuote HTML/Tailwind blog into a **scalable CMS-powered platform** using:
- **Next.js (App Router) + TypeScript**
- **TailwindCSS** (your existing Primary/Accent/Cream palette)
- **Sanity Studio** for content authoring
- **GA4 Consent Mode + cookie banner** (analytics disabled until opt-in)

## What you get on day one
- Pages: Home, Write-ups (list + single), Podcasts, Doodles, Contact, Privacy Policy, Terms of Use
- Dark mode (persisted)
- Cookie banner + “Manage cookies” link in footer
- Article JSON-LD (BlogPosting)
- Sanity schemas: Articles, Podcasts, Doodles, Categories, Authors

---

## 1) Run locally

### A. Install dependencies
```bash
npm install
```

### B. Set your env vars
Copy:
```bash
cp .env.example .env.local
```
Then update:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA4_ID` (optional)
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

### C. Start Next.js
```bash
npm run dev
```
Open: `http://localhost:3000`

---

## 2) Create your Sanity project (once)

From the project root:
```bash
npx sanity@latest init
```
- Use the same `projectId` + `dataset` you added to `.env.local`
- When asked about templates, choose a minimal one; we provide schemas already.

Then run Sanity Studio:
```bash
npm run sanity:dev
```
Open: `http://localhost:3333`

---

## 3) Add content

In Studio, create:
1. Categories (e.g., Devotional, Christian Living, Grace)
2. An Author (optional)
3. Articles / Podcasts / Doodles

The frontend automatically renders the latest content.

---

## Migration note (from your current site)
Your current implementation uses dynamic grids + (in admin.html) localStorage-driven content management.
This starter replaces localStorage with **Sanity** so you gain:
- drafts + previews
- scheduled publishing
- reusable categories/tags
- editorial workflow (no code edits to publish)

---

## Deployment
Recommended:
- Frontend: Vercel
- CMS: Sanity hosted Studio (or self-hosted)

