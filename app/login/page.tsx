"use client";

import { useState } from "react";
import { signIn, signUp } from "@/app/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setMessage("Logging in...");

    const { error } = await signIn(email, password);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Login successful");
    router.push("/dashboard");
  };

  const handleSignup = async () => {
    setMessage("Creating account...");

    const { error } = await signUp(email, password);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Account created. Now click Login.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="text-3xl font-bold">Blackbox AI Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="mt-6 w-full rounded-xl bg-slate-800 p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password minimum 6 characters"
          className="mt-4 w-full rounded-xl bg-slate-800 p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="mt-6 w-full rounded-xl bg-cyan-500 py-3 font-bold text-black"
        >
          Login
        </button>

        <button
          onClick={handleSignup}
          className="mt-3 w-full rounded-xl bg-slate-700 py-3"
        >
          Sign Up
        </button>

        {message && (
          <p className="mt-4 rounded-xl bg-slate-800 p-3 text-sm text-slate-300">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}