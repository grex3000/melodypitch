'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import type { Role } from '@prisma/client';

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { error?: string; registered?: string; teamInvite?: string };
}) {
  const router = useRouter();
  const teamInviteToken = searchParams.teamInvite ?? null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(searchParams.error ? 'Unable to create account. Please try again.' : '');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteLabelName, setInviteLabelName] = useState('');
  const [inviteLoading, setInviteLoading] = useState(!!teamInviteToken);

  useEffect(() => {
    if (!teamInviteToken) return;
    fetch(`/api/team-invite/${teamInviteToken}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.email) {
          setInviteEmail(data.email);
          setInviteLabelName(data.labelName);
        } else {
          setError('This invite link is invalid or has already been used.');
        }
      })
      .catch(() => setError('Failed to load invite. Please try again.'))
      .finally(() => setInviteLoading(false));
  }, [teamInviteToken]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = teamInviteToken ? inviteEmail : (formData.get('email') as string);
      const password = formData.get('password') as string;
      const name = formData.get('name') as string;
      const role: Role = teamInviteToken ? 'LABEL' : (formData.get('role') as Role);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          name,
          role,
          teamInviteToken: teamInviteToken ?? undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create account');
        setLoading(false);
        return;
      }

      if (data.needsConfirmation) {
        router.push('/login?registered=1&confirm=1');
      } else {
        router.push('/login?registered=1');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (inviteLoading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-bg-base">
        <p className="type-body-sm text-fg-2">Loading invite…</p>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-bg-base">
      <div className="w-full max-w-md bg-bg-surface-1 rounded-lg p-8 border border-border-default">
        <h1 className="type-h4 text-fg-1 mb-2">
          {teamInviteToken ? `Join ${inviteLabelName}` : 'Create your account'}
        </h1>
        <p className="type-body-sm text-fg-2 mb-8">
          {teamInviteToken
            ? `You've been invited to join ${inviteLabelName}'s workspace on MelodyPitch.`
            : 'Free for songwriters and artists.'}
        </p>

        {error && (
          <p className="type-body-sm text-error bg-error-muted px-3 py-2 rounded-md mb-4">
            {error}
          </p>
        )}

        {!teamInviteToken && (
          <>
            <div className="mb-6">
              <GoogleSignInButton />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-border-default" />
              <span className="text-xs text-fg-3 font-medium">Or sign up with email</span>
              <div className="flex-1 h-px bg-border-default" />
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="type-label text-fg-1">Full name</label>
            <input id="name" name="name" type="text" required className="input" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="type-label text-fg-1">Email</label>
            {teamInviteToken ? (
              <input
                id="email"
                type="email"
                value={inviteEmail}
                readOnly
                className="input opacity-60 cursor-not-allowed"
              />
            ) : (
              <input id="email" name="email" type="email" required className="input" />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="type-label text-fg-1">Password</label>
            <input id="password" name="password" type="password" required minLength={8} className="input" />
          </div>

          {!teamInviteToken && (
            <div className="flex flex-col gap-2">
              <label htmlFor="role" className="type-label text-fg-1">I am a...</label>
              <select id="role" name="role" required className="input bg-bg-surface-1">
                <option value="">Select role</option>
                <option value="LABEL">Label / A&R</option>
                <option value="SONGWRITER">Songwriter / Producer</option>
                <option value="ARTIST">Artist / Management</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="type-body-sm text-fg-2 mt-6 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-accent-gold hover:text-accent-gold-hover font-medium transition-colors">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
