import { TASK_PRIORITIES, TASK_STATUSES } from '../../data/constants'
import { inputClassName } from '../ui/FormField'

export default function TaskFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  sortDueDate,
  onSortChange,
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor="task-search" className="mb-1.5 block text-xs font-medium text-stone-500">
            Search by title
          </label>
          <input
            id="task-search"
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter tasks…"
            className={inputClassName(false)}
          />
        </div>

        <div>
          <label htmlFor="filter-status" className="mb-1.5 block text-xs font-medium text-stone-500">
            Status
          </label>
          <select
            id="filter-status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className={inputClassName(false)}
          >
            <option value="all">All statuses</option>
            {TASK_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="filter-priority"
            className="mb-1.5 block text-xs font-medium text-stone-500"
          >
            Priority
          </label>
          <select
            id="filter-priority"
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className={inputClassName(false)}
          >
            <option value="all">All priorities</option>
            {TASK_PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sort-due" className="mb-1.5 block text-xs font-medium text-stone-500">
            Sort by due date
          </label>
          <select
            id="sort-due"
            value={sortDueDate}
            onChange={(e) => onSortChange(e.target.value)}
            className={inputClassName(false)}
          >
            <option value="none">Default order</option>
            <option value="asc">Due date (earliest)</option>
            <option value="desc">Due date (latest)</option>
          </select>
        </div>
      </div>
    </div>
  )
}
