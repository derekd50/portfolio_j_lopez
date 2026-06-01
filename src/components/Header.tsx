import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-950/95 backdrop-blur border-b border-slate-800 text-slate-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-3 text-sm font-semibold text-slate-100">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm">
              JL
            </span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link href="#portfolio" className="hover:text-slate-100 transition-colors">
              Works
            </Link>
            <Link href="#contact" className="hover:text-slate-100 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
