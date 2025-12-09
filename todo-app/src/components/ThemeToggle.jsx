import React from 'react';
import styles from './themetoggle.module.css';

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button 
      className={`${styles.themeToggle} ${darkMode ? styles.dark : ''}`}
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    >
      <span className={styles.toggleTrack}>
        <span className={styles.toggleThumb}>
          <span className={styles.sunIcon}>☀️</span>
          <span className={styles.moonIcon}>🌙</span>
        </span>
      </span>
      <span className={styles.toggleText}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;