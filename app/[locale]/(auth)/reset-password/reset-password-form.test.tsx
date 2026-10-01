import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// PASSWORD-RESET-WEB-2 -- the real "./actions" module ("use server") is
// mocked so a submission never reaches mcp-client's real resetPassword()/
// fetch, and so handleSubmit's mismatch-blocking logic can be asserted
// directly against call counts (vi.hoisted is required here because
// vi.mock's factory is hoisted above these const declarations -- the
// standard Vitest pattern for referencing a shared mock from both the
// factory and the test bodies).
const { resetPasswordActionMock } = vi.hoisted(() => ({
  resetPasswordActionMock: vi.fn(async () => ({ status: "idle" }) as const),
}));

vi.mock("./actions", () => ({
  resetPasswordAction: resetPasswordActionMock,
}));

import { getResetPasswordContent } from "@/content/reset-password";
import { ResetPasswordForm } from "./reset-password-form";

const content = getResetPasswordContent("en");

function renderForm() {
  render(
    <ResetPasswordForm
      email="agent@example.com"
      codeLabel={content.codeLabel}
      newPasswordLabel={content.newPasswordLabel}
      confirmPasswordLabel={content.confirmPasswordLabel}
      submitLabel={content.submitLabel}
      mismatchError={content.mismatchError}
      locale="en"
    />,
  );
}

describe("ResetPasswordForm", () => {
  beforeEach(() => {
    resetPasswordActionMock.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("carries the received email in a hidden, non-editable input", () => {
    renderForm();
    const hidden = document.querySelector('input[name="email"]') as HTMLInputElement;
    expect(hidden).toHaveAttribute("type", "hidden");
    expect(hidden.value).toBe("agent@example.com");
  });

  it("renders the code field with the right pattern/maxLength/inputMode", () => {
    renderForm();
    const code = screen.getByLabelText(content.codeLabel);
    expect(code).toBeRequired();
    expect(code).toHaveAttribute("pattern", "[0-9]{6}");
    expect(code).toHaveAttribute("maxLength", "6");
    expect(code).toHaveAttribute("inputMode", "numeric");
    expect(code).toHaveAttribute("autoComplete", "one-time-code");
  });

  it("renders newPassword/confirmPassword with the right minLength/maxLength/autoComplete", () => {
    renderForm();
    const newPassword = screen.getByLabelText(content.newPasswordLabel);
    const confirmPassword = screen.getByLabelText(content.confirmPasswordLabel);

    for (const field of [newPassword, confirmPassword]) {
      expect(field).toBeRequired();
      expect(field).toHaveAttribute("type", "password");
      expect(field).toHaveAttribute("minLength", "8");
      expect(field).toHaveAttribute("maxLength", "128");
      expect(field).toHaveAttribute("autoComplete", "new-password");
    }
  });

  it("renders no error alert in the idle state", () => {
    renderForm();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  describe("password confirmation", () => {
    it("blocks submission and shows a mismatch error, without calling fetch or the Server Action, when passwords differ", async () => {
      const fetchMock = vi.fn();
      vi.stubGlobal("fetch", fetchMock);

      renderForm();
      fireEvent.change(screen.getByLabelText(content.codeLabel), { target: { value: "123456" } });
      fireEvent.change(screen.getByLabelText(content.newPasswordLabel), { target: { value: "newSecret1" } });
      fireEvent.change(screen.getByLabelText(content.confirmPasswordLabel), {
        target: { value: "differentSecret1" },
      });
      fireEvent.click(screen.getByRole("button", { name: content.submitLabel }));

      expect(await screen.findByText(content.mismatchError)).toBeInTheDocument();
      expect(resetPasswordActionMock).not.toHaveBeenCalled();
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("allows submission through (the Server Action is invoked) when passwords match", async () => {
      renderForm();
      fireEvent.change(screen.getByLabelText(content.codeLabel), { target: { value: "123456" } });
      fireEvent.change(screen.getByLabelText(content.newPasswordLabel), { target: { value: "newSecret1" } });
      fireEvent.change(screen.getByLabelText(content.confirmPasswordLabel), { target: { value: "newSecret1" } });
      fireEvent.click(screen.getByRole("button", { name: content.submitLabel }));

      await vi.waitFor(() => expect(resetPasswordActionMock).toHaveBeenCalledTimes(1));
      expect(screen.queryByText(content.mismatchError)).not.toBeInTheDocument();
    });
  });
});
