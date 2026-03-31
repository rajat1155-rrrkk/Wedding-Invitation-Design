"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    localStorage.setItem("user", JSON.stringify({ name }));
    router.push("/select");
  }

  return (
    <div className="bg-neutral flex min-h-screen items-center justify-center px-5 py-10">
      <section className="glass-card w-full max-w-xl rounded-3xl p-8 shadow-2xl-plus sm:p-10">
        <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em]">Step 1</p>
        <h1 className="mt-2 text-4xl text-[#3f2a22]">Welcome to your invite studio</h1>
        <p className="mt-3 text-sm text-zinc-700">Use your name to begin the creation flow. We will take you to category and design selection next.</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="text-sm font-semibold text-zinc-700">
            Your Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-2 w-full rounded-xl border border-amber-200 bg-white/80 px-4 py-3 outline-none ring-0 transition focus:border-amber-500"
            />
          </label>
          <button className="mt-2 rounded-xl bg-accent py-3 font-semibold text-white shadow-xl-plus hover:brightness-110">
            Continue to Categories
          </button>
        </form>
      </section>
    </div>
  );
}
