import { apiRequest } from './apiClient.js'

export function fetchTasks() {
  return apiRequest('/tasks')
}

export function fetchTaskById(id) {
  return apiRequest(`/tasks/${id}`)
}

export function createTask(payload) {
  return apiRequest('/tasks', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateTaskById(id, payload) {
  return apiRequest(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export function deleteTaskById(id) {
  return apiRequest(`/tasks/${id}`, {
    method: 'DELETE',
  })
}
