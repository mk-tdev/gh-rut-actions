import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoInput from "../TodoInput";

describe("TodoInput", () => {
  it("renders input field with placeholder", () => {
    render(<TodoInput value="" onChange={() => {}} onAdd={() => {}} />);
    expect(screen.getByPlaceholderText("What needs to be done?")).toBeInTheDocument();
  });

  it("renders add button", () => {
    render(<TodoInput value="" onChange={() => {}} onAdd={() => {}} />);
    expect(screen.getByRole("button", { name: /add todo/i })).toBeInTheDocument();
  });

  it("displays the current value", () => {
    render(<TodoInput value="Test value" onChange={() => {}} onAdd={() => {}} />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    expect(input).toHaveValue("Test value");
  });

  it("calls onChange when typing in input", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<TodoInput value="" onChange={handleChange} onAdd={() => {}} />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    await user.type(input, "New todo");
    
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls onAdd when clicking add button", async () => {
    const user = userEvent.setup();
    const handleAdd = vi.fn();
    render(<TodoInput value="Test" onChange={() => {}} onAdd={handleAdd} />);
    
    const addButton = screen.getByRole("button", { name: /add todo/i });
    await user.click(addButton);
    
    expect(handleAdd).toHaveBeenCalledTimes(1);
  });

  it("calls onAdd when pressing Enter key", async () => {
    const user = userEvent.setup();
    const handleAdd = vi.fn();
    render(<TodoInput value="Test" onChange={() => {}} onAdd={handleAdd} />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    await user.type(input, "{Enter}");
    
    expect(handleAdd).toHaveBeenCalledTimes(1);
  });

  it("does not call onAdd when pressing other keys", async () => {
    const user = userEvent.setup();
    const handleAdd = vi.fn();
    render(<TodoInput value="" onChange={() => {}} onAdd={handleAdd} />);
    
    const input = screen.getByPlaceholderText("What needs to be done?");
    await user.type(input, "abc");
    
    expect(handleAdd).not.toHaveBeenCalled();
  });
});
