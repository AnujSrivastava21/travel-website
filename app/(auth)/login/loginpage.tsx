"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40">
            The Local Route
          </p>

          <h1 className="mt-4 text-4xl font-semibold">Welcome back</h1>

          <p className="mt-3 text-white/50">
            Sign in to continue your journey.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
  signIn("google", {
    callbackUrl: window.location.origin + callbackUrl,
  })
}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 font-medium text-black transition hover:bg-white/90"
        >
          {/* Google Icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M21.35 12.23c0-.79-.07-1.55-.23-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4z"
            />

            <path
              fill="#34A853"
              d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.29v2.52A9.74 9.74 0 0 0 12 21.5z"
            />

            <path
              fill="#FBBC05"
              d="M6.54 13.6A5.86 5.86 0 0 1 6.23 12c0-.56.1-1.1.31-1.6V7.88H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.12l3.25-2.52z"
            />

            <path
              fill="#EA4335"
              d="M12 6.37c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.47 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.71 5.38l3.25 2.52C7.31 8.09 9.46 6.37 12 6.37z"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </main>
  );
}
