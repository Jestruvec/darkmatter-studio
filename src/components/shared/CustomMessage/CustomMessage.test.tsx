import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  CustomMessage,
  MessageType,
  MessageSize,
  MessageWeight,
} from "./CustomMessage";

describe("CustomMessage Component", () => {
  //basic render
  it("Renders with default props", () => {
    render(<CustomMessage message="test message" />);
    const element = screen.getByText("test message");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("text-md");
    expect(element).toHaveClass("text-blue-500");
    expect(element).toHaveClass("font-normal");
  });

  //custom classes
  it("merges custom className correctly", () => {
    render(<CustomMessage message="test message" className="test-class" />);
    const element = screen.getByText("test message");
    expect(element).toHaveClass("test-class");
  });

  //types
  it.each([
    ["info", "text-blue-500"],
    ["success", "text-green-500"],
    ["warning", "text-yellow-500"],
    ["error", "text-red-500"],
  ])("applies types correctly", (type, expectedClass) => {
    render(<CustomMessage message="test message" type={type as MessageType} />);
    const element = screen.getByText("test message");
    expect(element).toHaveClass(expectedClass);
  });

  //sizes
  it.each([
    ["xs", "text-xs"],
    ["sm", "text-sm"],
    ["md", "text-md"],
    ["lg", "text-lg"],
  ])("applies sizes correctlye", (size, expectedClass) => {
    render(<CustomMessage message="test message" size={size as MessageSize} />);
    const element = screen.getByText("test message");
    expect(element).toHaveClass(expectedClass);
  });

  //font weight
  it.each([
    ["bold", "font-bold"],
    ["semibold", "font-semibold"],
    ["normal", "font-normal"],
    ["light", "font-light"],
  ])("applies font weight correctly", (weight, expectedClass) => {
    render(
      <CustomMessage message="test message" weight={weight as MessageWeight} />
    );
    const element = screen.getByText("test message");
    expect(element).toHaveClass(expectedClass);
  });
});
