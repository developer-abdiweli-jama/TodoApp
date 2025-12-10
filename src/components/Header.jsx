import styles from './header.module.css'

const Header = ({ children }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>My Todo List</h1>
      {children}
    </header>
  )
}

export default Header
