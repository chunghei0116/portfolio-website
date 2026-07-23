'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  MapPin,
  Mail,
  Sparkles,
  CheckCircle2,
  Stamp,
  Feather,
  RotateCcw,
  Wind,
  SendHorizontal,
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isWaxPressed, setIsWaxPressed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsWaxPressed(true);
    setIsSubmitting(true);

    // Simulate flight dispatch duration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1600);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(false);
    setIsWaxPressed(false);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 relative z-10 max-w-5xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#9B72AA]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#9B72AA]/15 text-[#9B72AA] border border-[#9B72AA]/30 mb-4"
        >
          <Feather className="w-3.5 h-3.5 text-[#9B72AA]" />
          <span>Air Mail Dispatch</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="ghibli-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4"
        >
          Send a Flying Message
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed"
        >
          Dispatch a letter to the Wandering Workshop. A spirit will deliver it shortly.
        </motion.p>
      </div>

      {/* Contact Info Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-3 mb-10 text-xs sm:text-sm"
      >
        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C2833]/80 border border-[#D4AF37]/40 text-[#FAF9F5] shadow-sm">
          <MapPin className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-medium">Wandering Castle, Cloud Realm</span>
        </div>

        {/* Direct Email Link */}
        <a
          href="mailto:jones.tse@example.com"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C2833]/80 border border-[#7EC8E3]/40 text-[#FAF9F5] hover:border-[#7EC8E3] hover:text-[#7EC8E3] transition-all shadow-sm"
        >
          <Mail className="w-4 h-4 text-[#7EC8E3]" />
          <span className="font-medium">jones.tse@example.com</span>
        </a>

        {/* Availability Status Indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C2833]/80 border border-[#88B04B]/40 text-[#FAF9F5] shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#88B04B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#88B04B]"></span>
          </span>
          <span className="font-medium text-[#88B04B]">Open for new endeavors &amp; collaborations</span>
        </div>
      </motion.div>

      {/* Main Wax-Sealed Parchment Envelope Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative max-w-2xl mx-auto"
      >
        <div className="ghibli-parchment ghibli-brass-card p-6 sm:p-10 relative overflow-hidden rounded-2xl shadow-2xl">
          {/* Brass Decorative Corner Accents */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none" />

          {/* Letterhead Header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#4A3525]/20">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#4A3525]/80 font-bold">
              <Stamp className="w-4 h-4 text-[#D4AF37]" />
              <span>Royal Dispatch • Parchment No. 804</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-[#4A3525]/60">
              <Wind className="w-3.5 h-3.5 text-[#9B72AA]" />
              <span>Cloud Postal Service</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              /* Success State */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-12 text-center flex flex-col items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6, type: 'spring' }}
                  className="w-16 h-16 rounded-full bg-[#9B72AA] border-2 border-[#D4AF37] flex items-center justify-center text-[#F7F9FA] mb-6 shadow-lg"
                >
                  <CheckCircle2 className="w-8 h-8 text-[#FAF9F5]" />
                </motion.div>

                <h3 className="ghibli-heading text-2xl font-bold text-[#4A3525] mb-3">
                  Message Dispatched!
                </h3>

                <p className="text-sm text-[#1C2833] max-w-md mx-auto leading-relaxed mb-8 bg-[#F7F9FA]/60 p-4 rounded-xl border border-[#4A3525]/15 font-medium">
                  Message dispatched on the wind! Thank you for reaching out. A messenger spirit is currently carrying your letter across the skies.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-[#F7F9FA] bg-[#4A3525] hover:bg-[#1C2833] transition-all shadow-md cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Send Another Letter</span>
                </button>
              </motion.div>
            ) : (
              /* Form State */
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 relative"
              >
                {/* Flying Airplane / Letter Animation Overlay on Submit */}
                {isSubmitting && (
                  <motion.div
                    initial={{ y: 0, x: 0, opacity: 1, scale: 1, rotate: 0 }}
                    animate={{
                      y: -280,
                      x: 180,
                      opacity: 0,
                      scale: 0.2,
                      rotate: -20,
                    }}
                    transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 flex flex-col items-center"
                  >
                    <div className="p-4 rounded-2xl bg-[#9B72AA] text-white shadow-2xl border-2 border-[#D4AF37] flex items-center justify-center animate-pulse">
                      <SendHorizontal className="w-10 h-10 text-white" />
                    </div>
                    <div className="mt-2 text-xs font-mono font-bold text-[#4A3525] bg-[#F7F9FA] px-3 py-1 rounded-full border border-[#D4AF37]">
                      Taking Flight...
                    </div>
                  </motion.div>
                )}

                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-semibold font-sans tracking-wide text-[#4A3525] uppercase flex items-center gap-1.5"
                  >
                    <span>Your Name / Realm</span>
                    <span className="text-[#9B72AA]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Howl Jenkins"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border-2 border-[#1C2833]/30 text-[#1C2833] placeholder-[#1C2833]/40 text-sm focus:border-[#9B72AA] focus:ring-2 focus:ring-[#9B72AA]/20 outline-none transition-all font-medium"
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-semibold font-sans tracking-wide text-[#4A3525] uppercase flex items-center gap-1.5"
                  >
                    <span>Your Magic Mail / Email</span>
                    <span className="text-[#9B72AA]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g., howl@wandering-castle.io"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border-2 border-[#1C2833]/30 text-[#1C2833] placeholder-[#1C2833]/40 text-sm focus:border-[#9B72AA] focus:ring-2 focus:ring-[#9B72AA]/20 outline-none transition-all font-medium"
                  />
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold font-sans tracking-wide text-[#4A3525] uppercase flex items-center gap-1.5"
                  >
                    <span>Your Message / Dispatch</span>
                    <span className="text-[#9B72AA]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project or magical quest..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F9FA] border-2 border-[#1C2833]/30 text-[#1C2833] placeholder-[#1C2833]/40 text-sm focus:border-[#9B72AA] focus:ring-2 focus:ring-[#9B72AA]/20 outline-none transition-all font-medium resize-none"
                  />
                </div>

                {/* Interactive Action Button (Wax Seal Press Button) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group w-full relative flex items-center justify-between p-2 pr-6 rounded-2xl bg-gradient-to-r from-[#9B72AA] to-[#8B5E99] text-[#F7F9FA] font-semibold text-sm border-2 border-[#D4AF37] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] cursor-pointer disabled:opacity-75 ${
                      isWaxPressed ? 'animate-wax-seal' : ''
                    }`}
                  >
                    {/* Wax Stamp Emblem */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#D4AF37] border-2 border-yellow-100/50 flex items-center justify-center text-[#4A3525] shadow-inner group-hover:rotate-12 transition-transform duration-300">
                        <Stamp className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-bold tracking-tight text-white">
                          {isSubmitting ? 'Pressing Wax & Launching...' : 'Press Wax Seal & Send'}
                        </span>
                        <span className="text-[11px] text-purple-100/80 font-normal">
                          Dispatches letter via spirit wind
                        </span>
                      </div>
                    </div>

                    {/* Paper Airplane Icon */}
                    <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                      <Send className="w-4 h-4 text-white" />
                    </div>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
