import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from "../Component/Auth/SignUp";
import "../Component/Images/__mock__/signup.jpg";

describe("SignUp", () => {
  it("should render the component with initial input values", () => {
    render(<SignUp />);
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });

  it("should update the email and password inputs on change", () => {
    render(<SignUp />);
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "test123" } });
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("test123");
  });

  it("should call the signUp function on form submit", () => {
    const mockSignUp = jest.fn();
    render(<SignUp />);
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const signUpButton = screen.getByText("Sign Up");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "test123" } });
    fireEvent.click(signUpButton);
    expect(mockSignUp).toHaveBeenCalledTimes(1);
  });

  it("should display error messages if password requirements are not met", () => {
    render(<SignUp />);
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const signUpButton = screen.getByText("Sign Up");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    fireEvent.click(signUpButton);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent("Password Requirements:");
    expect(alertElement).toHaveTextContent(
      "Password must be minimum 8 characters"
    );
    expect(alertElement).toHaveTextContent(
      "Password must contain at least one letter"
    );
    expect(alertElement).toHaveTextContent(
      "Password must contain at least one number"
    );
  });
});
