import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GoogleSignInButton } from "../../../components/auth/google-sign-in-button";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to Travel With Anuj using your Google account.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-32">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-white/40">
              Travel With Anuj
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight">
              Welcome back.
            </h1>

            <p className="mt-4 text-sm leading-6 text-white/50">
              Sign in to save journeys, access your account and
              explore premium travel content.
            </p>
          </div>

          <div className="mt-10">
            <GoogleSignInButton />
          </div>

          <p className="mt-8 text-center text-xs leading-5 text-white/30">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            Back to website
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  );
}