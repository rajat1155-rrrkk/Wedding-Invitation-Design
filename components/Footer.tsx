import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-amber-100 bg-white/70 py-8 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 sm:grid-cols-3 sm:px-8">
        <div>
          <p className="brand-name">Indian Invite Studio</p>
          <p className="mt-2 text-sm text-zinc-600">
            Premium Indian invitation pages with themed templates, pricing, and a timeline editor.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-700">
            <Link href="/select" className="hover:text-zinc-900">Occasion Categories</Link>
            <Link href="/templates?category=wedding" className="hover:text-zinc-900">Wedding Product Packs</Link>
            <Link href="/editor" className="hover:text-zinc-900">Timeline Editor</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">Studio Promise</p>
          <p className="mt-3 text-sm text-zinc-600">Commercial-use friendly visuals, premium layouts, and fast 3-step invite creation.</p>
          <p className="mt-4 text-xs text-zinc-500">© {new Date().getFullYear()} Indian Invite Studio</p>
        </div>
      </div>
    </footer>
  );
}
