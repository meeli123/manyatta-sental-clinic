# Manyatta Dental — Premium Website

A premium, modern website concept for **Manyatta Dental**, a dental clinic in
**Narok, Kenya**. Built with Next.js (App Router), TypeScript, Tailwind CSS v4,
PostgreSQL + Drizzle ORM, and Lucide icons.

Design direction: calm confidence · clinical precision · human warmth.

---

## 1. Running the project

```bash
npm install
netlify dev            # runs the app with Netlify Database available locally
```

The database is Netlify Database (managed Postgres). Migrations live in
`netlify/database/migrations/` and are applied automatically on deploy. After
changing `src/db/schema.ts`, generate a new migration:

```bash
npx drizzle-kit generate --name <describe_the_change>
```

Production:

```bash
npm run build
npm run start
```

---

## 2. Project structure

```
src/
├── lib/
│   ├── clinic.ts            ← ★ CENTRAL CONTENT FILE — everything lives here
│   └── utils.ts             ← className helper
├── app/
│   ├── layout.tsx           ← fonts, SEO metadata, JSON-LD, chrome
│   ├── page.tsx             ← homepage (assembled from sections)
│   ├── globals.css          ← design tokens (colors, type, motion)
│   ├── about/page.tsx
│   ├── services/page.tsx    ← services index
│   ├── services/[slug]/     ← 12 individual service pages (generated)
│   ├── patient-info/page.tsx
│   ├── contact/page.tsx
│   ├── book/page.tsx        ← multi-step appointment concierge
│   ├── api/appointments/    ← stores validated requests in PostgreSQL
│   ├── sitemap.ts / robots.ts
│   └── loading.tsx / not-found.tsx
├── components/
│   ├── ui.tsx               ← buttons, badges, headings, icons, wordmark
│   ├── reveal.tsx           ← scroll-reveal (IntersectionObserver)
│   ├── chrome.tsx           ← navbar, mobile menu, action bar, WhatsApp float
│   ├── footer.tsx
│   ├── service-card.tsx     ← reusable service cards + grid
│   ├── faq.tsx              ← accessible accordion
│   ├── booking/concierge.tsx← 3-step appointment flow
│   └── home/                ← hero, services, experience, closing sections
└── db/
    ├── schema.ts            ← appointment_requests table
    └── index.ts             ← database client
```

---

## 3. Where to change what

### 3.1 Clinic information → `src/lib/clinic.ts`

**This is the only file you need to touch when verified details arrive.**

| Setting | Field | Placeholder shown today |
| --- | --- | --- |
| Phone number | `clinic.phone` | `[Clinic phone number — to be confirmed]` |
| WhatsApp | `clinic.whatsapp` (digits only, e.g. `"2547xxxxxxxx"`) | `[WhatsApp number — to be confirmed]` |
| Email | `clinic.email` | `[Clinic email — to be confirmed]` |
| Address | `clinic.address` | `[Exact clinic address — to be confirmed]` |
| Opening hours | `clinic.hours` (array of `{ days, time }`) | "Hours to be confirmed" |
| Google Maps | `clinic.mapsEmbedUrl` + `clinic.mapsLinkUrl` | styled map placeholder |
| Social links | `clinic.social` | hidden until added |

Once a value is filled in, every phone link, WhatsApp button, footer entry,
contact card and call-to-action across the whole site starts working
automatically. Nothing else needs editing.

### 3.2 Services → `services` array in `src/lib/clinic.ts`

Each service has: `slug`, `name`, `icon`, `tagline`, `summary`, `involves`,
`aftercare`, `faqs`, optional `featured` and `note`. The services index page,
all 12 detail pages, the sitemap, and the booking concierge are generated from
this array.

> ⚠️ The current list is a **proposed range of care** — the site says so
> honestly. Remove this note once the clinic confirms its service list.

### 3.3 Team → `teamPlaceholders` in `src/lib/clinic.ts` + `src/app/about/page.tsx`

Swap the placeholder cards for real profiles **only after verification** of
name, role and qualifications. Never use stock photos as staff photos.

### 3.4 Testimonials → `testimonialPlaceholders` in `src/lib/clinic.ts` + `src/components/home/closing.tsx`

Reserved slots render today. Insert real, consented patient stories later.
Never invent reviews.

### 3.5 Images → `public/images/`

Replace `hero.jpg`, `clinic.jpg`, `interior.jpg`, `treatment.jpg`,
`instruments.jpg`, `smile.jpg`, `smile-2.jpg`, `care-portrait.jpg` with real
clinic photography when available (keep the same filenames or update the
`src` props). Current images are properly licensed stock (Pexels) and are
captioned as illustrative on the About page.

### 3.6 Colors & typography → `src/app/globals.css` + `src/app/layout.tsx`

- Colors: the `@theme` block in `globals.css` (`--color-ivory`, `--color-teal`,
  `--color-champagne`, …). Utilities like `bg-teal` update everywhere.
- Fonts: `Fraunces` (display serif) and `Instrument Sans` (body) are loaded
  via `next/font` in `layout.tsx`.

### 3.7 Booking flow → `src/components/booking/concierge.tsx` + `src/app/api/appointments/route.ts`

- The concierge is a 3-step request form: treatment → timing → details.
- Submissions are validated and stored in the `appointment_requests` table.
- **No payment is taken and no appointment is auto-confirmed** — by design.
  The UI always says "request", never "confirmed".

### 3.8 SEO → `src/app/layout.tsx`, `sitemap.ts`, `robots.ts`

- Set the real domain in the `NEXT_PUBLIC_SITE_URL` environment variable
  (currently a reserved `.example` placeholder).
- The JSON-LD `Dentist` schema in `layout.tsx` intentionally omits phone,
  geo and hours until verified — add them when confirmed.

---

## 4. What this site stores (privacy)

Only appointment-request data: **name, phone, chosen service, preferred date,
preferred time window, and an optional message** — stored so the clinic can
respond. **No clinical information is collected on this website.** Patient
records belong in the clinic's own systems, not here.

---

## 5. Pre-launch verification checklist

- [ ] `clinic.phone` / `clinic.whatsapp` / `clinic.email` verified
- [ ] `clinic.address` and `clinic.mapsEmbedUrl` verified from Google Maps
- [ ] `clinic.hours` confirmed for every day of the week
- [ ] Service list confirmed — remove the "proposed range" notices
- [ ] Emergency pathway confirmed and added to Contact page
- [ ] Accepted payment methods & insurance providers published
- [ ] Team profiles added with verified names/qualifications
- [ ] Real patient testimonials added with written consent
- [ ] Clinic photography replaces stock imagery
- [ ] `NEXT_PUBLIC_SITE_URL` set to the verified domain
- [ ] Social profiles added to `clinic.social`

---

## 6. Craft notes

- **Accessibility**: semantic HTML, labelled controls, keyboard-friendly
  accordion and menu, visible focus rings, `prefers-reduced-motion` respected,
  WCAG-conscious contrast.
- **Performance**: local optimized images with `next/image`, system-free font
  loading via `next/font`, zero animation libraries (CSS +
  IntersectionObserver only).
- **Honesty by design**: every unverified business fact renders as an
  intentional, elegant placeholder — never as fabricated truth.
