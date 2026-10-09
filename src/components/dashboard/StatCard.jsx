export default function StatCard({ label, value, hint, icon: Icon, tone = 'default' }) {
  const iconTone =
    tone === 'danger'
      ? 'bg-rose-50 text-rose-700'
      : tone === 'success'
        ? 'bg-emerald-50 text-emerald-700'
        : tone === 'accent'
          ? 'bg-indigo-50 text-indigo-700'
          : 'bg-stone-100 text-stone-600'

  return (
    <article className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-stone-900">{value}</p>
          {hint ? <p className="mt-1 text-xs text-stone-500">{hint}</p> : null}
        </div>
        {Icon ? (
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconTone}`}>
            <Icon className="h-4 w-4" aria-hidden />
          </div>
        ) : null}
      </div>
    </article>
  )
}
