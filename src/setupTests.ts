import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "common.loading": "Loading...",
        "common.password": "Password",

        "loginForm.email": "Email",
        "loginForm.password": "Password",
        "loginForm.errors.email": "Email is required",
        "loginForm.errors.password": "Password is required",

        "registerForm.email": "Email",
        "registerForm.password": "Password",
        "registerForm.passConfirm": "Confirm password",
        "registerForm.success": "Confirmation email sent",
        "registerForm.errors.email": "Email is required",
        "registerForm.errors.password": "Password is required",
        "registerForm.errors.passConfirm": "Confirmation is required",
        "registerForm.errors.passwordMismatch": "Confirmation is required",
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock("three", () => ({}));
