import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'
import Button from './Button'

export default function Modal({ open, onClose, title, description, children, size = 'md' }) {
  const titleId = useId()
  const descId = useId()
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const prev = document.activeElement
    panelRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      prev?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  const widthClass =
    size === 'lg' ? 'max-w-2xl' : size === 'sm' ? 'max-w-md' : 'max-w-lg'

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close dialog backdrop"
        className="absolute inset-0 bg-stone-900/40"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={`relative w-full ${widthClass} rounded-xl border border-stone-200 bg-white shadow-xl outline-none`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-stone-100 px-5 py-4">
          <div>
            <h2 id={titleId} className="text-base font-semibold text-stone-900">
              {title}
            </h2>
            {description ? (
              <p id={descId} className="mt-1 text-sm text-stone-500">
                {description}
              </p>
            ) : null}
          </div>
          <Button variant="ghost" size="sm" aria-label="Close" onClick={onClose}>
            <X className="h-4 w-4" aria-hidden />
          </Button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  )
}
