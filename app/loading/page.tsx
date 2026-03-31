"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const phases = [
  "Reading selected function theme",
  "Generating Indian motif transitions",
  "Applying fonts, colors and scene layers",
  "Preparing timeline editor for invite edits",
];

export default function LoadingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(phases[0]);
  const [selection] = useState(() => {
    if (typeof window === "undefined") return null;

    const stored = sessionStorage.getItem("selectedTemplate");
    if (!stored) return null;

    try {
      return JSON.parse(stored) as {
        category?: string;
        subEvent?: string;
        templateName?: string;
        theme?: string;
        price?: number;
      };
    } catch {
      return null;
    }
  });

  const { eventLabel, productLabel } = useMemo(() => {
    if (!selection) {
      return {
        eventLabel: "Selected event",
        productLabel: "Selected invite product",
      };
    }

    const map: Record<string, string> = {
      roka: "Roka",
      engagement: "Engagement",
      haldi: "Haldi",
      mehendi: "Mehendi",
      sangeet: "Sangeet",
      wedding: "Wedding",
      reception: "Reception",
      baby: "Godh Bharai",
    };

    const category = selection.category ?? "wedding";
    const base = map[category] ?? "Wedding";
    const productParts = [selection.templateName, selection.theme ? `${selection.theme} Theme` : undefined].filter(Boolean);
    const productText = productParts.join(" • ");

    return {
      eventLabel: selection.subEvent ? `${base} • ${selection.subEvent}` : base,
      productLabel: selection.price ? `${productText} • INR ${selection.price}` : productText || "Selected invite product",
    };
  }, [selection]);

  useEffect(() => {
    const start = Date.now();
    const total = 5000;
    const iv = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, Math.round((elapsed / total) * 100));
      setProgress(p);
      const phaseIndex = Math.min(phases.length - 1, Math.floor((elapsed / total) * phases.length));
      setPhase(phases[phaseIndex]);
      if (p >= 100) {
        clearInterval(iv);
        router.push("/editor");
      }
    }, 120);

    return () => clearInterval(iv);
  }, [router]);

  return (
    <div className="bg-neutral flex min-h-screen items-center justify-center px-5">
      <motion.section
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="glass-card w-full max-w-2xl rounded-3xl p-10 shadow-2xl-plus"
      >
        <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em]">Step 3</p>
        <h1 className="mt-2 text-4xl text-[#3f2a22]">Generating your Indian-style editable invite</h1>
        <p className="mt-2 text-sm font-semibold text-zinc-600">{eventLabel}</p>
        <p className="mt-1 text-xs text-zinc-600">{productLabel}</p>
        <p className="mt-3 text-zinc-700">{phase}</p>

        <div className="mt-8 h-4 overflow-hidden rounded-full bg-white/70">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
            className="h-full bg-gradient-to-r from-amber-700 via-orange-500 to-rose-600"
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-zinc-700">
          <span>AI composition in progress...</span>
          <strong>{progress}%</strong>
        </div>
      </motion.section>
    </div>
  );
}
