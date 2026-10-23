#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
base64 -d roster.png.b64 > roster.png
base64 -d compose-ack.png.b64 > compose-ack.png
base64 -d send-flow.mp4.b64 > send-flow.mp4
echo "Decoded roster.png compose-ack.png send-flow.mp4"
