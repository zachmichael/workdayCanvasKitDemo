# Canvas Kit Demo

A component showcase for [Workday Canvas Kit](https://workday.github.io/canvas-kit/) v16, built
with Vite + React 18 + TypeScript. Six pages of live, interactive examples, each paired with the
source that produced it.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Typecheck, then production build to `dist/` |
| `npm run preview` | Serve the production build |

## Pages

- **Buttons** — the four intents, sizes, icon placement, disabled and full-width, hyperlinks
- **Forms & Inputs** — a working validated form, `FormField` error/caution states, checkboxes,
  radio groups, switches, `Select`
- **Data Display** — a filterable, sortable, paged worker directory using `Table`, `Avatar` and
  `Pagination`
- **Feedback** — `Banner`, `Toast`, `Modal`, `Dialog`, `Popup`, `Tooltip`, `LoadingDots`, `Skeleton`
- **Navigation** — `Tabs`, `Breadcrumbs`, `Menu`, `SegmentedControl`
- **Design Tokens** — colour, type, space, shape and depth scales rendered live from
  `@workday/canvas-tokens-web`

## Things worth knowing about Canvas Kit v16

These came up while building this and aren't obvious from the type definitions alone.

**Token CSS must be imported.** The JS token exports hold CSS *variable names*
(`"--cnvs-sys-space-x4"`), not values. Nothing resolves until the token stylesheets are loaded — see
[src/main.tsx](src/main.tsx). Inside `createStyles`/`createStencil` you can use the token directly;
anywhere else (inline styles, props typed as plain strings) wrap it in `cssVar()`.

**Roboto isn't bundled.** `--cnvs-base-font-family-50` resolves to `"Roboto"` with no fallback
stack, so the webfont is loaded from Google Fonts in [index.html](index.html). Skip that and the
whole type ramp falls back to the browser default serif.

**Style props are physical, not logical.** `marginTop` / `marginBottom` work on `Text`, `Flex` and
`Box`; `marginBlockStart` and friends do not.

**Icon-only buttons need a cast.** The button stencils support `iconPosition="only"`, but
`PrimaryButton`/`SecondaryButton`/`TertiaryButton` type the prop as `'start' | 'end'` — an upstream
typing gap. [src/components/IconButton.tsx](src/components/IconButton.tsx) keeps that cast in one
place.

**Tabs need explicit `data-id`s.** `Tabs.Item` defaults its id to the tab's text content while
`Tabs.Panel` defaults to its zero-based index, so the two never match and no panel renders. Always
pair them with matching `data-id`s.

**`StatusIndicator` is deprecated** in the main package (it moved to preview). The status chips here
are a local component built with `createStencil`, which doubles as a demo of the styling API — see
[src/components/StatusPill.tsx](src/components/StatusPill.tsx).

## Structure

```
src/
  components/    DemoSection, AppShell, PageHeader, StatusPill, IconButton, ErrorBoundary
  data/          mock employee records
  pages/         one file per showcase section
  App.tsx        routes + per-route error boundary
  main.tsx       token CSS imports, CanvasProvider, router
```

Every example lives inside a `<DemoSection>`, which renders the heading, the live component and a
collapsible source snippet.
