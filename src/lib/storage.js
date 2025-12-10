export const THEME_STORAGE_KEY = 'darkMode'
export const TODOS_STORAGE_KEY = 'todos'

const getStorage = () => {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function readJson(key, fallback) {
  const storage = getStorage()
  if (!storage) return fallback
  try {
    const raw = storage.getItem(key)
    if (raw === null) return fallback
    const parsed = JSON.parse(raw)
    return parsed === null ? fallback : parsed
  } catch {
    return fallback
  }
}

export function writeJson(key, value) {
  const storage = getStorage()
  if (!storage) return
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable (private browsing, quota exceeded). Ignore.
  }
}
