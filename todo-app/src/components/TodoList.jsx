import React from 'react'
import TodoItem from './TodoItem'
import styles from './todolist.module.css'

const TodoList = ({ todos, setTodos }) => {
    const sortedTodos = todos.slice().sort((a, b) => Number(a.completed) - Number(b.completed));
    return (
        <div className={styles.todolist}>
            {sortedTodos.map((item) => (
                <TodoItem key={item.name} item={item} todos={todos} setTodos={setTodos} />
            ))}
        </div>
    )
}

export default TodoList
