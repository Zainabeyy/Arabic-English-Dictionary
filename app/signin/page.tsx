"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signInWithEmail, signInWithGoogle } from "../lib/auth/auth";
import RiveBird from "@/components/RiveBird";

export default function Signin() {
  const router = useRouter();

  const [passwordErr, setPasswordErr] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [haveAccount, setHaveAccount] = React.useState(true);
  const [methodError, setMethodError] = React.useState(false);
  const [error, setError] = React.useState("");

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setPasswordErr("");
    setError("");
    setHaveAccount(true);
    setMethodError(false);

    if (password.length < 6) {
      setPasswordErr("Password must be at least 6 characters long.");
      return;
    }

    const result = await signInWithEmail(email, password);

    if (!result.success) {
      if (result.code === "auth/no-password-method") {
        setMethodError(true);
      } else if (result.code === "auth/wrong-password") {
        setPasswordErr("Invalid password.");
      } else if (result.code === "auth/user-not-found") {
        setHaveAccount(false);
      } else {
        setError(result.message ?? "an unknown error occurred.");
      }
      return;
    }

    router.push("/");
  }

  // --- sign in using google function ---
  async function handleGoogleSignIn() {
    const result = await signInWithGoogle();

    if (!result.success) {
      if (result.code === "auth/email-already-in-use") {
        setHaveAccount(true);
      }
      setError(result.message);
      return;
    }

    router.push("/");
  }

  return (
    <main className="min-h-screen w-screen flex justify-center items-center p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full dark:bg-dark2 max-w-6xl shadow-customlg rounded-xl overflow-hidden">
        <section className="p-7">
          <h1 className="text-3xl font-bold mb-5">Get Started Now</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label>
              Email
              <input
                type="email"
                name="email"
                id="email"
                className="authInput"
                placeholder="Enter your email"
                required
              />
              {!haveAccount && (
                <p className="text-sm text-red mt-2">
                  No account found with this email.
                  <Link
                    href="/login"
                    className="text-primary-light dark:text-primary-dark text-base block underline underline-offset-2 w-fit"
                  >
                    {" "}
                    Sign Up instead?
                  </Link>
                </p>
              )}
            </label>
            <label className="relative">
              Password
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="authInput"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-4 top-1/2 text-dark2 dark:text-dark3"
              >
                {showPassword ? (
                  <EyeOff size="20" />
                ) : (
                  <Eye size="20" />
                )}
              </button>
              <p className="text-xs text-red mt-2 text-right">{passwordErr}</p>
            </label>
            <button
              type="submit"
              className="flex-1 primaryGradient text-white font-bold rounded-2xl py-1.5 mt-6 hover:bg-primary/80 transition duration-300"
            >
              Sign in
            </button>
          </form>
          <div className="relative flex justify-center my-8">
            <div className="w-full h-[1px] bg-gray2 dark:bg-white absolute top-1/2" />
            <p className="text-center text-xs font-semibold text-black dark:text-white bg-white dark:bg-dark2 w-fit relative z-10 px-1.5">
              Or
            </p>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="mx-auto flex items-center gap-2 border-2 border-gray2 rounded-2xl px-3.5 py-1.5 text-base font-medium hover:bg-gray2 dark:hover:bg-dark3 transition duration-300"
          >
            <Image src="/google-icon.svg" alt="google" width={26} height={26} />
            Sign in with Google
          </button>
          {methodError && (
            <p className="text-sm text-red mt-2">
              This account was created using Google. Please sign in with Google.
            </p>
          )}
          <div className="flex gap-2 mt-4 mx-auto w-fit">
            <p>Don{"'"}t have an account?</p>
            <Link
              href="/signup"
              className="text-primary dark:text-primary-dark hover:underline underline-offset-2"
            >
              Sign up
            </Link>
          </div>
          {error && <p className="text-sm text-red mt-2">{error}</p>}
        </section>
        <section className="hidden sm:block primaryGradient">
          <RiveBird />
        </section>
      </div>
    </main>
  );
}
