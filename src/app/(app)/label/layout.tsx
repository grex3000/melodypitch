import DashboardShell from "@/components/shell/DashboardShell";

export default function LabelLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="LABEL" userName="Label User">{children}</DashboardShell>;
}
