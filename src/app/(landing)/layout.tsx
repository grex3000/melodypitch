import { getCurrentUser } from '@/lib/auth-context';
import { redirect } from 'next/navigation';

const DASHBOARD_MAP: Record<string, string> = {
  LABEL: '/label/dashboard',
  SONGWRITER: '/songwriter/dashboard',
  ARTIST: '/artist/dashboard',
};

export default async function LandingLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (user) {
    redirect(DASHBOARD_MAP[user.role] ?? '/songwriter/dashboard');
  }

  return <>{children}</>;
}
