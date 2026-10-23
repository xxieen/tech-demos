import type { AgentSession, Message } from '@/types'

export const SELF_ID = 'self'

export const initialSelf: AgentSession = {
  id: SELF_ID,
  name: 'you@laptop',
  machine: 'macbook-pro',
  repo: 'xxieen/tech-demos',
  branch: 'demo/reason-network',
  task: 'Ship Reason Network sticky demo',
  busy: true,
}

export const seedPeers: AgentSession[] = [
  {
    id: 'peer-claude',
    name: 'claude@workstation',
    machine: 'linux-box-01',
    repo: 'acme/payments-api',
    branch: 'feat/webhooks',
    task: 'Wire Stripe webhook retries',
    busy: true,
  },
  {
    id: 'peer-codex',
    name: 'codex@ci',
    machine: 'github-runner',
    repo: 'acme/payments-api',
    branch: 'main',
    task: 'Flaky e2e triage',
    busy: false,
  },
  {
    id: 'peer-cursor',
    name: 'cursor@desktop',
    machine: 'studio-pc',
    repo: 'acme/design-system',
    branch: 'chore/tokens',
    task: 'Refresh spacing tokens',
    busy: true,
  },
]

export const seedMessages: Message[] = [
  {
    id: 'm1',
    from: 'peer-claude',
    to: SELF_ID,
    text: 'Heads up — webhook retries land in feat/webhooks. Can you skim the PR?',
    at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
]
