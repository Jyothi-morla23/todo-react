# Todo App

This is a simple and modern Todo application built with React. It allows users to manage their tasks with a clean and intuitive user interface.

## Features

- **Add Todos**: Add new tasks to your list. You can add multiple todos at once by separating them with commas.
- **Delete Todos**: Remove tasks from your list.
- **Complete Todos**: Mark tasks as completed. Completed tasks are visually distinguished with a line-through style.
- **Search Todos**: Filter your list of todos by title.
- **Scrollable List**: The todo list is scrollable, so you can manage a large number of tasks without cluttering the UI.
- **LIFO Display**: Newly added todos appear at the top of the list.

## How to Run

1.  **Prerequisites**: Make sure you have Node.js and npm installed on your machine.
2.  **Backend Setup**: This application requires a backend server to be running. The server should expose the following endpoints:
    -   `GET /api/todos/`: Fetches all todos.
    -   `POST /api/todos/`: Adds a new todo.
    -   `PUT /api/todos/:id`: Updates a todo.
    -   `DELETE /api/todos/:id`: Deletes a todo.
3.  **Frontend Setup**:
    -   Navigate to the `frontend` directory in your terminal.
    -   Run `npm install` to install the necessary dependencies.
    -   Run `npm start` to start the frontend development server.
4.  **Open in Browser**: The application should automatically open in your default web browser at `http://localhost:5173` (or another port if 5173 is in use).

## API

The application interacts with a backend API to manage the todo data. The base URL for the API is `http://localhost:3000/api/todos/`.

### API Endpoints

-   **`GET /api/todos/`**: Retrieves the list of all todos.
-   **`POST /api/todos/`**: Creates a new todo. The request body should be a JSON object with a `title` property.
-   **`PUT /api/todos/:id`**: Updates an existing todo. The request body should be a JSON object with a `completed` property.
-   **`DELETE /api/todos/:id`**: Deletes a todo with the specified `id`.