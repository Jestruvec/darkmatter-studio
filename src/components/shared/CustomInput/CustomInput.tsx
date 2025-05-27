import {
  UseFormRegister,
  FieldValues,
  RegisterOptions,
  Path,
} from "react-hook-form";
import { CustomMessage } from "../CustomMessage/CustomMessage";

export type Variant = "outlined" | "underlined";
export type Size = "sm" | "md" | "lg";

interface Props<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: Path<T>;
  label: string;
  variant?: Variant;
  inputSize?: Size;
  register: UseFormRegister<T>;
  placeholder?: string;
  validation?: RegisterOptions<T, Path<T>>;
  error?: string;
}

export const CustomInput = <T extends FieldValues>({
  id,
  label,
  type = "text",
  placeholder,
  register,
  validation,
  variant = "outlined",
  inputSize = "md",
  className,
  disabled,
  error,
  ...rest
}: Props<T>) => {
  const baseClasses = "font-semibold my-auto focus:outline-0";

  const variantClasses = {
    outlined:
      "border rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-gray-800",
    underlined: "border-b focus:border-b-2",
  };

  const sizeClasses = {
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-3",
    lg: "py-3 px-4 text-lg",
  };

  const disabledClasses = disabled ? "opacity-50" : "";
  const checkboxClasses =
    type === "checkbox" ? "accent-gray-800 cursor-pointer" : "";

  const inputClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[inputSize]} ${className} ${disabledClasses} ${checkboxClasses}`;
  const containerClasses =
    type === "checkbox"
      ? "flex flex-row-reverse justify-end items-center gap-1 py-2 px-3"
      : "flex flex-col gap-1";

  return (
    <div className={containerClasses}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
        {...register(id, validation)}
        {...rest}
      />
      {error && <CustomMessage message={error} type="error" size="xs" />}
    </div>
  );
};
