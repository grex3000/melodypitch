import { createClient } from '@supabase/supabase-js';
import { redirect } from "next/navigation";
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function createLoginClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string; registered?: string };
}) {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-bg-base">
      <div className="w-full max-w-md bg-bg-surface-1 rounded-lg p-8 border border-border-default">
        <h1 className="type-h4 text-fg-1 mb-2">
          Sign in to MelodyPitch
        </h1>
        <p className="type-body-sm text-fg-2 mb-8">
          Enter your credentials to continue.
        </p>

        {searchParams.registered && (
          <p className="type-body-sm text-success bg-success-muted px-3 py-2 rounded-md mb-4">
            Account created! Please sign in.
          </p>
        )}

        {searchParams.error && (
          <p className="type-body-sm text-error bg-error-muted px-3 py-2 rounded-md mb-4">
            Invalid email or password.
          </p>
        )}

        {/* Google Sign-In Button */}
        <div className="mb-6">
          <GoogleSignInButton />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border-default" />
          <span className="text-xs text-fg-3 font-medium">Or continue with email</span>
          <div className="flex-1 h-px bg-border-default" />
        </div>

        <form
          action={async (formData) => {
            "use server";
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const callbackUrl = searchParams.callbackUrl ?? "/";
            
            const supabase = createLoginClient();
            const { data, error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });

            if (error || !data.session) {
              return redirect(
                `/login?error=1&callbackUrl=${encodeURIComponent(callbackUrl)}`
              );
            }

            const { cookies } = await import('next/headers');
            const cookieStore = await cookies();
            
            cookieStore.set('sb-access-token', data.session.access_token, {
              path: '/',
              httpOnly: true,
              sameSite: 'lax',
              secure: process.env.NODE_ENV === 'production',
              maxAge: data.session.expires_in,
            });
            cookieStore.set('sb-refresh-token', data.session.refresh_token, {
              path: '/',
              httpOnly: true,
              sameSite: 'lax',
              secure: process.env.NODE_ENV === 'production',
              maxAge: 60 * 60 * 24 * 30,
            });

            return redirect(callbackUrl);
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="type-label text-fg-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
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
              autoComplete="current-password"
              className="input"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg mt-2"
          >
            Sign in
          </button>
        </form>

        <p className="type-body-sm text-fg-2 mt-6 text-center">
          No account?{" "}
          <a
            href="/register"
            className="text-accent-gold hover:text-accent-gold-hover font-medium transition-colors"
          >
            Create one free
          </a>
        </p>
      </div>
    </div>
  );
}
