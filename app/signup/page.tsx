"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signInWithGoogle, signUpWithEmail } from "../lib/auth";
import RiveBird from "@/components/RiveBird";

export default function SignUp() {
  const router = useRouter();

  const [passwordErr, setPasswordErr] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [haveAccount, setHaveAccount] = React.useState(false);
  const [error, setError] = React.useState("");

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (password.length < 6) {
      setPasswordErr(true);
      return;
    }

    const result = await signUpWithEmail(name, email, password);

    if (!result.success) {
      if (result.code === "auth/email-already-in-use") {
        setHaveAccount(true);
      } else {
        setError(result.message);
        setHaveAccount(false);
      }
      return;
    }

    router.push("/");
    setPasswordErr(false);
  }

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
              Name
              <input
                type="text"
                name="name"
                id="name"
                className="authInput"
                placeholder="Enter your name"
                required
              />
            </label>
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
              {haveAccount && (
                <p className="text-sm text-red mt-2">
                  Looks like you already have an account with this email
                  <Link
                    href="/signin"
                    className="text-primary-light dark:text-primary-dark text-base block focus:underline hover:underline underline-offset-2 w-fit"
                  >
                    {" "}
                    Sign in instead?
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
                className="absolute right-4 top-1/2 -translate-y-1/3 hover:text-primary"
              >
                {showPassword ? (
                  <EyeOff size="20" color="hsl(0,0%,15%)" />
                ) : (
                  <Eye size="20" color="hsl(0,0%,15%)" />
                )}
              </button>
              <p
                className={`text-xs ${
                  passwordErr ? "text-red" : "text-gray3 dark:text-gray2"
                } mt-2 text-right`}
              >
                Password must be at least 6 characters long.
              </p>
            </label>
            <button
              type="submit"
              className="flex-1 primaryGradient text-white font-bold rounded-2xl py-1.5 mt-6"
            >
              Signup
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
            className="mx-auto flex items-center gap-2 border-2 border-gray2 rounded-2xl px-3.5 py-1.5 text-base font-medium hover:bg-gray1 dark:hover:bg-dark3"
          >
            <Image src="/google-icon.svg" alt="google" width={26} height={26} />
            Sign in with Google
          </button>
          <div className="flex gap-2 mt-4 mx-auto w-fit">
            <p>Have an account?</p>
            <Link
              href="/signin"
              className="text-primary dark:text-primary-dark hover:underline underline-offset-2 focus:underline linkFocus"
            >
              Sign In
            </Link>
          </div>
          {error && <p className="text-sm text-red mt-2">{error}</p>}
        </section>
        <section className="hidden primaryGradient relative sm:flex justify-center items-center">
          <RiveBird/>
        </section>
      </div>
    </main>
  );
}
