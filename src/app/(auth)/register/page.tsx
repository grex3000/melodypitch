import { createClient } from '@supabase/supabase-js';
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { db } from '@/lib/db';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { error?: string; registered?: string };
}) {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-bg-base">
      <div className="w-full max-w-md bg-bg-surface-1 rounded-lg p-8 border border-border-default">
        <h1 className="type-h4 text-fg-1 mb-2">
          Create your account
        </h1>
        <p className="type-body-sm text-fg-2 mb-8">
          Free for songwriters and artists.
        </p>

        {searchParams.registered && (
          <p className="type-body-sm text-success bg-success-muted px-3 py-2 rounded-md mb-4">
            Account created! Please sign in.
          </p>
        )}

        {searchParams.error && (
          <p className="type-body-sm text-error bg-error-muted px-3 py-2 rounded-md mb-4">
            Unable to create account. Please try again.
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

        <form
          action={async (formData) => {
            "use server";
            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const role = formData.get("role") as Role;

            try {
              const { data, error } = await supabaseAdmin.auth.admin.createUser({
                email,
                password,
                email_confirm: true,
                user_metadata: {
                  name,
                  role,
                },
              });

              if (error || !data.user) {
                console.error('Registration error:', error);
                return redirect("/register?error=1");
              }

              // Create Prisma User record
              try {
                await db.user.create({
                  data: {
                    supabaseUserId: data.user.id,
                    email,
                    name,
                    role,
                  },
                });
              } catch (dbErr) {
                console.error('Database creation error:', dbErr);
                // User was created in Supabase but not in Prisma - still redirect to login
                // The user can login but may have issues with app functionality
              }

              redirect("/login?registered=1");
            } catch (err) {
              console.error('Registration exception:', err);
              return redirect("/register?error=1");
            }
          }}
          className="flex flex-col gap-4"
        >
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
            className="btn btn-primary btn-lg mt-2"
          >
            Create account
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
