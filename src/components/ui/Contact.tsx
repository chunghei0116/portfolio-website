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
        className="w-full max-w-7xl bg-neutral-900 text-white rounded-[2rem] border border-white/[0.04] shadow-2xl p-8 md:p-16 flex flex-col items-center text-center gap-8"
      >
        <h2 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase leading-[0.95] text-white">
          LET&apos;S WORK TOGETHER.
        </h2>

        <p className="max-w-2xl font-mono text-xs md:text-sm text-neutral-400 uppercase tracking-wider leading-relaxed">
          Have a cool project or want to collaborate on an interactive site? Drop an email and connect now.
        </p>

        <a
          href="mailto:chungheibrad@gmail.com"
          className="bg-selection-bg text-black hover:bg-white font-mono font-bold text-xs tracking-widest px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgba(230,253,80,0.15)] uppercase"
        >
          SEND HELLO
        </a>
      </motion.div>
    </section>
  );
}
