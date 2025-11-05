interface TodoFilterProps {
  currentFilter: "all" | "active" | "completed";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
}

export default function TodoFilter({ currentFilter, onFilterChange }: TodoFilterProps) {
  return (
    <div className="filter-buttons">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => onFilterChange("all")}
        aria-label="Show all todos"
      >
        All
      </button>
      <button
        className={currentFilter === "active" ? "active" : ""}
        onClick={() => onFilterChange("active")}
        aria-label="Show active todos"
      >
        Active
      </button>
      <button
        className={currentFilter === "completed" ? "active" : ""}
        onClick={() => onFilterChange("completed")}
        aria-label="Show completed todos"
      >
        Completed
      </button>
    </div>
  );
}
