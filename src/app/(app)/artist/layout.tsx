import DashboardShell from "@/components/shell/DashboardShell";

export default function ArtistLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="ARTIST" userName="Artist User">{children}</DashboardShell>;
}
