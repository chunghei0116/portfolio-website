"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface NavItem {
  name: string;
  path: string;
  isAnchor?: boolean;
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/#projects", isAnchor: true },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/#contact", isAnchor: true },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.isAnchor) return false;
    return pathname === item.path;
  };

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50" aria-label="Main navigation">
      <div className="flex items-center gap-1.5 p-1.5 bg-white/70 backdrop-blur-md border border-black/[0.06] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.path}
              href={item.path}
              scroll={!item.isAnchor}
              className={`relative px-5 py-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-300 rounded-full ${
                active ? "text-white" : "text-black/45 hover:text-black/80"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-neutral-900 rounded-full -z-10"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
