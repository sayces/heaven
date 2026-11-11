# AGENTS.md

## Run

- `npm start` runs `src/app.ts` through `nodemon` + `tsx` on hardcoded port `5000`; no `.env` loading.
- Quick check: `curl localhost:5000/ping` -> `pong`.
- No build, test, lint, or CI scripts exist. Do not invent them; the only verification command is `npx tsc --noEmit`.
- Typecheck baseline (verified): `npx tsc --noEmit` currently fails with three `TS6133` unused-`req` errors in `src/app.ts`, `src/controllers/user/user.controller.ts`, and `src/router/index.ts`. Rename new unused params to `_req`; don't treat the existing errors as regressions.

## Architecture

- Express 5 ESM flow: `src/app.ts` -> `src/router` -> `src/controllers` -> `src/models`. `/ping` is the health route; everything else is under `/api`.
- `UserModel` is re-exported from `src/models/index.ts` and operates on a mutable in-memory array seeded in `src/models/user/user.mock.ts`. All data resets on restart; there is no database or persistence.
- `src/docs.md` describes an aspirational services/repositories/config layout that does not exist. Follow the actual `router`/`controller`/`model` structure.
- `@/*` maps to `src/*` and is resolved by `tsx`; do not run the app with plain `node` or `ts-node`. `tsconfig.json` uses `noEmit`, `allowImportingTsExtensions`, and `erasableSyntaxOnly` (no enums, namespaces, or parameter properties).
- `package-lock.json` is gitignored and currently untracked; leave it out of commits.

## API and data quirks

- User routes are `POST /api/users/create` (not `POST /api/users`), `GET /api/users`, and `GET|PUT|DELETE /api/users/:id`.
- Seed user: `{ id: "1", name: "sasha", password: "1111" }`. Use it for manual curl checks.
- `UserModel.removeById` and `updateById` throw for missing IDs, so the controllers' 404 branches are unreachable; missing users return `500`, as does creating a duplicate `name`. `getById` returns `null` and does produce `404`.
- Model error strings and some comments are Russian; keep them consistent when editing nearby code.
