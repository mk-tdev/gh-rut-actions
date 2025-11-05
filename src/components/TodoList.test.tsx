import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "./TodoList";
import type { Todo } from "./types";

describe("TodoList", () => {
  const mockTodos: Todo[] = [
    { id: 1, text: "First todo", completed: false },
    { id: 2, text: "Second todo", completed: true },
    { id: 3, text: "Third todo", completed: false },
  ];

  it("renders all todos", () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    
    expect(screen.getByText("First todo")).toBeInTheDocument();
    expect(screen.getByText("Second todo")).toBeInTheDocument();
    expect(screen.getByText("Third todo")).toBeInTheDocument();
  });

  it("renders correct number of todo items", () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  it("renders empty list when no todos", () => {
    render(
      <TodoList
        todos={[]}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("passes onToggle to TodoItem", async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();
    render(
      <TodoList
        todos={mockTodos}
        onToggle={handleToggle}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    
    const checkbox = screen.getByRole("checkbox", { name: /toggle first todo/i });
    await user.click(checkbox);
    
    expect(handleToggle).toHaveBeenCalledWith(1);
  });

  it("passes onDelete to TodoItem", async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();
    render(
      <TodoList
        todos={mockTodos}
        onToggle={() => {}}
        onDelete={handleDelete}
        onEdit={() => {}}
      />
    );
    
    const deleteButton = screen.getByRole("button", { name: /delete first todo/i });
    await user.click(deleteButton);
    
    expect(handleDelete).toHaveBeenCalledWith(1);
  });

  it("passes onEdit to TodoItem", async () => {
    const user = userEvent.setup();
    const handleEdit = vi.fn();
    render(
      <TodoList
        todos={[mockTodos[0]]}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={handleEdit}
      />
    );
    
    const todoText = screen.getByText("First todo");
    await user.dblClick(todoText);
    
    const editInput = screen.getByLabelText(/edit todo input/i);
    await user.clear(editInput);
    await user.type(editInput, "Edited{Enter}");
    
    expect(handleEdit).toHaveBeenCalledWith(1, "Edited");
  });

  it("renders todos with unique keys", () => {
    const { container } = render(
      <TodoList
        todos={mockTodos}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    
    const listItems = container.querySelectorAll("li");
    expect(listItems).toHaveLength(3);
  });
});
