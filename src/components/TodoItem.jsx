import { useId } from 'react'
import styles from './todoitem.module.css'

const TodoItem = ({ item, onToggle, onDelete }) => {
  const checkboxId = useId()

  return (
    <div className={styles.Item}>
      <div className={styles.ItemName}>
        <input
          id={checkboxId}
          className={styles.checkbox}
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
        />
        <label
          htmlFor={checkboxId}
          className={`${styles.label} ${item.completed ? styles.completed : ''}`}
        >
          {item.name}
        </label>
        <button
          onClick={() => onDelete(item.id)}
          className={styles.deletBtn}
          type="button"
          aria-label={`Delete task: ${item.name}`}
          title="Delete task"
        >
          <span aria-hidden="true">x</span>
        </button>
      </div>
      <hr className={styles.Line} />
    </div>
  )
}

export default TodoItem
