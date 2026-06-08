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
        className="w-full max-w-7xl bg-cyber-yellow brutalist-border brutalist-shadow p-8 md:p-16 flex flex-col items-center text-center gap-8"
      >
        <h2 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase leading-none">
          LET&apos;S WORK TOGETHER.
        </h2>

        <p className="max-w-2xl font-mono text-sm md:text-base text-black/80">
          HAVE A COOL PROJECT OR WANT TO COLLABORATE ON AN INTERACTIVE WEB SITE? DROP AN EMAIL AND CONNECT NOW.
        </p>

        <a
          href="mailto:chungheibrad@gmail.com"
          className="bg-black text-white hover:bg-white hover:text-black font-mono font-bold text-lg md:text-xl px-12 py-6 brutalist-border border-4 brutalist-press uppercase"
        >
          SEND HELLO
        </a>
      </motion.div>
    </section>
  );
}
