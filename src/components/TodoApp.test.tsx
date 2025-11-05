import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoApp from "./TodoApp";

describe("TodoApp", () => {
  it("renders the todo app heading", () => {
    render(<TodoApp />);
    expect(screen.getByText("Todo App")).toBeInTheDocument();
  });

  it("renders input field and add button", () => {
    render(<TodoApp />);
    expect(screen.getByPlaceholderText("What needs to be done?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add todo/i })).toBeInTheDocument();
  });

  it("adds a new todo when clicking add button", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByRole("button", { name: /add todo/i });
    
    await user.type(input, "Buy groceries");
    await user.click(addButton);
    
    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("adds a new todo when pressing Enter", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    
    await user.type(input, "Walk the dog{Enter}");
    
    expect(screen.getByText("Walk the dog")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("does not add empty todos", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    const addButton = screen.getByRole("button", { name: /add todo/i });
    await user.click(addButton);
    
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("does not add todos with only whitespace", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByRole("button", { name: /add todo/i });
    
    await user.type(input, "   ");
    await user.click(addButton);
    
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("toggles todo completion status", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    await user.type(input, "Complete project{Enter}");
    
    const checkbox = screen.getByRole("checkbox", { name: /toggle complete project/i });
    expect(checkbox).not.toBeChecked();
    
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("deletes a todo", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    await user.type(input, "Delete me{Enter}");
    
    expect(screen.getByText("Delete me")).toBeInTheDocument();
    
    const deleteButton = screen.getByRole("button", { name: /delete delete me/i });
    await user.click(deleteButton);
    
    expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
  });

  it("displays correct active todo count", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    
    await user.type(input, "Task 1{Enter}");
    expect(screen.getByText("1 item left")).toBeInTheDocument();
    
    await user.type(input, "Task 2{Enter}");
    expect(screen.getByText("2 items left")).toBeInTheDocument();
    
    const checkbox = screen.getByRole("checkbox", { name: /toggle task 1/i });
    await user.click(checkbox);
    expect(screen.getByText("1 item left")).toBeInTheDocument();
  });

  it("filters todos by all, active, and completed", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    await user.type(input, "Active task{Enter}");
    await user.type(input, "Completed task{Enter}");
    
    const completedCheckbox = screen.getByRole("checkbox", { name: /toggle completed task/i });
    await user.click(completedCheckbox);
    
    // Show all
    const allButton = screen.getByRole("button", { name: /show all todos/i });
    await user.click(allButton);
    expect(screen.getByText("Active task")).toBeInTheDocument();
    expect(screen.getByText("Completed task")).toBeInTheDocument();
    
    // Show active only
    const activeButton = screen.getByRole("button", { name: /show active todos/i });
    await user.click(activeButton);
    expect(screen.getByText("Active task")).toBeInTheDocument();
    expect(screen.queryByText("Completed task")).not.toBeInTheDocument();
    
    // Show completed only
    const completedButton = screen.getByRole("button", { name: /show completed todos/i });
    await user.click(completedButton);
    expect(screen.queryByText("Active task")).not.toBeInTheDocument();
    expect(screen.getByText("Completed task")).toBeInTheDocument();
  });

  it("clears all completed todos", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    await user.type(input, "Task 1{Enter}");
    await user.type(input, "Task 2{Enter}");
    await user.type(input, "Task 3{Enter}");
    
    const checkbox1 = screen.getByRole("checkbox", { name: /toggle task 1/i });
    const checkbox2 = screen.getByRole("checkbox", { name: /toggle task 2/i });
    
    await user.click(checkbox1);
    await user.click(checkbox2);
    
    const clearButton = screen.getByRole("button", { name: /clear completed todos/i });
    await user.click(clearButton);
    
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
  });

  it("only shows clear completed button when there are completed todos", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    await user.type(input, "Task 1{Enter}");
    
    expect(screen.queryByRole("button", { name: /clear completed todos/i })).not.toBeInTheDocument();
    
    const checkbox = screen.getByRole("checkbox", { name: /toggle task 1/i });
    await user.click(checkbox);
    
    expect(screen.getByRole("button", { name: /clear completed todos/i })).toBeInTheDocument();
  });

  it("edits a todo on double click", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    await user.type(input, "Original text{Enter}");
    
    const todoText = screen.getByText("Original text");
    await user.dblClick(todoText);
    
    const editInput = screen.getByLabelText(/edit todo input/i);
    expect(editInput).toHaveValue("Original text");
    
    await user.clear(editInput);
    await user.type(editInput, "Updated text");
    fireEvent.blur(editInput);
    
    expect(screen.getByText("Updated text")).toBeInTheDocument();
    expect(screen.queryByText("Original text")).not.toBeInTheDocument();
  });

  it("deletes todo if edit input is cleared", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    await user.type(input, "Delete on edit{Enter}");
    
    const todoText = screen.getByText("Delete on edit");
    await user.dblClick(todoText);
    
    const editInput = screen.getByLabelText(/edit todo input/i);
    await user.clear(editInput);
    fireEvent.blur(editInput);
    
    expect(screen.queryByText("Delete on edit")).not.toBeInTheDocument();
  });

  it("cancels edit on Escape key", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    await user.type(input, "Original{Enter}");
    
    const todoText = screen.getByText("Original");
    await user.dblClick(todoText);
    
    const editInput = screen.getByLabelText(/edit todo input/i);
    await user.clear(editInput);
    await user.type(editInput, "Changed");
    await user.keyboard("{Escape}");
    
    expect(screen.getByText("Original")).toBeInTheDocument();
    expect(screen.queryByText("Changed")).not.toBeInTheDocument();
  });

  it("saves edit on Enter key", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    await user.type(input, "Original{Enter}");
    
    const todoText = screen.getByText("Original");
    await user.dblClick(todoText);
    
    const editInput = screen.getByLabelText(/edit todo input/i);
    await user.clear(editInput);
    await user.type(editInput, "Updated{Enter}");
    
    expect(screen.getByText("Updated")).toBeInTheDocument();
    expect(screen.queryByText("Original")).not.toBeInTheDocument();
  });
});
