import Badge from '../ui/Badge'
import { demoActivityFeed } from '../../data/mockData'
import { DEMO_ACTIVITY_LABEL } from '../../data/constants'
import { formatRelative } from '../../utils/dateUtils'

export default function ActivityFeed() {
  return (
    <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-stone-900">Activity</h2>
        <Badge tone="slate">{DEMO_ACTIVITY_LABEL}</Badge>
      </div>
      <ul className="space-y-4">
        {demoActivityFeed.map((item) => (
          <li key={item.id} className="flex gap-3 text-left">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-stone-300" aria-hidden />
            <div className="min-w-0">
              <p className="text-sm text-stone-700">{item.message}</p>
              <p className="mt-1 text-xs text-stone-500">{formatRelative(item.timestamp)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
