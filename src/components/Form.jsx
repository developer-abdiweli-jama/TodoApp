import { useState } from 'react'
import styles from './form.module.css'

const Form = ({ onAdd }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Enter a task before adding it.')
      return
    }
    onAdd(trimmed)
    setName('')
    setError('')
  }

  const handleChange = (e) => {
    setName(e.target.value)
    if (error) setError('')
  }

  return (
    <form className={styles.todoform} onSubmit={handleSubmit} noValidate>
      <div className={styles.inputGroup}>
        <label className={styles.srOnly} htmlFor="todo-input">
          Task name
        </label>
        <input
          id="todo-input"
          className={styles.modernInput}
          placeholder="Enter todo item"
          value={name}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? 'todo-input-error' : undefined}
        />
        <button className={styles.addButton} type="submit" disabled={name.trim().length === 0}>
          Add
        </button>
      </div>
      {error && (
        <p id="todo-input-error" className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  )
}

export default Form
