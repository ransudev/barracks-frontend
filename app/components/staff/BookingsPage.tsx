"use client";

import { useMemo, useState } from "react";
import { bookings as initialBookings } from "@/app/data/bookings";
import type { Booking } from "@/app/types/domain";
import { formatCurrency } from "@/app/utils/format";
import {
  Avatar,
  Badge,
  Button,
  EmptyState,
  MetricCard,
  Modal,
  PageHeader,
  Panel,
  SearchInput,
  SectionHeading,
  Tabs,
} from "@/app/components/ui";
import { Icon } from "@/app/components/ui/icons";

export function BookingsPage({
  onToast,
}: {
  onToast: (message: string) => void;
}) {
  const [items, setItems] = useState<Booking[]>(initialBookings);
  const [tab, setTab] = useState("today");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Booking | null>(null);

  const counts = {
    today: items.length,
    upcoming: items.filter((item) => item.status === "Upcoming").length,
    completed: items.filter((item) => item.status === "Completed").length,
    cancelled: items.filter((item) => item.status === "Cancelled").length,
  };

  const visible = useMemo(
    () =>
      items.filter((item) => {
        const matchesTab =
          tab === "today" ||
          (tab === "upcoming"
            ? item.status === "Upcoming"
            : tab === "completed"
              ? item.status === "Completed"
              : item.status === "Cancelled");
        const query = search.toLowerCase();
        return (
          matchesTab &&
          (!query ||
            (
              item.customer +
              " " +
              item.service +
              " " +
              item.barber +
              " " +
              item.id
            )
              .toLowerCase()
              .includes(query))
        );
      }),
    [items, search, tab],
  );

  return (
    <>
      <PageHeader
        eyebrow="Schedule / Today"
        title="Bookings"
        subtitle="The appointments that keep the day in rhythm."
        action={
          <Button
            icon="plus"
            onClick={() => onToast("New booking form opened")}
          >
            New booking
          </Button>
        }
      />
      <div className="booking-tabs-row">
        <Tabs
          active={tab}
          onChange={setTab}
          items={[
            { id: "today", label: "Today", count: counts.today },
            { id: "upcoming", label: "Upcoming", count: counts.upcoming },
            { id: "completed", label: "Completed", count: counts.completed },
            { id: "cancelled", label: "Cancelled", count: counts.cancelled },
          ]}
        />
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search bookings"
        />
      </div>
      <div className="metrics-grid metrics-grid--four">
        <MetricCard
          label="Total bookings"
          value="12"
          icon="calendar"
          accent="blue"
        />
        <MetricCard
          label="Completed"
          value="9"
          change="75% of day"
          icon="checkCircle"
          accent="green"
        />
        <MetricCard
          label="Remaining"
          value="3"
          note="Next at 2:30 PM"
          icon="clock"
          accent="amber"
        />
        <MetricCard
          label="Cancelled"
          value="1"
          note="Within normal range"
          icon="x"
          accent="red"
        />
      </div>

      <Panel className="bookings-panel">
        <SectionHeading
          title={
            tab === "today"
              ? "Today’s schedule"
              : tab[0].toUpperCase() + tab.slice(1) + " bookings"
          }
          description={
            visible.length +
            " booking" +
            (visible.length === 1 ? "" : "s") +
            " in this view."
          }
          action={
            <Button
              variant="ghost"
              size="sm"
              icon="filter"
              onClick={() => onToast("Booking filters opened")}
            >
              Filters
            </Button>
          }
        />
        <div className="booking-list">
          {visible.length ? (
            visible.map((booking) => (
              <button
                className={
                  "booking-row booking-row--" + booking.status.toLowerCase()
                }
                type="button"
                key={booking.id}
                onClick={() => setSelected(booking)}
              >
                <span className="booking-row__time">
                  <strong>{booking.time}</strong>
                  <small>{booking.meridiem}</small>
                </span>
                <span className="booking-row__customer">
                  <Avatar
                    initials={booking.initials}
                    tone={booking.tone}
                    size="sm"
                  />
                  <span>
                    <strong>{booking.customer}</strong>
                    <small>{booking.id}</small>
                  </span>
                </span>
                <span className="booking-row__service">
                  <strong>{booking.service}</strong>
                  <small>with {booking.barber}</small>
                </span>
                <span>
                  <Badge
                    tone={
                      booking.status === "Completed"
                        ? "success"
                        : booking.status === "Upcoming"
                          ? "warning"
                          : "danger"
                    }
                    dot
                  >
                    {booking.status}
                  </Badge>
                </span>
                <strong className="booking-row__price">
                  {formatCurrency(booking.price)}
                </strong>
                <Icon name="chevronRight" size={16} />
              </button>
            ))
          ) : (
            <EmptyState
              icon="calendar"
              title="No bookings found"
              description="Try a different search or switch to another booking view."
            />
          )}
        </div>
      </Panel>

      <Modal
        open={Boolean(selected)}
        title="Booking detail"
        description={
          selected ? selected.id + " · Tuesday, April 14, 2026" : undefined
        }
        onClose={() => setSelected(null)}
      >
        <div className="detail-modal">
          <div className="detail-modal__identity">
            {selected && (
              <Avatar
                initials={selected.initials}
                tone={selected.tone}
                size="lg"
              />
            )}
            <div>
              <strong>{selected?.customer}</strong>
              <span>{selected?.service}</span>
            </div>
            <Badge
              tone={
                selected?.status === "Completed"
                  ? "success"
                  : selected?.status === "Upcoming"
                    ? "warning"
                    : "danger"
              }
            >
              {selected?.status}
            </Badge>
          </div>
          <div className="detail-facts">
            <span>
              <small>Time</small>
              <strong>
                {selected?.time} {selected?.meridiem}
              </strong>
            </span>
            <span>
              <small>Barber</small>
              <strong>{selected?.barber}</strong>
            </span>
            <span>
              <small>Total</small>
              <strong>{selected && formatCurrency(selected.price)}</strong>
            </span>
          </div>
          <div className="modal-actions">
            <Button
              variant="secondary"
              onClick={() => {
                setSelected(null);
                onToast("Booking editing is simulated");
              }}
            >
              Edit booking
            </Button>
            {selected?.status === "Upcoming" && (
              <Button
                variant="danger"
                onClick={() => {
                  setItems((list) =>
                    list.map((item) =>
                      item.id === selected.id
                        ? { ...item, status: "Cancelled" }
                        : item,
                    ),
                  );
                  setSelected(null);
                  onToast("Booking cancelled locally");
                }}
              >
                Cancel booking
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
