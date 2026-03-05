# Arman Portfolio Chatbot

An interactive AI portfolio app where visitors can chat with your profile, projects, and experience instead of reading a static page.

## What this app does

- Lets users ask questions about your background, work, and skills in a conversational interface.
- Shows project cards and detailed project context inside the chat flow.
- Displays a rolling skills rail with technology logos on the right side of the chat.
- Supports authentication and persistent chat history per user.
- Uses a custom system prompt (`prompt/systemprompt.txt`) to shape portfolio-specific responses.

## Core features

- **Portfolio AI chat** powered by Vercel AI SDK streaming.
- **Project showcase** backed by database data.
- **Skills showcase** using logo URLs (stored in Vercel Blob) from the `Skills` table.
- **Auth flow** with NextAuth v5 beta (email/password + magic link support in schema).
- **Persistent data** in Postgres (Neon via Vercel Postgres).
- **Modern UI** built with Next.js App Router, Tailwind, and shadcn/ui.

## Tech stack

- Next.js 15 (App Router)
- React 19 RC + TypeScript
- Vercel AI SDK
- NextAuth.js v5 beta
- Drizzle ORM + PostgreSQL
- Vercel Blob
- Tailwind CSS + shadcn/ui

## Data model (high level)

- `User`: account/auth fields, optional company relation
- `Company`: name + `logoUrl`
- `Project`: portfolio projects (`name`, `description`, `content`, dates, logo)
- `Skills`: `name`, `rating`, `logoUrl`, `createdAt`
- `Chat`: persisted message history per user

## Getting started

1. Install dependencies:

```bash
pnpm install
```

2. Create your env file:

```bash
cp .env.example .env.local
```

3. Fill required values in `.env.local`:

- `OPENAI_API_KEY`
- `AUTH_SECRET`
- `POSTGRES_URL`
- `BLOB_READ_WRITE_TOKEN`

4. Run database migrations:

```bash
npx drizzle-kit migrate
```

5. Start development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful scripts

- `pnpm dev` – start local dev server
- `pnpm lint` – run lint checks
- `pnpm build` – run DB migrate script + Next.js production build
- `pnpm start` – start production server

## Personalization tips

- Update your AI behavior in `prompt/systemprompt.txt`.
- Add/edit projects in the `Project` table.
- Add/edit skills logos in the `Skills` table (Blob URLs recommended).
- Add your company/personal logo in `Company.logoUrl` for chat branding.

## Project structure

- `app/(auth)` – authentication routes and pages
- `app/(chat)` – main chat pages + API routes
- `components/custom` – app-specific UI (chat, project list, skills rail, etc.)
- `db/schema.ts` – Drizzle schema
- `db/queries.ts` – database access layer
- `lib/drizzle` – SQL migrations

---

If you want to use this as your own portfolio, start by editing the system prompt and seeding your projects/skills data first.
