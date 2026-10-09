import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  createTask as apiCreateTask,
  deleteTaskById,
  fetchTasks,
  updateTaskById,
} from '../api/tasksApi.js'
import { ApiError } from '../api/apiClient.js'
import {
  dismissLocalTaskMigration,
  isLocalTaskMigrationSettled,
  importLegacyLocalTasks,
  readLegacyLocalTasks,
} from '../utils/localTaskMigration.js'

const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pendingMigrationCount, setPendingMigrationCount] = useState(0)
  const [importing, setImporting] = useState(false)

  const loadTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTasks()
      setTasks(data)

      const legacy = readLegacyLocalTasks()
      const migrationHandled = isLocalTaskMigrationSettled()
      if (data.length === 0 && legacy.length > 0 && !migrationHandled) {
        setPendingMigrationCount(legacy.length)
      } else {
        setPendingMigrationCount(0)
      }
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'Unexpected error while loading tasks.'
      setError(message)
      setTasks([])
      setPendingMigrationCount(0)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const importLocalTasks = useCallback(async () => {
    const legacy = readLegacyLocalTasks()
    if (legacy.length === 0) {
      setPendingMigrationCount(0)
      return
    }
    setImporting(true)
    setError(null)
    try {
      await importLegacyLocalTasks(legacy)
      const data = await fetchTasks()
      setTasks(data)
      setPendingMigrationCount(0)
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'Failed to import local tasks.'
      setError(message)
    } finally {
      setImporting(false)
    }
  }, [])

  const dismissMigration = useCallback(() => {
    dismissLocalTaskMigration()
    setPendingMigrationCount(0)
  }, [])

  const addTask = useCallback(async (payload) => {
    const task = await apiCreateTask(payload)
    setTasks((prev) => [task, ...prev])
    setPendingMigrationCount(0)
    return task
  }, [])

  const updateTask = useCallback(async (id, payload) => {
    const updated = await updateTaskById(id, payload)
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    return updated
  }, [])

  const deleteTask = useCallback(async (id) => {
    await deleteTaskById(id)
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const getTaskById = useCallback((id) => tasks.find((t) => t.id === id), [tasks])

  const value = useMemo(
    () => ({
      tasks,
      loading,
      error,
      isReady: !loading,
      refreshTasks: loadTasks,
      pendingMigrationCount,
      importing,
      importLocalTasks,
      dismissMigration,
      addTask,
      updateTask,
      deleteTask,
      getTaskById,
    }),
    [
      tasks,
      loading,
      error,
      loadTasks,
      pendingMigrationCount,
      importing,
      importLocalTasks,
      dismissMigration,
      addTask,
      updateTask,
      deleteTask,
      getTaskById,
    ],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used within TaskProvider')
  return ctx
}
