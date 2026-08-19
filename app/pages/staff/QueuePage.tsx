"use client";

import type { Dispatch, SetStateAction } from "react";
import { barbers } from "@/app/data/barbers";
import type { QueueEntry } from "@/app/types/domain";
import { formatCurrency } from "@/app/utils/format";
import {
  Avatar,
  Badge,
  Button,
  MetricCard,
  PageHeader,
  Panel,
  SectionHeading,
} from "@/app/components/ui";
import { Icon } from "@/app/components/ui/icons";

type QueuePageProps = {
  queue: QueueEntry[];
  setQueue: Dispatch<SetStateAction<QueueEntry[]>>;
  onToast: (message: string) => void;
};

export function QueuePage({ queue, setQueue, onToast }: QueuePageProps) {
  function updateStatus(id: number, status: QueueEntry["status"]) {
    setQueue((items) =>
      items.map((item) => (item.id === id ? { ...item, status } : item)),
    );
    onToast("Queue status updated to " + status.toLowerCase());
  }

  function assignBarber(id: number, barber: string) {
    setQueue((items) =>
      items.map((item) => (item.id === id ? { ...item, barber } : item)),
    );
    onToast(
      barber === "Unassigned"
        ? "Barber assignment cleared"
        : barber + " assigned to the queue",
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Live operations"
        title="Queue management"
        subtitle="Keep the floor moving, one chair at a time."
        action={
          <Button
            icon="plus"
            onClick={() => onToast("Add to queue form opened")}
          >
            Add to queue
          </Button>
        }
      />
      <div className="metrics-grid metrics-grid--three">
        <MetricCard
          label="Total in queue"
          value={String(queue.length)}
          note="2 arriving soon"
          icon="queue"
          accent="blue"
        />
        <MetricCard
          label="Being served"
          value={String(
            queue.filter((item) => item.status === "In chair").length,
          )}
          change="Chair 04 active"
          icon="scissors"
          accent="amber"
          changeTone="warning"
        />
        <MetricCard
          label="Average wait"
          value="28m"
          note="Down 6m from noon"
          icon="clock"
          accent="green"
        />
      </div>

      <Panel className="queue-panel">
        <SectionHeading
          title="Current queue"
          description="Assign a barber or move a customer forward."
          action={
            <div className="panel-toolbar">
              <Button
                variant="secondary"
                size="sm"
                icon="filter"
                onClick={() => onToast("Queue filters opened")}
              >
                Filter
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon="refresh"
                onClick={() => onToast("Queue refreshed")}
              >
                Refresh
              </Button>
            </div>
          }
        />
        <div className="queue-table">
          <div className="queue-table__head">
            <span>#</span>
            <span>Customer</span>
            <span>Service</span>
            <span>Assigned barber</span>
            <span>Status</span>
            <span>Wait</span>
            <span>Action</span>
          </div>
          {queue.map((entry) => (
            <div
              className={
                "queue-table__row " +
                (entry.status === "In chair" ? "is-active" : "")
              }
              key={entry.id}
            >
              <span className="queue-table__number">
                {String(entry.id).padStart(2, "0")}
              </span>
              <span className="table-person">
                <Avatar initials={entry.initials} tone={entry.tone} size="sm" />
                <span>
                  <strong>{entry.customer}</strong>
                  <small>Joined {entry.joined}</small>
                </span>
              </span>
              <span>
                <strong>{entry.service}</strong>
                <small>Walk-in</small>
              </span>
              <span>
                <select
                  className="table-select"
                  value={entry.barber}
                  onChange={(event) =>
                    assignBarber(entry.id, event.target.value)
                  }
                >
                  <option>Unassigned</option>
                  {barbers
                    .filter((barber) => barber.status !== "Off today")
                    .map((barber) => (
                      <option key={barber.id}>{barber.name}</option>
                    ))}
                </select>
              </span>
              <span>
                <Badge
                  tone={
                    entry.status === "In chair"
                      ? "info"
                      : entry.status === "Ready"
                        ? "success"
                        : "neutral"
                  }
                  dot
                >
                  {entry.status}
                </Badge>
              </span>
              <span className="queue-table__wait">{entry.wait}</span>
              <span className="row-actions">
                {entry.status !== "In chair" && (
                  <button
                    className="row-action row-action--primary"
                    type="button"
                    onClick={() => updateStatus(entry.id, "In chair")}
                  >
                    Start chair
                  </button>
                )}
                <button
                  className="icon-button icon-button--small"
                  type="button"
                  aria-label={"More actions for " + entry.customer}
                  onClick={() => onToast("More actions for " + entry.customer)}
                >
                  <Icon name="more" size={16} />
                </button>
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <div className="queue-bottom-grid">
        <Panel>
          <SectionHeading
            title="Barber availability"
            description="Live floor status and service totals."
          />
          <div className="barber-status-grid">
            {barbers.slice(0, 3).map((barber) => (
              <div className="barber-status-card" key={barber.id}>
                <div className="barber-status-card__head">
                  <Avatar
                    initials={barber.initials}
                    tone={barber.tone}
                    size="md"
                  />
                  <Badge
                    tone={barber.status === "On floor" ? "success" : "warning"}
                    dot
                  >
                    {barber.status}
                  </Badge>
                </div>
                <strong>{barber.name}</strong>
                <span>{barber.specialty}</span>
                <div className="barber-status-card__stats">
                  <span>
                    <small>Served</small>
                    <strong>{barber.services}</strong>
                  </span>
                  <span>
                    <small>Revenue</small>
                    <strong>{formatCurrency(barber.revenue)}</strong>
                  </span>
                  <span>
                    <small>Commission</small>
                    <strong>{formatCurrency(barber.commission)}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="commission-panel">
          <SectionHeading
            title="Today’s commission"
            description="30% default commission rate."
            action={
              <button
                className="link-button"
                type="button"
                onClick={() => onToast("Commission detail opened")}
              >
                View details <Icon name="arrowRight" size={14} />
              </button>
            }
          />
          <div className="commission-table">
            <div>
              <span>Barber</span>
              <span>Services</span>
              <span>Revenue</span>
              <span>Commission</span>
            </div>
            {barbers.slice(0, 3).map((barber) => (
              <div key={barber.id}>
                <span className="table-person">
                  <Avatar
                    initials={barber.initials}
                    tone={barber.tone}
                    size="sm"
                  />
                  {barber.name}
                </span>
                <span>{barber.services}</span>
                <strong>{formatCurrency(barber.revenue)}</strong>
                <strong className="text-amber">
                  {formatCurrency(barber.commission)}
                </strong>
              </div>
            ))}
            <div className="commission-total">
              <strong>Total</strong>
              <strong>105</strong>
              <strong>{formatCurrency(2485)}</strong>
              <strong className="text-amber">{formatCurrency(745.5)}</strong>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}
