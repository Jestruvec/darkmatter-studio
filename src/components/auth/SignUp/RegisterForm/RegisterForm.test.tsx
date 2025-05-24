import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";
import { RegisterForm } from "./RegisterForm";
import { AuthContext } from "@/context";
import { AuthContextType } from "@/types";

describe("RegisterForm Component", () => {
  const baseMockAuthContext: AuthContextType = {
    loading: false,
    error: null,
    authResponse: null,
    recoverResponse: null,
    signUpResponse: { user: { name: "Jhonny" }, session: {} },
    login: vi.fn(),
    logout: vi.fn(),
    signUp: vi.fn(),
    recoverPassword: vi.fn(),
  };

  const renderWithContext = (
    contextOverrides: Partial<AuthContextType> = {}
  ) => {
    const contextValue = { ...baseMockAuthContext, ...contextOverrides };

    return render(
      <AuthContext.Provider value={contextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );
  };

  //1 - basic rendering
  it("render email and password inputs and login btn", () => {
    renderWithContext();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  //2 - disables button when loading is true
  it("disables button on loading", () => {
    renderWithContext({ loading: true });
    expect(screen.getByRole("button")).toBeDisabled();
  });

  //3 - shows errors when fields are empty
  it("shows validation errors when fields are empty", async () => {
    renderWithContext();
    const submitBtn = screen.getByRole("button");
    await userEvent.click(submitBtn);

    const emailError = screen.getByText(/Email is required/i);
    const passwordError = screen.getByText(/Password is required/i);
    const passwordConfirmError = screen.getByText(/Confirmation is required/i);

    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
    expect(passwordConfirmError).toBeInTheDocument();
  });

  //4 - shows error when passwords doesnt match
  it("shows error when passwords doesnt match", async () => {
    renderWithContext();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm password");
    const submitBtn = screen.getByRole("button");

    await userEvent.type(emailInput, "test@example.com", { delay: null });
    await userEvent.type(passwordInput, "123456", { delay: null });
    await userEvent.type(confirmPasswordInput, "123", { delay: null });

    await userEvent.click(submitBtn);

    const errorMsg = screen.getByText(/Confirmation is required/i);

    expect(errorMsg).toBeInTheDocument();
  });

  //5 - shows signUp error on submit when something goes
  it("shows signUp error message", () => {
    renderWithContext({ error: "test error" });
    const registerError = screen.getByText(/test error/i);
    expect(registerError).toBeInTheDocument();
  });

  //6 - calls signUp with form values and shows success msg
  it("calls signUp with form values", async () => {
    const signUpMock = vi.fn();
    renderWithContext({ signUp: signUpMock });

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm password");
    const submitBtn = screen.getByRole("button");

    await userEvent.type(emailInput, "test@example.com", { delay: null });
    await userEvent.type(passwordInput, "123456", { delay: null });
    await userEvent.type(confirmPasswordInput, "123456", { delay: null });
    await userEvent.click(submitBtn);

    const successMsg = screen.getByText(/Confirmation email sent/i);

    expect(successMsg).toBeInTheDocument();
    expect(signUpMock).toHaveBeenCalledWith("test@example.com", "123456");
  });
});
