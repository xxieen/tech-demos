# tech-demos

Sticky monorepo for weekday X-bookmark tech demos.

One app per pick under `apps/<slug>/`. Cloud agents only touch that folder, plan with `skills/project-planning/`, open one PR, and attach **both** a screenshot and a video of the running app.

## Layout

- `AGENTS.md` — rules for cloud agents
- `skills/project-planning/` — MVP planning skill (vendored)
- `apps/<slug>/` — self-contained demos (`bun install && bun run dev`)
- `tracking/seen-bookmarks.json` — proposed / built bookmark ids

## Stack defaults

- Bun runtime + package manager
- Prefer official `bunx create-*` scaffolds
- UI: shadcn/ui when there is a UI
- Model for initial prototypes: Claude Fable 5 (`claude-fable-5`)
