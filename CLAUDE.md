# CLAUDE.md

Context for Claude Code sessions in this repo. Read [HANDOFF.md](HANDOFF.md) for the full state of
the work and what to do next; this file covers how to work in the codebase.

## What this is

A Workday Canvas Kit v16 component showcase — a static demo site, no backend, no auth, no secrets.
Vite + React 18 + TypeScript. Six pages of live examples, each paired with its source snippet.
See [README.md](README.md) for the user-facing description.

## Commands

```bash
npm install        # first time after cloning
npm run dev        # dev server at http://localhost:5173
npm run typecheck  # tsc --noEmit
npm run build      # typecheck, then production build to dist/
npm run preview    # serve the production build
```

`npm run build` runs `tsc --noEmit` first, so it is the single check that matters before committing.
There is no test suite — for a static showcase, unit tests would be testing React, not the demo.
Verify changes by running the dev server and looking at the affected page.

## Verify Canvas Kit APIs against node_modules, not memory

Canvas Kit v16 renamed and deprecated a lot, and its published types do not always match what the
styling stencils accept. Several things in this repo exist because the obvious API was wrong. Before
writing a component you have not used here yet, read its source under
`node_modules/@workday/canvas-kit-react/<module>/lib/` — the compound sub-components and model
config are legible there and are the ground truth.

Known traps, each already worked around in this codebase (details in [README.md](README.md)):

- Token JS exports are CSS **variable names**, not values. Use them bare inside
  `createStyles`/`createStencil`; wrap in `cssVar()` anywhere else.
- Space style props are **physical** (`marginTop`), not logical (`marginBlockStart`).
- `iconPosition="only"` works at runtime but is typed `'start' | 'end'`. The cast lives in
  [src/components/IconButton.tsx](src/components/IconButton.tsx) — reuse it, do not scatter casts.
- `Tabs.Item` and `Tabs.Panel` need matching `data-id`s or **no panel renders at all**, silently.
- `StatusIndicator` is deprecated; use [src/components/StatusPill.tsx](src/components/StatusPill.tsx).

## Conventions

- Every example is wrapped in `<DemoSection title description code>`, which renders the heading, the
  live component, and a collapsible source snippet. Add new examples that way.
- The `code` prop is a hand-written string, not generated from the live element. When you change an
  example, change its snippet too or the two drift apart.
- Styling goes through `createStyles`/`createStencil` with system tokens. No CSS framework, and
  avoid hard-coded px — the point of the demo is to show the token system.
- Prose in `description` props is plain text. Do not use backticks; they render literally.

## Windows environment notes

- **Do not rewrite source files with PowerShell `Get-Content`/`Set-Content`.** It misreads UTF-8 and
  double-encodes punctuation (em dashes become `â€"`). This happened once and needed a repair pass.
  Use the Edit/Write tools instead.
- In one session the Bash tool was non-functional (every command exited 1 with no output) and
  PowerShell was the only working shell. If Bash misbehaves, fall back rather than debugging it.
- PowerShell has no heredocs — use a single-quoted here-string (`@'` … `'@`) for commit messages.
- `npm create vite@latest` did not work non-interactively here; the scaffold was written by hand.
