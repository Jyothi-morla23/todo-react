import axios from 'axios';

const API_URL = 'https://todo-node-e0cb.onrender.com/api/todos';

export const getTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};

export const addTodo = async (title) => {
  try {
    const response = await axios.post(API_URL, { title, completed: false });
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    return null;
  }
};

export const updateTodo = async (id, completed) => {
  try {
    const response = await axios.put(`${API_URL}${id}`, { completed });
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    return null;
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting todo:', error);
    return false;
  }
};
