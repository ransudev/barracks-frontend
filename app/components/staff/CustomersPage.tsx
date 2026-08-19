"use client";

import { useState, type FormEvent } from "react";
import { customers as initialCustomers } from "@/app/data/customers";
import { transactions } from "@/app/data/transactions";
import type { Customer } from "@/app/types/domain";
import { createInitials, createSlug, formatCurrency } from "@/app/utils/format";
import {
  Avatar,
  Button,
  EmptyState,
  MetricCard,
  PageHeader,
  Panel,
  SearchInput,
  SectionHeading,
  TextField,
} from "@/app/components/ui";
import { Icon } from "@/app/components/ui/icons";

export function CustomersPage({
  onToast,
}: {
  onToast: (message: string) => void;
}) {
  const [items, setItems] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(initialCustomers[0].id);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const filtered = items.filter((customer) =>
    (customer.name + " " + customer.phone + " " + customer.email)
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const selected =
    items.find((customer) => customer.id === selectedId) ?? items[0];

  function addCustomer(event: FormEvent) {
    event.preventDefault();
    if (!newCustomer.name.trim()) {
      onToast("Add a name before registering a customer");
      return;
    }

    const created: Customer = {
      id: createSlug(newCustomer.name),
      name: newCustomer.name,
      initials: createInitials(newCustomer.name),
      phone: newCustomer.phone || "+63 900 000 0000",
      email: newCustomer.email || "No email provided",
      visits: 0,
      points: 0,
      preferredBarber: "Not set",
      lastVisit: "New customer",
      tone: "slate",
    };

    setItems((list) => [created, ...list]);
    setSelectedId(created.id);
    setNewCustomer({ name: "", phone: "", email: "" });
    onToast(created.name + " registered in the shop book");
  }

  return (
    <>
      <PageHeader
        eyebrow="Customer book"
        title="Customers"
        subtitle="A clear record of every person who trusts us with the chair."
        action={
          <Button
            icon="userPlus"
            onClick={() =>
              document
                .getElementById("register-customer")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Register customer
          </Button>
        }
      />

      <div className="customer-workspace">
        <Panel className="register-panel" id="register-customer">
          <SectionHeading
            title="Register new customer"
            description="Keep the first visit frictionless."
          />
          <form onSubmit={addCustomer}>
            <TextField
              label="Full name"
              value={newCustomer.name}
              onChange={(event) =>
                setNewCustomer({ ...newCustomer, name: event.target.value })
              }
              placeholder="e.g. Nico Villanueva"
            />
            <TextField
              label="Phone number"
              value={newCustomer.phone}
              onChange={(event) =>
                setNewCustomer({ ...newCustomer, phone: event.target.value })
              }
              placeholder="+63 917 000 0000"
              icon="phone"
            />
            <TextField
              label="Email address"
              value={newCustomer.email}
              onChange={(event) =>
                setNewCustomer({ ...newCustomer, email: event.target.value })
              }
              placeholder="name@email.com"
              icon="mail"
            />
            <Button type="submit" icon="plus">
              Register customer
            </Button>
          </form>
        </Panel>

        <Panel className="customer-list-panel">
          <SectionHeading
            title="Customer list"
            description={items.length + " registered profiles."}
            action={
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search customers"
              />
            }
          />
          <div className="customer-list">
            {filtered.length ? (
              filtered.map((customer) => (
                <button
                  type="button"
                  className={
                    "customer-list__row " +
                    (selectedId === customer.id ? "is-active" : "")
                  }
                  key={customer.id}
                  onClick={() => setSelectedId(customer.id)}
                >
                  <Avatar
                    initials={customer.initials}
                    tone={customer.tone}
                    size="sm"
                  />
                  <span>
                    <strong>{customer.name}</strong>
                    <small>{customer.phone}</small>
                  </span>
                  <span className="customer-list__stats">
                    <strong>{customer.points} pts</strong>
                    <small>{customer.visits} visits</small>
                  </span>
                  <Icon name="chevronRight" size={15} />
                </button>
              ))
            ) : (
              <EmptyState
                title="No customer found"
                description="Try a different name or contact detail."
              />
            )}
          </div>
        </Panel>
      </div>

      {selected && (
        <Panel className="customer-detail-panel">
          <div className="customer-detail__head">
            <div className="table-person">
              <Avatar
                initials={selected.initials}
                tone={selected.tone}
                size="lg"
              />
              <span>
                <strong>{selected.name}</strong>
                <small>Last visit {selected.lastVisit}</small>
              </span>
            </div>
            <div className="panel-toolbar">
              <Button
                variant="secondary"
                size="sm"
                icon="edit"
                onClick={() => onToast("Editing " + selected.name + " locally")}
              >
                Edit profile
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon="calendar"
                onClick={() =>
                  onToast("New booking for " + selected.name + " opened")
                }
              >
                New booking
              </Button>
            </div>
          </div>
          <div className="customer-detail__facts">
            <span>
              <small>Phone</small>
              <strong>{selected.phone}</strong>
            </span>
            <span>
              <small>Email</small>
              <strong>{selected.email}</strong>
            </span>
            <span>
              <small>Preferred barber</small>
              <strong>{selected.preferredBarber}</strong>
            </span>
            <span>
              <small>Loyalty points</small>
              <strong className="text-amber">{selected.points} pts</strong>
            </span>
          </div>
          <div className="customer-detail__history">
            <SectionHeading
              title="Visit history"
              description="Recent services, all in one place."
            />
            <div className="mini-table">
              <div>
                <span>Date</span>
                <span>Service</span>
                <span>Barber</span>
                <span>Amount</span>
              </div>
              {transactions.slice(0, 3).map((transaction) => (
                <div key={transaction.id}>
                  <span>{transaction.date}</span>
                  <strong>{transaction.service}</strong>
                  <span>{transaction.barber}</span>
                  <strong>{formatCurrency(transaction.amount)}</strong>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      )}

      <div className="metrics-grid metrics-grid--four">
        <MetricCard
          label="Total loyalty points"
          value="1,970"
          note="Across all customers"
          icon="spark"
          accent="amber"
        />
        <MetricCard
          label="Average per customer"
          value="328"
          note="+12 this month"
          icon="chart"
          accent="blue"
        />
        <MetricCard
          label="Registered customers"
          value={String(items.length)}
          note="+4 this week"
          icon="users"
          accent="violet"
        />
        <MetricCard
          label="Active this month"
          value="42"
          change="+8%"
          icon="checkCircle"
          accent="green"
        />
      </div>
    </>
  );
}
