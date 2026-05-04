'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthConfirmPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.slice(1); // strip leading '#'
    if (!hash) {
      router.replace('/login?error=auth_failed');
      return;
    }

    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const errorCode = params.get('error_code');
    const errorDescription = params.get('error_description');

    if (errorCode || !accessToken || !refreshToken) {
      console.error('Auth confirm error:', errorDescription || 'missing tokens');
      router.replace('/login?error=auth_failed');
      return;
    }

    fetch('/api/auth/store-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, refreshToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.replace(data.redirectUrl || '/');
      })
      .catch(() => {
        router.replace('/login?error=auth_failed');
      });
  }, [router]);

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-bg-base">
      <p className="type-body-sm text-fg-2">Confirming your account…</p>
    </div>
  );
}
