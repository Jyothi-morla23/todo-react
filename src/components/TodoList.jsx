import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, deleteTodo, toggleComplete }) => {
  if (todos.length === 0) {
    return <p className="no-todos">No todos yet! Add one above.</p>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <Todo
          key={todo._id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;
