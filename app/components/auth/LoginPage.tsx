"use client";

import { useState, type FormEvent } from "react";
import type { AppRole, ViewId } from "@/app/types/domain";
import { Button, Logo, TextField } from "@/app/components/ui";
import { Icon } from "@/app/components/ui/icons";

type LoginPageProps = {
  go: (view: ViewId) => void;
  onToast: (message: string) => void;
};

export function LoginPage({ go, onToast }: LoginPageProps) {
  const [role, setRole] = useState<AppRole>("staff");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("jules@barracks.ph");
  const [password, setPassword] = useState("barracks-demo");

  function submit(event: FormEvent) {
    event.preventDefault();
    onToast(
      "Signed in as " +
        (role === "admin"
          ? "Avery Dela Cruz"
          : role === "customer"
            ? "Michael Chen"
            : "Jules Mendoza"),
    );
    go(
      role === "admin"
        ? "admin-dashboard"
        : role === "customer"
          ? "customer"
          : "staff-dashboard",
    );
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
            <span className="page-eyebrow">Welcome back</span>
            <h1>Good to see you.</h1>
            <p>Sign in to pick up where the day left off.</p>
          </div>

          <div className="login-role-switcher">
            <button
              type="button"
              className={role === "staff" ? "is-active" : ""}
              onClick={() => setRole("staff")}
            >
              <Icon name="scissors" size={16} />
              Staff
            </button>
            <button
              type="button"
              className={role === "admin" ? "is-active" : ""}
              onClick={() => setRole("admin")}
            >
              <Icon name="chart" size={16} />
              Management
            </button>
            <button
              type="button"
              className={role === "customer" ? "is-active" : ""}
              onClick={() => setRole("customer")}
            >
              <Icon name="users" size={16} />
              Customer
            </button>
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
                onClick={() =>
                  onToast("Password recovery is simulated in this prototype")
                }
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

          <p className="login-demo-note">
            <Icon name="info" size={15} />
            This is a frontend demo. Any credentials will work.
          </p>
        </div>
      </main>
    </div>
  );
}
