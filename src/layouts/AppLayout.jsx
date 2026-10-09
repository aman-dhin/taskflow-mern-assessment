import { useState } from 'react'
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import Modal from '../components/ui/Modal'
import TaskForm from '../components/tasks/TaskForm'
import { useTasks } from '../context/TaskContext'

const pageMeta = {
  '/': {
    title: 'Dashboard',
    subtitle: 'Overview of your workspace tasks',
    searchPlaceholder: 'Search recent tasks…',
  },
  '/tasks': {
    title: 'Tasks',
    subtitle: 'Manage and track work across the team',
    searchPlaceholder: 'Search tasks by title…',
  },
  '/settings': {
    title: 'Settings',
    subtitle: 'Profile and workspace preferences',
    showSearch: false,
  },
}

export default function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { addTask } = useTasks()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [headerSearch, setHeaderSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [createFormKey, setCreateFormKey] = useState(0)

  const pathKey =
    location.pathname.startsWith('/tasks/') && location.pathname !== '/tasks'
      ? '/tasks'
      : location.pathname

  const meta = pageMeta[pathKey] ?? pageMeta['/']

  const tasksSearch = searchParams.get('search') ?? ''
  const displayedSearch = pathKey === '/tasks' ? tasksSearch : headerSearch

  const handleHeaderSearch = (value) => {
    if (pathKey === '/tasks') {
      if (value) setSearchParams({ search: value })
      else setSearchParams({})
      return
    }
    setHeaderSearch(value)
    if (value) {
      navigate(`/tasks?search=${encodeURIComponent(value)}`)
    }
  }

  const handleCreateTask = async (payload) => {
    const task = await addTask(payload)
    setCreateOpen(false)
    navigate(`/tasks/${task.id}`)
  }

  const showPrimaryAction = pathKey === '/' || pathKey === '/tasks'

  return (
    <div className="min-h-full bg-[#f7f6f3] text-stone-900">
      <div className="mx-auto flex min-h-full max-w-[1400px]">
        <div className="hidden w-64 shrink-0 lg:block">
          <Sidebar />
        </div>

        {mobileNavOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-stone-900/40"
              aria-label="Close navigation menu"
              onClick={() => setMobileNavOpen(false)}
            />
            <div className="relative h-full w-72 max-w-[85vw] shadow-xl">
              <Sidebar onNavigate={() => setMobileNavOpen(false)} />
            </div>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            title={meta.title}
            subtitle={meta.subtitle}
            searchValue={displayedSearch}
            onSearchChange={handleHeaderSearch}
            searchPlaceholder={meta.searchPlaceholder}
            showSearch={meta.showSearch !== false}
            onMenuClick={() => setMobileNavOpen(true)}
            primaryAction={
              showPrimaryAction
                ? {
                    label: 'Add task',
                    onClick: () => {
                      setCreateFormKey((k) => k + 1)
                      setCreateOpen(true)
                    },
                  }
                : undefined
            }
          />
          <main className="flex-1 px-4 py-6 sm:px-6">
            <Outlet context={{ headerSearch, setHeaderSearch }} />
          </main>
        </div>
      </div>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create task"
        description="Add a task to your workspace. It will be saved to the TaskFlow API."
      >
        <TaskForm
          key={createFormKey}
          submitLabel="Create task"
          onCancel={() => setCreateOpen(false)}
          onSubmit={handleCreateTask}
        />
      </Modal>
    </div>
  )
}
