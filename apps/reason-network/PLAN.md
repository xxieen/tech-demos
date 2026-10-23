# Reason Network — demo plan

## Goal

A single-user web demo that makes Reason Network’s core idea tangible: coding-agent sessions on a shared roster (who / machine / repo@branch / busy), with a way to address one peer and send a short message.

## Single-user MVP

**In**

- One screen (or two tight tabs): **Team** roster + **Compose** message.
- Local “this session” card editable by the user (display name, machine label, repo, branch, current task, busy/idle).
- At least one peer session visible (seeded demo peers + optional “add peer” for local play).
- Send a message to a selected peer; show it in a local transcript (outbound + simulated reply in demo mode).
- Clear labeling when running in **Demo mode** (no live daemon) vs **Live** (if/when wired to Reason MCP or engine later).
- Self-contained under `apps/reason-network/`: `bun install && bun run dev`.
- `bunfig.toml` with `minimumReleaseAge = 259200` before install.

**Out**

- Installing Reason CLI / daemon on the bot computer (hosted assistants must not; product docs say use MCP instead).
- Full E2E encryption / iroh transport reimplementation.
- Multiplayer persistence, auth, invite-link flows, file attachments.
- Real multi-agent orchestration beyond the roster + message UI.

## Outcome-oriented tasks

1. Scaffold with `bunx create-vite` (React + TypeScript) under `apps/reason-network/`; add `bunfig.toml`; skip framework-grade Next unless routing needs appear.
2. Init shadcn/ui (minimalist); add only card, button, input, badge, textarea, tabs as needed.
3. Domain model: `AgentSession` `{ id, name, machine, repo, branch, task, busy }` + `Message` `{ id, from, to, text, at }`.
4. Team roster UI: this-session editor + peer list with busy badges.
5. Compose + transcript: pick peer, send, append outbound; demo-mode auto-ack from peer.
6. Toggle or banner for Demo vs Live; Live stub that documents MCP URL `https://mcp.reasonmachines.com/mcp` without blocking MVP.
7. README: how to run, what is simulated, links to product + open-source engine.
8. Validation: screenshot of roster + short video of send/reply before PR.

## Stack

| Choice | Why |
| --- | --- |
| Bun | Repo default; `bun install && bun run dev`. |
| Vite + React + TS | One-screen utility; lighter than Next. |
| shadcn/ui | Fast, consistent chrome without inventing a design system. |
| Local state (React) | Single user; no backend required for MVP. |

References: [product](https://reasonmachines.com/network), [engine](https://github.com/reason-machines/reason-network), [agent skill](https://reasonmachines.com/network/skill.md).

## Deferred

- Wire Live mode to Reason MCP (`list_team` / `send_message` / `check_inbox`) once the owner connects that connector.
- Cloudflare Pages path preview for `apps/reason-network/`.
- Menu-bar / native notify parity (`ask_user`).

## Validation (required on PR)

- ≥1 screenshot of the running app
- ≥1 video of roster + send message flow
