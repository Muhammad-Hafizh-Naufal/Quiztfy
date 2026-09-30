# Tech Quiztify

React + Vite frontend for technology quizzes. The redesigned interface uses cream, navy, yellow and sage, with Indonesian copy and responsive layouts.

## Run locally

Install dependencies and start the frontend:

```sh
npm install
npm run dev
```

On Windows PowerShell with restricted script execution, use `npm.cmd`.

The default API remains `https://quizz-be.vercel.app/api`. To use the backend in this workspace, create `.env.local` from `.env.example`:

```dotenv
VITE_API_URL=http://localhost:3000/api
```

Restart Vite after changing the environment. From `../Quizz-BE`, run `npm install` and `npm run dev`. The backend expects `DATABASE_URL`, `DIRECT_URL` and `JWT_SECRET` in its existing environment. No schema migration is required for this redesign.

## Routes

- `/`: home and featured quizzes
- `/course`: searchable quiz collection
- `/quiz/:id`: authenticated quiz and answer review
- `/login`, `/register`: authentication
- `/leaderboard`: podium and rankings
- `/about`: product introduction
- `/materi`: searchable material collection; optional `?quizId=1` filters a topic
- `/materi/:id`: video lessons, text, illustrations and quiz access
- `/materi/:id?section=10`: direct link to a lesson section
- `/comming`: preparation notice

Home, materials, the catalog and leaderboard can be browsed before login. Starting a quiz requires a valid session.

## Code map

- `src/main.jsx`: router entry
- `src/redesign/App.jsx`: navigation, page layouts, catalog and authentication
- `src/redesign/Quiz.jsx`: timed quiz, submission and server-scored review
- `src/redesign/Materials.jsx`: material catalog, lesson navigation and YouTube player
- `src/redesign/materials.css`: responsive learning-room styles
- `src/redesign/useResource.js`: shared API loading, retry and error state
- `src/redesign/api.js`: API URL, bearer token and error handling
- `src/redesign/theme.css`: design tokens, component styles and responsive rules

Older page/component files are retained for reference; they are no longer mounted by the entry point. The original quiz page re-exports the new implementation.

Question options accept both the original double-encoded JSON strings and single-encoded strings. Answer keys are only returned after submission by the updated backend. Results use server scoring. A timeout is submitted as an empty string. First completion of each quiz earns leaderboard points; subsequent practice returns a review without adding points. Existing answers count as prior completion.

Deploy the backend updates together with this frontend to enable private answer keys, question counts and first-completion scoring. The frontend can still render responses from the previous backend, but the previous backend does not enforce the new scoring rule.

## Existing material data

The material feature reads the existing `Material -> MaterialSection -> MaterialImage` relations. The live database stores YouTube URLs in both `MaterialSection.content` and `MaterialImage.imageUrl`. The API recognizes both sources, deduplicates repeated videos within a section, and separates actual image URLs from videos. No data was moved, overwritten or seeded.

Supported video sources are YouTube watch/share/embed/shorts/live links. URLs become canonical allowlisted YouTube embeds. A valid link does not guarantee the video is still public or allows embedding; the player always includes a direct YouTube fallback. Missing or unsupported video sources keep the section visible, including text and illustrations.

Existing tables have no duration or ordering fields. Counts come from real data and lessons use ascending IDs; the interface does not invent durations. `MaterialScore` is mapped for schema compatibility but this feature does not write learning scores or claim to track video completion.

Public endpoints:

- `GET /api/materials`: catalog (also accepts `?quizId=1`)
- `GET /api/materials/:id`: material with normalized sections and videos
- `GET /api/quiz/:id/materials`: materials for a quiz

The Prisma schema now maps the material tables already present in the configured database, plus existing answer metadata. Run `npx prisma generate` in `Quizz-BE` after pulling this change. On Windows, stop the local backend first if its Prisma engine DLL is locked, then restart it. No database migration or reset was run. A fresh database created solely from the old migration files will need the existing material schema reconciled before using these endpoints; do not apply a destructive reset to the populated database.

Deploy the updated backend before releasing the material frontend. API 404/503 responses are shown as retryable loading errors, while an empty material collection still provides a quiz link.

## Checks

```sh
npm run build
npm run lint
npm run test:ui
```

Browser tests use installed Google Chrome (`channel: "chrome"`). If Chrome is absent, install it or switch the Playwright configuration to bundled Chromium and run `npx playwright install chromium`.

All API requests in browser tests are intercepted with explicit fixtures; tests do not create accounts or scores in the real database. Coverage includes desktop/tablet/mobile layouts, search, registration/login, quiz scoring, legacy options, timer expiry, API recovery, retry, material filtering, lesson navigation, missing video, embed validation and quiz links. Screenshots are saved under ignored `test-results/`.

Backend checks from `../Quizz-BE`:

```sh
npm test
npx tsc --noEmit
```

Backend tests mock Prisma and validate answer-key selection, timeout answers, submission validation, first-completion scoring, transaction conflicts, material responses and legacy video URL normalization. They do not connect to the database. Deployment and external YouTube playback are not exercised by these automated checks.
