import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoFilter from "../TodoFilter";

describe("TodoFilter", () => {
  it("renders all filter buttons", () => {
    render(<TodoFilter currentFilter="all" onFilterChange={() => {}} />);
    
    expect(screen.getByRole("button", { name: /show all todos/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show active todos/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show completed todos/i })).toBeInTheDocument();
  });

  it("highlights the current filter", () => {
    render(<TodoFilter currentFilter="active" onFilterChange={() => {}} />);
    
    const activeButton = screen.getByRole("button", { name: /show active todos/i });
    expect(activeButton).toHaveClass("active");
  });

  it("does not highlight non-current filters", () => {
    render(<TodoFilter currentFilter="active" onFilterChange={() => {}} />);
    
    const allButton = screen.getByRole("button", { name: /show all todos/i });
    const completedButton = screen.getByRole("button", { name: /show completed todos/i });
    
    expect(allButton).not.toHaveClass("active");
    expect(completedButton).not.toHaveClass("active");
  });

  it("calls onFilterChange with 'all' when clicking All button", async () => {
    const user = userEvent.setup();
    const handleFilterChange = vi.fn();
    render(<TodoFilter currentFilter="active" onFilterChange={handleFilterChange} />);
    
    const allButton = screen.getByRole("button", { name: /show all todos/i });
    await user.click(allButton);
    
    expect(handleFilterChange).toHaveBeenCalledWith("all");
  });

  it("calls onFilterChange with 'active' when clicking Active button", async () => {
    const user = userEvent.setup();
    const handleFilterChange = vi.fn();
    render(<TodoFilter currentFilter="all" onFilterChange={handleFilterChange} />);
    
    const activeButton = screen.getByRole("button", { name: /show active todos/i });
    await user.click(activeButton);
    
    expect(handleFilterChange).toHaveBeenCalledWith("active");
  });

  it("calls onFilterChange with 'completed' when clicking Completed button", async () => {
    const user = userEvent.setup();
    const handleFilterChange = vi.fn();
    render(<TodoFilter currentFilter="all" onFilterChange={handleFilterChange} />);
    
    const completedButton = screen.getByRole("button", { name: /show completed todos/i });
    await user.click(completedButton);
    
    expect(handleFilterChange).toHaveBeenCalledWith("completed");
  });
});
