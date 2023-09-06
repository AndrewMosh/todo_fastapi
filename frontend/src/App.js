import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  useEffect(() => {
    // Получить список задач с сервера при монтировании компонента
    axios
      .get("адрес сервера/todos/")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const createTodo = () => {
    // Отправить новую задачу на сервер и обновить список задач
    axios
      .post("адрес сервера/todos/", newTodo)
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo({ title: "", description: "" });
      })
      .catch((error) => console.error("Error creating todo:", error));
  };

  const deleteTodo = (todoId) => {
    // Удалить задачу на сервере и обновить список задач
    axios
      .delete(`адрес сервера/todos/${todoId}`)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo !== todos[todoId]);
        setTodos(updatedTodos);
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div>
      <h1>TODO App</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <button onClick={createTodo}>Create</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span>{todo.title}</span>
            <span>{todo.description}</span>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
