import { TODOS_STORAGE_KEY, readJson, writeJson } from './storage.js'

export const createId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `todo-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export const createTodo = (name) => ({
  id: createId(),
  name,
  completed: false,
})

const isValidTodo = (todo) =>
  todo !== null &&
  typeof todo === 'object' &&
  typeof todo.name === 'string' &&
  todo.name.trim().length > 0 &&
  typeof todo.completed === 'boolean'

export const loadTodos = () => {
  const stored = readJson(TODOS_STORAGE_KEY, [])
  if (!Array.isArray(stored)) return []
  return stored.filter(isValidTodo).map((todo) => ({
    id: typeof todo.id === 'string' && todo.id.length > 0 ? todo.id : createId(),
    name: todo.name,
    completed: todo.completed,
  }))
}

export const saveTodos = (todos) => writeJson(TODOS_STORAGE_KEY, todos)
