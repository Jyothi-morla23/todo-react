import React, { useState, useEffect, useMemo } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getTodos, addTodo, deleteTodo, updateTodo } from './api';
import './App.css';
import { ClipboardList, Search } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAddTodo = async (titleInput) => {
    const titles = titleInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
    const newTodos = [];
    for (const title of titles) {
      const newTodo = await addTodo(title);
      if (newTodo) {
        newTodos.push(newTodo);
      }
    }
    if (newTodos.length > 0) {
      // Prepend new todos to the beginning of the list
      setTodos([...newTodos, ...todos]);
    }
  };

  const handleDeleteTodo = async (id) => {
    const success = await deleteTodo(id);
    if (success) {
      setTodos(todos.filter((todo) => todo._id !== id));
    }
  };

  const handleToggleComplete = async (id, completed) => {
    const updatedTodo = await updateTodo(id, !completed);
    if (updatedTodo) {
      setTodos(
        todos.map((todo) => (todo._id === id ? { ...todo, completed: !completed } : todo))
      );
    }
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  return (
    <div className="App">
      <header className="App-header">
        <ClipboardList size={48} color="#8b5cf6" />
        <h1>Todo List</h1>
      </header>
      <TodoForm addTodo={handleAddTodo} />
      {todos.length > 0 && (
        <div className="search-container">
          <Search className="search-icon" size={20} color="#888" />
          <input
            type="text"
            placeholder="Search todos..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <TodoList
        todos={filteredTodos}
        deleteTodo={handleDeleteTodo}
        toggleComplete={handleToggleComplete}
      />
    </div>
  );
}

export default App;