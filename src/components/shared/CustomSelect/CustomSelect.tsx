import {
  UseFormRegister,
  FieldValues,
  RegisterOptions,
  Path,
} from "react-hook-form";
import { CustomMessage } from "../CustomMessage/CustomMessage";

export type SelectVariant = "outlined" | "underlined";
export type SelectSize = "sm" | "md" | "lg";
export interface SelectOption {
  label: string;
  value: string;
}

interface Props<T extends FieldValues>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: Path<T>;
  label: string;
  options: SelectOption[];
  variant?: SelectVariant;
  inputSize?: SelectSize;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  error?: string;
}

export const CustomSelect = <T extends FieldValues>({
  id,
  label,
  options,
  register,
  validation,
  variant = "outlined",
  inputSize = "md",
  className,
  disabled,
  error,
  ...rest
}: Props<T>) => {
  const basicClasses = "focus:outline-none";

  const variantClasses = {
    outlined:
      "shadow-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-gray-300",
    underlined:
      "border-b border-gray-300 focus:border-b-2 focus:border-gray-400",
  };

  const sizeClasses = {
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-3",
    lg: "py-3 px-4 text-lg",
  };

  const disabledClasses = disabled ? "opacity-50" : "";

  const inputClasses = `${basicClasses} ${variantClasses[variant]} ${sizeClasses[inputSize]} ${className} ${disabledClasses}`;
  const containerClasses = "flex flex-col gap-1";

  return (
    <div className={containerClasses}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        disabled={disabled}
        className={inputClasses}
        {...register(id, validation)}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <CustomMessage message={error} type="error" size="xs" />}
    </div>
  );
};
