import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CustomBtn, CustomBtnVariant, CustomBtnSize } from "./CustomBtn";
import { vi, describe, expect, it } from "vitest";

describe("CustomBtn Component", () => {
  //1 - renderizado basico
  it("renders with default props", () => {
    render(<CustomBtn>click me</CustomBtn>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-gray-600");
    expect(button).toHaveClass("px-4 py-2");
    expect(button).not.toBeDisabled();
  });

  //2 - variantes
  it.each([
    ["primary", "bg-gray-600"],
    ["secondary", "bg-gray-300"],
    ["danger", "bg-red-600"],
    ["text", "text-gray-600"],
  ])("applies correct variant classes", (variant, expectedClass) => {
    render(<CustomBtn variant={variant as CustomBtnVariant}>Test</CustomBtn>);
    expect(screen.getByRole("button")).toHaveClass(expectedClass);
  });

  //3 - tamaños
  it.each([
    ["sm", "px-3 py-1.5"],
    ["md", "px-4 py-2"],
    ["lg", "px-6 py-3"],
  ])("applies correct size classes", (size, expectedClass) => {
    render(<CustomBtn size={size as CustomBtnSize}>Test</CustomBtn>);
    expect(screen.getByRole("button")).toHaveClass(expectedClass);
  });

  //4 - comportamiento onClick
  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<CustomBtn onClick={handleClick}>Click</CustomBtn>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  //5 - estado loading
  it("shows loading state correctly", () => {
    render(<CustomBtn loading>Test</CustomBtn>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Loading...");
  });

  //6 - estado disabled
  it("applies disabled styles and prevents clicks", () => {
    const handleClick = vi.fn();
    render(
      <CustomBtn disabled onClick={handleClick}>
        Disabled
      </CustomBtn>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("bg-gray-100");

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  //7 - clases personalizadas
  it("merges custom className correctly", () => {
    render(<CustomBtn className="custom-class">Test</CustomBtn>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  //8 - props html estandar
  it("accepts and applies standard button attributes", () => {
    render(
      <CustomBtn aria-label="Test label" type="submit">
        Test
      </CustomBtn>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Test label");
    expect(button).toHaveAttribute("type", "submit");
  });
});
