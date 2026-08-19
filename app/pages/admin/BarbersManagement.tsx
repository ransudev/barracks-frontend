"use client";

import { useState, type FormEvent } from "react";
import { barbers as initialBarbers } from "@/app/data/barbers";
import type { Barber } from "@/app/types/domain";
import { createInitials, createSlug, formatCurrency } from "@/app/utils/format";
import {
  Avatar,
  Badge,
  Button,
  MetricCard,
  Modal,
  PageHeader,
  Panel,
  SectionHeading,
  SelectField,
  TextField,
} from "@/app/components/ui";
import { Icon } from "@/app/components/ui/icons";

export function BarbersManagement({
  onToast,
}: {
  onToast: (message: string) => void;
}) {
  const [items, setItems] = useState<Barber[]>(initialBarbers);
  const [modalOpen, setModalOpen] = useState(false);
  const [newBarber, setNewBarber] = useState({ name: "", specialty: "" });

  function addBarber(event: FormEvent) {
    event.preventDefault();
    if (!newBarber.name.trim()) {
      onToast("Add a barber name first");
      return;
    }

    const initials = createInitials(newBarber.name);
    const created: Barber = {
      id: createSlug(newBarber.name),
      name: newBarber.name,
      initials,
      specialty: newBarber.specialty || "Cuts + styling",
      status: "On floor",
      tone: "blue",
      services: 0,
      revenue: 0,
      commission: 0,
      rating: 0,
      customers: 0,
      memberSince: "Apr 2026",
    };

    setItems((list) => [...list, created]);
    setNewBarber({ name: "", specialty: "" });
    setModalOpen(false);
    onToast(created.name + " added to the barber roster");
  }

  return (
    <>
      <PageHeader
        eyebrow="Management / People"
        title="Barber management"
        subtitle="Schedules, performance, and the craft behind every service."
        action={
          <div className="page-header__actions">
            <Button
              variant="secondary"
              icon="sliders"
              onClick={() => onToast("Commission rate editor opened")}
            >
              Set commission rate
            </Button>
            <Button icon="plus" onClick={() => setModalOpen(true)}>
              Add barber
            </Button>
          </div>
        }
      />
      <div className="metrics-grid metrics-grid--four">
        <MetricCard
          label="Total barbers"
          value={String(items.length)}
          icon="scissors"
          accent="blue"
        />
        <MetricCard
          label="This week’s revenue"
          value="$2,485"
          change="+12%"
          icon="wallet"
          accent="green"
        />
        <MetricCard
          label="Commission rate"
          value="30%"
          note="Default for all barbers"
          icon="spark"
          accent="amber"
        />
        <MetricCard
          label="Total commission"
          value="$745.50"
          note="This week"
          icon="chart"
          accent="violet"
        />
      </div>

      <Panel className="barber-management-panel">
        <SectionHeading
          title="Barbers"
          description="The full roster and its working signal."
          action={
            <SelectField value="This week" onChange={() => undefined}>
              <option>This week</option>
              <option>All time</option>
            </SelectField>
          }
        />
        <div className="barber-management-list">
          {items.map((barber) => (
            <article className="barber-management-card" key={barber.id}>
              <div className="barber-management-card__intro">
                <Avatar
                  initials={barber.initials}
                  tone={barber.tone}
                  size="lg"
                />
                <div>
                  <h3>{barber.name}</h3>
                  <p>{barber.specialty}</p>
                  <small>Member since {barber.memberSince}</small>
                </div>
                <Badge
                  tone={
                    barber.status === "On floor"
                      ? "success"
                      : barber.status === "On break"
                        ? "warning"
                        : "neutral"
                  }
                  dot
                >
                  {barber.status}
                </Badge>
              </div>
              <div className="barber-management-card__stats">
                <span>
                  <small>Services done</small>
                  <strong>{barber.services}</strong>
                </span>
                <span>
                  <small>Revenue</small>
                  <strong className="text-green">
                    {formatCurrency(barber.revenue)}
                  </strong>
                </span>
                <span>
                  <small>Commission (30%)</small>
                  <strong className="text-amber">
                    {formatCurrency(barber.commission)}
                  </strong>
                </span>
                <span>
                  <small>Rating</small>
                  <strong>
                    {barber.rating ? barber.rating + " ★" : "New"}
                  </strong>
                </span>
              </div>
              <div className="barber-management-card__actions">
                <button
                  className="row-action"
                  type="button"
                  onClick={() => onToast("Editing " + barber.name + " locally")}
                >
                  <Icon name="edit" size={14} />
                  Edit profile
                </button>
                <button
                  className="row-action"
                  type="button"
                  onClick={() =>
                    onToast("Viewing " + barber.name + "'s schedule")
                  }
                >
                  View schedule <Icon name="arrowRight" size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </Panel>

      <Modal
        open={modalOpen}
        title="Add barber"
        description="Add a new craft profile to the roster."
        onClose={() => setModalOpen(false)}
      >
        <form className="modal-form" onSubmit={addBarber}>
          <TextField
            label="Barber name"
            value={newBarber.name}
            onChange={(event) =>
              setNewBarber({ ...newBarber, name: event.target.value })
            }
            placeholder="e.g. Sofia Navarro"
          />
          <TextField
            label="Specialty"
            value={newBarber.specialty}
            onChange={(event) =>
              setNewBarber({ ...newBarber, specialty: event.target.value })
            }
            placeholder="e.g. Classic cuts + shaves"
          />
          <div className="modal-actions">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" icon="plus">
              Add barber
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
