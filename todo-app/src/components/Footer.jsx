import React from 'react'
import styles from './footer.module.css'

const Footer = ({doneTodos, totalTodos}) => {
  return (
    <div className={styles.footer}>
      <span className={styles.item}> Completed tasks: {doneTodos} /  {totalTodos}</span>
    </div>
  )
}

export default Footer
