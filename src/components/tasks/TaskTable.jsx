import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import AssigneeAvatar from './AssigneeAvatar'
import PriorityBadge from './PriorityBadge'
import TaskStatusBadge from './TaskStatusBadge'
import Button from '../ui/Button'
import { formatDate, isOverdue } from '../../utils/dateUtils'

export default function TaskTable({ tasks, onEdit }) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-100 text-left text-sm">
            <thead className="bg-stone-50 text-xs font-medium uppercase tracking-wide text-stone-500">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Task
                </th>
                <th scope="col" className="px-4 py-3">
                  Priority
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Due date
                </th>
                <th scope="col" className="px-4 py-3">
                  Assignee
                </th>
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {tasks.map((task) => (
                <TaskRow key={task.id} task={task} onEdit={onEdit} variant="table" />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} onEdit={onEdit} variant="card" />
        ))}
      </div>
    </>
  )
}

function TaskRow({ task, onEdit, variant }) {
  const overdue = isOverdue(task.dueDate, task.status)

  if (variant === 'card') {
    return (
      <article className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 text-left">
            <Link to={`/tasks/${task.id}`} className="text-sm font-semibold text-stone-900">
              {task.title}
            </Link>
            <p className="mt-1 line-clamp-2 text-xs text-stone-500">{task.description}</p>
          </div>
          <Button variant="ghost" size="sm" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <TaskStatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <AssigneeAvatar assigneeId={task.assigneeId} />
          <p className={`text-xs ${overdue ? 'font-medium text-rose-600' : 'text-stone-500'}`}>
            Due {formatDate(task.dueDate)}
          </p>
        </div>
      </article>
    )
  }

  return (
    <tr className="hover:bg-stone-50/80">
      <td className="px-4 py-3 align-top">
        <Link to={`/tasks/${task.id}`} className="font-medium text-stone-900 hover:text-indigo-700">
          {task.title}
        </Link>
        <p className="mt-0.5 line-clamp-1 max-w-md text-xs text-stone-500">{task.description}</p>
      </td>
      <td className="px-4 py-3 align-top">
        <PriorityBadge priority={task.priority} />
      </td>
      <td className="px-4 py-3 align-top">
        <TaskStatusBadge status={task.status} />
      </td>
      <td className={`px-4 py-3 align-top ${overdue ? 'font-medium text-rose-600' : 'text-stone-600'}`}>
        {formatDate(task.dueDate)}
      </td>
      <td className="px-4 py-3 align-top">
        <AssigneeAvatar assigneeId={task.assigneeId} />
      </td>
      <td className="px-4 py-3 align-top text-right">
        <Button variant="ghost" size="sm" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}>
          <Pencil className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  )
}
