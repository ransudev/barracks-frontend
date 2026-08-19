"use client";

import type { ViewId } from "@/app/types/domain";
import { customers } from "@/app/data/customers";
import { transactions } from "@/app/data/transactions";
import { formatCurrency } from "@/app/utils/format";
import {
  Avatar,
  Badge,
  Button,
  Logo,
  PageHeader,
  Panel,
  ProgressBar,
  SectionHeading,
  Toast,
} from "@/app/components/ui";
import { Icon } from "@/app/components/ui/icons";

type CustomerProfileProps = {
  go: (view: ViewId) => void;
  onToast: (message: string) => void;
};

export function CustomerProfile({ go, onToast }: CustomerProfileProps) {
  const customer = customers[0];

  return (
    <div className="customer-page">
      <header className="customer-topbar">
        <Logo onClick={() => go("landing")} />
        <div className="customer-topbar__links">
          <span>Account</span>
          <button type="button" onClick={() => go("landing")}>
            Back to site <Icon name="arrowRight" size={15} />
          </button>
          <button
            className="customer-topbar__staff"
            type="button"
            onClick={() => go("login")}
          >
            Staff sign in
          </button>
        </div>
      </header>

      <main className="customer-content">
        <PageHeader
          eyebrow="Customer account"
          title={"Good afternoon, " + customer.name.split(" ")[0] + "."}
          subtitle="Your next visit, your preferences, and a little more time for the good stuff."
          action={
            <Button
              icon="calendar"
              onClick={() =>
                onToast("Booking flow opened — choose a time at the front desk")
              }
            >
              Book a new visit
            </Button>
          }
        />

        <div className="customer-grid">
          <div className="customer-main-column">
            <Panel className="customer-next-visit">
              <div className="customer-next-visit__top">
                <div>
                  <span className="page-eyebrow">Next visit</span>
                  <Badge tone="warning" dot>
                    Confirmed
                  </Badge>
                </div>
                <span className="customer-next-visit__id">BK-1050</span>
              </div>
              <div className="customer-next-visit__date">
                <strong>Tuesday</strong>
                <span>April 14, 2026</span>
              </div>
              <div className="customer-next-visit__details">
                <div>
                  <Icon name="clock" size={16} />
                  <span>
                    <small>Time</small>
                    <strong>2:30 PM</strong>
                  </span>
                </div>
                <div>
                  <Icon name="scissors" size={16} />
                  <span>
                    <small>Service</small>
                    <strong>Haircut</strong>
                  </span>
                </div>
                <div>
                  <Avatar initials="KM" tone="blue" size="sm" />
                  <span>
                    <small>With</small>
                    <strong>Kai Mercer</strong>
                  </span>
                </div>
              </div>
              <div className="customer-next-visit__actions">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onToast("Appointment details opened")}
                >
                  View details
                </Button>
                <button
                  className="link-button link-button--danger"
                  type="button"
                  onClick={() =>
                    onToast("Cancellation is simulated in this prototype")
                  }
                >
                  Cancel visit
                </button>
              </div>
            </Panel>

            <Panel>
              <SectionHeading
                title="Recent visits"
                description="Your service history at Barracks."
                action={
                  <button
                    className="link-button"
                    type="button"
                    onClick={() =>
                      onToast(
                        "Full history is already visible in the prototype",
                      )
                    }
                  >
                    View all
                  </button>
                }
              />
              <div className="history-list">
                <div className="history-row history-row--head">
                  <span>Date</span>
                  <span>Service</span>
                  <span>Barber</span>
                  <span>Amount</span>
                </div>
                {transactions.slice(0, 4).map((transaction) => (
                  <div className="history-row" key={transaction.id}>
                    <span>{transaction.date}</span>
                    <span>
                      <strong>{transaction.service}</strong>
                      <small>{transaction.id}</small>
                    </span>
                    <span>{transaction.barber}</span>
                    <strong>{formatCurrency(transaction.amount)}</strong>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <aside className="customer-side-column">
            <Panel className="customer-profile-card">
              <div className="customer-profile-card__head">
                <Avatar
                  initials={customer.initials}
                  tone={customer.tone}
                  size="xl"
                />
                <button
                  className="icon-button"
                  type="button"
                  aria-label="Edit profile"
                  onClick={() =>
                    onToast("Profile editing is simulated in this prototype")
                  }
                >
                  <Icon name="edit" size={16} />
                </button>
              </div>
              <h2>{customer.name}</h2>
              <p>Member since January 2024</p>
              <div className="customer-profile-card__contact">
                <span>
                  <Icon name="mail" size={15} />
                  {customer.email}
                </span>
                <span>
                  <Icon name="phone" size={15} />
                  {customer.phone}
                </span>
              </div>
              <div className="customer-profile-card__preference">
                <span>Preferred barber</span>
                <strong>{customer.preferredBarber}</strong>
                <small>Classic shape, soft finish</small>
              </div>
            </Panel>

            <Panel className="loyalty-card">
              <div className="loyalty-card__head">
                <div>
                  <span className="page-eyebrow">Barracks loyalty</span>
                  <h2>Keep the ritual going.</h2>
                </div>
                <Icon name="spark" size={20} />
              </div>
              <div className="loyalty-points">
                <strong>{customer.points}</strong>
                <span>points</span>
              </div>
              <ProgressBar value={68} tone="amber" />
              <div className="loyalty-card__meta">
                <span>540 / 800 points</span>
                <strong>Next reward · $10 off</strong>
              </div>
              <p>
                One point for every $1 spent. Your next reward is within reach.
              </p>
            </Panel>
          </aside>
        </div>
      </main>

      <Toast message="" onClose={() => undefined} />
    </div>
  );
}
