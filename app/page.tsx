"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Login and Setup",
    desc: "Begin with your family profile and invite preferences.",
    image: "https://images.pexels.com/photos/31595391/pexels-photo-31595391.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Choose Event Product",
    desc: "Browse event categories, themes, visuals, and pricing like an invite storefront.",
    image: "https://images.pexels.com/photos/34479850/pexels-photo-34479850.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Generate and Edit",
    desc: "Get AI-style generation then customize every layer in timeline editor.",
    image: "https://images.pexels.com/photos/30672338/pexels-photo-30672338.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const occasions = ["Roka", "Engagement", "Haldi", "Mehendi", "Sangeet", "Wedding", "Reception", "Godh Bharai"];

export default function Home() {
  return (
    <div className="hero-bg min-h-screen overflow-hidden text-white">
      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pb-16 pt-30 sm:px-10">
        <div className="pointer-events-none absolute -left-22 top-30 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl float-soft" />
        <div className="pointer-events-none absolute right-0 top-52 h-72 w-72 rounded-full bg-rose-400/15 blur-3xl float-soft" />

        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-4 inline-flex w-fit rounded-full border border-white/35 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.2em]"
        >
          Matrimonial Invitation Builder
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl text-5xl leading-tight sm:text-6xl"
        >
          Premium Indian function invites with themes, products, and pricing.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="mt-5 max-w-3xl text-lg text-white/85"
        >
          Create wedding and family celebration invitations in a polished 3-step flow, from occasion selection to editable
          timeline output.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.45 }} className="mt-8 flex flex-wrap gap-3">
          {occasions.map((item) => (
            <span key={item} className="event-pill rounded-full px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur">
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Link href="/login" className="rounded-full bg-accent px-7 py-3 text-sm font-semibold shadow-xl-plus hover:brightness-110">
            Start Designing
          </Link>
          <Link
            href="/select"
            className="rounded-full border border-white/55 px-7 py-3 text-sm font-semibold text-white/95 hover:bg-white/15"
          >
            Explore Invite Products
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55 }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {steps.map((step) => (
            <article key={step.title} className="premium-surface overflow-hidden rounded-2xl p-4 text-zinc-900 shadow-xl-plus">
              <div className="relative h-44 w-full overflow-hidden rounded-xl">
                <Image src={step.image} alt={step.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <h3 className="mt-4 text-2xl text-[#3f2a22]">{step.title}</h3>
              <p className="mt-2 text-sm text-zinc-700">{step.desc}</p>
            </article>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
