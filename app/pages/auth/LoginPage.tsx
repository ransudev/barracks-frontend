"use client";

import { useState, type FormEvent } from "react";
import type { ViewId } from "@/app/types/domain";
import { Button, Logo, Modal, TextField } from "@/app/components/ui";
import { Icon } from "@/app/components/ui/icons";

type LoginPageProps = {
  go: (view: ViewId) => void;
  onToast: (message: string) => void;
};

export function LoginPage({ go, onToast }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("jules@barracks.ph");
  const [password, setPassword] = useState("barracks123");
  const [error, setError] = useState("");
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("jules@barracks.ph");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError("");
    onToast("Signed in as Jules Mendoza");
    go("staff-dashboard");
  }

  function sendRecovery(event: FormEvent) {
    event.preventDefault();
    if (!recoveryEmail.includes("@")) {
      onToast("Enter a valid email address");
      return;
    }
    setRecoveryOpen(false);
    onToast("Password reset instructions sent");
  }

  return (
    <div className="login-page">
      <div className="login-page__aside">
        <button
          className="login-back"
          type="button"
          onClick={() => go("landing")}
        >
          <Icon name="chevronLeft" size={15} />
          Back to Barracks
        </button>
        <div className="login-aside__brand">
          <Logo />
          <span className="login-aside__slash" />
          <span className="login-aside__label">
            A shop floor
            <br />
            with a better memory.
          </span>
        </div>
        <div className="login-aside__mark">
          <span>B</span>
          <small>BAR-01 / ACCESS</small>
        </div>
        <div className="login-aside__footer">
          <span>PRIVATE WORKSPACE</span>
          <strong>
            Built for the people
            <br />
            behind the chair.
          </strong>
        </div>
      </div>

      <main className="login-page__main">
        <div className="login-card">
          <div className="login-card__head">
            <h1>Good to see you.</h1>
            <p>Sign in to pick up where the day left off.</p>
          </div>

          <form className="login-form" onSubmit={submit}>
            <TextField
              label="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              icon="mail"
            />
            <label className="field">
              <span className="field__label">Password</span>
              <span className="input-wrap">
                <Icon name="lock" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="input-action"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon name={showPassword ? "eyeOff" : "eye"} size={16} />
                </button>
              </span>
            </label>
            <div className="login-form__meta">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />{" "}
                <span>Keep me signed in</span>
              </label>
              <button
                type="button"
                className="link-button"
                onClick={() => setRecoveryOpen(true)}
              >
                Forgot password?
              </button>
            </div>
            <Button
              type="submit"
              size="lg"
              iconAfter="arrowRight"
              className="login-submit"
            >
              Continue to workspace
            </Button>
          </form>
          {error && <p className="form-error">{error}</p>}
        </div>
      </main>

      <Modal
        open={recoveryOpen}
        title="Reset your password"
        description="We’ll send a reset link to the email on your account."
        onClose={() => setRecoveryOpen(false)}
      >
        <form className="modal-form" onSubmit={sendRecovery}>
          <TextField
            label="Email address"
            type="email"
            value={recoveryEmail}
            onChange={(event) => setRecoveryEmail(event.target.value)}
            icon="mail"
          />
          <div className="modal-actions">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setRecoveryOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" icon="mail">
              Send reset link
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
