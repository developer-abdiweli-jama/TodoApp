import styles from './footer.module.css'

const Footer = ({ doneTodos, totalTodos }) => {
  return (
    <div className={styles.footer}>
      <span className={styles.item} aria-live="polite">
        Completed tasks: {doneTodos} / {totalTodos}
      </span>
    </div>
  )
}

export default Footer
