import React, { useState, useEffect, useMemo } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getTodos, addTodo, deleteTodo, updateTodo } from './api';
import './App.css';
import { ClipboardList, Search } from 'lucide-react';
import Spinner from './components/Spinner';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data.map(todo => ({ ...todo, loading: false })));
    setInitialLoading(false);
  };

  const handleAddTodo = async (titleInput) => {
    const titles = titleInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
    if (titles.length === 0) {
      toast.error('Please enter a todo title.');
      return;
    }

    const newTodos = [];
    const failedTodos = [];

    for (const title of titles) {
      const newTodo = await addTodo(title);
      if (newTodo) {
        newTodos.push({ ...newTodo, loading: false });
      } else {
        failedTodos.push(title);
      }
    }

    if (newTodos.length > 0) {
      setTodos([...newTodos, ...todos]);
      toast.success(`${newTodos.length} todo(s) added successfully!`);
    }

    if (failedTodos.length > 0) {
      toast.error(`Failed to add ${failedTodos.length} todo(s).`);
    }
  };

  const handleDeleteTodo = async (id) => {
    const todoToDelete = todos.find(todo => todo._id === id);
    if (window.confirm(`Are you sure you want to delete "${todoToDelete.title}"?`)) {
      setTodos(todos.map(todo => todo._id === id ? { ...todo, loading: true } : todo));
      const success = await deleteTodo(id);
      if (success) {
        setTodos(todos.filter((todo) => todo._id !== id));
        toast.success('Todo deleted successfully!');
      } else {
        setTodos(todos.map(todo => todo._id === id ? { ...todo, loading: false } : todo));
        toast.error('Failed to delete todo.');
      }
    }
  };

  const handleToggleComplete = async (id, completed) => {
    setTodos(todos.map(todo => todo._id === id ? { ...todo, loading: true } : todo));
    const updatedTodo = await updateTodo(id, !completed);
    if (updatedTodo) {
      setTodos(
        todos.map((todo) => (todo._id === id ? { ...updatedTodo, loading: false } : todo))
      );
      toast.success('Todo updated successfully!');
    } else {
      setTodos(todos.map(todo => todo._id === id ? { ...todo, loading: false } : todo));
      toast.error('Failed to update todo.');
    }
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
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
      {initialLoading ? (
        <Spinner />
      ) : (
        <TodoList
          todos={filteredTodos}
          deleteTodo={handleDeleteTodo}
          toggleComplete={handleToggleComplete}
        />
      )}
    </div>
  );
}

export default App;
