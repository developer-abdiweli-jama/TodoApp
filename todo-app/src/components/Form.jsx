import React, { useState } from 'react'
import Todo from './Todo'
import styles from './form.module.css'

const Form = ({ todos, setTodos }) => {
    // const [todo, setTodo] = useState("")
    const [todo, setTodo] = useState({name: "", completed: false});

    const handleSubmit = (e) => {
        e.preventDefault();
        setTodos([...todos, todo]);
        setTodo({name: "", completed: false});
    }
    return (
            <form className={styles.todoform} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <input className={styles.modernInput} placeholder='Enter todo item' 
                    onChange={(e) => setTodo({name: e.target.value, completed: false})}
                        value={todo.name} type="text" />
                    <button className={styles.addButton} type="submit">Add</button>
                </div>

            </form>
    )
}

export default Form
