"use client";

import { useState, type FormEvent } from "react";
import { staff as initialStaff } from "@/app/data/staff";
import type { StaffMember } from "@/app/types/domain";
import { createInitials } from "@/app/utils/format";
import {
  Avatar,
  Badge,
  Button,
  MetricCard,
  Modal,
  PageHeader,
  Panel,
  SearchInput,
  SectionHeading,
  SelectField,
  TextField,
} from "@/app/components/ui";
import { Icon } from "@/app/components/ui/icons";

export function StaffManagement({
  onToast,
}: {
  onToast: (message: string) => void;
}) {
  const [items, setItems] = useState<StaffMember[]>(initialStaff);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: "Front Desk",
  });

  const filtered = items.filter((item) =>
    (item.name + " " + item.email + " " + item.role)
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  function addStaff(event: FormEvent) {
    event.preventDefault();
    if (!newStaff.name.trim()) {
      onToast("Add a name first");
      return;
    }

    const created: StaffMember = {
      id: createInitials(newStaff.name).toLowerCase(),
      name: newStaff.name,
      initials: createInitials(newStaff.name),
      role: newStaff.role as StaffMember["role"],
      email: newStaff.email || "new@barracks.ph",
      phone: "+63 900 000 0000",
      status: "Active",
      joined: "Apr 2026",
      tone: "blue",
    };

    setItems((list) => [...list, created]);
    setNewStaff({ name: "", email: "", role: "Front Desk" });
    setModalOpen(false);
    onToast(created.name + " added to staff");
  }

  return (
    <>
      <PageHeader
        eyebrow="Management / People"
        title="Staff management"
        subtitle="Manage access, roles, and the people who keep the shop running."
        action={
          <Button icon="userPlus" onClick={() => setModalOpen(true)}>
            Add staff
          </Button>
        }
      />
      <div className="metrics-grid metrics-grid--three">
        <MetricCard
          label="Total staff"
          value={String(items.length)}
          icon="users"
          accent="blue"
        />
        <MetricCard
          label="Barbers"
          value={String(items.filter((item) => item.role === "Barber").length)}
          note="3 on the floor today"
          icon="scissors"
          accent="green"
        />
        <MetricCard
          label="Administrators"
          value={String(
            items.filter((item) => item.role === "Administrator").length,
          )}
          note="Full access"
          icon="lock"
          accent="violet"
        />
      </div>

      <Panel className="staff-table-panel">
        <SectionHeading
          title="All staff"
          description="Access is simulated locally for this prototype."
          action={
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search staff"
            />
          }
        />
        <div className="staff-table">
          <div className="staff-table__head">
            <span>Name</span>
            <span>Role</span>
            <span>Email</span>
            <span>Status</span>
            <span>Joined</span>
            <span>Actions</span>
          </div>
          {filtered.map((item) => (
            <div className="staff-table__row" key={item.id}>
              <span className="table-person">
                <Avatar initials={item.initials} tone={item.tone} size="sm" />
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.phone}</small>
                </span>
              </span>
              <span>
                <Badge
                  tone={
                    item.role === "Administrator"
                      ? "purple"
                      : item.role === "Barber"
                        ? "info"
                        : "neutral"
                  }
                >
                  {item.role}
                </Badge>
              </span>
              <span>{item.email}</span>
              <span>
                <Badge
                  tone={item.status === "Active" ? "success" : "warning"}
                  dot
                >
                  {item.status}
                </Badge>
              </span>
              <span>{item.joined}</span>
              <span className="row-actions">
                <button
                  className="row-action"
                  type="button"
                  onClick={() => onToast("Editing " + item.name + " locally")}
                >
                  Edit
                </button>
                <button
                  className="icon-button icon-button--small"
                  type="button"
                  aria-label={"More actions for " + item.name}
                  onClick={() => {
                    setItems((list) =>
                      list.map((row) =>
                        row.id === item.id
                          ? {
                              ...row,
                              status:
                                row.status === "Active" ? "Disabled" : "Active",
                            }
                          : row,
                      ),
                    );
                    onToast(
                      item.name +
                        (item.status === "Active" ? " disabled" : " enabled"),
                    );
                  }}
                >
                  <Icon name="more" size={16} />
                </button>
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <Modal
        open={modalOpen}
        title="Add staff member"
        description="Create a profile and choose a workspace role."
        onClose={() => setModalOpen(false)}
      >
        <form className="modal-form" onSubmit={addStaff}>
          <TextField
            label="Full name"
            value={newStaff.name}
            onChange={(event) =>
              setNewStaff({ ...newStaff, name: event.target.value })
            }
            placeholder="e.g. Carmen Reyes"
          />
          <TextField
            label="Email address"
            value={newStaff.email}
            onChange={(event) =>
              setNewStaff({ ...newStaff, email: event.target.value })
            }
            placeholder="name@barracks.ph"
            icon="mail"
          />
          <SelectField
            label="Role"
            value={newStaff.role}
            onChange={(event) =>
              setNewStaff({ ...newStaff, role: event.target.value })
            }
          >
            <option>Front Desk</option>
            <option>Barber</option>
            <option>Administrator</option>
          </SelectField>
          <div className="modal-actions">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" icon="userPlus">
              Add staff
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
