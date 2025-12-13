import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App.jsx'
import { THEME_STORAGE_KEY } from '../lib/storage.js'

describe('App theme handling', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('starts in light mode by default', () => {
    render(<App />)

    expect(document.documentElement).not.toHaveAttribute('data-theme')
    expect(screen.getByRole('button', { name: /switch to (dark|light) mode/i })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('applies the dark theme and persists the choice', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /switch to (dark|light) mode/i }))

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('true')
  })

  it('restores the saved theme on mount', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'true')

    render(<App />)

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('survives a corrupted theme value', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'not-json{{{')

    expect(() => render(<App />)).not.toThrow()
    expect(document.documentElement).not.toHaveAttribute('data-theme')
  })

  it('switches back to light mode', async () => {
    const user = userEvent.setup()
    render(<App />)

    const toggle = screen.getByRole('button', { name: /switch to (dark|light) mode/i })
    await user.click(toggle)
    await user.click(toggle)

    expect(document.documentElement).not.toHaveAttribute('data-theme')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('false')
  })
})
