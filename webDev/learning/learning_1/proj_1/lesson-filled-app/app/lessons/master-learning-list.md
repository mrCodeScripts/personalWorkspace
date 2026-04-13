# React + Next.js + TypeScript — Master Learning List
> The actual shit you need. In order. No fluff.

---

## PHASE 1 — React Core (How it actually works)
> Foundation. Everything else breaks without this.

- [x] Render loop (how React runs your component)
- [x] useState (state, shelf, snapshot rule, batching)
- [x] Hydration (server vs client output comparison)
- [x] useEffect (side effects, timing, cleanup)
- [x] The dependency array ([], [value], no array — what each means)
- [x] Stale closures (the bug you WILL hit inside useEffect)
- [ ] Key prop (not just for lists — React's identity system)
- [ ] Reconciliation (how React diffs the tree, why components reset or don't)
- [ ] Component tree & re-render propagation (parent renders = children render)

> REACT PATTERN LIST
- [ ] Dynamic component mapping
- [ ] Compound components
- [ ] Custom hooks
- [ ] Render props
- [ ] Context + useReducer
- [ ] HOC
- [ ] Portal
- [ ] Optimistic UI

---

## PHASE 2 — React Hooks (All of them)
> Learn these in order. Each one builds on the last.

### State & Data
- [x] useState            — local state
- [ ] useReducer          — useState but for complex state logic (think mini redux)
- [ ] useContext          — share state across components without prop drilling

### Side Effects & Lifecycle
- [ ] useEffect           — run code after render (fetch, subscriptions, timers)
- [ ] useLayoutEffect     — like useEffect but fires before browser paints (rare)
- [ ] useInsertionEffect  — fires before DOM mutations (for CSS-in-JS libraries, rarely you)

### Performance / Optimization
- [ ] useMemo             — cache an expensive computed value
- [ ] useCallback         — cache a function so it doesn't get recreated every render
- [ ] memo (React.memo)   — prevent a child from re-rendering if props didn't change

### DOM & Refs
- [ ] useRef              — access DOM elements directly, or store a value without triggering re-render
- [ ] useImperativeHandle — customize what a ref exposes to a parent (used with forwardRef)

### Transitions & Concurrency (React 18+)
- [ ] useTransition       — mark state updates as non-urgent (keep UI responsive)
- [ ] useDeferredValue    — defer a value update so urgent renders go first

### Forms & Actions (React 19+ — you're on Next.js so this is relevant)
- [ ] useActionState      — manage state from a form action (replaces useFormState)
- [ ] useFormStatus       — read the pending/error state of a parent form action
- [ ] useOptimistic       — show optimistic UI instantly before server confirms

### External Store Sync
- [ ] useSyncExternalStore — subscribe to an external store outside React
                             (used by Redux, Zustand internals — rarely you directly)

### Utilities
- [ ] useId               — generate unique IDs stable across server and client (forms/a11y)
- [ ] useDebugValue       — label custom hooks in React DevTools (library authors mostly)

### Custom Hooks
- [ ] Writing your own hooks — extracting reusable stateful logic (this is where you level up)

## MUST KNOW — you'll use these daily:
  useState, useEffect, useRef, useContext,
  useReducer, useMemo, useCallback, memo

## GOOD TO KNOW — you'll use these situationally:
  useActionState, useOptimistic, useFormStatus,
  useTransition, useDeferredValue, useId, useLayoutEffect

## JUST KNOW THEY EXIST — rarely you directly:
  useSyncExternalStore, useInsertionEffect,
  useImperativeHandle, useDebugValue

---

## PHASE 3 — TypeScript in React
> You already know TS basics. This is just applying it right in React.

- [ ] Typing props (interface vs type, when to use which)
- [ ] Typing useState (when to annotate, when to let it infer)
- [ ] Typing events (React.MouseEvent, React.ChangeEvent, etc.)
- [ ] Typing refs (useRef<HTMLDivElement>(null))
- [ ] Typing children (React.ReactNode vs React.ReactElement vs JSX.Element)
- [ ] Typing context (createContext with proper generics)
- [ ] Typing custom hooks (return types, generic hooks)
- [ ] Typing async functions and fetch responses
- [ ] Utility types you'll actually use (Partial, Pick, Omit, Record, ReturnType)

---

## PHASE 4 — Next.js Core (App Router)
> The actual Next.js you're using. Pages router is legacy, skip it.

### Rendering Strategies (the big one)
- [ ] CSR  — Client Side Rendering (only in browser, "use client")
- [ ] SSR  — Server Side Rendering (rendered per request on server)
- [ ] SSG  — Static Site Generation (rendered once at build time)
- [ ] ISR  — Incremental Static Regeneration (SSG but auto-refreshes)
- [ ] When to use which (this is a skill by itself)

### App Router Fundamentals
- [ ] File-based routing (folders = routes)
- [ ] page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx
- [ ] Nested layouts (how they stack and when they re-render)
- [ ] Route groups (organizing without affecting URL)
- [ ] Dynamic routes ([slug], [...slug], [[...slug]])
- [ ] Parallel routes and intercepting routes (advanced, know they exist)

### Server vs Client Components
- [ ] What Server Components are (no JS sent to browser, no hooks, no events)
- [ ] What Client Components are ("use client" — full React, hooks, events)
- [ ] Rules: Server can import Client, Client CANNOT import Server
- [ ] When to use which (default to Server, opt into Client only when needed)
- [ ] Passing Server data into Client components via props

### Data Fetching
- [ ] fetch() in Server Components (native, no useEffect needed)
- [ ] async/await in server components
- [ ] Caching and revalidation (cache: 'force-cache', next: { revalidate: 60 })
- [ ] Loading and Suspense (loading.tsx, <Suspense> boundaries)
- [ ] Error boundaries (error.tsx)

### API Routes
- [ ] Route Handlers (route.ts — GET, POST, PATCH, DELETE)
- [ ] Reading request body, params, headers
- [ ] Returning NextResponse

### Navigation
- [ ] Link component (client-side navigation)
- [ ] useRouter (programmatic navigation — push, replace, back)
- [ ] usePathname, useSearchParams (reading current URL)
- [ ] redirect() and notFound() (server-side navigation)

### Metadata & SEO
- [ ] Static metadata (export const metadata)
- [ ] Dynamic metadata (generateMetadata function)
- [ ] Open Graph, Twitter cards

### Images & Fonts
- [ ] next/image (optimization, lazy loading, sizes)
- [ ] next/font (Google fonts, local fonts — zero layout shift)

### Middleware
- [ ] middleware.ts (runs before every request — auth checks, redirects, etc.)
- [ ] Matcher config (which routes middleware applies to)

---

## PHASE 5 — Patterns (Writing code that doesn't fall apart)
> This is what separates juniors from seniors.

- [ ] Lifting state up (when and why)
- [ ] Component composition (children, render props, compound components)
- [ ] Controlled vs uncontrolled components (forms)
- [ ] Context + useReducer pattern (poor man's global state)
- [ ] Custom hooks for data fetching
- [ ] Optimistic UI (update UI before server confirms)
- [ ] Error handling patterns (try/catch, error boundaries)
- [ ] Loading state patterns (skeletons, suspense)

---

## PHASE 6 — Performance
> Only matters when you actually feel the pain. Don't prematurely optimize.

- [ ] When React is slow (too many re-renders, expensive renders)
- [ ] React DevTools Profiler (find what's actually slow)
- [ ] memo, useMemo, useCallback (and when NOT to use them)
- [ ] Code splitting (dynamic imports, lazy loading components)
- [ ] Bundle size awareness (what you import matters)
- [ ] Image and font optimization (already covered in Next.js)

---

## WHAT TO IGNORE (for now)
> Real, but not your problem yet.

- Redux / Zustand / Jotai     — only if Context + useReducer isn't enough
- React Query / SWR           — only when data fetching gets complex
- Testing (Jest, RTL)         — important but learn it after you can build things
- Animations (Framer Motion)  — extra, not core
- Storybook                   — component docs, not needed early
- Deployment / DevOps         — Vercel handles 90% of it for Next.js

---

## THE ORDER TO ACTUALLY LEARN THEM

```
Phase 1 (render loop, hydration)         ← you're here, almost done
    ↓
Phase 2 (all hooks)                      ← next
    ↓
Phase 3 (TypeScript in React)            ← alongside Phase 2
    ↓
Phase 4 (Next.js App Router)             ← after hooks are solid
    ↓
Phase 5 (patterns)                       ← comes naturally as you build
    ↓
Phase 6 (performance)                    ← when you feel the pain
```

---

> Build something real between each phase.
> Reading alone won't make this stick.
