import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";

export default function RegisterPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#e7e5e4]">
      <div className="w-full max-w-md bg-white rounded-[1.25rem] p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight mb-1">
          Create your account
        </h1>
        <p className="text-sm text-[#78716c] mb-8">
          Free for songwriters and artists.
        </p>

        <form
          action={async (formData) => {
            "use server";
            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const role = formData.get("role") as Role;

            // Create user with Supabase Auth
            const { data, error } = await supabaseServer.auth.signUp({
              email,
              password,
              options: {
                data: {
                  name,
                  role,
                },
              },
            });

            if (error || !data.user) {
              // Handle error - in production, show error message
              return;
            }

            // Create profile based on role
            // Note: In production, this should be done via database trigger or webhook
            // For now, we'll skip this step as it requires additional setup

            redirect("/login?registered=1");
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="border rounded-[0.625rem] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="border rounded-[0.625rem] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="border rounded-[0.625rem] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="role" className="text-sm font-medium">
              I am a...
            </label>
            <select
              id="role"
              name="role"
              required
              className="border rounded-[0.625rem] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] bg-white"
            >
              <option value="">Select role</option>
              <option value="LABEL">Label / A&R</option>
              <option value="SONGWRITER">Songwriter / Producer</option>
              <option value="ARTIST">Artist / Management</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-medium rounded-[0.625rem] py-2.5 text-sm transition-colors"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}
