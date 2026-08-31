import React, { useState } from "react";
import { MessageSquare, X, Send, CheckCircle, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const FloatingContactCTA: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <div id="floating-contact-cta-container" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Quick Form Popup Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="quick-contact-panel"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="pointer-events-auto w-[330px] md:w-[360px] bg-white border border-brand-navy/5 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-brand-navy/5 pb-3">
              <div>
                <span className="font-display text-[9px] font-bold text-brand-blue uppercase tracking-widest">Connect Instantly</span>
                <h4 className="font-display text-sm font-bold text-brand-navy">Quick Consultation</h4>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSubmitted(false);
                }}
                className="w-8 h-8 rounded-full hover:bg-brand-navy/5 text-brand-gray hover:text-brand-navy flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-6 text-center gap-3"
              >
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-inner border border-emerald-500/10 mb-2">
                  <CheckCircle className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h5 className="font-display text-sm font-bold text-brand-navy">Message Received!</h5>
                <p className="font-sans text-xs text-brand-gray leading-relaxed max-w-xs px-2">
                  Thank you for reaching out. A Digeetech solutions engineer will analyze your request and follow up shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 font-display text-xs font-semibold text-brand-blue hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="quick-name" className="font-display text-[10px] font-bold text-brand-navy uppercase tracking-wider pl-1">
                    Your Name
                  </label>
                  <input
                    id="quick-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full font-sans text-xs border border-brand-navy/10 rounded-xl px-3 py-2.5 bg-brand-white/10 focus:outline-none focus:border-brand-blue text-brand-navy"
                    placeholder="Enter name"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="quick-email" className="font-display text-[10px] font-bold text-brand-navy uppercase tracking-wider pl-1">
                    Work Email
                  </label>
                  <input
                    id="quick-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full font-sans text-xs border border-brand-navy/10 rounded-xl px-3 py-2.5 bg-brand-white/10 focus:outline-none focus:border-brand-blue text-brand-navy"
                    placeholder="name@company.com"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="quick-msg" className="font-display text-[10px] font-bold text-brand-navy uppercase tracking-wider pl-1">
                    Project Details
                  </label>
                  <textarea
                    id="quick-msg"
                    required
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full font-sans text-xs border border-brand-navy/10 rounded-xl px-3 py-2.5 bg-brand-white/10 focus:outline-none focus:border-brand-blue text-brand-navy resize-none"
                    placeholder="Tell us what you're building..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 font-display text-xs font-bold bg-brand-blue hover:bg-[#0070a6] text-white rounded-xl py-3 shadow-md hover:shadow-brand-blue/10 transition-all cursor-pointer disabled:opacity-50 mt-1"
                >
                  {submitting ? "Sending..." : "Submit Inquiry"} <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        id="floating-cta-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto w-14 h-14 rounded-full bg-brand-blue hover:bg-[#0070a6] text-white flex items-center justify-center shadow-xl hover:shadow-brand-blue/30 transition-all cursor-pointer relative group"
        aria-label="Open quick contact form"
      >
        {/* Animated Badge Notification */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
        </span>

        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6 stroke-[2]" />
        )}

        {/* Hover Tooltip label */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-brand-navy text-white text-[10px] font-display font-semibold tracking-wider uppercase px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none border border-white/5">
          Consult Digeetech
        </span>
      </motion.button>

    </div>
  );
};
