import { beforeEach, describe, expect, it } from 'vitest'
import { loadDarkMode, saveDarkMode } from '../lib/theme.js'
import { createTodo, loadTodos, saveTodos } from '../lib/todos.js'
import { readJson, THEME_STORAGE_KEY, TODOS_STORAGE_KEY, writeJson } from '../lib/storage.js'

describe('storage helpers', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns the fallback when the key is missing', () => {
    expect(readJson('missing', 'fallback')).toBe('fallback')
  })

  it('returns the fallback when the stored value is not valid JSON', () => {
    localStorage.setItem('broken', '{not json')
    expect(readJson('broken', 'fallback')).toBe('fallback')
  })

  it('round-trips values', () => {
    writeJson('key', { a: 1 })
    expect(readJson('key', null)).toEqual({ a: 1 })
  })

  it('falls back when the stored value is JSON null', () => {
    localStorage.setItem('key', 'null')
    expect(readJson('key', 'fallback')).toBe('fallback')
  })
})

describe('theme persistence', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('defaults to light mode', () => {
    expect(loadDarkMode()).toBe(false)
  })

  it('persists and restores the preference', () => {
    saveDarkMode(true)
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('true')
    expect(loadDarkMode()).toBe(true)
  })

  it('ignores a non-boolean stored value', () => {
    localStorage.setItem(THEME_STORAGE_KEY, '"yes"')
    expect(loadDarkMode()).toBe(false)
  })
})

describe('todo persistence', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('creates a todo with a unique id', () => {
    const first = createTodo('Buy milk')
    const second = createTodo('Buy milk')

    expect(first).toEqual({ id: expect.any(String), name: 'Buy milk', completed: false })
    expect(first.id).not.toBe(second.id)
  })

  it('returns an empty list when nothing is stored', () => {
    expect(loadTodos()).toEqual([])
  })

  it('returns an empty list when the stored value is not an array', () => {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify({ nope: true }))
    expect(loadTodos()).toEqual([])
  })

  it('drops entries that are not valid todos', () => {
    localStorage.setItem(
      TODOS_STORAGE_KEY,
      JSON.stringify([
        { id: 'a', name: 'Buy milk', completed: false },
        { id: 'b', name: '   ', completed: false },
        { id: 'c', completed: false },
        { id: 'd', name: 'Walk dog', completed: 'yes' },
      ]),
    )

    expect(loadTodos()).toEqual([{ id: 'a', name: 'Buy milk', completed: false }])
  })

  it('replaces a missing id with a generated one', () => {
    localStorage.setItem(
      TODOS_STORAGE_KEY,
      JSON.stringify([{ name: 'Buy milk', completed: false }]),
    )

    const [todo] = loadTodos()
    expect(todo.id).toBeTruthy()
  })

  it('saves and reloads todos', () => {
    const todo = createTodo('Buy milk')
    saveTodos([todo])

    expect(loadTodos()).toEqual([todo])
  })
})
