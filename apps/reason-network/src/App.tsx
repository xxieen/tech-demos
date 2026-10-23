import { useMemo, useState } from 'react'
import { Network, Plus, Send, Radio } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SELF_ID, initialSelf, seedMessages, seedPeers } from '@/data/seed'
import type { AgentSession, Message, Mode } from '@/types'

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function SessionFields({
  session,
  onChange,
  editable,
}: {
  session: AgentSession
  onChange?: (next: AgentSession) => void
  editable?: boolean
}) {
  const set = (key: keyof AgentSession, value: string | boolean) => {
    onChange?.({ ...session, [key]: value })
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="grid gap-1 text-xs font-medium text-muted-foreground">
        Display name
        <Input
          value={session.name}
          disabled={!editable}
          onChange={(e) => set('name', e.target.value)}
          data-testid="field-name"
        />
      </label>
      <label className="grid gap-1 text-xs font-medium text-muted-foreground">
        Machine
        <Input
          value={session.machine}
          disabled={!editable}
          onChange={(e) => set('machine', e.target.value)}
          data-testid="field-machine"
        />
      </label>
      <label className="grid gap-1 text-xs font-medium text-muted-foreground">
        Repo
        <Input
          value={session.repo}
          disabled={!editable}
          onChange={(e) => set('repo', e.target.value)}
          data-testid="field-repo"
        />
      </label>
      <label className="grid gap-1 text-xs font-medium text-muted-foreground">
        Branch
        <Input
          value={session.branch}
          disabled={!editable}
          onChange={(e) => set('branch', e.target.value)}
          data-testid="field-branch"
        />
      </label>
      <label className="grid gap-1 text-xs font-medium text-muted-foreground sm:col-span-2">
        Current task
        <Input
          value={session.task}
          disabled={!editable}
          onChange={(e) => set('task', e.target.value)}
          data-testid="field-task"
        />
      </label>
      {editable ? (
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            checked={session.busy}
            onChange={(e) => set('busy', e.target.checked)}
            data-testid="field-busy"
          />
          Mark this session as busy
        </label>
      ) : null}
    </div>
  )
}

export default function App() {
  const [mode, setMode] = useState<Mode>('demo')
  const [self, setSelf] = useState<AgentSession>(initialSelf)
  const [peers, setPeers] = useState<AgentSession[]>(seedPeers)
  const [messages, setMessages] = useState<Message[]>(seedMessages)
  const [selectedPeerId, setSelectedPeerId] = useState(seedPeers[0]?.id ?? '')
  const [draft, setDraft] = useState('')
  const [newPeerName, setNewPeerName] = useState('')

  const selectedPeer = useMemo(
    () => peers.find((p) => p.id === selectedPeerId) ?? peers[0],
    [peers, selectedPeerId],
  )

  const thread = useMemo(() => {
    if (!selectedPeer) return []
    return messages
      .filter(
        (m) =>
          (m.from === SELF_ID && m.to === selectedPeer.id) ||
          (m.from === selectedPeer.id && m.to === SELF_ID),
      )
      .sort((a, b) => a.at.localeCompare(b.at))
  }, [messages, selectedPeer])

  function addPeer() {
    const name = newPeerName.trim() || `peer@${uid('host')}`
    const peer: AgentSession = {
      id: uid('peer'),
      name,
      machine: 'local-sim',
      repo: 'sandbox/demo',
      branch: 'main',
      task: 'Idle — waiting for ping',
      busy: false,
    }
    setPeers((prev) => [...prev, peer])
    setSelectedPeerId(peer.id)
    setNewPeerName('')
  }

  function sendMessage() {
    const text = draft.trim()
    if (!text || !selectedPeer) return

    const outbound: Message = {
      id: uid('msg'),
      from: SELF_ID,
      to: selectedPeer.id,
      text,
      at: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, outbound])
    setDraft('')

    if (mode === 'demo') {
      window.setTimeout(() => {
        const ack: Message = {
          id: uid('ack'),
          from: selectedPeer.id,
          to: SELF_ID,
          text: `ack: got “${text.slice(0, 80)}” — still on ${selectedPeer.task}`,
          at: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, ack])
      }, 650)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-4 p-4 md:p-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary p-2 text-primary-foreground">
            <Network className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Reason Network demo</h1>
            <p className="text-sm text-muted-foreground">
              Sticky MVP — roster coding-agent sessions and ping a peer.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={mode === 'demo' ? 'busy' : 'idle'} data-testid="mode-badge">
            {mode === 'demo' ? 'Demo mode · local simulation' : 'Live mode stub'}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMode((m) => (m === 'demo' ? 'live' : 'demo'))}
            data-testid="toggle-mode"
          >
            <Radio className="h-4 w-4" />
            Switch to {mode === 'demo' ? 'Live' : 'Demo'}
          </Button>
        </div>
      </header>

      {mode === 'demo' ? (
        <div
          className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950"
          data-testid="demo-banner"
        >
          Demo mode: peers and replies are simulated in the browser. No Reason daemon or MCP
          calls run on this machine.
        </div>
      ) : (
        <div className="rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-950">
          Live stub: point a Reason-capable agent at{' '}
          <code className="rounded bg-white/70 px-1">https://mcp.reasonmachines.com/mcp</code>.
          This UI does not call MCP yet — roster/send stay local until a connector is wired.
        </div>
      )}

      <Tabs defaultValue="team" className="w-full">
        <TabsList data-testid="main-tabs">
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="compose">Compose</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>This session</CardTitle>
              <CardDescription>Editable local identity for the roster.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant={self.busy ? 'busy' : 'idle'}>
                  {self.busy ? 'Busy' : 'Idle'}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {self.repo}@{self.branch}
                </span>
              </div>
              <SessionFields session={self} editable onChange={setSelf} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Peers</CardTitle>
              <CardDescription>Seeded demo sessions + optional local add.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2" data-testid="peer-list">
                {peers.map((peer) => (
                  <li key={peer.id}>
                    <button
                      type="button"
                      className={`w-full rounded-md border px-3 py-2 text-left transition hover:bg-accent ${
                        selectedPeerId === peer.id ? 'border-primary bg-accent' : 'bg-card'
                      }`}
                      onClick={() => setSelectedPeerId(peer.id)}
                      data-testid={`peer-${peer.id}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium">{peer.name}</span>
                        <Badge variant={peer.busy ? 'busy' : 'idle'}>
                          {peer.busy ? 'Busy' : 'Idle'}
                        </Badge>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {peer.machine} · {peer.repo}@{peer.branch}
                      </div>
                      <div className="mt-1 text-sm">{peer.task}</div>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <Input
                  placeholder="Add peer display name"
                  value={newPeerName}
                  onChange={(e) => setNewPeerName(e.target.value)}
                  data-testid="add-peer-name"
                />
                <Button type="button" variant="secondary" onClick={addPeer} data-testid="add-peer">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compose">
          <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Address</CardTitle>
                <CardDescription>Pick a peer to message.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {peers.map((peer) => (
                  <Button
                    key={peer.id}
                    variant={selectedPeerId === peer.id ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setSelectedPeerId(peer.id)}
                  >
                    {peer.name}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Transcript · {selectedPeer?.name ?? 'no peer'}
                </CardTitle>
                <CardDescription>
                  Outbound messages stay local; Demo mode auto-acks from the peer.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div
                  className="flex max-h-80 min-h-48 flex-col gap-2 overflow-y-auto rounded-md border bg-muted/40 p-3"
                  data-testid="transcript"
                >
                  {thread.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No messages yet with this peer.</p>
                  ) : (
                    thread.map((m) => {
                      const mine = m.from === SELF_ID
                      return (
                        <div
                          key={m.id}
                          className={`max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-sm ${
                            mine
                              ? 'ml-auto bg-primary text-primary-foreground'
                              : 'bg-card'
                          }`}
                          data-testid={mine ? 'msg-out' : 'msg-in'}
                        >
                          <div className="mb-1 text-[10px] uppercase tracking-wide opacity-70">
                            {mine ? self.name : selectedPeer?.name} · {formatTime(m.at)}
                          </div>
                          {m.text}
                        </div>
                      )
                    })
                  )}
                </div>
                <Textarea
                  placeholder={
                    selectedPeer
                      ? `Message ${selectedPeer.name}…`
                      : 'Select a peer first'
                  }
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  data-testid="compose-input"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={sendMessage}
                    disabled={!draft.trim() || !selectedPeer}
                    data-testid="send-message"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <footer className="pb-4 text-xs text-muted-foreground">
        Inspired by{' '}
        <a className="underline" href="https://reasonmachines.com/network" target="_blank" rel="noreferrer">
          Reason Network
        </a>{' '}
        · engine{' '}
        <a
          className="underline"
          href="https://github.com/reason-machines/reason-network"
          target="_blank"
          rel="noreferrer"
        >
          reason-machines/reason-network
        </a>
      </footer>
    </div>
  )
}
