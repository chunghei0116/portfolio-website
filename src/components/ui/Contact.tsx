"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative flex w-full flex-col items-center justify-center px-6 py-24 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl renaissance-frame bg-card-bg parchment-shadow p-8 sm:p-12 md:p-20 flex flex-col items-center text-center gap-8"
      >
        <span className="text-sepia-mono border border-foreground/10 px-3 py-1 bg-foreground/[0.02]">
          CORRESPONDENCE
        </span>
        <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-accent-terracotta leading-none font-medium">
          Let us collaborate on new works.
        </h2>

        <p className="max-w-2xl font-serif text-sm md:text-base text-sepia-dim leading-relaxed">
          Have an automation study, complex systems task, or mobilenative craft? Write to me, and let us discuss the engineering codex.
        </p>

        <a
          href="mailto:chungheibrad@gmail.com"
          className="bg-accent-terracotta text-background px-10 py-4 font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 hover:bg-accent-gold hover:-translate-y-[2px] renaissance-hover-lift rounded-sm"
        >
          Send Hello
        </a>
      </motion.div>
    </section>
  );
}
