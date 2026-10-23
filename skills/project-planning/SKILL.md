---
name: project-planning
description: Turn a fresh demo idea into a focused, MVP-first plan that favors prebuilt solutions and opinionated frameworks over custom complexity. Use when scoping a new apps/<slug>/ demo.
---

# Project planning

## Workflow

1. Clarify the goal in one sentence and define the single-user MVP boundary: what ships in the first cut, what is explicitly out of scope.
2. Decompose the goal into a small set of manageable tasks. Group by user-visible outcome, not by layer.
3. Research frameworks and libraries that could absorb whole tasks. Prefer pre-built solutions unless a clear constraint rules them out.
4. Start from an official scaffold via `bunx create-*` instead of hand-rolling the project skeleton.
5. Before any dependency install, create or preserve `bunfig.toml` with `[install] minimumReleaseAge = 259200`. Prefer scaffold flags that skip the initial install, then run `bun install`.
6. Pick an opinionated framework (e.g. Next.js, TanStack Start) when it improves organization. Skip framework-grade tooling for one-screen utilities.
7. For UI, initialize shadcn/ui with a minimalist preset. Pull in components on demand.
8. Lay out components and services in a logical, opinionated structure before any code is written.
9. Decide the minimum useful testing surface and the minimum useful git-hook surface. Both default to small.
10. Produce a short plan: goal, MVP scope, task list, stack choices with one-line rationale, deferred items. Write it to `apps/<slug>/PLAN.md`.

## Planning rules

- Build for one user first.
- Use Bun as the runtime, package manager, and script runner by default.
- Start every new app from an official scaffold or template via `bunx create-*`.
- Every Bun project must include `bunfig.toml` with `minimumReleaseAge = 259200` under `[install]` before `bun install` or `bun add`.
- For UI, default to shadcn/ui with a minimalist preset.
- Prefer prebuilt over bespoke.
- Choose boring, well-documented defaults. Novelty is a cost, not a feature.
- Cut features before cutting clarity.
- Pick one opinionated framework per app.
- Organize by feature or domain, not by file type, once there is more than one screen.
- Write tests for critical logic and infrastructure only.
- Defer anything not on the path to a working MVP.
- Re-evaluate the plan once the first end-to-end slice runs.

## Output shape

A good `PLAN.md` is short, opinionated, and falsifiable:

- Goal in one sentence
- Single-user MVP + explicit outs
- Outcome-oriented task list (vertical slices)
- Stack with one-line rationale each
- Deferred items and why
