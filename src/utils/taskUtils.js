import { isOverdue } from './dateUtils'

export function computeTaskMetrics(tasks) {
  const total = tasks.length
  const completed = tasks.filter((t) => t.status === 'done').length
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length
  const overdue = tasks.filter((t) => isOverdue(t.dueDate, t.status)).length
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100)

  return { total, completed, inProgress, overdue, completionRate }
}

export function getRecentTasks(tasks, limit = 5) {
  return [...tasks]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, limit)
}

export function filterAndSortTasks(tasks, { search, status, priority, sortDueDate }) {
  let result = [...tasks]

  const q = search.trim().toLowerCase()
  if (q) {
    result = result.filter((t) => t.title.toLowerCase().includes(q))
  }

  if (status && status !== 'all') {
    result = result.filter((t) => t.status === status)
  }

  if (priority && priority !== 'all') {
    result = result.filter((t) => t.priority === priority)
  }

  if (sortDueDate === 'asc') {
    result.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate) - new Date(b.dueDate)
    })
  } else if (sortDueDate === 'desc') {
    result.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(b.dueDate) - new Date(a.dueDate)
    })
  }

  return result
}

export function validateTaskForm(values) {
  const errors = {}
  const title = values.title?.trim() ?? ''

  if (!title) {
    errors.title = 'Title is required.'
  } else if (title.length < 3) {
    errors.title = 'Title must be at least 3 characters.'
  } else if (title.length > 120) {
    errors.title = 'Title must be 120 characters or fewer.'
  }

  if (!values.assigneeId) {
    errors.assigneeId = 'Select an assignee.'
  }

  if (!values.status) {
    errors.status = 'Select a status.'
  }

  if (!values.priority) {
    errors.priority = 'Select a priority.'
  }

  if (values.dueDate) {
    const parsed = new Date(`${values.dueDate}T12:00:00`)
    if (Number.isNaN(parsed.getTime())) {
      errors.dueDate = 'Enter a valid due date.'
    }
  }

  return errors
}

export function createTaskId() {
  return `task-${crypto.randomUUID()}`
}
