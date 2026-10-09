import { createContext, useContext, useMemo } from 'react'
import { defaultProfile, workspaces } from '../data/mockData'
import { STORAGE_KEYS } from '../data/constants'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AppPreferencesContext = createContext(null)

export function AppPreferencesProvider({ children }) {
  const [profile, setProfile] = useLocalStorage(STORAGE_KEYS.profile, defaultProfile)
  const [workspaceId, setWorkspaceId] = useLocalStorage(
    STORAGE_KEYS.workspace,
    workspaces[0].id,
  )

  const workspace = useMemo(
    () => workspaces.find((w) => w.id === workspaceId) ?? workspaces[0],
    [workspaceId],
  )

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      workspaces,
      workspace,
      workspaceId,
      setWorkspaceId,
    }),
    [profile, setProfile, workspace, workspaceId, setWorkspaceId],
  )

  return (
    <AppPreferencesContext.Provider value={value}>
      {children}
    </AppPreferencesContext.Provider>
  )
}

export function useAppPreferences() {
  const ctx = useContext(AppPreferencesContext)
  if (!ctx) throw new Error('useAppPreferences must be used within AppPreferencesProvider')
  return ctx
}
