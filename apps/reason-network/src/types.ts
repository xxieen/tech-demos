export type AgentSession = {
  id: string
  name: string
  machine: string
  repo: string
  branch: string
  task: string
  busy: boolean
}

export type Message = {
  id: string
  from: string
  to: string
  text: string
  at: string
}

export type Mode = 'demo' | 'live'
