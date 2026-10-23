# Validation artifacts

Captured with Playwright against `bun run dev` on the bot box.

## Viewable on GitHub

- [`gallery.html`](./gallery.html) — embeds the Team roster + Compose/ack **screenshots** (open raw / local browser).
- `roster.png.b64` / `compose-ack.png.b64` / `send-flow.mp4.b64` — base64 of the binary captures (GitHub MCP cannot push raw binary from this agent).

## Decode binaries locally

```bash
base64 -d roster.png.b64 > roster.png
base64 -d compose-ack.png.b64 > compose-ack.png
base64 -d send-flow.mp4.b64 > send-flow.mp4
```

## Flow covered

1. Team tab: this-session editor + peer roster with busy badges (Demo mode banner).
2. Compose tab: send message to peer → demo-mode auto-ack appears in transcript.
