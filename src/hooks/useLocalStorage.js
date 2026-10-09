import { useCallback, useState } from 'react'

function readStorage(key, initialValue) {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return initialValue
    return JSON.parse(raw)
  } catch {
    return initialValue
  }
}

export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => readStorage(key, initialValue))

  const setValue = useCallback(
    (value) => {
      setStored((prev) => {
        const next = typeof value === 'function' ? value(prev) : value
        try {
          localStorage.setItem(key, JSON.stringify(next))
        } catch {
          /* quota or private mode — keep in-memory state */
        }
        return next
      })
    },
    [key],
  )

  return [stored, setValue]
}
