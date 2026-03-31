# Wedding Invitation Design

Wedding Invitation Design is a frontend-first Next.js demo for showcasing a premium Indian invitation-builder flow. It is designed to work well as a Vercel demo project, with a polished landing page, category browsing, themed invite packs, a loading/generation step, and a lightweight browser-based editor experience.

## Demo Flow

- Landing page with premium positioning and clear CTAs
- Login/setup step that stores lightweight client-side session details
- Occasion selection for Indian family functions
- Template/product browsing with pricing and theme filters
- Browser-only loading/generation transition
- Canva-style invite editor with draggable text and sticker layers

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

## Local Development

Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Vercel Deployment

This project is ready for Vercel as a static-friendly frontend demo:

- No backend is required for the main flow
- Selection and editor state are stored in `localStorage` and `sessionStorage`
- Remote images are configured in [`next.config.ts`](./next.config.ts)
- Production build output is verified with `npm run build`

To deploy later, import the GitHub repository into Vercel and use the default Next.js settings.

## Project Structure

- `app/` routes for the end-to-end invite flow
- `components/` shared header and footer
- `public/images/` local assets available for future template expansion

## Notes

- The current experience is intentionally frontend-based for easy demo hosting
- If a backend is added later, it can remain optional and browser-first for the demo path
- This repo is a strong starting point for a later Vercel showcase or portfolio demo

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)
