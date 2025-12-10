import { useCallback, useEffect, useState } from 'react'
import Todo from './components/Todo.jsx'
import Header from './components/Header.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import { loadDarkMode, saveDarkMode } from './lib/theme.js'
import './App.css'

const App = () => {
  const [darkMode, setDarkMode] = useState(loadDarkMode)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    saveDarkMode(darkMode)
  }, [darkMode])

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev)
  }, [])

  return (
    <>
      <Header>
        <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </Header>
      <main>
        <Todo />
      </main>
    </>
  )
}

export default App
