"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense, useMemo, useState } from "react";

type InviteProduct = {
  id: string;
  name: string;
  vibe: string;
  theme: string;
  price: number;
  image: string;
  badge: string;
  duration: number;
};

type CategoryCatalog = {
  title: string;
  subtitle: string;
  heroImage: string;
  products?: InviteProduct[];
  weddingPacks?: Record<string, InviteProduct[]>;
};

const categoryMeta: Record<string, CategoryCatalog> = {
  roka: {
    title: "Roka",
    subtitle: "Family introductions and formal announcement",
    heroImage: "https://images.pexels.com/photos/35706667/pexels-photo-35706667.jpeg?auto=compress&cs=tinysrgb&w=1600",
    products: [
      {
        id: "roka-1",
        name: "Roka Rasam Classic",
        vibe: "Traditional",
        theme: "Classic",
        price: 899,
        image: "https://images.pexels.com/photos/31595391/pexels-photo-31595391.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Best Seller",
        duration: 18,
      },
      {
        id: "roka-2",
        name: "Blessings & Rings",
        vibe: "Elegant",
        theme: "Royal",
        price: 1099,
        image: "https://images.pexels.com/photos/35706667/pexels-photo-35706667.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Premium",
        duration: 20,
      },
      {
        id: "roka-3",
        name: "Family Gold Leaf",
        vibe: "Warm",
        theme: "Floral",
        price: 999,
        image: "https://images.pexels.com/photos/34479850/pexels-photo-34479850.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "New",
        duration: 17,
      },
    ],
  },
  engagement: {
    title: "Engagement",
    subtitle: "Ring ceremony invites with couple story vibes",
    heroImage: "https://images.pexels.com/photos/31595391/pexels-photo-31595391.jpeg?auto=compress&cs=tinysrgb&w=1600",
    products: [
      {
        id: "eng-1",
        name: "Velvet Ring Reveal",
        vibe: "Cinematic",
        theme: "Royal",
        price: 1199,
        image: "https://images.pexels.com/photos/31595391/pexels-photo-31595391.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Premium",
        duration: 21,
      },
      {
        id: "eng-2",
        name: "Minimal Couple Story",
        vibe: "Modern",
        theme: "Minimal",
        price: 999,
        image: "https://images.pexels.com/photos/34479850/pexels-photo-34479850.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Trending",
        duration: 19,
      },
      {
        id: "eng-3",
        name: "Golden Promise Invite",
        vibe: "Elegant",
        theme: "Classic",
        price: 1099,
        image: "https://images.pexels.com/photos/35706667/pexels-photo-35706667.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Top Rated",
        duration: 20,
      },
    ],
  },
  haldi: {
    title: "Haldi",
    subtitle: "Bright yellow festive ceremony styles",
    heroImage: "https://images.pexels.com/photos/30672338/pexels-photo-30672338.jpeg?auto=compress&cs=tinysrgb&w=1600",
    products: [
      {
        id: "haldi-1",
        name: "Haldi Utsav Splash",
        vibe: "Festive",
        theme: "Color Pop",
        price: 799,
        image: "https://images.pexels.com/photos/30672338/pexels-photo-30672338.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Budget Pick",
        duration: 16,
      },
      {
        id: "haldi-2",
        name: "Marigold Courtyard",
        vibe: "Traditional",
        theme: "Classic",
        price: 949,
        image: "https://images.pexels.com/photos/29984888/pexels-photo-29984888.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Best Seller",
        duration: 17,
      },
      {
        id: "haldi-3",
        name: "Sunshine Haldi Reel",
        vibe: "Playful",
        theme: "Minimal",
        price: 899,
        image: "https://images.pexels.com/photos/33078530/pexels-photo-33078530.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "New",
        duration: 15,
      },
    ],
  },
  mehendi: {
    title: "Mehendi",
    subtitle: "Henna-themed invites with floral storytelling",
    heroImage: "https://images.pexels.com/photos/29984888/pexels-photo-29984888.jpeg?auto=compress&cs=tinysrgb&w=1600",
    products: [
      {
        id: "mehendi-1",
        name: "Henna Garden Invite",
        vibe: "Floral",
        theme: "Floral",
        price: 949,
        image: "https://images.pexels.com/photos/29984888/pexels-photo-29984888.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Trending",
        duration: 18,
      },
      {
        id: "mehendi-2",
        name: "Green Gold Night",
        vibe: "Royal",
        theme: "Royal",
        price: 1099,
        image: "https://images.pexels.com/photos/34479850/pexels-photo-34479850.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Premium",
        duration: 20,
      },
      {
        id: "mehendi-3",
        name: "Mehendi Beats",
        vibe: "Musical",
        theme: "Contemporary",
        price: 999,
        image: "https://images.pexels.com/photos/33078530/pexels-photo-33078530.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Top Rated",
        duration: 19,
      },
    ],
  },
  sangeet: {
    title: "Sangeet",
    subtitle: "Dance night invitations with high-energy edits",
    heroImage: "https://images.pexels.com/photos/33078530/pexels-photo-33078530.jpeg?auto=compress&cs=tinysrgb&w=1600",
    products: [
      {
        id: "sangeet-1",
        name: "Dhol Beats Night",
        vibe: "Energetic",
        theme: "Party",
        price: 1199,
        image: "https://images.pexels.com/photos/33078530/pexels-photo-33078530.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Best Seller",
        duration: 21,
      },
      {
        id: "sangeet-2",
        name: "LED Stage Invite",
        vibe: "Cinematic",
        theme: "Contemporary",
        price: 1299,
        image: "https://images.pexels.com/photos/35706667/pexels-photo-35706667.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Premium",
        duration: 22,
      },
      {
        id: "sangeet-3",
        name: "Family Dance Poster",
        vibe: "Fun",
        theme: "Minimal",
        price: 1099,
        image: "https://images.pexels.com/photos/31595391/pexels-photo-31595391.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "New",
        duration: 19,
      },
    ],
  },
  wedding: {
    title: "Wedding",
    subtitle: "Main wedding functions with dedicated themed packs",
    heroImage: "https://images.pexels.com/photos/34479850/pexels-photo-34479850.jpeg?auto=compress&cs=tinysrgb&w=1600",
    weddingPacks: {
      baraat: [
        {
          id: "wed-bar-1",
          name: "Royal Baraat Procession",
          vibe: "Grand",
          theme: "Royal",
          price: 1399,
          image: "https://images.pexels.com/photos/34479850/pexels-photo-34479850.jpeg?auto=compress&cs=tinysrgb&w=1400",
          badge: "Premium",
          duration: 22,
        },
        {
          id: "wed-bar-2",
          name: "Band Baaja Entry",
          vibe: "Festive",
          theme: "Classic",
          price: 1299,
          image: "https://images.pexels.com/photos/35706667/pexels-photo-35706667.jpeg?auto=compress&cs=tinysrgb&w=1400",
          badge: "Best Seller",
          duration: 21,
        },
        {
          id: "wed-bar-3",
          name: "Groom Arrival Reel",
          vibe: "Cinematic",
          theme: "Contemporary",
          price: 1499,
          image: "https://images.pexels.com/photos/31595391/pexels-photo-31595391.jpeg?auto=compress&cs=tinysrgb&w=1400",
          badge: "Top Rated",
          duration: 24,
        },
      ],
      pheras: [
        {
          id: "wed-phe-1",
          name: "Sacred Pheras Story",
          vibe: "Traditional",
          theme: "Classic",
          price: 1399,
          image: "https://images.pexels.com/photos/34479850/pexels-photo-34479850.jpeg?auto=compress&cs=tinysrgb&w=1400",
          badge: "Best Seller",
          duration: 22,
        },
        {
          id: "wed-phe-2",
          name: "Mandap Vows",
          vibe: "Elegant",
          theme: "Floral",
          price: 1499,
          image: "https://images.pexels.com/photos/29984888/pexels-photo-29984888.jpeg?auto=compress&cs=tinysrgb&w=1400",
          badge: "Premium",
          duration: 23,
        },
        {
          id: "wed-phe-3",
          name: "Agni Ceremony",
          vibe: "Classic",
          theme: "Royal",
          price: 1599,
          image: "https://images.pexels.com/photos/35706667/pexels-photo-35706667.jpeg?auto=compress&cs=tinysrgb&w=1400",
          badge: "Top Rated",
          duration: 25,
        },
      ],
      vidaai: [
        {
          id: "wed-vid-1",
          name: "Vidaai Blessings",
          vibe: "Emotional",
          theme: "Classic",
          price: 1299,
          image: "https://images.pexels.com/photos/31595391/pexels-photo-31595391.jpeg?auto=compress&cs=tinysrgb&w=1400",
          badge: "Heartfelt",
          duration: 20,
        },
        {
          id: "wed-vid-2",
          name: "Family Farewell",
          vibe: "Warm",
          theme: "Minimal",
          price: 1199,
          image: "https://images.pexels.com/photos/34479850/pexels-photo-34479850.jpeg?auto=compress&cs=tinysrgb&w=1400",
          badge: "Popular",
          duration: 19,
        },
        {
          id: "wed-vid-3",
          name: "Bridal Sendoff",
          vibe: "Cinematic",
          theme: "Contemporary",
          price: 1399,
          image: "https://images.pexels.com/photos/35706667/pexels-photo-35706667.jpeg?auto=compress&cs=tinysrgb&w=1400",
          badge: "Premium",
          duration: 22,
        },
      ],
      cocktail: [
        {
          id: "wed-coc-1",
          name: "Cocktail Night Luxe",
          vibe: "Party",
          theme: "Contemporary",
          price: 1299,
          image: "https://images.pexels.com/photos/33078530/pexels-photo-33078530.jpeg?auto=compress&cs=tinysrgb&w=1400",
          badge: "Trending",
          duration: 21,
        },
        {
          id: "wed-coc-2",
          name: "Sundowner Celebration",
          vibe: "Chic",
          theme: "Minimal",
          price: 1199,
          image: "https://images.pexels.com/photos/35706667/pexels-photo-35706667.jpeg?auto=compress&cs=tinysrgb&w=1400",
          badge: "New",
          duration: 20,
        },
        {
          id: "wed-coc-3",
          name: "Dance and Toast",
          vibe: "Energetic",
          theme: "Party",
          price: 1399,
          image: "https://images.pexels.com/photos/33078530/pexels-photo-33078530.jpeg?auto=compress&cs=tinysrgb&w=1400",
          badge: "Best Seller",
          duration: 22,
        },
      ],
      reception: [
        {
          id: "wed-rec-1",
          name: "Post-Wedding Reception",
          vibe: "Formal",
          theme: "Royal",
          price: 1399,
          image: "https://images.pexels.com/photos/35706667/pexels-photo-35706667.jpeg?auto=compress&cs=tinysrgb&w=1400",
          badge: "Premium",
          duration: 22,
        },
        {
          id: "wed-rec-2",
          name: "Newlywed Evening",
          vibe: "Luxury",
          theme: "Classic",
          price: 1299,
          image: "https://images.pexels.com/photos/34479850/pexels-photo-34479850.jpeg?auto=compress&cs=tinysrgb&w=1400",
          badge: "Top Rated",
          duration: 21,
        },
        {
          id: "wed-rec-3",
          name: "Grand Couple Entry",
          vibe: "Cinematic",
          theme: "Contemporary",
          price: 1499,
          image: "https://images.pexels.com/photos/31595391/pexels-photo-31595391.jpeg?auto=compress&cs=tinysrgb&w=1400",
          badge: "Trending",
          duration: 24,
        },
      ],
    },
  },
  reception: {
    title: "Reception",
    subtitle: "Formal evening invites and couple entry reveals",
    heroImage: "https://images.pexels.com/photos/35706667/pexels-photo-35706667.jpeg?auto=compress&cs=tinysrgb&w=1600",
    products: [
      {
        id: "rec-1",
        name: "Aashirwad Evening",
        vibe: "Formal",
        theme: "Classic",
        price: 1099,
        image: "https://images.pexels.com/photos/35706667/pexels-photo-35706667.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Popular",
        duration: 20,
      },
      {
        id: "rec-2",
        name: "Walima Lights",
        vibe: "Luxury",
        theme: "Royal",
        price: 1299,
        image: "https://images.pexels.com/photos/34479850/pexels-photo-34479850.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Premium",
        duration: 22,
      },
      {
        id: "rec-3",
        name: "Grand Reception",
        vibe: "Cinematic",
        theme: "Contemporary",
        price: 1199,
        image: "https://images.pexels.com/photos/31595391/pexels-photo-31595391.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Best Seller",
        duration: 21,
      },
    ],
  },
  baby: {
    title: "Baby Shower",
    subtitle: "Godh Bharai invites with warm family celebration themes",
    heroImage: "https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=1600",
    products: [
      {
        id: "baby-1",
        name: "Godh Bharai Bloom",
        vibe: "Traditional",
        theme: "Floral",
        price: 849,
        image: "https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Best Seller",
        duration: 17,
      },
      {
        id: "baby-2",
        name: "Little Star Blessings",
        vibe: "Soft",
        theme: "Minimal",
        price: 899,
        image: "https://images.pexels.com/photos/3735612/pexels-photo-3735612.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "New",
        duration: 16,
      },
      {
        id: "baby-3",
        name: "Family Celebration",
        vibe: "Warm",
        theme: "Classic",
        price: 999,
        image: "https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=1400",
        badge: "Premium",
        duration: 19,
      },
    ],
  },
};

const weddingPackLabel = {
  baraat: "Baraat",
  pheras: "Pheras",
  vidaai: "Vidaai",
  cocktail: "Cocktail",
  reception: "Post-Wedding Reception",
} as const;

type WeddingPackKey = keyof typeof weddingPackLabel;

function TemplatesContent() {
  const router = useRouter();
  const params = useSearchParams();
  const category = params?.get("category") || "wedding";
  const active = categoryMeta[category] ?? categoryMeta.wedding;

  const [weddingPack, setWeddingPack] = useState<WeddingPackKey>("baraat");
  const [themeFilter, setThemeFilter] = useState<string>("All");

  const packProducts = useMemo(() => {
    if (category !== "wedding") return active.products ?? [];
    return active.weddingPacks?.[weddingPack] ?? [];
  }, [active, category, weddingPack]);

  const themes = useMemo(() => {
    return ["All", ...Array.from(new Set(packProducts.map((p) => p.theme)))];
  }, [packProducts]);

  const filteredProducts = useMemo(() => {
    if (themeFilter === "All") return packProducts;
    return packProducts.filter((p) => p.theme === themeFilter);
  }, [packProducts, themeFilter]);

  function selectTemplate(product: InviteProduct) {
    sessionStorage.setItem(
      "selectedTemplate",
      JSON.stringify({
        id: product.id,
        category,
        subEvent: category === "wedding" ? weddingPackLabel[weddingPack] : undefined,
        templateName: product.name,
        theme: product.theme,
        price: product.price,
        previewImage: product.image,
        vibe: product.vibe,
        duration: product.duration,
      }),
    );
    router.push("/loading");
  }

  return (
    <div className="bg-neutral min-h-screen px-5 pb-16 pt-30 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="premium-surface overflow-hidden rounded-3xl p-4 sm:p-6"
        >
          <div className="relative h-64 w-full overflow-hidden rounded-2xl">
            <Image src={active.heroImage} alt={active.title} fill className="object-cover" sizes="100vw" priority />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-4xl text-[#3f2a22]">{active.title} Invite Products</h2>
              <p className="mt-2 text-zinc-700">{active.subtitle}</p>
            </div>
            <span className="event-pill rounded-full px-4 py-2 text-sm font-semibold text-zinc-700">{filteredProducts.length} Options</span>
          </div>

          {category === "wedding" && (
            <div className="mt-5 flex flex-wrap gap-2">
              {(Object.keys(weddingPackLabel) as WeddingPackKey[]).map((pack) => (
                <button
                  key={pack}
                  type="button"
                  onClick={() => {
                    setWeddingPack(pack);
                    setThemeFilter("All");
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    weddingPack === pack
                      ? "bg-accent text-white shadow-xl-plus"
                      : "border border-amber-200 bg-white/80 text-zinc-700 hover:bg-white"
                  }`}
                >
                  {weddingPackLabel[pack]}
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {themes.map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => setThemeFilter(theme)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${
                  themeFilter === theme
                    ? "bg-zinc-900 text-white"
                    : "border border-zinc-200 bg-white/80 text-zinc-600 hover:bg-white"
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </motion.section>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product, idx) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: idx * 0.03 }}
              whileHover={{ y: -10 }}
              className="premium-surface rise-up overflow-hidden rounded-2xl"
            >
              <div className="relative">
                <div className="relative h-56 w-full">
                  <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                </div>
                <span className="event-pill absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-zinc-700">
                  {product.badge}
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                  {product.theme}
                </span>
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{product.vibe}</p>
                <h3 className="mt-2 text-3xl leading-tight text-[#3f2a22]">{product.name}</h3>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-amber-100 bg-white/80 px-3 py-2">
                  <div>
                    <p className="text-xs text-zinc-500">Timeline Duration</p>
                    <p className="text-sm font-semibold text-zinc-700">{product.duration}s</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500">Price</p>
                    <p className="text-lg font-bold text-[#7c2d12]">INR {product.price}</p>
                  </div>
                </div>

                <button
                  onClick={() => selectTemplate(product)}
                  className="mt-4 w-full rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-xl-plus hover:brightness-110"
                >
                  Select Product
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<div className="bg-neutral min-h-screen" />}>
      <TemplatesContent />
    </Suspense>
  );
}
