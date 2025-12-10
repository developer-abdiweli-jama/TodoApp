import styles from './themetoggle.module.css'

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      type="button"
      className={`${styles.themeToggle} ${darkMode ? styles.dark : ''}`}
      onClick={toggleDarkMode}
      aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-pressed={darkMode}
    >
      <span className={styles.toggleTrack}>
        <span className={styles.toggleThumb}>
          <span className={styles.sunIcon} aria-hidden="true">
            ☀️
          </span>
          <span className={styles.moonIcon} aria-hidden="true">
            🌙
          </span>
        </span>
      </span>
      <span className={styles.toggleText}>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  )
}

export default ThemeToggle
