import type { Demo } from '@/content/ai-automations/types'
import { BeforeAfter, CallSim, ChatSim, DocSim, FanoutSim, FlowSim, TimelineSim } from './sims'

export function DemoSlot({ demo }: { demo: Demo }) {
  let sim
  switch (demo.kind) {
    case 'chat': sim = <ChatSim demo={demo} />; break
    case 'call': sim = <CallSim demo={demo} />; break
    case 'doc': sim = <DocSim demo={demo} />; break
    case 'timeline': sim = <TimelineSim demo={demo} />; break
    case 'flow': sim = <FlowSim demo={demo} />; break
    case 'fanout': sim = <FanoutSim demo={demo} />; break
    case 'beforeAfter': sim = <BeforeAfter demo={demo} />; break
  }
  return <div className="wv-ax-demo">{sim}</div>
}
