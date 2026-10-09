import { NavLink } from 'react-router-dom'
import {
  CheckSquare,
  LayoutDashboard,
  Layers,
  Settings,
  ChevronDown,
} from 'lucide-react'
import { useAppPreferences } from '../../context/AppPreferencesContext'

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-indigo-50 text-indigo-700'
      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
  }`

export default function Sidebar({ onNavigate }) {
  const { profile, workspaces, workspace, setWorkspaceId } = useAppPreferences()

  return (
    <aside className="flex h-full flex-col border-r border-stone-200 bg-white">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
          <Layers className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 text-left">
          <p className="truncate text-sm font-semibold text-stone-900">TaskFlow</p>
          <p className="truncate text-xs text-stone-500">Workspace dashboard</p>
        </div>
      </div>

      <div className="px-4 pb-4">
        <label htmlFor="workspace-switcher" className="mb-1.5 block px-1 text-xs font-medium text-stone-500">
          Workspace
        </label>
        <div className="relative">
          <select
            id="workspace-switcher"
            value={workspace.id}
            onChange={(e) => setWorkspaceId(e.target.value)}
            className="w-full appearance-none rounded-lg border border-stone-200 bg-stone-50 py-2 pl-3 pr-9 text-sm text-stone-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            {workspaces.map((ws) => (
              <option key={ws.id} value={ws.id}>
                {ws.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
            aria-hidden
          />
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Main">
        <NavLink to="/" end className={navLinkClass} onClick={onNavigate}>
          <LayoutDashboard className="h-4 w-4 shrink-0" aria-hidden />
          Dashboard
        </NavLink>
        <NavLink to="/tasks" className={navLinkClass} onClick={onNavigate}>
          <CheckSquare className="h-4 w-4 shrink-0" aria-hidden />
          Tasks
        </NavLink>
        <NavLink to="/settings" className={navLinkClass} onClick={onNavigate}>
          <Settings className="h-4 w-4 shrink-0" aria-hidden />
          Settings
        </NavLink>
      </nav>

      <div className="border-t border-stone-100 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-stone-50 p-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
            {profile.avatarInitials}
          </span>
          <div className="min-w-0 text-left">
            <p className="truncate text-sm font-medium text-stone-900">{profile.name}</p>
            <p className="truncate text-xs text-stone-500">{profile.role}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
