
import styles from './todoitem.module.css'

const TodoItem = ({ item, todos, setTodos }) => {
    const handleDelete = (item) => {
        console.log('Delete item:', item.name);
        setTodos(todos.filter((todo) => todo !== item));
    }
    const handleClick = (name) => {
        setTodos(todos.map((todo) =>
            todo.name === name ? { ...todo, completed: !todo.completed } : todo))
    };
        const itemClass = item.completed ? styles.completed : '';
    return (
        <div className={styles.Item}>
            <div className={styles.ItemName}>
                <span className={itemClass} onClick={() => handleClick(item.name)}> {item.name} </span>
                <span><button onClick={() => handleDelete(item)} className={styles.deletBtn} type="button">x</button></span>
            </div>
            <hr className={styles.Line} />
        </div>
    )
}

export default TodoItem
