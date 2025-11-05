import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoFooter from "../TodoFooter";

describe("TodoFooter", () => {
  it("displays singular item count", () => {
    render(<TodoFooter activeCount={1} hasCompleted={false} onClearCompleted={() => {}} />);
    expect(screen.getByText("1 item left")).toBeInTheDocument();
  });

  it("displays plural items count", () => {
    render(<TodoFooter activeCount={5} hasCompleted={false} onClearCompleted={() => {}} />);
    expect(screen.getByText("5 items left")).toBeInTheDocument();
  });

  it("displays zero items count", () => {
    render(<TodoFooter activeCount={0} hasCompleted={true} onClearCompleted={() => {}} />);
    expect(screen.getByText("0 items left")).toBeInTheDocument();
  });

  it("shows clear completed button when hasCompleted is true", () => {
    render(<TodoFooter activeCount={3} hasCompleted={true} onClearCompleted={() => {}} />);
    expect(screen.getByRole("button", { name: /clear completed todos/i })).toBeInTheDocument();
  });

  it("hides clear completed button when hasCompleted is false", () => {
    render(<TodoFooter activeCount={3} hasCompleted={false} onClearCompleted={() => {}} />);
    expect(screen.queryByRole("button", { name: /clear completed todos/i })).not.toBeInTheDocument();
  });

  it("calls onClearCompleted when clicking clear button", async () => {
    const user = userEvent.setup();
    const handleClearCompleted = vi.fn();
    render(<TodoFooter activeCount={2} hasCompleted={true} onClearCompleted={handleClearCompleted} />);
    
    const clearButton = screen.getByRole("button", { name: /clear completed todos/i });
    await user.click(clearButton);
    
    expect(handleClearCompleted).toHaveBeenCalledTimes(1);
  });
});
