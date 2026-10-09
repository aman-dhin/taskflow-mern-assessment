import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { AlertCircle, CheckCircle2, ClipboardList, LoaderCircle } from 'lucide-react'
import TaskPageShell from '../components/layout/TaskPageShell'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import CompletionProgress from '../components/dashboard/CompletionProgress'
import RecentTasksList, { ViewAllTasksLink } from '../components/dashboard/RecentTasksList'
import StatCard from '../components/dashboard/StatCard'
import { useAppPreferences } from '../context/AppPreferencesContext'
import { useTasks } from '../context/TaskContext'
import { computeTaskMetrics, getRecentTasks } from '../utils/taskUtils'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const { tasks } = useTasks()
  const { profile, workspace } = useAppPreferences()
  const { headerSearch = '' } = useOutletContext() ?? {}

  const metrics = useMemo(() => computeTaskMetrics(tasks), [tasks])

  const recentTasks = useMemo(() => {
    const recent = getRecentTasks(tasks, 8)
    const q = headerSearch.trim().toLowerCase()
    if (!q) return recent.slice(0, 5)
    return recent.filter((t) => t.title.toLowerCase().includes(q)).slice(0, 5)
  }, [tasks, headerSearch])

  return (
    <TaskPageShell>
    <div className="space-y-6">
      <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-left">
        <p className="text-sm text-stone-500">{workspace.name}</p>
        <h2 className="mt-1 text-xl font-semibold text-stone-900">
          {getGreeting()}, {profile.name.split(' ')[0]}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          Here&apos;s a snapshot of task health across your workspace. Metrics update automatically
          when you create, edit, or complete tasks.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total tasks" value={metrics.total} icon={ClipboardList} />
        <StatCard
          label="Completed"
          value={metrics.completed}
          icon={CheckCircle2}
          tone="success"
        />
        <StatCard
          label="In progress"
          value={metrics.inProgress}
          icon={LoaderCircle}
          tone="accent"
        />
        <StatCard
          label="Overdue"
          value={metrics.overdue}
          hint="Open tasks past due date"
          icon={AlertCircle}
          tone="danger"
        />
      </div>

      <CompletionProgress
        completionRate={metrics.completionRate}
        completed={metrics.completed}
        total={metrics.total}
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm xl:col-span-2 text-left">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-stone-900">Recent tasks</h2>
              <p className="text-xs text-stone-500">Sorted by last updated</p>
            </div>
            <ViewAllTasksLink />
          </div>
          <RecentTasksList tasks={recentTasks} />
        </section>

        <ActivityFeed />
      </div>
    </div>
    </TaskPageShell>
  )
}
