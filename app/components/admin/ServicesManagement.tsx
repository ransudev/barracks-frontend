"use client";

import { useState, type FormEvent } from "react";
import { services as initialServices } from "@/app/data/services";
import type { Service } from "@/app/types/domain";
import { createSlug, formatCurrency } from "@/app/utils/format";
import {
  Badge,
  Button,
  MetricCard,
  Modal,
  PageHeader,
  Panel,
  SectionHeading,
  TextField,
} from "@/app/components/ui";

export function ServicesManagement({
  onToast,
}: {
  onToast: (message: string) => void;
}) {
  const [items, setItems] = useState<Service[]>(initialServices);
  const [modalOpen, setModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    duration: "30 min",
    price: "35",
  });

  function addService(event: FormEvent) {
    event.preventDefault();
    if (!newService.name.trim()) {
      onToast("Add a service name first");
      return;
    }

    const created: Service = {
      id: createSlug(newService.name),
      name: newService.name,
      description: newService.description || "A considered service at Barracks",
      duration: newService.duration,
      price: Number(newService.price),
      active: true,
    };

    setItems((list) => [...list, created]);
    setNewService({
      name: "",
      description: "",
      duration: "30 min",
      price: "35",
    });
    setModalOpen(false);
    onToast(created.name + " added to services");
  }

  return (
    <>
      <PageHeader
        eyebrow="Management / Menu"
        title="Services"
        subtitle="Keep the menu clear, current, and worth the time in the chair."
        action={
          <Button icon="plus" onClick={() => setModalOpen(true)}>
            Add service
          </Button>
        }
      />
      <div className="metrics-grid metrics-grid--three">
        <MetricCard
          label="Total services"
          value={String(items.length)}
          icon="briefcase"
          accent="blue"
        />
        <MetricCard
          label="Average price"
          value={formatCurrency(
            items.reduce((total, item) => total + item.price, 0) / items.length,
          )}
          note="Across active services"
          icon="wallet"
          accent="green"
        />
        <MetricCard
          label="Most popular"
          value="Haircut"
          note="34% of revenue"
          icon="star"
          accent="amber"
        />
      </div>

      <Panel className="services-panel">
        <SectionHeading
          title="All services"
          description="Edit pricing, duration, and availability."
          action={
            <Button
              variant="ghost"
              size="sm"
              icon="filter"
              onClick={() => onToast("Service filters opened")}
            >
              Filters
            </Button>
          }
        />
        <div className="services-table">
          <div className="services-table__head">
            <span>Service</span>
            <span>Description</span>
            <span>Duration</span>
            <span>Price</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {items.map((service) => (
            <div className="services-table__row" key={service.id}>
              <span>
                <span
                  className={
                    "service-status-dot " + (service.active ? "is-active" : "")
                  }
                />
                <strong>{service.name}</strong>
              </span>
              <span>{service.description}</span>
              <span>{service.duration}</span>
              <strong>{formatCurrency(service.price)}</strong>
              <span>
                <Badge tone={service.active ? "success" : "warning"} dot>
                  {service.active ? "Active" : "Inactive"}
                </Badge>
              </span>
              <span className="row-actions">
                <button
                  className="row-action"
                  type="button"
                  onClick={() =>
                    onToast("Editing " + service.name + " locally")
                  }
                >
                  Edit
                </button>
                <button
                  className={
                    "row-action " +
                    (service.active
                      ? "row-action--danger"
                      : "row-action--green")
                  }
                  type="button"
                  onClick={() => {
                    setItems((list) =>
                      list.map((row) =>
                        row.id === service.id
                          ? { ...row, active: !row.active }
                          : row,
                      ),
                    );
                    onToast(
                      service.name +
                        (service.active ? " disabled" : " enabled"),
                    );
                  }}
                >
                  {service.active ? "Disable" : "Enable"}
                </button>
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <Modal
        open={modalOpen}
        title="Add service"
        description="Add a new option to the Barracks menu."
        onClose={() => setModalOpen(false)}
      >
        <form className="modal-form" onSubmit={addService}>
          <TextField
            label="Service name"
            value={newService.name}
            onChange={(event) =>
              setNewService({ ...newService, name: event.target.value })
            }
            placeholder="e.g. Executive Shave"
          />
          <TextField
            label="Description"
            value={newService.description}
            onChange={(event) =>
              setNewService({ ...newService, description: event.target.value })
            }
            placeholder="Short description for the service menu"
          />
          <div className="form-grid form-grid--two">
            <TextField
              label="Duration"
              value={newService.duration}
              onChange={(event) =>
                setNewService({ ...newService, duration: event.target.value })
              }
            />
            <TextField
              label="Price"
              type="number"
              value={newService.price}
              onChange={(event) =>
                setNewService({ ...newService, price: event.target.value })
              }
            />
          </div>
          <div className="modal-actions">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" icon="plus">
              Add service
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
