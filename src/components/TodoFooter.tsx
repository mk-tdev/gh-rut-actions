interface TodoFooterProps {
  activeCount: number;
  hasCompleted: boolean;
  onClearCompleted: () => void;
}

export default function TodoFooter({ activeCount, hasCompleted, onClearCompleted }: TodoFooterProps) {
  return (
    <div className="todo-footer">
      <span className="todo-count">
        {activeCount} {activeCount === 1 ? "item" : "items"} left
      </span>
      {hasCompleted && (
        <button
          onClick={onClearCompleted}
          className="clear-completed"
          aria-label="Clear completed todos"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}
