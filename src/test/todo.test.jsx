import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Todo from '../components/Todo.jsx'
import { TODOS_STORAGE_KEY } from '../lib/storage.js'

const addTask = async (user, name) => {
  await user.type(screen.getByLabelText(/task name/i), name)
  await user.click(screen.getByRole('button', { name: 'Add' }))
}

describe('Todo', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows an empty state when there are no tasks', () => {
    render(<Todo />)

    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument()
  })

  it('adds a task and shows it in the list', async () => {
    const user = userEvent.setup()
    render(<Todo />)

    await addTask(user, 'Buy milk')

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText(/completed tasks: 0 \/ 1/i)).toBeInTheDocument()
  })

  it('trims whitespace and keeps the typed text out of the input', async () => {
    const user = userEvent.setup()
    render(<Todo />)

    await addTask(user, '   Buy milk   ')

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByLabelText(/task name/i)).toHaveValue('')
  })

  it('refuses to add an empty task', async () => {
    const user = userEvent.setup()
    render(<Todo />)

    const addButton = screen.getByRole('button', { name: 'Add' })
    expect(addButton).toBeDisabled()

    await user.type(screen.getByLabelText(/task name/i), '   ')
    expect(addButton).toBeDisabled()

    await user.click(addButton)
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  it('rejects a whitespace-only task submitted with the Enter key', async () => {
    const user = userEvent.setup()
    render(<Todo />)

    await user.type(screen.getByLabelText(/task name/i), '   {Enter}')

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  it('surfaces an error when the form is submitted without a task', () => {
    const { container } = render(<Todo />)

    fireEvent.submit(container.querySelector('form'))

    expect(screen.getByRole('alert')).toHaveTextContent(/enter a task/i)
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  it('toggles only the clicked task when two tasks share the same name', async () => {
    const user = userEvent.setup()
    render(<Todo />)

    await addTask(user, 'Buy milk')
    await addTask(user, 'Buy milk')

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(2)

    await user.click(checkboxes[0])

    expect(checkboxes[0]).toBeChecked()
    expect(checkboxes[1]).not.toBeChecked()
    expect(screen.getByText(/completed tasks: 1 \/ 2/i)).toBeInTheDocument()
  })

  it('does not warn about duplicate React keys for tasks with the same name', async () => {
    const user = userEvent.setup()
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(<Todo />)

    await addTask(user, 'Buy milk')
    await addTask(user, 'Buy milk')

    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('deletes only the targeted task when two tasks share the same name', async () => {
    const user = userEvent.setup()
    render(<Todo />)

    await addTask(user, 'Buy milk')
    await addTask(user, 'Buy milk')

    const deleteButtons = screen.getAllByRole('button', { name: 'Delete task: Buy milk' })
    await user.click(deleteButtons[0])

    expect(screen.getAllByRole('checkbox')).toHaveLength(1)
    expect(screen.getByText(/completed tasks: 0 \/ 1/i)).toBeInTheDocument()
  })

  it('updates the completed counter when a task is completed', async () => {
    const user = userEvent.setup()
    render(<Todo />)

    await addTask(user, 'Buy milk')
    await addTask(user, 'Walk dog')

    await user.click(screen.getAllByRole('checkbox')[0])

    expect(screen.getByText(/completed tasks: 1 \/ 2/i)).toBeInTheDocument()
  })

  it('lists unfinished tasks before completed ones', async () => {
    const user = userEvent.setup()
    render(<Todo />)

    await addTask(user, 'First task')
    await addTask(user, 'Second task')

    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])

    const items = screen.getAllByText(/First task|Second task/)
    expect(items[0]).toHaveTextContent('Second task')
    expect(items[1]).toHaveTextContent('First task')
  })

  it('persists tasks to localStorage', async () => {
    const user = userEvent.setup()
    render(<Todo />)

    await addTask(user, 'Buy milk')

    const stored = JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY))
    expect(stored).toHaveLength(1)
    expect(stored[0]).toMatchObject({ name: 'Buy milk', completed: false })
    expect(stored[0].id).toBeTruthy()
  })

  it('restores tasks from localStorage on mount', () => {
    localStorage.setItem(
      TODOS_STORAGE_KEY,
      JSON.stringify([{ id: 'abc', name: 'Buy milk', completed: true }]),
    )

    render(<Todo />)

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(screen.getByText(/completed tasks: 1 \/ 1/i)).toBeInTheDocument()
  })

  it('survives corrupted localStorage data', () => {
    localStorage.setItem(TODOS_STORAGE_KEY, 'not-json{{{')

    expect(() => render(<Todo />)).not.toThrow()
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument()
  })

  it('ignores malformed entries inside a valid localStorage array', () => {
    localStorage.setItem(
      TODOS_STORAGE_KEY,
      JSON.stringify([{ id: 'abc', name: 'Buy milk', completed: false }, null, { name: 42 }]),
    )

    render(<Todo />)

    expect(screen.getAllByRole('checkbox')).toHaveLength(1)
  })

  it('exposes an accessible name on the delete button', async () => {
    const user = userEvent.setup()
    render(<Todo />)

    await addTask(user, 'Buy milk')

    expect(screen.getByRole('button', { name: 'Delete task: Buy milk' })).toBeInTheDocument()
  })

  it('completes a task with the keyboard', async () => {
    const user = userEvent.setup()
    render(<Todo />)

    await addTask(user, 'Buy milk')

    const checkbox = screen.getByRole('checkbox')
    checkbox.focus()
    await user.keyboard(' ')

    expect(checkbox).toBeChecked()
  })
})
