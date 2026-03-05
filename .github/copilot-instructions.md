# Copilot instructions for this repository

## Project context
- This is a Next.js App Router project using TypeScript, React 19 RC, Vercel AI SDK, NextAuth v5 beta, Drizzle ORM, Tailwind CSS, and shadcn/ui.
- Package manager is `pnpm`.
- Use path alias imports with `@/*`.

## Architecture and structure
- Keep route handlers under `app/**/api/**/route.ts`.
- Keep auth logic in `app/(auth)` and chat logic in `app/(chat)`.
- Keep DB schema in `db/schema.ts` and DB access functions in `db/queries.ts`.
- Keep reusable UI primitives in `components/ui` and app-specific components in `components/custom`.

## Coding conventions
- Use TypeScript with strict typing; avoid `any` unless absolutely necessary.
- Prefer named exports for components and utilities.
- Use single quotes and semicolons, matching Prettier config.
- Use 2-space indentation and trailing commas where valid in ES5.
- Prefer small, focused functions and early returns for validation/error paths.
- Do not add unnecessary inline comments.

## React and Next.js guidance
- Default to Server Components; add `'use client';` only when hooks/browser APIs are required.
- In client components, keep state minimal and colocated.
- For async server logic, prefer server actions or route handlers in existing project patterns.
- Preserve existing URL/history behavior in chat flows (e.g., `window.history.replaceState` in `Chat`).

## API and AI patterns
- For AI chat responses, follow existing `streamText` pattern in `app/(chat)/api/chat/route.ts`.
- Validate incoming request data and return explicit HTTP status codes (`401`, `404`, `500`, etc.).
- Ensure model names are validated against `lib/model.ts` before invocation.
- Keep tool definitions in AI calls typed with `zod` schemas when parameters are needed.

## Database patterns (Drizzle)
- Update `db/schema.ts` first for schema changes, then add migration files under `lib/drizzle`.
- Keep DB access in `db/queries.ts`; avoid querying DB directly from UI components.
- Preserve existing `try/catch` + `console.error` pattern in query helpers.
- Keep query functions single-purpose and return typed results.

## UI and styling
- Use existing shadcn/ui components from `components/ui` before creating new primitives.
- Use Tailwind utility classes and existing design tokens (`bg-background`, `text-muted-foreground`, etc.).
- Keep interaction patterns consistent with existing components (button variants, spacing, rounded styles).

## Quality checks
- Run `pnpm lint` for lint validation.
- For build-impacting changes, run `pnpm build` (this also runs DB migrate script configured in `package.json`).
- Keep changes minimal and scoped to the requested feature/fix.

## What to avoid
- Do not introduce new state management libraries.
- Do not replace existing styling system or component primitives.
- Do not refactor unrelated files in the same change.
- Do not add secrets or hardcoded environment values.