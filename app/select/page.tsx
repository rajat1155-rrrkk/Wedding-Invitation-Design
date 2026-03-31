"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Category = {
  key: string;
  label: string;
  sub: string;
  image: string;
  themes: number;
  fromPrice: number;
};

const categories: Category[] = [
  {
    key: "roka",
    label: "Roka",
    sub: "Pre-Engagement Ceremony",
    image: "https://images.pexels.com/photos/35706667/pexels-photo-35706667.jpeg?auto=compress&cs=tinysrgb&w=1400",
    themes: 4,
    fromPrice: 899,
  },
  {
    key: "engagement",
    label: "Engagement",
    sub: "Ring Ceremony",
    image: "https://images.pexels.com/photos/31595391/pexels-photo-31595391.jpeg?auto=compress&cs=tinysrgb&w=1400",
    themes: 5,
    fromPrice: 999,
  },
  {
    key: "haldi",
    label: "Haldi",
    sub: "Haldi Function",
    image: "https://images.pexels.com/photos/30672338/pexels-photo-30672338.jpeg?auto=compress&cs=tinysrgb&w=1400",
    themes: 4,
    fromPrice: 799,
  },
  {
    key: "mehendi",
    label: "Mehendi",
    sub: "Henna Celebration",
    image: "https://images.pexels.com/photos/29984888/pexels-photo-29984888.jpeg?auto=compress&cs=tinysrgb&w=1400",
    themes: 6,
    fromPrice: 899,
  },
  {
    key: "sangeet",
    label: "Sangeet",
    sub: "Music and Dance Night",
    image: "https://images.pexels.com/photos/33078530/pexels-photo-33078530.jpeg?auto=compress&cs=tinysrgb&w=1400",
    themes: 5,
    fromPrice: 1099,
  },
  {
    key: "wedding",
    label: "Wedding",
    sub: "Shaadi / Nikah",
    image: "https://images.pexels.com/photos/34479850/pexels-photo-34479850.jpeg?auto=compress&cs=tinysrgb&w=1400",
    themes: 8,
    fromPrice: 1299,
  },
  {
    key: "reception",
    label: "Reception",
    sub: "Aashirwad / Walima",
    image: "https://images.pexels.com/photos/35706667/pexels-photo-35706667.jpeg?auto=compress&cs=tinysrgb&w=1400",
    themes: 4,
    fromPrice: 999,
  },
  {
    key: "baby",
    label: "Baby Shower",
    sub: "Godh Bharai",
    image: "https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=1400",
    themes: 5,
    fromPrice: 849,
  },
];

export default function SelectPage() {
  const router = useRouter();

  return (
    <div className="bg-neutral min-h-screen px-5 pb-16 pt-30 sm:px-8">
      <div className="mx-auto max-w-7xl section-glow">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center text-5xl text-[#3f2a22]"
        >
          Step 2: Choose Occasion Category
        </motion.h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-zinc-700">
          Each category includes multiple invite themes and product-style options with pricing, ready for AI generation and editing.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((c, idx) => (
            <motion.button
              key={c.key}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: idx * 0.04 }}
              whileHover={{ y: -10 }}
              onClick={() => router.push(`/templates?category=${c.key}`)}
              className="premium-surface group overflow-hidden rounded-2xl text-left"
            >
              <div className="relative">
                <div className="relative h-52 w-full">
                  <Image src={c.image} alt={c.label} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <span className="event-pill absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-zinc-700">
                  {c.themes} Themes
                </span>
                <span className="price-shimmer absolute bottom-3 right-3 rounded-full px-3 py-1 text-xs font-semibold text-white">
                  From INR {c.fromPrice}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-2xl text-[#3f2a22]">{c.label}</h3>
                <p className="mt-1 text-sm text-zinc-600">{c.sub}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
