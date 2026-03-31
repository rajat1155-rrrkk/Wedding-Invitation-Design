"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

type LayerType = "title" | "subtitle" | "chip" | "sticker" | "shape";
type LayerAnimation = "none" | "float" | "pulse" | "sparkle";

type Layer = {
  id: string;
  type: LayerType;
  text?: string;
  emoji?: string;
  x: number;
  y: number;
  color: string;
  bg?: string;
  size: "sm" | "md" | "lg";
  animation: LayerAnimation;
};

type SelectedInvite = {
  category?: string;
  subEvent?: string;
  templateName?: string;
  theme?: string;
  price?: number;
  previewImage?: string;
  vibe?: string;
  duration?: number;
};

const baseInvite: SelectedInvite = {
  category: "wedding",
  subEvent: "Pheras",
  templateName: "Sacred Pheras Story",
  theme: "Classic",
  price: 1399,
  previewImage: "https://images.pexels.com/photos/34479850/pexels-photo-34479850.jpeg?auto=compress&cs=tinysrgb&w=1400",
  vibe: "Traditional",
  duration: 22,
};

const sizeMap = {
  sm: "text-xs px-2 py-1",
  md: "text-sm px-3 py-2",
  lg: "text-base px-4 py-2.5",
} as const;

const stickerLibrary = ["✨", "💛", "🎉", "💐", "🪔", "🎶", "🕊️", "🌸"];

const toolRail = [
  { id: "templates", label: "Templates", icon: "Tp" },
  { id: "text", label: "Text", icon: "Tx" },
  { id: "elements", label: "Elements", icon: "El" },
  { id: "uploads", label: "Uploads", icon: "Up" },
  { id: "music", label: "Music", icon: "Mu" },
];

function createLayerId(prefix: string) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function createInitialLayers(selected: SelectedInvite): Layer[] {
  return [
    {
      id: "title-layer",
      type: "title",
      text: selected.templateName || "Wedding Invite",
      x: 22,
      y: 60,
      color: "#fff7ed",
      bg: "rgba(124,45,18,0.62)",
      size: "lg",
      animation: "float",
    },
    {
      id: "subtitle-layer",
      type: "subtitle",
      text: selected.subEvent ? `${selected.subEvent} Ceremony` : "Date • Venue • Time",
      x: 24,
      y: 120,
      color: "#fef3c7",
      bg: "rgba(30,27,22,0.44)",
      size: "md",
      animation: "none",
    },
    {
      id: "theme-layer",
      type: "chip",
      text: `Theme: ${selected.theme || "Classic"}`,
      x: 24,
      y: 170,
      color: "#3f2a22",
      bg: "rgba(255,251,235,0.92)",
      size: "sm",
      animation: "pulse",
    },
    {
      id: "sticker-layer",
      type: "sticker",
      emoji: "✨",
      x: 260,
      y: 70,
      color: "#ffffff",
      size: "lg",
      animation: "sparkle",
    },
  ];
}

export default function EditorPage() {
  const [selected] = useState<SelectedInvite>(() => {
    if (typeof window === "undefined") return baseInvite;
    const stored = sessionStorage.getItem("selectedTemplate");
    if (!stored) return baseInvite;
    try {
      const parsed = JSON.parse(stored) as SelectedInvite;
      return { ...baseInvite, ...parsed };
    } catch {
      return baseInvite;
    }
  });

  const [layers, setLayers] = useState<Layer[]>(() => createInitialLayers(selected));

  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(layers[0]?.id ?? null);
  const [playing, setPlaying] = useState(true);
  const [music, setMusic] = useState(true);
  const [timelinePos, setTimelinePos] = useState(6);
  const [activeTool, setActiveTool] = useState("text");

  const currentLayer = layers.find((l) => l.id === selectedLayerId) ?? null;

  function addTextLayer() {
    const next: Layer = {
      id: createLayerId("layer"),
      type: "subtitle",
      text: "New text layer",
      x: 40,
      y: 240,
      color: "#fff7ed",
      bg: "rgba(120,53,15,0.55)",
      size: "md",
      animation: "float",
    };
    setLayers((prev) => [...prev, next]);
    setSelectedLayerId(next.id);
  }

  function addStickerLayer(emoji: string) {
    const next: Layer = {
      id: createLayerId("sticker"),
      type: "sticker",
      emoji,
      x: 230,
      y: 320,
      color: "#ffffff",
      size: "lg",
      animation: "sparkle",
    };
    setLayers((prev) => [...prev, next]);
    setSelectedLayerId(next.id);
  }

  function updateCurrentLayer(partial: Partial<Layer>) {
    if (!selectedLayerId) return;
    setLayers((prev) => prev.map((layer) => (layer.id === selectedLayerId ? { ...layer, ...partial } : layer)));
  }

  function removeCurrentLayer() {
    if (!selectedLayerId) return;
    setLayers((prev) => prev.filter((layer) => layer.id !== selectedLayerId));
    setSelectedLayerId(null);
  }

  return (
    <div className="bg-neutral min-h-screen px-4 pb-8 pt-22 sm:px-6">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-2xl border border-amber-100 bg-white/75 shadow-2xl-plus backdrop-blur-xl">
        <header className="flex items-center justify-between border-b border-amber-100 px-4 py-3 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Canva-style Editor</p>
            <h2 className="text-xl font-semibold text-[#3f2a22]">{selected.templateName}</h2>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <button className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5">Share</button>
            <button className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5">Preview</button>
            <button className="rounded-lg bg-zinc-900 px-3 py-1.5 font-semibold text-white">Download</button>
          </div>
        </header>

        <div className="grid min-h-[720px] grid-cols-1 lg:grid-cols-[86px_280px_minmax(340px,1fr)_320px]">
          <aside className="hidden border-r border-amber-100 bg-[#f7efe4] p-3 lg:block">
            <div className="flex flex-col gap-3">
              {toolRail.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`flex flex-col items-center gap-1 rounded-xl px-2 py-3 text-xs font-semibold ${
                    activeTool === tool.id ? "bg-white text-zinc-900 shadow" : "text-zinc-600 hover:bg-white/60"
                  }`}
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-amber-200 bg-white text-[10px]">{tool.icon}</span>
                  {tool.label}
                </button>
              ))}
            </div>
          </aside>

          <aside className="border-r border-amber-100 bg-[#fcf7ee] p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">{activeTool} Panel</h3>
            <div className="mt-3 rounded-xl border border-amber-100 bg-white p-3 text-sm text-zinc-700">
              <p className="font-semibold">Selected Invite</p>
              <p className="mt-1">{selected.subEvent || selected.category}</p>
              <p className="mt-1">Theme: {selected.theme}</p>
              <p className="mt-1">INR {selected.price}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button onClick={addTextLayer} className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white">
                Add Text
              </button>
              <button
                onClick={() => setPlaying((state) => !state)}
                className="rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700"
              >
                {playing ? "Pause" : "Play"}
              </button>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Stickers</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {stickerLibrary.map((s) => (
                  <button key={s} onClick={() => addStickerLayer(s)} className="rounded-lg border border-amber-200 bg-white px-2.5 py-1 text-lg">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex flex-col bg-[#f3f4f6]">
            <div className="flex-1 p-5 sm:p-8">
              <div className="grid h-full place-items-center rounded-2xl border border-dashed border-zinc-300 bg-[linear-gradient(45deg,#f8fafc_25%,transparent_25%),linear-gradient(-45deg,#f8fafc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f8fafc_75%),linear-gradient(-45deg,transparent_75%,#f8fafc_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px]">
                <div className="relative aspect-[9/16] w-full max-w-[390px] overflow-hidden rounded-2xl border border-white/80 shadow-2xl-plus">
                  <Image
                    src={selected.previewImage || baseInvite.previewImage || ""}
                    alt={selected.templateName || "Invite"}
                    fill
                    className="object-cover"
                    sizes="390px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                  {layers.map((layer) => (
                    <motion.div
                      key={layer.id}
                      drag
                      dragMomentum={false}
                      dragElastic={0.08}
                      onDragEnd={(_, info) => {
                        setLayers((prev) =>
                          prev.map((x) =>
                            x.id === layer.id ? { ...x, x: Math.max(0, x.x + info.offset.x), y: Math.max(0, x.y + info.offset.y) } : x,
                          ),
                        );
                      }}
                      onClick={() => setSelectedLayerId(layer.id)}
                      style={{ left: layer.x, top: layer.y, color: layer.color }}
                      className={`absolute cursor-grab rounded-xl active:cursor-grabbing ${
                        selectedLayerId === layer.id ? "ring-2 ring-sky-300" : ""
                      } ${layer.animation === "float" ? "float-soft" : ""} ${layer.animation === "pulse" ? "editor-pulse" : ""} ${
                        layer.animation === "sparkle" ? "editor-sparkle" : ""
                      }`}
                    >
                      {layer.type === "sticker" ? (
                        <span className="select-none text-4xl">{layer.emoji}</span>
                      ) : (
                        <span className={`inline-block rounded-xl font-semibold ${sizeMap[layer.size]}`} style={{ background: layer.bg || "rgba(0,0,0,0.45)" }}>
                          {layer.text}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-amber-100 bg-white px-4 py-3 sm:px-6">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                <span>Timeline</span>
                <span>{timelinePos}s / {selected.duration || 20}s</span>
              </div>
              <input
                type="range"
                min={0}
                max={selected.duration || 20}
                value={timelinePos}
                onChange={(e) => setTimelinePos(Number(e.target.value))}
                className="h-2 w-full accent-orange-600"
              />
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div className="rounded bg-amber-100 px-2 py-1 text-amber-900">Background Track</div>
                <div className="rounded bg-sky-100 px-2 py-1 text-sky-900">Text Layers ({layers.filter((x) => x.type !== "sticker").length})</div>
                <div className="rounded bg-emerald-100 px-2 py-1 text-emerald-900">Stickers ({layers.filter((x) => x.type === "sticker").length})</div>
              </div>
            </div>
          </main>

          <aside className="border-l border-amber-100 bg-[#fcf7ee] p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">Properties</h3>
            {!currentLayer && <p className="mt-3 text-sm text-zinc-600">Select a layer on canvas to edit properties.</p>}

            {currentLayer && (
              <div className="mt-3 space-y-3">
                {currentLayer.type !== "sticker" && (
                  <label className="block text-sm font-semibold text-zinc-700">
                    Text
                    <input
                      value={currentLayer.text || ""}
                      onChange={(e) => updateCurrentLayer({ text: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-amber-200 bg-white px-3 py-2"
                    />
                  </label>
                )}

                <label className="block text-sm font-semibold text-zinc-700">
                  Animation
                  <select
                    value={currentLayer.animation}
                    onChange={(e) => updateCurrentLayer({ animation: e.target.value as LayerAnimation })}
                    className="mt-1 w-full rounded-lg border border-amber-200 bg-white px-3 py-2"
                  >
                    <option value="none">None</option>
                    <option value="float">Float</option>
                    <option value="pulse">Pulse</option>
                    <option value="sparkle">Sparkle</option>
                  </select>
                </label>

                <label className="block text-sm font-semibold text-zinc-700">
                  Size
                  <select
                    value={currentLayer.size}
                    onChange={(e) => updateCurrentLayer({ size: e.target.value as Layer["size"] })}
                    className="mt-1 w-full rounded-lg border border-amber-200 bg-white px-3 py-2"
                  >
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                  </select>
                </label>

                {currentLayer.type !== "sticker" && (
                  <label className="block text-sm font-semibold text-zinc-700">
                    Text Color
                    <input
                      type="color"
                      value={currentLayer.color}
                      onChange={(e) => updateCurrentLayer({ color: e.target.value })}
                      className="mt-1 h-10 w-full rounded-lg border border-amber-200 bg-white"
                    />
                  </label>
                )}

                <div className="rounded-xl border border-amber-100 bg-white p-3 text-sm text-zinc-700">
                  <p>Music: {music ? "On" : "Off"}</p>
                  <button onClick={() => setMusic((m) => !m)} className="mt-2 rounded bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white">
                    Toggle Music
                  </button>
                </div>

                <button onClick={removeCurrentLayer} className="w-full rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">
                  Delete Layer
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
