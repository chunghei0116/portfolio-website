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
        className="w-full max-w-7xl bg-white/70 border border-black/5 rounded-3xl shadow-xl p-5 sm:p-8 md:p-16 flex flex-col items-center text-center gap-8 backdrop-blur-md"
      >
        <h2 className="font-sans font-punchy text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase leading-[0.95] text-neutral-900">
          LET&apos;S WORK TOGETHER.
        </h2>

        <p className="max-w-2xl font-mono text-xs md:text-sm text-neutral-500 uppercase tracking-wider leading-relaxed">
          Have a cool project or want to collaborate on an interactive site? Drop an email and connect now.
        </p>

        <a
          href="mailto:chungheibrad@gmail.com"
          className="bg-accent-blue text-white border border-black/5 px-10 py-5 font-mono text-[0.75rem] font-bold uppercase transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.35)] rounded-full active:translate-y-[-1px] active:scale-[0.98]"
        >
          SEND HELLO
        </a>
      </motion.div>
    </section>
  );
}
