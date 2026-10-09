import { AlertCircle, Loader2, RefreshCw } from 'lucide-react'
import Button from '../ui/Button'

export function TaskLoadingState() {
  return (
    <div className="flex items-center justify-center rounded-xl border border-stone-200 bg-white px-6 py-16 shadow-sm">
      <div className="flex items-center gap-3 text-sm text-stone-600">
        <Loader2 className="h-5 w-5 animate-spin text-indigo-600" aria-hidden />
        Loading tasks from the server…
      </div>
    </div>
  )
}

export function TaskErrorState({ message, onRetry }) {
  return (
    <div
      className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-4 text-left shadow-sm sm:px-5"
      role="alert"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" aria-hidden />
          <div>
            <p className="text-sm font-medium text-rose-900">Could not load tasks</p>
            <p className="mt-1 text-sm text-rose-800">{message}</p>
          </div>
        </div>
        <Button variant="secondary" size="sm" onClick={onRetry} className="shrink-0">
          <RefreshCw className="h-4 w-4" aria-hidden />
          Retry
        </Button>
      </div>
    </div>
  )
}

export function LocalTasksMigrationBanner({ count, importing, onImport, onDismiss }) {
  return (
    <div className="mb-4 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-4 text-left shadow-sm sm:px-5">
      <p className="text-sm font-medium text-indigo-950">
        Import {count} task{count === 1 ? '' : 's'} from this browser?
      </p>
      <p className="mt-1 text-sm text-indigo-900/80">
        TaskFlow now stores tasks in MongoDB. We found older demo tasks saved locally. Import
        them once, or dismiss to start fresh with the API.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" onClick={onImport} disabled={importing}>
          {importing ? 'Importing…' : 'Import local tasks'}
        </Button>
        <Button size="sm" variant="secondary" onClick={onDismiss} disabled={importing}>
          Dismiss
        </Button>
      </div>
    </div>
  )
}
