"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-transparent px-6 py-32 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-16"
      >
        <h2 className="punchy-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] leading-[0.85]">
          LET&apos;S BUILD <br />
          SOMETHING <br />
          <span className="text-black/10 transition-colors duration-700 hover:text-[#2E5BFF]/20">EXTRAORDINARY.</span>
        </h2>

        <motion.div
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative group mt-4"
        >
          {/* Main CTA Link */}
          <a
            href="mailto:hello@example.com"
            className="relative z-10 block rounded-full bg-black px-12 py-6 text-xl font-bold tracking-[0.2em] text-white uppercase transition-all duration-500 hover:bg-[#2E5BFF] hover:scale-105 hover:shadow-[0_0_60px_rgba(46,91,255,0.5)] active:scale-95 md:text-2xl lg:px-20 lg:py-10"
          >
            Get In Touch
          </a>
          
          {/* Animated Background Glow */}
          <div className="absolute inset-0 -z-10 rounded-full bg-[#2E5BFF] blur-[80px] opacity-10 transition-all duration-700 group-hover:opacity-40 group-hover:blur-[100px]" />
        </motion.div>
      </motion.div>
      
      {/* Decorative background element */}
      <div className="absolute bottom-0 left-1/2 -z-20 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
    </section>
  );
}
