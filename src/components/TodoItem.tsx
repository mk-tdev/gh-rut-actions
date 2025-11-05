import { useState } from "react";
import type { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
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
