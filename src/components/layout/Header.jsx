import { Bell, Menu, Plus, Search } from 'lucide-react'
import Button from '../ui/Button'

export default function Header({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search…',
  showSearch = true,
  primaryAction,
  onMenuClick,
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-[#f7f6f3]/90 backdrop-blur-sm">
      <div className="flex flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-700 lg:hidden"
            aria-label="Open navigation menu"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0 text-left">
            <h1 className="truncate text-lg font-semibold text-stone-900 sm:text-xl">{title}</h1>
            {subtitle ? (
              <p className="mt-0.5 text-sm text-stone-500">{subtitle}</p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {showSearch ? (
            <label className="relative block min-w-0 sm:w-64 lg:w-72">
              <span className="sr-only">{searchPlaceholder}</span>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
                aria-hidden
              />
              <input
                type="search"
                value={searchValue ?? ''}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder={searchPlaceholder}
                className="h-9 w-full rounded-lg border border-stone-200 bg-white pl-9 pr-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </label>
          ) : null}

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
              aria-label="Notifications (demo — no backend yet)"
              title="Notifications are demo-only in this frontend build"
            >
              <Bell className="h-4 w-4" />
            </button>
            {primaryAction ? (
              <Button onClick={primaryAction.onClick} className="w-full sm:w-auto">
                <Plus className="h-4 w-4" aria-hidden />
                {primaryAction.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
