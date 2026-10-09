export default function CompletionProgress({ completionRate, completed, total }) {
  return (
    <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-stone-900">Completion progress</h2>
          <p className="mt-1 text-sm text-stone-500">
            {completed} of {total} tasks marked done in this workspace view.
          </p>
        </div>
        <p className="text-3xl font-semibold tabular-nums text-indigo-600">{completionRate}%</p>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-100">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${completionRate}%` }}
          role="progressbar"
          aria-valuenow={completionRate}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Task completion rate"
        />
      </div>
    </section>
  )
}
