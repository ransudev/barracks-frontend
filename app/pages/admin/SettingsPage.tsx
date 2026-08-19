"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  PageHeader,
  Panel,
  SectionHeading,
  SelectField,
  TextField,
  Toggle,
} from "@/app/components/ui";

export function AdminSettings({
  onToast,
}: {
  onToast: (message: string) => void;
}) {
  const [loyalty, setLoyalty] = useState(true);
  const [lowStock, setLowStock] = useState(true);
  const [dailyReport, setDailyReport] = useState(true);
  const [leaveRequests, setLeaveRequests] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Management / System"
        title="Settings"
        subtitle="Business rules, notifications, and account security."
        action={
          <Button
            icon="check"
            onClick={() => onToast("Business settings saved locally")}
          >
            Save changes
          </Button>
        }
      />
      <div className="settings-grid">
        <Panel>
          <SectionHeading
            title="Business information"
            description="The essentials on your shop record."
          />
          <div className="form-grid">
            <TextField
              label="Business name"
              value="Barracks Barbers & Shaves"
              onChange={() => undefined}
            />
            <TextField
              label="Address"
              value="14 Jupiter Street, Makati"
              onChange={() => undefined}
            />
            <TextField
              label="Phone"
              value="+63 917 555 0144"
              onChange={() => undefined}
            />
            <TextField
              label="Email"
              value="hello@barracks.ph"
              onChange={() => undefined}
            />
          </div>
          <Button
            variant="secondary"
            onClick={() => onToast("Business information saved locally")}
          >
            Save business info
          </Button>
        </Panel>

        <Panel>
          <SectionHeading
            title="Commission settings"
            description="How the shop shares the work."
          />
          <div className="form-grid">
            <TextField
              label="Default commission rate"
              value="30"
              onChange={() => undefined}
              type="number"
            />
            <SelectField
              label="Payout schedule"
              value="Bi-weekly"
              onChange={() => undefined}
            >
              <option>Bi-weekly</option>
              <option>Monthly</option>
              <option>Weekly</option>
            </SelectField>
          </div>
          <Button
            variant="secondary"
            icon="check"
            onClick={() => onToast("Commission settings updated locally")}
          >
            Update commission
          </Button>
        </Panel>

        <Panel>
          <SectionHeading
            title="Loyalty program"
            description="A small thank-you for the regulars."
          />
          <div className="settings-toggles">
            <Toggle
              checked={loyalty}
              onChange={setLoyalty}
              label="Enable loyalty program"
              description="Customers earn points with every paid service."
            />
          </div>
          <div className="form-grid form-grid--two">
            <TextField
              label="Points per $1 spent"
              value="1"
              onChange={() => undefined}
              type="number"
            />
            <TextField
              label="Points value ($)"
              value="0.05"
              onChange={() => undefined}
              type="number"
            />
          </div>
          <Button
            variant="secondary"
            onClick={() => onToast("Loyalty settings updated locally")}
          >
            Update loyalty settings
          </Button>
        </Panel>

        <Panel>
          <SectionHeading
            title="Notifications"
            description="Keep the right people in the loop."
          />
          <div className="settings-toggles">
            <Toggle
              checked={lowStock}
              onChange={setLowStock}
              label="Low stock alerts"
              description="Notify when inventory falls below minimum."
            />
            <Toggle
              checked={dailyReport}
              onChange={setDailyReport}
              label="Daily summary report"
              description="Receive the shop’s close summary."
            />
            <Toggle
              checked={leaveRequests}
              onChange={setLeaveRequests}
              label="Staff leave requests"
              description="Notify when a team member submits leave."
            />
          </div>
        </Panel>

        <Panel>
          <SectionHeading
            title="Account security"
            description="Protect access to the management workspace."
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
            Change password
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
              <small>Last backup</small>
              <strong>Not connected</strong>
            </span>
            <span>
              <small>Environment</small>
              <Badge tone="success" dot>
                Frontend demo
              </Badge>
            </span>
          </div>
          <div className="system-danger-zone">
            <strong>Danger zone</strong>
            <p>Backend actions are intentionally disabled in this prototype.</p>
            <button
              className="link-button link-button--danger"
              type="button"
              onClick={() =>
                onToast("Data reset is unavailable without a backend")
              }
            >
              Reset demo data
            </button>
          </div>
        </Panel>
      </div>
    </>
  );
}
