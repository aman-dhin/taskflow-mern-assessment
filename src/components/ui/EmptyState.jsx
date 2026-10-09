export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-stone-200 bg-white px-6 py-12 text-center">
      {Icon ? (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 text-stone-500">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      ) : null}
      <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-stone-500">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}
