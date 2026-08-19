"use client";

import {
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import { createSlug, formatCurrency } from "@/app/utils/format";
import type { InventoryItem } from "@/app/types/domain";
import {
  Badge,
  Button,
  EmptyState,
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

type InventoryPageProps = {
  items: InventoryItem[];
  setItems: Dispatch<SetStateAction<InventoryItem[]>>;
  onToast: (message: string) => void;
  admin?: boolean;
};

export function InventoryPage({
  items,
  setItems,
  onToast,
  admin = false,
}: InventoryPageProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [modalOpen, setModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Supplies",
    minimum: "10",
    current: "0",
    unitCost: "10",
  });

  const filtered = items.filter(
    (item) =>
      (item.name + " " + item.category)
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (category === "All categories" || item.category === category),
  );
  const lowStock = items.filter((item) => item.current <= item.minimum);
  const outOfStock = items.filter((item) => item.current === 0);

  function restock(item: InventoryItem) {
    const quantity = Math.max(item.minimum - item.current + 5, 5);
    setItems((list) =>
      list.map((row) =>
        row.id === item.id
          ? { ...row, current: Math.min(row.maximum, row.current + quantity) }
          : row,
      ),
    );
    onToast(item.name + " restocked by " + quantity + " units");
  }

  function addItem(event: FormEvent) {
    event.preventDefault();
    if (!newItem.name.trim()) {
      onToast("Add an item name first");
      return;
    }

    const created: InventoryItem = {
      id: createSlug(newItem.name),
      name: newItem.name,
      category: newItem.category as InventoryItem["category"],
      current: Number(newItem.current),
      minimum: Number(newItem.minimum),
      maximum: Math.max(50, Number(newItem.minimum) * 4),
      unitCost: Number(newItem.unitCost),
    };

    setItems((list) => [created, ...list]);
    setNewItem({
      name: "",
      category: "Supplies",
      minimum: "10",
      current: "0",
      unitCost: "10",
    });
    setModalOpen(false);
    onToast(created.name + " added to inventory");
  }

  return (
    <>
      <PageHeader
        eyebrow={admin ? "Management / Stock" : "Shop floor / Stock"}
        title={admin ? "Inventory management" : "Inventory"}
        subtitle={
          admin
            ? "Keep the back room as considered as the front."
            : "Know what is running low before the next service."
        }
        action={
          <Button icon="plus" onClick={() => setModalOpen(true)}>
            Add item
          </Button>
        }
      />
      <div className="metrics-grid metrics-grid--four">
        <MetricCard
          label="Total items"
          value={String(items.length)}
          note="Across 3 categories"
          icon="box"
          accent="blue"
        />
        <MetricCard
          label="Low stock"
          value={String(lowStock.length)}
          change="Needs attention"
          changeTone="warning"
          icon="info"
          accent="red"
        />
        <MetricCard
          label="Out of stock"
          value={String(outOfStock.length)}
          note="Nothing blocking today"
          icon="x"
          accent="amber"
        />
        <MetricCard
          label="Inventory value"
          value={formatCurrency(
            items.reduce(
              (total, item) => total + item.current * item.unitCost,
              0,
            ),
          )}
          note="At current stock"
          icon="wallet"
          accent="green"
        />
      </div>

      {lowStock.length > 0 && (
        <div className="alert-banner">
          <span className="alert-banner__icon">
            <Icon name="info" size={17} />
          </span>
          <span>
            <strong>Low stock needs a look.</strong>
            <small>
              {lowStock.map((item) => item.name).join(", ")} are below their
              minimum level.
            </small>
          </span>
          <button
            className="link-button"
            type="button"
            onClick={() => setCategory("All categories")}
          >
            Review items <Icon name="arrowRight" size={14} />
          </button>
        </div>
      )}

      <Panel className="inventory-panel">
        <SectionHeading
          title="Stock levels"
          description="Edit levels, reorder supplies, and keep the shelves ready."
          action={
            <div className="panel-toolbar">
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search stock"
              />
              <SelectField
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option>All categories</option>
                <option>Supplies</option>
                <option>Equipment</option>
                <option>Products</option>
              </SelectField>
            </div>
          }
        />
        <div className="inventory-table">
          <div className="inventory-table__head">
            <span>Item</span>
            <span>Category</span>
            <span>Current</span>
            <span>Min level</span>
            <span>Stock status</span>
            <span>Actions</span>
          </div>
          {filtered.map((item) => {
            const isLow = item.current <= item.minimum;
            const isOut = item.current === 0;

            return (
              <div className="inventory-table__row" key={item.id}>
                <span>
                  <strong>{item.name}</strong>
                  <small>{formatCurrency(item.unitCost)} / unit</small>
                </span>
                <span>{item.category}</span>
                <span className={isLow ? "text-red" : "text-strong"}>
                  {item.current}
                </span>
                <span>{item.minimum}</span>
                <span>
                  <Badge tone={isOut || isLow ? "danger" : "success"} dot>
                    {isOut ? "Out of stock" : isLow ? "Low stock" : "In stock"}
                  </Badge>
                </span>
                <span className="row-actions">
                  <button
                    className="row-action"
                    type="button"
                    onClick={() => onToast("Editing " + item.name + " locally")}
                  >
                    <Icon name="edit" size={14} />
                    Edit
                  </button>
                  <button
                    className="row-action row-action--green"
                    type="button"
                    onClick={() => restock(item)}
                  >
                    <Icon name="refresh" size={14} />
                    {isLow ? "Restock" : "Update"}
                  </button>
                </span>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <EmptyState
            icon="box"
            title="No stock matches"
            description="Try a different item name or category."
          />
        )}
      </Panel>

      <Modal
        open={modalOpen}
        title="Add inventory item"
        description="Create a new stock record for the back room."
        onClose={() => setModalOpen(false)}
      >
        <form className="modal-form" onSubmit={addItem}>
          <TextField
            label="Item name"
            value={newItem.name}
            onChange={(event) =>
              setNewItem({ ...newItem, name: event.target.value })
            }
            placeholder="e.g. Neck strips"
          />
          <div className="form-grid form-grid--three">
            <SelectField
              label="Category"
              value={newItem.category}
              onChange={(event) =>
                setNewItem({ ...newItem, category: event.target.value })
              }
            >
              <option>Supplies</option>
              <option>Equipment</option>
              <option>Products</option>
            </SelectField>
            <TextField
              label="Current stock"
              type="number"
              value={newItem.current}
              onChange={(event) =>
                setNewItem({ ...newItem, current: event.target.value })
              }
            />
            <TextField
              label="Min level"
              type="number"
              value={newItem.minimum}
              onChange={(event) =>
                setNewItem({ ...newItem, minimum: event.target.value })
              }
            />
          </div>
          <TextField
            label="Unit cost"
            type="number"
            value={newItem.unitCost}
            onChange={(event) =>
              setNewItem({ ...newItem, unitCost: event.target.value })
            }
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
              Add item
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
