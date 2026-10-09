import Badge from '../ui/Badge'
import { TASK_STATUSES } from '../../data/constants'

const toneByStatus = {
  todo: 'slate',
  in_progress: 'indigo',
  review: 'amber',
  done: 'emerald',
}

export default function TaskStatusBadge({ status }) {
  const label = TASK_STATUSES.find((s) => s.value === status)?.label ?? status
  return <Badge tone={toneByStatus[status] ?? 'neutral'}>{label}</Badge>
}
