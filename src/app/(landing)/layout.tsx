'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Handle OAuth callback from hash-based flow
    const hash = window.location.hash;
    
    if (hash.includes('access_token')) {
      console.log('[OAUTH HASH] Detected access token in URL hash');
      
      // Extract parameters from hash
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      
      if (accessToken && refreshToken) {
        console.log('[OAUTH HASH] Found tokens, storing and redirecting');
        
        // Store tokens in cookies via API call
        fetch('/api/auth/store-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            accessToken,
            refreshToken,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              console.log('[OAUTH HASH] Session stored, redirecting to dashboard');
              // Redirect to dashboard
              router.push(data.redirectUrl || '/songwriter/dashboard');
            } else {
              console.error('[OAUTH HASH] Failed to store session:', data.error);
            }
          })
          .catch(err => {
            console.error('[OAUTH HASH] Error storing session:', err);
          });
      }
    }
  }, [router]);

  return children;
}
