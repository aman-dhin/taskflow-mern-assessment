import { STORAGE_KEYS } from '../data/constants'
import { createTask } from '../api/tasksApi.js'

export function readLegacyLocalTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.tasks)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function isLocalTaskMigrationSettled() {
  const value = localStorage.getItem(STORAGE_KEYS.tasksMigration)
  return value === 'done' || value === 'dismissed'
}

export function markLocalTaskMigrationComplete() {
  localStorage.setItem(STORAGE_KEYS.tasksMigration, 'done')
  localStorage.removeItem(STORAGE_KEYS.tasks)
}

export function dismissLocalTaskMigration() {
  localStorage.setItem(STORAGE_KEYS.tasksMigration, 'dismissed')
  localStorage.removeItem(STORAGE_KEYS.tasks)
}

export async function importLegacyLocalTasks(legacyTasks) {
  const created = []
  for (const task of legacyTasks) {
    const createdTask = await createTask({
      title: task.title,
      description: task.description ?? '',
      status: task.status,
      priority: task.priority,
      assigneeId: task.assigneeId,
      dueDate: task.dueDate ?? null,
    })
    created.push(createdTask)
  }
  markLocalTaskMigrationComplete()
  return created
}
