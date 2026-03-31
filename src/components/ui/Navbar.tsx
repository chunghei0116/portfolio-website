"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 p-1.5 rounded-[2.5rem] border border-zinc-950/10 bg-zinc-950/5 backdrop-blur-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`relative px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                isActive ? "text-black" : "text-black/40 hover:text-black/60"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-white/40 rounded-[2rem] -z-10 shadow-sm backdrop-blur-md"
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30,
                    mass: 0.8
                  }}
                />
              )}
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
