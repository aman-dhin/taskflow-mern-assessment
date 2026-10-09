const DEFAULT_BASE = 'http://localhost:5001/api'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function getApiBaseUrl() {
  const base = import.meta.env.VITE_API_URL || DEFAULT_BASE
  return base.replace(/\/$/, '')
}

export async function apiRequest(path, options = {}) {
  const url = `${getApiBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`
  const headers = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...options.headers,
  }

  let response
  try {
    response = await fetch(url, { ...options, headers })
  } catch {
    throw new ApiError(
      'Unable to reach the TaskFlow API. Is the server running?',
      0,
    )
  }

  if (response.status === 204) {
    return null
  }

  let data = null
  const text = await response.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = { message: text }
    }
  }

  if (!response.ok) {
    throw new ApiError(data?.message || response.statusText, response.status)
  }

  return data
}
