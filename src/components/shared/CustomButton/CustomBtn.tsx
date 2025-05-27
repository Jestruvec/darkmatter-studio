import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export type CustomBtnVariant = "primary" | "secondary" | "danger" | "text";
export type CustomBtnSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: CustomBtnVariant;
  size?: CustomBtnSize;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  children?: React.ReactNode;
  className?: string;
  to?: string;
  as?: "button" | "link";
}

type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const CustomBtn = ({
  variant = "primary",
  size = "md",
  loading = false,
  text,
  children,
  disabled,
  className,
  to,
  as = "button",
  ...props
}: ButtonProps | LinkProps) => {
  const { t } = useTranslation();

  const baseClasses = "font-semibold focus:outline-none";
  const disabledClases = disabled ? "opacity-50" : "cursor-pointer";
  const variantClasses = {
    primary:
      "border border-gray-800 rounded-lg bg-gray-800 text-white dark:bg-white dark:text-gray-800 focus:ring-2 focus:ring-offset-2",
    secondary: "border border-gray-800 rounded-lg dark:border-white",
    danger: "",
    text: "focus:border-b",
  };
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClases} ${className}`;

  const content = loading ? t("common.loading") : text ?? children;

  if (as === "link" && to) {
    return (
      <Link to={to} className={buttonClasses} {...(props as LinkProps)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...(props as ButtonProps)}
    >
      {content}
    </button>
  );
};
