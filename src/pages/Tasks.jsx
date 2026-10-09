import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ListFilter } from 'lucide-react'
import TaskPageShell from '../components/layout/TaskPageShell'
import EmptyState from '../components/ui/EmptyState'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import TaskFilters from '../components/tasks/TaskFilters'
import TaskForm from '../components/tasks/TaskForm'
import TaskTable from '../components/tasks/TaskTable'
import { useTasks } from '../context/TaskContext'
import { filterAndSortTasks } from '../utils/taskUtils'

export default function Tasks() {
  const { tasks, updateTask } = useTasks()
  const [searchParams, setSearchParams] = useSearchParams()
  const [status, setStatus] = useState('all')
  const [priority, setPriority] = useState('all')
  const [sortDueDate, setSortDueDate] = useState('none')
  const [editTask, setEditTask] = useState(null)

  const search = searchParams.get('search') ?? ''

  const filteredTasks = useMemo(
    () =>
      filterAndSortTasks(tasks, {
        search,
        status,
        priority,
        sortDueDate,
      }),
    [tasks, search, status, priority, sortDueDate],
  )

  const hasActiveFilters =
    search.trim() || status !== 'all' || priority !== 'all' || sortDueDate !== 'none'

  const resetFilters = () => {
    setSearchParams({})
    setStatus('all')
    setPriority('all')
    setSortDueDate('none')
  }

  const handleSearchChange = (value) => {
    if (value) setSearchParams({ search: value })
    else setSearchParams({})
  }

  const handleEditSubmit = async (payload) => {
    if (!editTask) return
    await updateTask(editTask.id, payload)
    setEditTask(null)
  }

  return (
    <TaskPageShell>
    <div className="space-y-4">
      <TaskFilters
        search={search}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={setStatus}
        priority={priority}
        onPriorityChange={setPriority}
        sortDueDate={sortDueDate}
        onSortChange={setSortDueDate}
      />

      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={ListFilter}
          title={hasActiveFilters ? 'No tasks match your filters' : 'No tasks yet'}
          description={
            hasActiveFilters
              ? 'Try adjusting search, status, priority, or sort options.'
              : 'Create your first task using the Add task button.'
          }
          action={
            hasActiveFilters ? (
              <Button variant="secondary" onClick={resetFilters}>
                Reset filters
              </Button>
            ) : null
          }
        />
      ) : (
        <TaskTable tasks={filteredTasks} onEdit={setEditTask} />
      )}

      <Modal
        open={Boolean(editTask)}
        onClose={() => setEditTask(null)}
        title="Edit task"
        description="Updates are saved through the TaskFlow API."
      >
        {editTask ? (
          <TaskForm
            key={editTask.id}
            initialTask={editTask}
            submitLabel="Save changes"
            onCancel={() => setEditTask(null)}
            onSubmit={handleEditSubmit}
          />
        ) : null}
      </Modal>
    </div>
    </TaskPageShell>
  )
}
