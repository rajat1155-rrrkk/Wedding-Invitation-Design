import Link from "next/link";

const navLinks = [
  { href: "/login", label: "Start" },
  { href: "/select", label: "Occasions" },
  { href: "/templates?category=wedding", label: "Invites" },
  { href: "/editor", label: "Editor" },
];

export default function Header() {
  return (
    <header className="fixed top-0 z-40 w-full border-b border-amber-100/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="brand-mark">IS</span>
          <span className="brand-name">Indian Invite Studio</span>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-amber-100 bg-white/80 px-2 py-1 sm:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-amber-50 hover:text-zinc-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/select"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-xl-plus hover:brightness-110"
        >
          Build Invite
        </Link>
      </div>
    </header>
  );
}
