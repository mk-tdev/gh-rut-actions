import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItem from "../TodoItem";
import type { Todo } from "../types";

describe("TodoItem", () => {
  const mockTodo: Todo = {
    id: 1,
    text: "Test todo",
    completed: false,
  };

  it("renders todo text", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    expect(screen.getByText("Test todo")).toBeInTheDocument();
  });

  it("renders checkbox", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders delete button", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: /delete test todo/i })).toBeInTheDocument();
  });

  it("checkbox is unchecked for incomplete todo", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("checkbox is checked for completed todo", () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(
      <TodoItem
        todo={completedTodo}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("applies completed class to completed todo", () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(
      <TodoItem
        todo={completedTodo}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    const listItem = screen.getByRole("listitem");
    expect(listItem).toHaveClass("completed");
  });

  it("calls onToggle when clicking checkbox", async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={handleToggle}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    
    expect(handleToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it("calls onDelete when clicking delete button", async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onDelete={handleDelete}
        onEdit={() => {}}
      />
    );
    
    const deleteButton = screen.getByRole("button", { name: /delete test todo/i });
    await user.click(deleteButton);
    
    expect(handleDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it("enters edit mode on double click", async () => {
    const user = userEvent.setup();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    
    const todoText = screen.getByText("Test todo");
    await user.dblClick(todoText);
    
    expect(screen.getByLabelText(/edit todo input/i)).toBeInTheDocument();
  });

  it("shows edit input with current text in edit mode", async () => {
    const user = userEvent.setup();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );
    
    const todoText = screen.getByText("Test todo");
    await user.dblClick(todoText);
    
    const editInput = screen.getByLabelText(/edit todo input/i);
    expect(editInput).toHaveValue("Test todo");
  });

  it("calls onEdit when saving edited text", async () => {
    const user = userEvent.setup();
    const handleEdit = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={handleEdit}
      />
    );
    
    const todoText = screen.getByText("Test todo");
    await user.dblClick(todoText);
    
    const editInput = screen.getByLabelText(/edit todo input/i);
    await user.clear(editInput);
    await user.type(editInput, "Updated todo");
    fireEvent.blur(editInput);
    
    expect(handleEdit).toHaveBeenCalledWith(mockTodo.id, "Updated todo");
  });

  it("calls onEdit when pressing Enter in edit mode", async () => {
    const user = userEvent.setup();
    const handleEdit = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={handleEdit}
      />
    );
    
    const todoText = screen.getByText("Test todo");
    await user.dblClick(todoText);
    
    const editInput = screen.getByLabelText(/edit todo input/i);
    await user.clear(editInput);
    await user.type(editInput, "Updated{Enter}");
    
    expect(handleEdit).toHaveBeenCalledWith(mockTodo.id, "Updated");
  });

  it("cancels edit when pressing Escape", async () => {
    const user = userEvent.setup();
    const handleEdit = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={handleEdit}
      />
    );
    
    const todoText = screen.getByText("Test todo");
    await user.dblClick(todoText);
    
    const editInput = screen.getByLabelText(/edit todo input/i);
    await user.clear(editInput);
    await user.type(editInput, "Changed");
    await user.keyboard("{Escape}");
    
    expect(handleEdit).not.toHaveBeenCalled();
    expect(screen.getByText("Test todo")).toBeInTheDocument();
  });

  it("calls onDelete when clearing edit input", async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onDelete={handleDelete}
        onEdit={() => {}}
      />
    );
    
    const todoText = screen.getByText("Test todo");
    await user.dblClick(todoText);
    
    const editInput = screen.getByLabelText(/edit todo input/i);
    await user.clear(editInput);
    fireEvent.blur(editInput);
    
    expect(handleDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it("trims whitespace when editing", async () => {
    const user = userEvent.setup();
    const handleEdit = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={handleEdit}
      />
    );
    
    const todoText = screen.getByText("Test todo");
    await user.dblClick(todoText);
    
    const editInput = screen.getByLabelText(/edit todo input/i);
    await user.clear(editInput);
    await user.type(editInput, "  Trimmed  ");
    fireEvent.blur(editInput);
    
    expect(handleEdit).toHaveBeenCalledWith(mockTodo.id, "Trimmed");
  });
});
