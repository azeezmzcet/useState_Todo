import React, { useState } from "react";
import "./styles.css";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  //adding
  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
      setInputValue("");
    }
  };

  //updatE
  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  // removee
  const removeTodo = (idToRemove) => {
    setTodos(todos.filter((todo) => todo.id !== idToRemove));
  };

  //editing
  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add a new todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul style={{ listStyleType: "bullet", textAlign: "left" }}>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => updateTodo(todo.id)}>Save</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => handleEdit(todo.id, todo.text)}>
                  Edit
                </button>
                <button onClick={() => removeTodo(todo.id)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
