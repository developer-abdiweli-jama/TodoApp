import { useCallback, useEffect, useMemo, useState } from 'react'
import TodoList from './TodoList'
import Form from './Form'
import Footer from './Footer'
import { createTodo, loadTodos, saveTodos } from '../lib/todos.js'
import styles from './todo.module.css'

const Todo = () => {
  const [todos, setTodos] = useState(loadTodos)

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = useCallback((name) => {
    const trimmed = name.trim()
    if (!trimmed) return
    setTodos((prev) => [...prev, createTodo(trimmed)])
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    )
  }, [])

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }, [])

  const doneTodos = useMemo(() => todos.filter((todo) => todo.completed).length, [todos])
  const totalTodos = todos.length

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoContent}>
        <Form onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
      <Footer doneTodos={doneTodos} totalTodos={totalTodos} />
    </div>
  )
}

export default Todo
