import { DEMO_ACTIVITY_LABEL } from './constants'

export const workspaces = [
  { id: 'ws-1', name: 'Product Engineering' },
  { id: 'ws-2', name: 'Marketing Ops' },
  { id: 'ws-3', name: 'Client Delivery' },
]

export const teamMembers = [
  {
    id: 'user-1',
    name: 'Alex Rivera',
    email: 'alex.rivera@taskflow.demo',
    role: 'Product Manager',
    avatarInitials: 'AR',
  },
  {
    id: 'user-2',
    name: 'Jordan Kim',
    email: 'jordan.kim@taskflow.demo',
    role: 'Frontend Engineer',
    avatarInitials: 'JK',
  },
  {
    id: 'user-3',
    name: 'Sam Patel',
    email: 'sam.patel@taskflow.demo',
    role: 'Backend Engineer',
    avatarInitials: 'SP',
  },
  {
    id: 'user-4',
    name: 'Taylor Morgan',
    email: 'taylor.morgan@taskflow.demo',
    role: 'Designer',
    avatarInitials: 'TM',
  },
]

const now = new Date()
const daysFromNow = (n) => {
  const d = new Date(now)
  d.setDate(d.getDate() + n)
  d.setHours(17, 0, 0, 0)
  return d.toISOString()
}
const daysAgo = (n) => {
  const d = new Date(now)
  d.setDate(d.getDate() - n)
  d.setHours(10, 30, 0, 0)
  return d.toISOString()
}

export const initialTasks = [
  {
    id: 'task-1',
    title: 'Define REST API contract for tasks',
    description:
      'Document endpoints, request/response shapes, and error codes for the Express layer so frontend integration is straightforward.',
    status: 'in_progress',
    priority: 'high',
    dueDate: daysFromNow(3),
    assigneeId: 'user-3',
    createdAt: daysAgo(8),
    updatedAt: daysAgo(1),
  },
  {
    id: 'task-2',
    title: 'Wire dashboard metrics to live task data',
    description:
      'Ensure summary cards and progress indicators derive from the same task source used on the task list page.',
    status: 'done',
    priority: 'medium',
    dueDate: daysAgo(2),
    assigneeId: 'user-2',
    createdAt: daysAgo(12),
    updatedAt: daysAgo(3),
  },
  {
    id: 'task-3',
    title: 'Design empty states for filtered task views',
    description:
      'Provide helpful copy and a reset-filters action when search or filters return no results.',
    status: 'review',
    priority: 'medium',
    dueDate: daysFromNow(5),
    assigneeId: 'user-4',
    createdAt: daysAgo(6),
    updatedAt: daysAgo(0),
  },
  {
    id: 'task-4',
    title: 'Set up MongoDB indexes for task queries',
    description:
      'Add compound indexes on workspace, status, and due date to keep list endpoints fast at scale.',
    status: 'todo',
    priority: 'high',
    dueDate: daysFromNow(7),
    assigneeId: 'user-3',
    createdAt: daysAgo(4),
    updatedAt: daysAgo(4),
  },
  {
    id: 'task-5',
    title: 'QA mobile layout on task detail screen',
    description:
      'Verify metadata stacks cleanly and actions remain reachable on viewports below 768px.',
    status: 'in_progress',
    priority: 'low',
    dueDate: daysFromNow(1),
    assigneeId: 'user-2',
    createdAt: daysAgo(5),
    updatedAt: daysAgo(2),
  },
  {
    id: 'task-6',
    title: 'Draft sprint retrospective notes',
    description:
      'Capture blockers from the assessment build and outline backend integration milestones.',
    status: 'todo',
    priority: 'low',
    dueDate: daysAgo(1),
    assigneeId: 'user-1',
    createdAt: daysAgo(10),
    updatedAt: daysAgo(6),
  },
  {
    id: 'task-7',
    title: 'Implement JWT auth middleware sketch',
    description:
      'Outline protected routes and token refresh flow before implementing the auth server.',
    status: 'todo',
    priority: 'urgent',
    dueDate: daysFromNow(2),
    assigneeId: 'user-3',
    createdAt: daysAgo(2),
    updatedAt: daysAgo(1),
  },
  {
    id: 'task-8',
    title: 'Polish task form validation messages',
    description:
      'Align inline errors with accessible labels and ensure keyboard users can complete the flow.',
    status: 'done',
    priority: 'medium',
    dueDate: daysAgo(4),
    assigneeId: 'user-2',
    createdAt: daysAgo(14),
    updatedAt: daysAgo(5),
  },
]

/** Static demo feed — not synced with live task edits */
export const demoActivityFeed = [
  {
    id: 'act-1',
    label: DEMO_ACTIVITY_LABEL,
    message: 'Jordan Kim marked "Wire dashboard metrics to live task data" as Done.',
    timestamp: daysAgo(3),
  },
  {
    id: 'act-2',
    label: DEMO_ACTIVITY_LABEL,
    message: 'Sam Patel commented on the API contract draft in the team channel.',
    timestamp: daysAgo(2),
  },
  {
    id: 'act-3',
    label: DEMO_ACTIVITY_LABEL,
    message: 'Taylor Morgan moved "Design empty states" to In Review.',
    timestamp: daysAgo(1),
  },
  {
    id: 'act-4',
    label: DEMO_ACTIVITY_LABEL,
    message: 'Alex Rivera scheduled a backend integration planning session.',
    timestamp: daysAgo(0),
  },
]

export const defaultProfile = {
  ...teamMembers[0],
  timezone: 'America/Chicago',
  emailNotifications: true,
  weeklyDigest: false,
}
