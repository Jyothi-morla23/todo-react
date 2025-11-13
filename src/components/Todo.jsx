import React from 'react';
import { Trash2 } from 'lucide-react';
import InlineSpinner from './InlineSpinner';
import './InlineSpinner.css';

const Todo = ({ todo, deleteTodo, toggleComplete }) => {
  return (
    <div className="todo-item">
      {todo.loading ? (
        <InlineSpinner />
      ) : (
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo._id, todo.completed)}
        />
      )}
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.title}
      </span>
      {todo.loading ? (
        <InlineSpinner />
      ) : (
        <Trash2 onClick={() => deleteTodo(todo._id)} className="delete-icon" />
      )}
    </div>
  );
};

export default Todo;
