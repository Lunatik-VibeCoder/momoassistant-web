import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getForgotPasswordContent } from "@/content/forgot-password";
import { ForgotPasswordForm } from "./forgot-password-form";

// PASSWORD-RESET-WEB-2 -- rendered directly with real content fixtures,
// same pattern as devices-list.test.tsx. No submission is ever triggered
// here (that would invoke the real "use server" action, which calls
// mcp-client's forgotPassword() -> a real fetch) -- these are rendering-only
// assertions, so no mock of "./actions" or global fetch is needed at all.
const content = getForgotPasswordContent("en");

describe("ForgotPasswordForm", () => {
  it("renders the required email field with the right type/autoComplete", () => {
    render(<ForgotPasswordForm content={content} locale="en" />);

    const emailInput = screen.getByLabelText(content.emailLabel);
    expect(emailInput).toBeRequired();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("autoComplete", "email");
    expect(emailInput).toHaveAttribute("name", "email");
  });

  it("renders the submit button", () => {
    render(<ForgotPasswordForm content={content} locale="en" />);
    expect(screen.getByRole("button", { name: content.submitLabel })).toBeInTheDocument();
  });

  it("renders a link back to login for the correct locale", () => {
    render(<ForgotPasswordForm content={content} locale="fr" />);
    const link = screen.getByRole("link", { name: content.backToLoginLabel });
    expect(link).toHaveAttribute("href", "/fr/login");
  });

  it("renders no error alert in the idle state", () => {
    render(<ForgotPasswordForm content={content} locale="en" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
