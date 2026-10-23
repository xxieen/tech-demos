# Agent rules — tech-demos

## Hard constraints

- **Never** create a new GitHub repository for a demo. Everything lives in this sticky monorepo.
- Only add or update files under `apps/<kebab-slug>/` for a given demo run.
- Do not rewrite root tooling, delete other apps, or change `tracking/` unless the human asked.
- Runtime: **Bun**. Each app must be self-contained: `bun install && bun run dev` from `apps/<slug>/`.
- Before any `bun install` / `bun add` in a new app, ensure that app has `bunfig.toml` with:

```toml
[install]
minimumReleaseAge = 259200
```

- Plan with the in-repo skill at `skills/project-planning/` and write `apps/<slug>/PLAN.md` before coding.
- Open **one** PR per demo.
- Validation artifacts are **required** on every PR: at least **one screenshot** AND at least **one video** of the running app. Not optional.
- Prefer prebuilt scaffolds (`bunx create-next-app`, `create-vite`, `create-t3-app`, `create-tanstack`, …) over hand-rolled skeletons.
- Single-user MVP first. Defer anything not on the path to a working demo.

## Model

Initial prototypes: use **Claude Fable 5** (`claude-fable-5`). Do not default to Composer unless the owner asks.

## Preview deploys

Cloudflare Pages: one Pages project for the whole repo, path per `apps/<slug>/` — not one project per app. Secrets (on the repo): `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.
