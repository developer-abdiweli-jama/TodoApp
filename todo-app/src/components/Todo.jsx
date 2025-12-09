import React from 'react'
import TodoList from './TodoList'
import Form from './Form'
import Footer from './Footer';

const Todo = () => {
    const [todos, setTodos] = React.useState([]);
    const doneTodos = todos.filter((todo)=>todo.completed).length;
    const totalTodos = todos.length;
    return (
        <>
        <Form todos={todos} setTodos={setTodos}/>
        <TodoList todos={todos} setTodos={setTodos} />
        <Footer doneTodos={doneTodos} totalTodos={totalTodos}/>
        </>
    )
}

export default Todo
