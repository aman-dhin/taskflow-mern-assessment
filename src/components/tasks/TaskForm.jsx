import { useState } from 'react'
import { teamMembers } from '../../data/mockData'
import { TASK_PRIORITIES, TASK_STATUSES } from '../../data/constants'
import { fromInputDateValue, toInputDateValue } from '../../utils/dateUtils'
import { validateTaskForm } from '../../utils/taskUtils'
import Button from '../ui/Button'
import { FormField, inputClassName } from '../ui/FormField'

const emptyValues = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
  assigneeId: teamMembers[1]?.id ?? '',
}

function buildInitialValues(initialTask) {
  if (!initialTask) return emptyValues
  return {
    title: initialTask.title ?? '',
    description: initialTask.description ?? '',
    status: initialTask.status ?? 'todo',
    priority: initialTask.priority ?? 'medium',
    dueDate: toInputDateValue(initialTask.dueDate),
    assigneeId: initialTask.assigneeId ?? '',
  }
}

export default function TaskForm({ initialTask, onSubmit, onCancel, submitLabel }) {
  const [values, setValues] = useState(() => buildInitialValues(initialTask))
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validateTaskForm(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setSubmitting(true)
    setSubmitError('')
    try {
      await onSubmit({
        title: values.title.trim(),
        description: values.description.trim(),
        status: values.status,
        priority: values.priority,
        assigneeId: values.assigneeId,
        dueDate: fromInputDateValue(values.dueDate),
      })
    } catch (err) {
      setSubmitError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormField id="task-title" label="Title" error={errors.title} required>
        <input
          id="task-title"
          className={inputClassName(errors.title)}
          value={values.title}
          onChange={(e) => setField('title', e.target.value)}
          placeholder="Short, actionable summary"
          autoComplete="off"
        />
      </FormField>

      <FormField id="task-description" label="Description" error={errors.description}>
        <textarea
          id="task-description"
          rows={4}
          className={inputClassName(errors.description)}
          value={values.description}
          onChange={(e) => setField('description', e.target.value)}
          placeholder="Context, acceptance criteria, or links"
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="task-status" label="Status" error={errors.status} required>
          <select
            id="task-status"
            className={inputClassName(errors.status)}
            value={values.status}
            onChange={(e) => setField('status', e.target.value)}
          >
            {TASK_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="task-priority" label="Priority" error={errors.priority} required>
          <select
            id="task-priority"
            className={inputClassName(errors.priority)}
            value={values.priority}
            onChange={(e) => setField('priority', e.target.value)}
          >
            {TASK_PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="task-due" label="Due date" error={errors.dueDate}>
          <input
            id="task-due"
            type="date"
            className={inputClassName(errors.dueDate)}
            value={values.dueDate}
            onChange={(e) => setField('dueDate', e.target.value)}
          />
        </FormField>

        <FormField id="task-assignee" label="Assignee" error={errors.assigneeId} required>
          <select
            id="task-assignee"
            className={inputClassName(errors.assigneeId)}
            value={values.assigneeId}
            onChange={(e) => setField('assigneeId', e.target.value)}
          >
            <option value="">Select teammate</option>
            {teamMembers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {submitError ? (
        <p className="text-sm text-red-600" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-2 border-t border-stone-100 pt-4 sm:flex-row sm:justify-end">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
