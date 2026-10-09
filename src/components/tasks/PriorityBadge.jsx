import Badge from '../ui/Badge'
import { TASK_PRIORITIES } from '../../data/constants'

const toneByPriority = {
  low: 'neutral',
  medium: 'slate',
  high: 'amber',
  urgent: 'rose',
}

export default function PriorityBadge({ priority }) {
  const label = TASK_PRIORITIES.find((p) => p.value === priority)?.label ?? priority
  return <Badge tone={toneByPriority[priority] ?? 'neutral'}>{label}</Badge>
}
