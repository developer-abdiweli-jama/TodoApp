import React, { useState, useEffect } from 'react'
import Todo from './components/Todo.jsx'
import Header from './components/Header.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import './App.css'

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    // Apply theme to document
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Header/>
      <Todo/> 
    </>
  )
}

export default App