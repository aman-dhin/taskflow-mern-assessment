import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import AssigneeAvatar from '../components/tasks/AssigneeAvatar'
import PriorityBadge from '../components/tasks/PriorityBadge'
import TaskForm from '../components/tasks/TaskForm'
import TaskStatusBadge from '../components/tasks/TaskStatusBadge'
import TaskPageShell from '../components/layout/TaskPageShell'
import Button from '../components/ui/Button'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import Modal from '../components/ui/Modal'
import { TASK_STATUSES } from '../data/constants'
import { useTasks } from '../context/TaskContext'
import { formatDate, formatRelative, isOverdue } from '../utils/dateUtils'

export default function TaskDetails() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { loading, getTaskById, updateTask, deleteTask } = useTasks()
  const task = getTaskById(taskId)

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  if (loading && !task) {
    return (
      <TaskPageShell>
        <div />
      </TaskPageShell>
    )
  }

  if (!task) {
    return (
      <TaskPageShell>
      <div className="mx-auto max-w-lg rounded-xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">Task not found</h2>
        <p className="mt-2 text-sm text-stone-500">
          This task may have been deleted or the link is incorrect.
        </p>
        <Button className="mt-6" onClick={() => navigate('/tasks')}>
          Back to tasks
        </Button>
      </div>
      </TaskPageShell>
    )
  }

  const overdue = isOverdue(task.dueDate, task.status)

  const handleStatusChange = async (e) => {
    try {
      await updateTask(task.id, { status: e.target.value })
    } catch {
      /* TaskPageShell shows API errors on refresh; keep select value from server state */
    }
  }

  const handleDelete = async () => {
    await deleteTask(task.id)
    setDeleteOpen(false)
    navigate('/tasks')
  }

  return (
    <TaskPageShell>
    <div className="mx-auto max-w-3xl space-y-4 text-left">
      <Link
        to="/tasks"
        className="inline-flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-stone-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to tasks
      </Link>

      <article className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <TaskStatusBadge status={task.status} />
              <PriorityBadge priority={task.priority} />
              {overdue ? (
                <span className="text-xs font-medium text-rose-600">Overdue</span>
              ) : null}
            </div>
            <h2 className="mt-3 text-xl font-semibold text-stone-900">{task.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              {task.description || 'No description provided.'}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button variant="secondary" onClick={() => setEditOpen(true)}>
              <Pencil className="h-4 w-4" aria-hidden />
              Edit
            </Button>
            <Button variant="secondary" onClick={() => setDeleteOpen(true)}>
              <Trash2 className="h-4 w-4 text-red-600" aria-hidden />
              Delete
            </Button>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 border-t border-stone-100 pt-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">Assignee</dt>
            <dd className="mt-2">
              <AssigneeAvatar assigneeId={task.assigneeId} />
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">Due date</dt>
            <dd className={`mt-2 text-sm ${overdue ? 'font-medium text-rose-600' : 'text-stone-800'}`}>
              {formatDate(task.dueDate)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">Created</dt>
            <dd className="mt-2 text-sm text-stone-800">{formatDate(task.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">Last updated</dt>
            <dd className="mt-2 text-sm text-stone-800">{formatRelative(task.updatedAt)}</dd>
          </div>
        </dl>

        <div className="mt-6 border-t border-stone-100 pt-6">
          <label htmlFor="detail-status" className="block text-sm font-medium text-stone-700">
            Quick status update
          </label>
          <select
            id="detail-status"
            value={task.status}
            onChange={handleStatusChange}
            className="mt-2 w-full max-w-xs rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            {TASK_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </article>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit task">
        <TaskForm
          key={task.id}
          initialTask={task}
          submitLabel="Save changes"
          onCancel={() => setEditOpen(false)}
          onSubmit={(payload) => {
            updateTask(task.id, payload)
            setEditOpen(false)
          }}
        />
      </Modal>

      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete task?"
        message={`"${task.title}" will be removed from this workspace. This action cannot be undone.`}
        confirmLabel="Delete task"
      />
    </div>
    </TaskPageShell>
  )
}
