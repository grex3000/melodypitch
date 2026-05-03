'use client';

import { useTransition } from 'react';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
        });

        if (response.ok) {
          // Redirect will happen via server
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="btn btn-secondary btn-md"
    >
      {isPending ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
