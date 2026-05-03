import DashboardShell from "@/components/shell/DashboardShell";

export default function SongwriterLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="SONGWRITER" userName="Songwriter User">{children}</DashboardShell>;
}
