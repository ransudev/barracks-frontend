import type { Dispatch, SetStateAction } from "react";
import { AdminDashboard } from "@/app/components/admin/AdminDashboard";
import { BarbersManagement } from "@/app/components/admin/BarbersManagement";
import { ReportsPage } from "@/app/components/admin/ReportsPage";
import { ServicesManagement } from "@/app/components/admin/ServicesManagement";
import { StaffManagement } from "@/app/components/admin/StaffManagement";
import { AdminSettings } from "@/app/components/admin/SettingsPage";
import { BookingsPage } from "@/app/components/staff/BookingsPage";
import { CustomersPage } from "@/app/components/staff/CustomersPage";
import { InventoryPage } from "@/app/components/staff/InventoryPage";
import { PaymentPage } from "@/app/components/staff/PaymentPage";
import { QueuePage } from "@/app/components/staff/QueuePage";
import { StaffDashboard } from "@/app/components/staff/StaffDashboard";
import { StaffSettingsPage } from "@/app/components/staff/SettingsPage";
import type { InventoryItem, QueueEntry, ViewId } from "@/app/types/domain";

type AppPageProps = {
  view: ViewId;
  go: (view: ViewId) => void;
  queue: QueueEntry[];
  setQueue: Dispatch<SetStateAction<QueueEntry[]>>;
  stock: InventoryItem[];
  setStock: Dispatch<SetStateAction<InventoryItem[]>>;
  onToast: (message: string) => void;
};

export function AppPage({
  view,
  go,
  queue,
  setQueue,
  stock,
  setStock,
  onToast,
}: AppPageProps) {
  switch (view) {
    case "queue":
      return <QueuePage queue={queue} setQueue={setQueue} onToast={onToast} />;
    case "bookings":
      return <BookingsPage onToast={onToast} />;
    case "customers":
      return <CustomersPage onToast={onToast} />;
    case "payment":
      return <PaymentPage onToast={onToast} />;
    case "inventory":
      return (
        <InventoryPage items={stock} setItems={setStock} onToast={onToast} />
      );
    case "staff-settings":
      return <StaffSettingsPage onToast={onToast} />;
    case "admin-dashboard":
      return <AdminDashboard go={go} onToast={onToast} />;
    case "staff-management":
      return <StaffManagement onToast={onToast} />;
    case "barbers":
      return <BarbersManagement onToast={onToast} />;
    case "services":
      return <ServicesManagement onToast={onToast} />;
    case "reports":
      return <ReportsPage onToast={onToast} />;
    case "admin-inventory":
      return (
        <InventoryPage
          items={stock}
          setItems={setStock}
          onToast={onToast}
          admin
        />
      );
    case "admin-settings":
      return <AdminSettings onToast={onToast} />;
    default:
      return <StaffDashboard go={go} onToast={onToast} />;
  }
}
