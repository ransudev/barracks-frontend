"use client";

import { barbers } from "@/app/data/barbers";
import { revenueByDay } from "@/app/data/reports";
import type { ViewId } from "@/app/types/domain";
import { formatCurrency } from "@/app/utils/format";
import {
  Avatar,
  Button,
  MetricCard,
  PageHeader,
  Panel,
  ProgressBar,
  SectionHeading,
} from "@/app/components/ui";
import { Icon } from "@/app/components/ui/icons";

type AdminDashboardProps = {
  go: (view: ViewId) => void;
  onToast: (message: string) => void;
};

export function AdminDashboard({ go, onToast }: AdminDashboardProps) {
  return (
    <>
      <PageHeader
        eyebrow="Tuesday, April 14, 2026"
        title="Business overview"
        subtitle="A clear read on the shop, from first chair to final close."
        action={
          <Button
            variant="secondary"
            icon="download"
            onClick={() => onToast("Daily summary exported locally")}
          >
            Export summary
          </Button>
        }
      />
      <div className="metrics-grid metrics-grid--four">
        <MetricCard
          label="Total revenue"
          value="$2,485"
          change="+12% from last week"
          icon="wallet"
          accent="green"
        />
        <MetricCard
          label="Total customers"
          value="156"
          change="+8 new this week"
          icon="users"
          accent="blue"
        />
        <MetricCard
          label="Active staff"
          value="5"
          note="3 barbers · 2 staff"
          icon="briefcase"
          accent="violet"
        />
        <MetricCard
          label="Bookings today"
          value="18"
          note="12 completed"
          icon="calendar"
          accent="amber"
        />
      </div>

      <div className="dashboard-grid dashboard-grid--wide">
        <Panel className="revenue-overview">
          <SectionHeading
            title="Revenue overview"
            description="A week in the life of the shop."
            action={
              <select className="table-select" defaultValue="This week">
                <option>This week</option>
                <option>Last week</option>
              </select>
            }
          />
          <div className="revenue-chart">
            <div className="chart-axis">
              <span>$700</span>
              <span>$500</span>
              <span>$300</span>
              <span>$100</span>
              <span>$0</span>
            </div>
            <div className="chart-columns">
              {revenueByDay.map((day) => (
                <div className="chart-column" key={day.day}>
                  <div className="chart-column__bar-wrap">
                    <span
                      className={
                        "chart-column__bar " +
                        (day.day === "Fri" ? "is-muted" : "")
                      }
                      style={{ height: Math.max(day.value / 7, 4) + "%" }}
                    >
                      <b>{day.value ? formatCurrency(day.value) : ""}</b>
                    </span>
                  </div>
                  <small>{day.day}</small>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel className="barber-performance">
          <SectionHeading
            title="Barber performance"
            description="Revenue contribution this week."
            action={
              <button
                className="link-button"
                type="button"
                onClick={() => go("barbers")}
              >
                View all <Icon name="arrowRight" size={14} />
              </button>
            }
          />
          <div className="performance-list">
            {barbers.slice(0, 4).map((barber, index) => (
              <div className="performance-row" key={barber.id}>
                <div className="performance-row__head">
                  <span>
                    <Avatar
                      initials={barber.initials}
                      tone={barber.tone}
                      size="sm"
                    />
                    <strong>{barber.name}</strong>
                  </span>
                  <strong>{formatCurrency([895, 720, 540, 330][index])}</strong>
                </div>
                <ProgressBar
                  value={[100, 80, 60, 37][index]}
                  tone={barber.tone}
                />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="management-shortcuts">
        <button type="button" onClick={() => go("staff-management")}>
          <span className="shortcut-icon shortcut-icon--blue">
            <Icon name="users" size={18} />
          </span>
          <span>
            <strong>Staff management</strong>
            <small>Manage access and permissions.</small>
          </span>
          <Icon name="arrowRight" size={16} />
        </button>
        <button type="button" onClick={() => go("services")}>
          <span className="shortcut-icon shortcut-icon--green">
            <Icon name="briefcase" size={18} />
          </span>
          <span>
            <strong>Services</strong>
            <small>Keep pricing and duration current.</small>
          </span>
          <Icon name="arrowRight" size={16} />
        </button>
        <button type="button" onClick={() => go("reports")}>
          <span className="shortcut-icon shortcut-icon--violet">
            <Icon name="chart" size={18} />
          </span>
          <span>
            <strong>Reports</strong>
            <small>Read what the numbers are saying.</small>
          </span>
          <Icon name="arrowRight" size={16} />
        </button>
        <button type="button" onClick={() => go("admin-inventory")}>
          <span className="shortcut-icon shortcut-icon--red">
            <Icon name="box" size={18} />
          </span>
          <span>
            <strong>Inventory</strong>
            <small>4 low stock items need a look.</small>
          </span>
          <Icon name="arrowRight" size={16} />
        </button>
      </div>

      <div className="dashboard-lower-grid">
        <Panel>
          <SectionHeading
            title="Today’s activity"
            description="The operating summary so far."
          />
          <div className="activity-list">
            <div className="activity-row">
              <span className="activity-row__icon activity-row__icon--green">
                <Icon name="check" size={15} />
              </span>
              <span>
                <strong>12 bookings completed</strong>
                <small>3 services remain on the book</small>
              </span>
              <strong>12 / 18</strong>
            </div>
            <div className="activity-row">
              <span className="activity-row__icon activity-row__icon--blue">
                <Icon name="users" size={15} />
              </span>
              <span>
                <strong>42 customers served</strong>
                <small>8% ahead of the same day last week</small>
              </span>
              <strong>42</strong>
            </div>
            <div className="activity-row">
              <span className="activity-row__icon activity-row__icon--amber">
                <Icon name="spark" size={15} />
              </span>
              <span>
                <strong>$745.50 in commissions</strong>
                <small>30% of tracked service revenue</small>
              </span>
              <strong>$745</strong>
            </div>
          </div>
        </Panel>
        <Panel className="management-note">
          <span className="closing-note__stamp">
            <Icon name="info" size={16} /> Manager’s note
          </span>
          <h2>
            Keep the signal
            <br />
            <em>clean.</em>
          </h2>
          <p>
            Revenue is strong, but the board is telling us to protect the 4:00
            PM gap for walk-ins.
          </p>
          <button
            className="link-button"
            type="button"
            onClick={() => onToast("Manager note saved locally")}
          >
            Save a note <Icon name="arrowRight" size={14} />
          </button>
        </Panel>
      </div>
    </>
  );
}
