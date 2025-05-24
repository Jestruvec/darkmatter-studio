import { render, screen } from "@testing-library/react";
import { CustomInput, Variant, Size } from "./CustomInput";
import { useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";

describe("CustomInput", () => {
  type FormValues = { name: string };
  interface Props {
    variant?: Variant;
    inputSize?: Size;
    error?: string;
  }

  const Wrapper = ({ variant, inputSize, error }: Props) => {
    const { register } = useForm<FormValues>();
    return (
      <CustomInput
        id="name"
        label="name"
        placeholder="name"
        className="custom-class"
        type="text"
        aria-label="test label"
        register={register}
        variant={variant}
        inputSize={inputSize}
        error={error}
        disabled
      />
    );
  };

  //1 - renderizado basico
  it("renders with default props", () => {
    render(<Wrapper />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("placeholder", "name");
  });

  //2 - clases personalizadas
  it("merges custom className correctly", () => {
    render(<Wrapper />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  //3 - props html estandar
  it("accepts and aplies standars input attributes", () => {
    render(<Wrapper />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-label", "test label");
    expect(input).toHaveAttribute("type", "text");
  });

  //4 - estado disabled
  it("applies disabled styles and prevent clicks", () => {
    render(<Wrapper />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("opacity-50");
  });

  //5 - variantes
  it.each([
    [
      "outlined",
      "shadow-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-gray-300",
    ],
    [
      "underlined",
      "border-b border-gray-300 focus:border-b-2 focus:border-gray-400",
    ],
  ] as [Variant, string][])(
    "applies correct variant classes",
    (variant, expectedClass) => {
      render(<Wrapper variant={variant} />);
      expect(screen.getByRole("textbox")).toHaveClass(expectedClass);
    }
  );

  //6 - tamaños
  it.each([
    ["sm", "py-1 px-2 text-sm"],
    ["md", "py-2 px-3"],
    ["lg", "py-3 px-4 text-lg"],
  ] as [Size, string][])(
    "applies correct size classes",
    (size, expectedClass) => {
      render(<Wrapper inputSize={size} />);
      expect(screen.getByRole("textbox")).toHaveClass(expectedClass);
    }
  );

  //7 - errores
  it("renders customMessage component when error is provided", () => {
    render(<Wrapper error="test error" />);
    const errorMessage = screen.getByText("test error");
    expect(errorMessage).toBeInTheDocument();
  });
});
