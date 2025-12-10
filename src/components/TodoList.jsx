import { useMemo } from 'react'
import TodoItem from './TodoItem'
import styles from './todolist.module.css'

const TodoList = ({ todos, onToggle, onDelete }) => {
  const sortedTodos = useMemo(
    () => [...todos].sort((a, b) => Number(a.completed) - Number(b.completed)),
    [todos],
  )

  if (todos.length === 0) {
    return (
      <div className={styles.todolist}>
        <p className={styles.empty}>No tasks yet. Add your first one above.</p>
      </div>
    )
  }

  return (
    <div className={styles.todolist}>
      <ul className={styles.list}>
        {sortedTodos.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <TodoItem item={item} onToggle={onToggle} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
