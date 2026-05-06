import { createClient } from '@supabase/supabase-js';
import { redirect } from "next/navigation";
import { db } from '@/lib/db';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import LoginSubmitButton from '@/components/auth/LoginSubmitButton';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function createLoginClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string; registered?: string; confirm?: string };
}) {
  const isUnconfirmed = searchParams.error === 'unconfirmed';

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-bg-base">
      <div className="w-full max-w-md bg-bg-surface-1 rounded-lg p-8 border border-border-default">
        <h1 className="type-h4 text-fg-1 mb-2">
          Sign in to MelodyPitch
        </h1>
        <p className="type-body-sm text-fg-2 mb-8">
          Enter your credentials to continue.
        </p>

        {searchParams.registered && !searchParams.confirm && (
          <p className="type-body-sm text-success bg-success-muted px-3 py-2 rounded-md mb-4">
            Account created! Please sign in.
          </p>
        )}

        {searchParams.registered && searchParams.confirm && (
          <p className="type-body-sm text-success bg-success-muted px-3 py-2 rounded-md mb-4">
            Account created! Check your email and click the confirmation link before signing in.
          </p>
        )}

        {searchParams.error && !isUnconfirmed && (
          <p className="type-body-sm text-error bg-error-muted px-3 py-2 rounded-md mb-4">
            Invalid email or password.
          </p>
        )}

        {isUnconfirmed && (
          <p className="type-body-sm text-error bg-error-muted px-3 py-2 rounded-md mb-4">
            Please confirm your email first — check your inbox for a link from MelodyPitch.
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
              console.error('Login error:', error?.message);
              const isEmailNotConfirmed = error?.message?.toLowerCase().includes('not confirmed');
              const errorParam = isEmailNotConfirmed ? 'unconfirmed' : '1';
              return redirect(
                `/login?error=${errorParam}&callbackUrl=${encodeURIComponent(callbackUrl)}`
              );
            }
            console.log('Login successful for:', email);

            // Store session cookies
            const { cookies } = await import('next/headers');
            const cookieStore = await cookies();
            const isProduction = process.env.NODE_ENV === 'production';

            cookieStore.set('sb-access-token', data.session.access_token, {
              path: '/',
              httpOnly: true,
              sameSite: 'lax',
              secure: isProduction,
              maxAge: data.session.expires_in,
            });

            cookieStore.set('sb-refresh-token', data.session.refresh_token, {
              path: '/',
              httpOnly: true,
              sameSite: 'lax',
              secure: isProduction,
              maxAge: 60 * 60 * 24 * 30,
            });
            
            console.log('Session cookies stored');

            // Fetch user role from database to determine dashboard
            // redirect() throws internally, so determine the URL first, then redirect outside try/catch
            let redirectUrl = callbackUrl;
            try {
              console.log('[LOGIN] Looking up DB user for supabaseUserId:', data.user.id);
              let user = await db.user.findUnique({
                where: { supabaseUserId: data.user.id },
              });
              console.log('[LOGIN] DB user found:', user ? `${user.email} role=${user.role}` : 'null');

              if (!user) {
                // supabaseUserId may have changed (e.g. re-registered) — look up by email
                const byEmail = await db.user.findUnique({
                  where: { email: data.user.email! },
                });

                if (byEmail) {
                  // Update to the current supabaseUserId
                  user = await db.user.update({
                    where: { email: data.user.email! },
                    data: { supabaseUserId: data.user.id },
                  });
                  console.log('[LOGIN] Updated supabaseUserId for:', data.user.email);
                } else {
                  const metaRole = data.user.user_metadata?.role as string | undefined;
                  const validRoles = ['LABEL', 'SONGWRITER', 'ARTIST'];
                  const role = metaRole && validRoles.includes(metaRole)
                    ? (metaRole as 'LABEL' | 'SONGWRITER' | 'ARTIST')
                    : 'SONGWRITER';
                  user = await db.user.create({
                    data: {
                      supabaseUserId: data.user.id,
                      email: data.user.email!,
                      name: data.user.user_metadata?.name || data.user.email!.split('@')[0],
                      role,
                    },
                  });
                  console.log('[LOGIN] Created new DB user for:', data.user.email);
                }
              }

              // Ensure role-specific profile exists (covers users registered before this was added)
              if (user.role === 'LABEL') {
                const label = await db.label.findUnique({ where: { userId: user.id } });
                if (!label) {
                  await db.label.create({ data: { userId: user.id, name: user.name } });
                  console.log('[LOGIN] Created missing Label profile for:', user.email);
                }
              } else if (user.role === 'SONGWRITER') {
                const songwriter = await db.songwriter.findUnique({ where: { userId: user.id } });
                if (!songwriter) {
                  await db.songwriter.create({ data: { userId: user.id } });
                  console.log('[LOGIN] Created missing Songwriter profile for:', user.email);
                }
              } else if (user.role === 'ARTIST') {
                const member = await db.artistMember.findUnique({ where: { userId: user.id } });
                if (!member) {
                  const artist = await db.artist.create({ data: { name: user.name } });
                  await db.artistMember.create({ data: { userId: user.id, artistId: artist.id, role: 'member' } });
                  console.log('[LOGIN] Created missing Artist profile for:', user.email);
                }
              }

              const dashboardMap: Record<string, string> = {
                LABEL: '/label/dashboard',
                SONGWRITER: '/songwriter/dashboard',
                ARTIST: '/artist/dashboard',
              };
              redirectUrl = dashboardMap[user.role] || callbackUrl;
              console.log(`Redirecting ${user.role} to: ${redirectUrl}`);
            } catch (dbError) {
              console.error('Error fetching user role:', dbError);
            }

            return redirect(redirectUrl);
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

          <LoginSubmitButton />
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
