export const TASK_STATUSES = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review', label: 'In Review' },
  { value: 'done', label: 'Done' },
]

export const TASK_PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
]

export const STORAGE_KEYS = {
  tasks: 'taskflow_tasks',
  tasksMigration: 'taskflow_tasks_migration',
  profile: 'taskflow_profile',
  workspace: 'taskflow_workspace',
}

export const DEMO_ACTIVITY_LABEL = 'Demo activity'
