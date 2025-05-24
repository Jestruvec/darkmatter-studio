import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";
import { LoginForm } from "./LoginForm";
import { AuthContext } from "@/context";
import { AuthContextType } from "@/types";

describe("LoginForm Component", () => {
  const baseMockAuthContext: AuthContextType = {
    loading: false,
    error: null,
    authResponse: { user: { name: "Jhonny" }, session: {} },
    signUpResponse: null,
    recoverResponse: null,
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
        <LoginForm />
      </AuthContext.Provider>
    );
  };

  //1 - basic rendering
  it("render email and password inputs and login btn", () => {
    renderWithContext();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  //2 - disables button
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

    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  //4 - calls login with form values
  it("calls login with form values", async () => {
    const loginMock = vi.fn();
    renderWithContext({ login: loginMock });

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitBtn = screen.getByRole("button");

    await userEvent.type(emailInput, "test@example.com", { delay: null });
    await userEvent.type(passwordInput, "123456", { delay: null });
    await userEvent.click(submitBtn);

    expect(loginMock).toHaveBeenCalledWith("test@example.com", "123456");
  });

  //5 - shows auth error
  it("shows auth error message", () => {
    renderWithContext({ error: "invalid credentials" });
    const errorMsg = screen.getByText(/invalid credentials/i);
    expect(errorMsg).toBeInTheDocument();
  });
});
