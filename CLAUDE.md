# Pulse Frontend

Pulse is a habit + mood tracking app. This is the React frontend.

## Commands

```bash
npm run dev        # Start dev server on localhost:3000
npm run build      # Type-check (tsc) + Vite production build
npm run lint       # OXlint
npx tsc --noEmit   # Type-check only (use this to verify before committing)
```

Always run `npx tsc --noEmit` before considering work done. Fix all type errors.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Routing | React Router DOM 7 |
| State | Zustand 5 (client), TanStack React Query 5 (server) |
| HTTP | Axios |
| Forms | React Hook Form + Zod |
| Styling | Tailwind CSS 4 (Vite plugin) |
| Icons | Lucide React |
| Toasts | Sonner |

## Project Structure

```
src/
├── app/             # App shell: App.tsx, providers.tsx, router.tsx
├── assets/          # Static assets (images, icons)
├── components/
│   ├── common/      # Reusable components (buttons, modals, etc.)
│   ├── layout/      # Shell layouts (sidebar, navbar, etc.)
│   └── ui/          # Low-level design primitives
├── config/          # env.ts — typed environment variables
├── features/        # Feature modules (see below)
├── hooks/           # Shared hooks
├── lib/             # Configured libraries (axios.ts, query-client.ts, utils.ts)
├── stores/          # Global Zustand stores
├── styles/          # globals.css (Tailwind theme)
├── types/           # Shared TypeScript types
└── utils/           # Pure utility functions
```

## Feature Module Pattern

Every feature lives in `src/features/<name>/` with this structure:

```
features/<name>/
├── api/           # API call functions (used by hooks)
├── components/    # Feature-specific React components
├── hooks/         # React Query hooks + custom hooks
├── stores/        # Zustand stores scoped to this feature
├── types/         # Types + Zod schemas
└── utils/         # Feature-specific helpers
```

Only create subdirectories that are needed. Don't add empty folders or .gitkeep files.

## Coding Conventions

### TypeScript
- Strict mode. No `any`. No `// @ts-ignore`.
- Use `interface` for object shapes, `type` for unions/intersections.
- Export types from `features/<name>/types/index.ts`.

### Components
- Function components only. No `React.FC`.
- Props interface defined inline above the component (not exported unless reused).
- Colocate closely related components in one file only if they're small and private.

### Styling
- Tailwind utility classes only. No CSS modules, no styled-components, no inline `style={}` (except rare SVG cases).
- Use the `cn()` helper from `@/lib/utils` for conditional classes.
- Use design tokens from `globals.css` (e.g., `text-foreground`, `bg-card`, `border-input`). Don't hardcode hex colors in components.

### Typography Scale
The app uses Inter 400/500 only. No bold (600/700) anywhere.

| Role | Classes |
|---|---|
| Page heading | `text-[25px] font-medium tracking-[-0.6px]` |
| Body | `text-[14px]` (base) |
| Secondary | `text-[13.5px] text-muted-foreground` |
| Buttons | `text-[13.5px] font-medium` |
| Meta/captions | `text-[12px]` |
| Field labels | `text-[11px] font-medium uppercase tracking-[0.8px]` |
| Tabular numbers | `style={{ fontVariantNumeric: "tabular-nums" }}` on timers/counts |

### State Management
- **Server state** (API data): React Query with mutations/queries in `hooks/`.
- **Client state** (UI, auth): Zustand stores in `stores/`.
- **Form state**: React Hook Form + Zod schemas.
- Don't use React Context for state. Don't use Redux.

### API Layer
- API functions go in `features/<name>/api/`. They call `api` from `@/lib/axios`.
- React Query hooks in `features/<name>/hooks/` wrap these with `useMutation`/`useQuery`.
- Error messages from the API come in `{ error: string }` format. Extract with `error.response?.data?.error`.
- The axios instance auto-attaches Bearer tokens and handles 401 refresh. Don't manually handle auth headers in feature code.

### Forms
- Always validate with Zod schemas. Define schemas in `types/index.ts`.
- Use `@hookform/resolvers/zod` to connect.
- Pass `isPending` from mutation hooks to disable submit buttons (not the form's own `isSubmitting`).

### Routing
- Routes defined in `src/app/router.tsx`.
- Auth routes wrapped in `<RedirectIfAuth />` (redirects to `/` if logged in).
- Protected routes wrapped in `<RequireAuth />` (redirects to `/login` if not logged in).

### Commits
- Use conventional commits: `feat(scope):`, `fix(scope):`, `chore:`, `refactor:`.
- One logical change per commit.

## Reference Docs

Detailed specs live in `docs/`:
- `docs/api/` — Backend API contracts
- `docs/design/` — Design system, colors, typography
- `docs/features/` — Feature requirements and flows

Always check these docs before implementing a feature.

## Don'ts

- Don't add comments to obvious code.
- Don't create wrapper components for single-use cases.
- Don't add `console.log` — use toast for user-facing feedback.
- Don't import from one feature into another. Shared code goes in `src/components/`, `src/hooks/`, or `src/utils/`.
- Don't use `font-bold` or `font-semibold` — the design system uses 400/500 only.
