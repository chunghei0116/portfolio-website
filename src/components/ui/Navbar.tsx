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
      <div className="flex items-center gap-2 p-2 bg-white brutalist-border brutalist-shadow-sm">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.path}
              href={item.path}
              scroll={!item.isAnchor}
              className={`relative px-6 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-200 ${
                active ? "text-black" : "text-black/50 hover:text-black"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-cyber-yellow brutalist-border border-2 -z-10"
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
