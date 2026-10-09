import { teamMembers } from '../../data/mockData'

export default function AssigneeAvatar({ assigneeId, showName = true }) {
  const member = teamMembers.find((m) => m.id === assigneeId)
  if (!member) {
    return <span className="text-sm text-stone-400">Unassigned</span>
  }

  return (
    <div className="flex items-center gap-2 min-w-0">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700"
        aria-hidden
      >
        {member.avatarInitials}
      </span>
      {showName ? (
        <span className="truncate text-sm text-stone-700">{member.name}</span>
      ) : null}
    </div>
  )
}
