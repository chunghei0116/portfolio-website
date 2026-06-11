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
        className="w-full max-w-7xl bg-moss-shadow text-white border-[4px] border-black rounded-none shadow-[8px_8px_0px_#000000] p-8 md:p-16 flex flex-col items-center text-center gap-8"
      >
        <h2 className="font-sans font-[950] text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase leading-[0.95] text-white">
          LET&apos;S WORK TOGETHER.
        </h2>

        <p className="max-w-2xl font-mono text-xs md:text-sm text-neutral-300 uppercase tracking-wider leading-relaxed">
          Have a cool project or want to collaborate on an interactive site? Drop an email and connect now.
        </p>

        <a
          href="mailto:chungheibrad@gmail.com"
          className="bg-accent-red text-white border-[3px] border-black px-10 py-5 font-mono text-[0.75rem] font-bold uppercase transition-all duration-100 shadow-[4px_4px_0px_#000000] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_#000000] rounded-none"
        >
          SEND HELLO
        </a>
      </motion.div>
    </section>
  );
}
