# Reason Network sticky demo

Single-user Vite + React demo of [Reason Network](https://reasonmachines.com/network)’s core idea: a roster of coding-agent sessions (who / machine / repo@branch / busy) plus a compose/transcript pane to address one peer.

## Run

```bash
cd apps/reason-network
bun install
bun run dev
```

Then open the URL Vite prints (default `http://127.0.0.1:5173`).

`bunfig.toml` sets `minimumReleaseAge = 259200` (3 days) before installs.

## What is simulated

- **Demo mode (default):** peers are seeded in the browser; sending a message appends a local outbound entry and a delayed auto-ack from the selected peer. No Reason CLI/daemon is installed or started.
- **Live stub:** UI can flip to a Live banner that documents the MCP endpoint `https://mcp.reasonmachines.com/mcp`. This app does **not** call MCP yet.

## Stack

- Bun + Vite + React + TypeScript
- Tailwind CSS v4 + minimal shadcn-style primitives (card, button, input, badge, textarea, tabs)

## References

- Product: https://reasonmachines.com/network
- Engine: https://github.com/reason-machines/reason-network
- Plan: [`PLAN.md`](./PLAN.md)

## Validation

See [`validation/`](./validation/) for screenshot + short video of the roster and send flow (attached on the PR).
