# Desca OS

**Learn. Track. Grow.**

Desca OS is a streamlined, local-first learning library and personal workspace. It brings together advanced academic resources, postgraduate preparation, selected activity records, and useful financial and work information—without requiring daily schedules or task administration.

## What to expect

The principal navigation deliberately contains **five hubs**:

| Hub | Primary purpose |
| --- | --- |
| **Home** | Postgraduate preparation, meaningful progress, and direct access to frequently used learning resources |
| **Goals** | Master's degree preparation, prospective universities, scholarships, and application documents |
| **Learning** | A consolidated directory for Mathematics, English, SAT preparation, psychometric reasoning, and Research & AI |
| **Lifestyle** | Selected personal records, including exercise, reading, wellbeing, and prayer |
| **Finance & Work** | Financial records, workstreams, payments, and related insights |

The Learning Library is available at `/#library`. It integrates the existing subject catalogues without duplicating their entries. Search resources by name or topic; use subject, advanced-study, recent, or favourites filters; and sort the results by recommendation or alphabetical order. A three-stage academic pathway connects mathematical foundations, postgraduate study, and original research.

You can **open a source**, **favourite it**, or **save a personal link**. Recently accessed links and existing subject-specific favourites are reflected in the integrated collection. Access conditions and fees are indicative; verify current terms with each provider.

Specialised study tools and older workspaces remain accessible where relevant. Their existence does not make tasks, calendars, recurring plans, or deadlines compulsory. The main navigation intentionally avoids separate task and scheduling hubs.

## Design principles

- **Minimal navigation:** keep the primary experience focused on five hubs rather than proliferating pages.
- **Low-friction interactions:** prioritise one-click filters, favourites, shortcuts, and reusable records.
- **Academic depth:** retain research-grade resources, not merely beginner tutorials.
- **Accessible presentation:** readable light and dark themes, keyboard focus indicators, responsive layouts, and reduced-motion support.
- **English-language interface:** interface copy is designed for clear, sophisticated academic English. Provider names and personal content retain their original forms.
- **Local-first data:** the application remains useful without a login or an always-on service.

## Run locally

The frontend is static and requires no package manager or build command.

```bash
python3 -m http.server 3000
```

Visit `http://localhost:3000`. Serve the files over HTTP rather than opening `index.html` directly, particularly when testing service-worker behaviour.

## Verification

Syntax checks and basic runtime tests can be invoked from the repository root:

```bash
node --check app.js
node --check learning-library.js
node --check sw.js
node tests/runtime-smoke.js
```

An additional browser smoke test is provided in `tests/browser-smoke.mjs` and exercised through GitHub Actions with Playwright. It checks representative navigation, learning resources, persistence, themes, and mobile layouts.

## Data storage and privacy

The principal application state is stored in the browser using `localStorage`. You can export and import a JSON backup. An optional Supabase integration supports authenticated cloud storage when configured by the user. Never place an administrative or service-role API key in frontend code.

The application does **not** require Google Calendar integration. Some optional legacy Google Tasks or Drive backup workflows may remain in the codebase; they are not part of the streamlined main navigation.

## Offline use and updates

Desca OS is a progressive web app with a service worker. Core static assets are cached for offline access after a successful visit. The service worker only intercepts same-origin static assets and page navigations; it does not cache third-party learning sites. When a script or stylesheet is unavailable offline and was not previously cached, it reports a failed request rather than returning an HTML page as if it were JavaScript or CSS.

Static assets are versioned to reduce stale-cache conflicts after deployment.

## Deployment

This repository can be hosted as a static project on GitHub Pages, Vercel, Netlify, or another static host. For Vercel, select **Other / Static**, leave the build command empty, and use the repository root as the output directory.

## Repository structure

- `index.html` — accessible application shell
- `app.js` — application state, routing, and feature integration
- `learning-library.js` and `learning-library.css` — unified resource catalogue, pathways, filters, and styles
- `math-hub.*`, `sat-hub.*`, `psikotes-hub.*` — subject-specific resources
- `styles.css`, `ui-v21.css`, `ui-optimizations.css` — shared visual foundations and interface refinements
- `sw.js` — offline caching and related service-worker functionality
- `tests/` — runtime and browser regression checks
- `version.json` — application version metadata

## Contributing

Keep changes focused, preserve existing local user records, and avoid expanding the main navigation unnecessarily. New features should improve independent learning or a concrete workflow rather than introduce additional administrative obligations.
