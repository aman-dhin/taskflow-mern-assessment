const tones = {
  neutral: 'bg-stone-100 text-stone-700 ring-stone-200/80',
  indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-200/80',
  amber: 'bg-amber-50 text-amber-800 ring-amber-200/80',
  emerald: 'bg-emerald-50 text-emerald-800 ring-emerald-200/80',
  rose: 'bg-rose-50 text-rose-800 ring-rose-200/80',
  slate: 'bg-slate-100 text-slate-700 ring-slate-200/80',
}

export default function Badge({ tone = 'neutral', className = '', children }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
