import { THEME_STORAGE_KEY, readJson, writeJson } from './storage.js'

export const loadDarkMode = () => {
  const stored = readJson(THEME_STORAGE_KEY, false)
  return typeof stored === 'boolean' ? stored : false
}

export const saveDarkMode = (darkMode) => writeJson(THEME_STORAGE_KEY, darkMode)
