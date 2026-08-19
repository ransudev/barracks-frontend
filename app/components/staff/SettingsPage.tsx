"use client";

import { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  PageHeader,
  Panel,
  SectionHeading,
  TextField,
  Toggle,
} from "@/app/components/ui";
import { Icon } from "@/app/components/ui/icons";

export function StaffSettingsPage({
  onToast,
}: {
  onToast: (message: string) => void;
}) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [soundNotifications, setSoundNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Account / Staff"
        title="Settings"
        subtitle="Your workspace, preferences, and account details."
        action={
          <Button
            icon="check"
            onClick={() => onToast("Settings saved locally")}
          >
            Save changes
          </Button>
        }
      />
      <div className="settings-grid">
        <Panel>
          <SectionHeading
            title="Profile"
            description="How your team sees you."
          />
          <div className="settings-profile">
            <Avatar initials="JM" tone="blue" size="lg" />
            <div>
              <strong>Jules Mendoza</strong>
              <small>Front desk · Shop floor</small>
              <button
                className="link-button"
                type="button"
                onClick={() => onToast("Profile photo picker opened")}
              >
                Change photo
              </button>
            </div>
          </div>
          <div className="form-grid">
            <TextField
              label="Full name"
              value="Jules Mendoza"
              onChange={() => undefined}
            />
            <TextField
              label="Email address"
              value="jules@barracks.ph"
              onChange={() => undefined}
              type="email"
            />
            <TextField
              label="Role"
              value="Front desk"
              onChange={() => undefined}
            />
          </div>
        </Panel>

        <Panel>
          <SectionHeading
            title="Preferences"
            description="Tune the way the floor reaches you."
          />
          <div className="settings-toggles">
            <Toggle
              checked={emailNotifications}
              onChange={setEmailNotifications}
              label="Email notifications"
              description="Receive daily close and low stock alerts."
            />
            <Toggle
              checked={soundNotifications}
              onChange={setSoundNotifications}
              label="Sound notifications"
              description="Play a subtle cue for queue updates."
            />
            <Toggle
              checked={autoRefresh}
              onChange={setAutoRefresh}
              label="Auto-refresh dashboard"
              description="Keep queue data current every 60 seconds."
            />
          </div>
        </Panel>

        <Panel>
          <SectionHeading
            title="Change password"
            description="Keep your access to the shop floor secure."
          />
          <div className="form-grid">
            <TextField
              label="Current password"
              type="password"
              placeholder="Enter current password"
            />
            <TextField
              label="New password"
              type="password"
              placeholder="At least 8 characters"
            />
            <TextField
              label="Confirm new password"
              type="password"
              placeholder="Repeat new password"
            />
          </div>
          <Button
            variant="secondary"
            icon="lock"
            onClick={() => onToast("Password update simulated")}
          >
            Update password
          </Button>
        </Panel>

        <Panel className="system-info-panel">
          <SectionHeading
            title="System information"
            description="Prototype environment details."
          />
          <div className="system-info">
            <span>
              <small>Version</small>
              <strong>1.0.0 prototype</strong>
            </span>
            <span>
              <small>Last updated</small>
              <strong>April 14, 2026</strong>
            </span>
            <span>
              <small>Environment</small>
              <Badge tone="success" dot>
                Frontend demo
              </Badge>
            </span>
          </div>
          <div className="system-info__actions">
            <button
              className="link-button"
              type="button"
              onClick={() =>
                onToast("No backend is connected to this prototype")
              }
            >
              View demo notes <Icon name="external" size={14} />
            </button>
            <button
              className="link-button link-button--danger"
              type="button"
              onClick={() =>
                onToast("Sign out is simulated from the profile menu")
              }
            >
              Sign out
            </button>
          </div>
        </Panel>
      </div>
    </>
  );
}
