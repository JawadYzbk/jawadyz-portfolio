# Jawad Yazbek - Portfolio

Bilingual (English / Arabic) portfolio for Jawad Yazbek, full-stack developer. Built with Next.js 16, React 19, TypeScript, Tailwind CSS 4 and Motion.

Live site: https://jawadyz-portfolio.vercel.app/

## Features

- English and Arabic with full right-to-left layouts. The chosen language and theme are stored in cookies and rendered on the server, so there is no flash on reload.
- Project showcase built from typed, bilingual data (`src/data/projects.ts`): category filters, a selected-work view that expands to all projects, and an accessible detail dialog that separates own projects from open-source contributions.
- Contact form posting to Web3Forms, with inline validation, sending, success and error states, a spam trap and a direct email fallback.
- Light theme by default with an optional dark theme, reduced-motion support, keyboard and screen-reader friendly controls.
- SEO metadata, canonical URL, Person structured data, generated favicon, Apple icon and Open Graph image, robots.txt and sitemap.

The visual language follows the Refero "Apple iPhone Duo" style reference: white gallery canvas, `#f5f5f7` bands, 28px shadowless cards, pill controls and tight system typography (SF Pro on Apple devices, Inter elsewhere).

## Project structure

```text
src/
├── app/            # Layout, page, metadata routes (icons, OG image, robots, sitemap)
├── components/     # Header, Hero, Projects, ProjectCard, ProjectDialog, About, Contact, Footer
├── context/        # Language provider (dictionary, direction, Motion config)
├── data/           # Profile details and the project catalogue
├── lib/            # Language and theme cookie helpers
└── translations/   # en.json and ar.json
scripts/
└── verify-ui.mjs   # Playwright checks for filters, dialog, preferences, menu and form
```

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Environment variables

Create `.env.local`:

```env
# Web3Forms access key. Without it the form is replaced by an email link.
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
# Optional: canonical site URL (defaults to https://jawadyz-portfolio.vercel.app)
NEXT_PUBLIC_SITE_URL=https://jawadyz-portfolio.vercel.app
```

Set the same variables in the Vercel project settings for production.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

UI checks run against a production server started with a placeholder form key. Web3Forms requests are intercepted, so no message is sent:

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=placeholder npm run build
npx next start -p 3100
npm run verify:ui -- http://localhost:3100
```

The first run may need a browser: `npx playwright install chromium`.

## Contact

Jawad Yazbek - [jawadyazbek@gmail.com](mailto:jawadyazbek@gmail.com) - [GitHub](https://github.com/JawadYzbk) - [LinkedIn](https://www.linkedin.com/in/jawad-yazbek2k/)
