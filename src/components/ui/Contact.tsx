"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative flex w-full flex-col items-center justify-center px-6 py-24 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl parchment-card shield-border p-5 sm:p-8 md:p-16 flex flex-col items-center text-center gap-8"
      >
        {/* Decorative top */}
        <div className="flex items-center gap-4 text-accent-gold/40 text-2xl">
          <span>✦</span>
          <span className="text-3xl">⚔</span>
          <span>✦</span>
        </div>

        <h2 className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.95] text-accent-gold fire-glow">
          Join the Quest
        </h2>

        <p className="max-w-2xl font-mono text-xs md:text-sm text-muted-foreground uppercase tracking-wider leading-relaxed">
          Have a grand project or wish to forge an alliance? Send a raven and connect now.
        </p>

        <a
          href="mailto:chungheibrad@gmail.com"
          className="medieval-btn text-lg px-12 py-5"
        >
          ✉ Send a Raven
        </a>

        {/* Decorative bottom */}
        <div className="flex items-center gap-3 text-accent-gold/30 text-xs font-serif tracking-[0.3em]">
          <span>—</span>
          <span>🏰</span>
          <span>—</span>
        </div>
      </motion.div>
    </section>
  );
}
