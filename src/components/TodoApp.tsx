import { useState } from "react";
import "./TodoApp.css";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };
    
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTodoCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      
      <div className="todo-input-container">
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          aria-label="New todo input"
        />
        <button onClick={addTodo} className="add-button" aria-label="Add todo">
          Add
        </button>
      </div>

      {todos.length > 0 && (
        <>
          <div className="filter-buttons">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
              aria-label="Show all todos"
            >
              All
            </button>
            <button
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}
              aria-label="Show active todos"
            >
              Active
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
              aria-label="Show completed todos"
            >
              Completed
            </button>
          </div>

          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </ul>

          <div className="todo-footer">
            <span className="todo-count">
              {activeTodoCount} {activeTodoCount === 1 ? "item" : "items"} left
            </span>
            {todos.some((todo) => todo.completed) && (
              <button
                onClick={clearCompleted}
                className="clear-completed"
                aria-label="Clear completed todos"
              >
                Clear completed
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() === "") {
      onDelete(todo.id);
    } else {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEdit();
              if (e.key === "Escape") handleCancel();
            }}
            onBlur={handleEdit}
            autoFocus
            aria-label="Edit todo input"
          />
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="todo-checkbox"
            aria-label={`Toggle ${todo.text}`}
          />
          <span
            className="todo-text"
            onDoubleClick={() => setIsEditing(true)}
            role="button"
            tabIndex={0}
          >
            {todo.text}
          </span>
          <button
            onClick={() => onDelete(todo.id)}
            className="delete-button"
            aria-label={`Delete ${todo.text}`}
          >
            ×
          </button>
        </>
      )}
    </li>
  );
}
