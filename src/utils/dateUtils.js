export function formatDate(isoString) {
  if (!isoString) return '—'
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function formatRelative(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  const diffMs = date.getTime() - Date.now()
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays === -1) return 'Yesterday'
  if (diffDays > 1 && diffDays < 7) return `In ${diffDays} days`
  if (diffDays < -1 && diffDays > -7) return `${Math.abs(diffDays)} days ago`

  return formatDate(isoString)
}

export function isOverdue(isoString, status) {
  if (!isoString || status === 'done') return false
  const due = new Date(isoString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)
  return due < today
}

export function toInputDateValue(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return ''
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function fromInputDateValue(value) {
  if (!value) return null
  const date = new Date(`${value}T12:00:00`)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}
