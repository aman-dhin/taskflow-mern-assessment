import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import TaskStatusBadge from '../tasks/TaskStatusBadge'
import { formatRelative, isOverdue } from '../../utils/dateUtils'

export default function RecentTasksList({ tasks }) {
  if (tasks.length === 0) {
    return (
      <p className="text-sm text-stone-500">No tasks match your search.</p>
    )
  }

  return (
    <ul className="divide-y divide-stone-100">
      {tasks.map((task) => {
        const overdue = isOverdue(task.dueDate, task.status)
        return (
          <li key={task.id}>
            <Link
              to={`/tasks/${task.id}`}
              className="flex flex-col gap-2 py-3 transition-colors hover:bg-stone-50 sm:flex-row sm:items-center sm:justify-between sm:px-2 sm:rounded-lg"
            >
              <div className="min-w-0 text-left">
                <p className="truncate text-sm font-medium text-stone-900">{task.title}</p>
                <p className="text-xs text-stone-500">
                  Updated {formatRelative(task.updatedAt)}
                  {overdue ? (
                    <span className="ml-2 font-medium text-rose-600">Overdue</span>
                  ) : null}
                </p>
              </div>
              <TaskStatusBadge status={task.status} />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function ViewAllTasksLink() {
  return (
    <Link
      to="/tasks"
      className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
    >
      View all tasks
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  )
}
