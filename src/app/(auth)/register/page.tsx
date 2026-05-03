import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Role } from '@prisma/client';

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { error?: string; registered?: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(searchParams.error ? 'Unable to create account. Please try again.' : '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const name = formData.get('name') as string;
      const role = formData.get('role') as Role;

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create account');
        setLoading(false);
        return;
      }

      // Success - redirect to login
      router.push('/login?registered=1');
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-bg-base">
      <div className="w-full max-w-md bg-bg-surface-1 rounded-lg p-8 border border-border-default">
        <h1 className="type-h4 text-fg-1 mb-2">
          Create your account
        </h1>
        <p className="type-body-sm text-fg-2 mb-8">
          Free for songwriters and artists.
        </p>

        {error && (
          <p className="type-body-sm text-error bg-error-muted px-3 py-2 rounded-md mb-4">
            {error}
          </p>
        )}

        {/* Google Sign-Up Button */}
        <div className="mb-6">
          <GoogleSignInButton />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border-default" />
          <span className="text-xs text-fg-3 font-medium">Or sign up with email</span>
          <div className="flex-1 h-px bg-border-default" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="type-label text-fg-1">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="input"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="type-label text-fg-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="type-label text-fg-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="input"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="type-label text-fg-1">
              I am a...
            </label>
            <select
              id="role"
              name="role"
              required
              className="input bg-bg-surface-1"
            >
              <option value="">Select role</option>
              <option value="LABEL">Label / A&R</option>
              <option value="SONGWRITER">Songwriter / Producer</option>
              <option value="ARTIST">Artist / Management</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="type-body-sm text-fg-2 mt-6 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-accent-gold hover:text-accent-gold-hover font-medium transition-colors"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
