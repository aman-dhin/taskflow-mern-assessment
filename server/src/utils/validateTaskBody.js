import { AppError } from './AppError.js'

const STATUSES = ['todo', 'in_progress', 'review', 'done']
const PRIORITIES = ['low', 'medium', 'high', 'urgent']
const ASSIGNEE_IDS = ['user-1', 'user-2', 'user-3', 'user-4']

export function validateCreateTaskBody(body) {
  const errors = []

  const title = typeof body.title === 'string' ? body.title.trim() : ''
  if (!title) errors.push('title is required')
  else if (title.length < 3) errors.push('title must be at least 3 characters')
  else if (title.length > 120) errors.push('title must be 120 characters or fewer')

  if (!body.status) errors.push('status is required')
  else if (!STATUSES.includes(body.status)) errors.push('status is invalid')

  if (!body.priority) errors.push('priority is required')
  else if (!PRIORITIES.includes(body.priority)) errors.push('priority is invalid')

  if (!body.assigneeId) errors.push('assigneeId is required')
  else if (!ASSIGNEE_IDS.includes(body.assigneeId)) errors.push('assigneeId is invalid')

  let dueDate = null
  if (body.dueDate !== undefined && body.dueDate !== null && body.dueDate !== '') {
    const parsed = new Date(body.dueDate)
    if (Number.isNaN(parsed.getTime())) errors.push('dueDate is invalid')
    else dueDate = parsed
  }

  const description =
    typeof body.description === 'string' ? body.description.trim() : ''

  if (errors.length > 0) {
    throw new AppError(errors.join('; '), 400)
  }

  return {
    title,
    description,
    status: body.status,
    priority: body.priority,
    assigneeId: body.assigneeId,
    dueDate,
  }
}

export function validateUpdateTaskBody(body) {
  if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
    throw new AppError('Request body must include at least one field to update', 400)
  }

  const updates = {}
  const errors = []

  if (body.title !== undefined) {
    const title = typeof body.title === 'string' ? body.title.trim() : ''
    if (!title) errors.push('title cannot be empty')
    else if (title.length < 3) errors.push('title must be at least 3 characters')
    else if (title.length > 120) errors.push('title must be 120 characters or fewer')
    else updates.title = title
  }

  if (body.description !== undefined) {
    updates.description = typeof body.description === 'string' ? body.description.trim() : ''
  }

  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) errors.push('status is invalid')
    else updates.status = body.status
  }

  if (body.priority !== undefined) {
    if (!PRIORITIES.includes(body.priority)) errors.push('priority is invalid')
    else updates.priority = body.priority
  }

  if (body.assigneeId !== undefined) {
    if (!ASSIGNEE_IDS.includes(body.assigneeId)) errors.push('assigneeId is invalid')
    else updates.assigneeId = body.assigneeId
  }

  if (body.dueDate !== undefined) {
    if (body.dueDate === null || body.dueDate === '') {
      updates.dueDate = null
    } else {
      const parsed = new Date(body.dueDate)
      if (Number.isNaN(parsed.getTime())) errors.push('dueDate is invalid')
      else updates.dueDate = parsed
    }
  }

  if (errors.length > 0) {
    throw new AppError(errors.join('; '), 400)
  }

  return updates
}
