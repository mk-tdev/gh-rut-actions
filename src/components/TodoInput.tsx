interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export default function TodoInput({ value, onChange, onAdd }: TodoInputProps) {
  return (
    <div className="todo-input-container">
      <input
        type="text"
        className="todo-input"
        placeholder="What needs to be done?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
        aria-label="New todo input"
      />
      <button onClick={onAdd} className="add-button" aria-label="Add todo">
        Add
      </button>
    </div>
  );
}
