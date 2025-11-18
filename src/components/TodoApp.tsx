import { useState, useEffect } from "react";
import "./TodoApp.css";
import type { Todo } from "./types";
import TodoInput from "./TodoInput";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";
import { sessionStorage } from "../utils/sessionStorage";

const TODOS_STORAGE_KEY = "todos";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return sessionStorage.getItem<Todo[]>(TODOS_STORAGE_KEY, []);
  });
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // Save todos to session storage whenever they change
  useEffect(() => {
    sessionStorage.setItem(TODOS_STORAGE_KEY, todos);
  }, [todos]);

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
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
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
  const hasCompleted = todos.some((todo) => todo.completed);

  return (
    <div className="todo-app">
      <h1>{import.meta.env.VITE_APP_NAME || "Todo App"}</h1>

      <TodoInput value={inputValue} onChange={setInputValue} onAdd={addTodo} />

      {todos.length > 0 && (
        <>
          <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />

          <TodoFooter
            activeCount={activeTodoCount}
            hasCompleted={hasCompleted}
            onClearCompleted={clearCompleted}
          />
        </>
      )}
    </div>
  );
}
