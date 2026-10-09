import { useTasks } from '../../context/TaskContext'
import {
  LocalTasksMigrationBanner,
  TaskErrorState,
  TaskLoadingState,
} from './TaskApiStatus'

export default function TaskPageShell({ children }) {
  const {
    loading,
    error,
    tasks,
    refreshTasks,
    pendingMigrationCount,
    importing,
    importLocalTasks,
    dismissMigration,
  } = useTasks()

  const showInitialLoading = loading && tasks.length === 0 && !error

  return (
    <>
      {error ? <TaskErrorState message={error} onRetry={refreshTasks} /> : null}

      {!error && pendingMigrationCount > 0 ? (
        <LocalTasksMigrationBanner
          count={pendingMigrationCount}
          importing={importing}
          onImport={importLocalTasks}
          onDismiss={dismissMigration}
        />
      ) : null}

      {showInitialLoading ? <TaskLoadingState /> : null}

      {!showInitialLoading && !error ? children : null}
    </>
  )
}
