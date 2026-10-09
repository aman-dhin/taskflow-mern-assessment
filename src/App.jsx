import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppPreferencesProvider } from './context/AppPreferencesContext'
import { TaskProvider } from './context/TaskContext'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import TaskDetails from './pages/TaskDetails'
import Tasks from './pages/Tasks'

export default function App() {
  return (
    <BrowserRouter>
      <AppPreferencesProvider>
        <TaskProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="tasks/:taskId" element={<TaskDetails />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </TaskProvider>
      </AppPreferencesProvider>
    </BrowserRouter>
  )
}
