# Handoff

State of this project as of **2026-10-18**, written so a future session can pick up from a clean
clone. See [CLAUDE.md](CLAUDE.md) for how to work in the code, [README.md](README.md) for what the
site is.

## Where things stand

The showcase is **complete and working**. Nothing is half-finished or left broken.

Built over two sessions:

1. Built the six-page Canvas Kit v16 showcase, verified in a browser.
2. Deployed it to GitHub Pages, then took the site down when the repo went private (see below).

Verified at the time of writing:

- `npm run build` passes clean — typecheck and production build.
- All six pages render with no console errors.
- Interactions work: modal opens, table search narrows 12 → 4 rows with pagination collapsing,
  column sort reorders, tabs switch panels.

## Repo and deployment status

**The repo is private and the Pages site is down. This was deliberate.**

The site was live and working at `https://zachmichael.github.io/workdayCanvasKitDemo/`. It was taken
down by making the repo private: GitHub Pages requires a public repo on the Free plan, so the site
unpublishes automatically.

Why not keep it private *and* published: that needs GitHub Pro (~$4/month), and Pro would only hide
the source — a Pages site published from a private repo is still **publicly reachable on the
internet**. Genuinely access-controlled Pages needs an organization on Enterprise Cloud. Paying to
hide the code while the site stayed public was not worth it. There is nothing sensitive in this repo
anyway: mock employee data, no secrets, no credentials.

### Re-publishing the site (~2 minutes, no code changes)

Everything needed is already committed.

1. Make the repo public: **Settings → General → Danger Zone → Change visibility**.
2. **Settings → Pages → Source: GitHub Actions**.
3. Re-enable the push trigger in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) by
   uncommenting the `push:` block (it was reduced to `workflow_dispatch` so it would not fail on
   every push while private — see below).
4. Push, or run the workflow manually from the Actions tab.

Deployment config already in place:

- `base: '/workdayCanvasKitDemo/'` in [vite.config.ts](vite.config.ts) — project pages serve from a
  subpath. Override with the `VITE_BASE` env var for a custom domain or a renamed repo.
- `BrowserRouter basename={import.meta.env.BASE_URL}` in [src/main.tsx](src/main.tsx).
- A Vite plugin copies `index.html` to `dist/404.html`. Pages has no SPA rewrite, so without it a
  hard refresh on a deep link 404s.

### Known quirk if you re-publish

Deep links render correctly but return an **HTTP 404 status**. That is inherent to the Pages SPA
fallback: GitHub serves `404.html` (the app shell) with a 404 status while preserving the URL, so
the browser renders the right page. Invisible to users; crawlers and link checkers will treat every
route except `/` as missing. If that ever matters, switch to `HashRouter` — URLs become
`/#/tokens` and everything serves 200 from `index.html`.

### Why the workflow no longer runs on push

With the repo private on a Free plan, `actions/configure-pages` fails on every run. Left on the push
trigger it would fail on every commit, burning Actions minutes and sending failure emails. The
trigger is now `workflow_dispatch` only. The build steps are unchanged and were last seen passing.

## Decisions worth not re-litigating

- **Curated six pages, not a full catalog.** Deliberately not a Storybook clone.
- **No test suite.** A static showcase's tests would exercise React, not the demo. The build
  (which typechecks) is the gate.
- **Mock data only**, in [src/data/employees.ts](src/data/employees.ts). No backend by design.
- **Local `StatusPill` instead of `StatusIndicator`**, which is deprecated in v16. Doubles as a
  `createStencil` demo.
- **Single bundle, no code splitting.** 602 kB / 165 kB gzipped. Fine for a demo; see below.

## Possible next steps

None of these are required — the project is in a finished state.

- **Code splitting.** The bundle is one 602 kB chunk and Vite warns about it. `React.lazy` per
  route would be the obvious fix if this ever becomes more than a demo.
- **Dark mode.** Canvas tokens support it; the site currently only renders light.
- **More components.** `Pill`, `Expandable`, `InformationHighlight`, `SidePanel` and `ColorPicker`
  are all in the installed package but not yet shown.
- **Responsive pass.** The layout collapses the sidebar under 800px but has not been carefully
  tested on a real phone.
- **Copy-to-clipboard** on the code snippets in `DemoSection`.

## Environment gotchas

Carried over because they cost time once already — details in [CLAUDE.md](CLAUDE.md). Briefly: do
not rewrite source files with PowerShell `Get-Content`/`Set-Content` (it double-encodes UTF-8
punctuation), and the Bash tool was unusable in one session with PowerShell as the only working
shell.
