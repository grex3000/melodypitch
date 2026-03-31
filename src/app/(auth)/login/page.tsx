import { signIn } from "@/auth";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string };
}) {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#e7e5e4]">
      <div className="w-full max-w-md bg-white rounded-[1.25rem] p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight mb-1">Sign in to MelodyPitch</h1>
        <p className="text-sm text-[#78716c] mb-8">Enter your credentials to continue.</p>

        {searchParams.error && (
          <p className="text-sm text-red-600 mb-4 bg-red-50 px-3 py-2 rounded-[0.625rem]">
            Invalid email or password.
          </p>
        )}

        <form
          action={async (formData) => {
            "use server";
            await signIn("credentials", {
              email: formData.get("email"),
              password: formData.get("password"),
              redirectTo: searchParams.callbackUrl ?? "/",
            });
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="border rounded-[0.625rem] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="border rounded-[0.625rem] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-medium rounded-[0.625rem] py-2.5 text-sm transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="text-sm text-[#78716c] mt-6 text-center">
          No account?{" "}
          <a href="/register" className="text-[#6366f1] hover:underline font-medium">
            Create one free
          </a>
        </p>
      </div>
    </div>
  );
}
