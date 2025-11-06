import React from 'react';
import { Trash2 } from 'lucide-react';

const Todo = ({ todo, deleteTodo, toggleComplete }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo._id, todo.completed)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.title}
      </span>
      <Trash2 onClick={() => deleteTodo(todo._id)} className="delete-icon" />
    </div>
  );
};

export default Todo;
