# Zeinab Soufi — Developer Portfolio

Interactive bilingual (**English LTR / Persian RTL**) developer portfolio built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Three.js**.

> **Architecture Note:** This repository is a client-side **React + TypeScript + Vite** frontend application. Any Django/DRF code snippets, endpoints, and architecture diagrams inside the interactive terminal, Contact payload preview, and Django Architecture modal are **illustrative blueprints/simulations** rather than a live backend server.

## Tech Stack

- **UI & State:** React 19, TypeScript 7, Tailwind CSS v4
- **3D Graphics:** Three.js (`WebGLRenderer`, `RoomEnvironment` + `PMREMGenerator`, procedural geometry)
- **Icons:** Lucide React
- **Build Tooling:** Vite 8
- **Testing:** Vitest, React Testing Library, `@testing-library/jest-dom`, jsdom

## Features

- **Bilingual & Bidirectional (`EN` / `FA`):** Instant language switching with dynamic `lang` and `dir="ltr" | "rtl"` updates, plus dark/light theme switching.
- **Accessible Modals (WCAG 2.2 AA):** Focus trapping (`Tab` / `Shift+Tab`), `Escape` dismissal, background scroll locking, and focus restoration to the triggering element via `useFocusTrap`.
- **Scroll Progress & Active Section Bar:** Independent `role="progressbar"` telemetry paired with an interactive active-section jump button.
- **Interactive 3D Core (`Three.js`):** Translucent glass sphere enclosing a 10-part procedural neon butterfly, with `prefers-reduced-motion` static mode, tab-visibility / viewport pausing, full GPU disposal, and static SVG fallback when WebGL is unavailable.
- **Transparent Contact Drafts:** Client-side validation generating an encoded `mailto:` draft to open in the visitor's email client, alongside an optional sample JSON payload preview.

## Getting Started

### Prerequisites

- Node.js 20+ (tested on Node 22)

### Installation

```bash
npm install
```

### Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite development server at `http://localhost:3000` |
| `npm run build` | Build production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript type checking (`tsc --noEmit`) |
| `npm test` | Run automated unit & integration tests (`vitest run`) |

### Environment Variables

No environment variables or API keys are required to build or run this portfolio.

## Project Structure

```text
├── index.html                  # Document metadata, fonts, and root mount
├── public/
│   └── assets/portfolio/       # Portfolio illustrations and neon butterfly PNGs
├── src/
│   ├── App.tsx                 # Main layout, theme/language state, modal orchestration
│   ├── index.css               # Tailwind v4 entry, CSS theme tokens, reduced-motion CSS
│   ├── components/             # Sections, bento cards, Three.js scene, and modals
│   ├── data/                   # Portfolio content (portfolioData.ts) & translations
│   ├── hooks/                  # useFocusTrap, useScrollProgress
│   └── test/                   # Vitest + React Testing Library test suites
├── tsconfig.json               # Strict TypeScript configuration
├── vite.config.ts              # Vite build & dev server configuration
└── vitest.config.ts            # Vitest jsdom test runner configuration
```

## Deployment

Build the static bundle with `npm run build` and deploy the `dist/` directory to any static host (Vercel, Netlify, Cloudflare Pages, or GitHub Pages). Ensure `public/assets/portfolio/` assets are served at `/assets/portfolio/...`.
