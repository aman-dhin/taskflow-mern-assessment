import { teamMembers } from '../data/mockData'
import Button from '../components/ui/Button'
import { FormField, inputClassName } from '../components/ui/FormField'
import { useAppPreferences } from '../context/AppPreferencesContext'

export default function Settings() {
  const { profile, setProfile, workspace } = useAppPreferences()

  const setField = (name, value) => {
    setProfile((p) => ({ ...p, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 text-left">
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-stone-900">Profile</h2>
        <p className="mt-1 text-sm text-stone-500">
          Frontend-only preferences stored locally. Authentication will be added with the Express
          backend.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <FormField id="profile-name" label="Display name">
            <input
              id="profile-name"
              className={inputClassName(false)}
              value={profile.name}
              onChange={(e) => setField('name', e.target.value)}
            />
          </FormField>

          <FormField id="profile-email" label="Email">
            <input
              id="profile-email"
              type="email"
              className={inputClassName(false)}
              value={profile.email}
              onChange={(e) => setField('email', e.target.value)}
            />
          </FormField>

          <FormField id="profile-role" label="Role">
            <input
              id="profile-role"
              className={inputClassName(false)}
              value={profile.role}
              onChange={(e) => setField('role', e.target.value)}
            />
          </FormField>

          <FormField id="profile-timezone" label="Timezone">
            <input
              id="profile-timezone"
              className={inputClassName(false)}
              value={profile.timezone}
              onChange={(e) => setField('timezone', e.target.value)}
            />
          </FormField>

          <div className="space-y-3 border-t border-stone-100 pt-4">
            <label className="flex items-center gap-3 text-sm text-stone-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-stone-300 text-indigo-600 focus:ring-indigo-500"
                checked={profile.emailNotifications}
                onChange={(e) => setField('emailNotifications', e.target.checked)}
              />
              Email notifications for task assignments
            </label>
            <label className="flex items-center gap-3 text-sm text-stone-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-stone-300 text-indigo-600 focus:ring-indigo-500"
                checked={profile.weeklyDigest}
                onChange={(e) => setField('weeklyDigest', e.target.checked)}
              />
              Weekly workspace digest
            </label>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit">Save preferences</Button>
          </div>
        </form>
      </section>

      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-stone-900">Team directory (demo)</h2>
        <p className="mt-1 text-sm text-stone-500">
          Assignees available in task forms for workspace &quot;{workspace.name}&quot;.
        </p>
        <ul className="mt-4 divide-y divide-stone-100">
          {teamMembers.map((member) => (
            <li key={member.id} className="flex items-center gap-3 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-sm font-semibold text-stone-700">
                {member.avatarInitials}
              </span>
              <div>
                <p className="text-sm font-medium text-stone-900">{member.name}</p>
                <p className="text-xs text-stone-500">
                  {member.role} · {member.email}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
