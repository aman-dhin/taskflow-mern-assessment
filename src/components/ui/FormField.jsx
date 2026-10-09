export function FormField({ id, label, error, children, required }) {
  const errorId = error ? `${id}-error` : undefined
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-stone-700">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function inputClassName(hasError) {
  return `block w-full rounded-lg border bg-white px-3 py-2 text-sm text-stone-900 shadow-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
    hasError
      ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
      : 'border-stone-200 focus:border-indigo-400 focus:ring-indigo-100'
  }`
}
