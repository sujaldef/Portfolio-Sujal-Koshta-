"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaperPlane,
  FaCheck,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaFileDownload,
} from "react-icons/fa";

const ClosingSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-[#2a0a10] px-6 lg:px-8 border-t border-[#C7B7A3]/10 flex items-center"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[350px] bg-[#561C24] rounded-full blur-[120px] opacity-20 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full relative z-10">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#C7B7A3] mb-5">
            (004) — Contact
          </span>

          <h2 className="text-4xl md:text-5xl font-medium text-[#E8D8C4] leading-tight mb-5">
            Let&apos;s start a <br />
            <span className="text-[#C7B7A3] opacity-60 italic">
              conversation.
            </span>
          </h2>

          <p className="text-sm md:text-base text-[#C7B7A3] font-light max-w-md leading-relaxed mb-8">
            Available for freelance projects and open to full-time opportunities.
          </p>

          <div className="space-y-6">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#C7B7A3] mb-2">
                Write
              </h4>
              <a
                href="mailto:hello@sujalkoshta.com"
                className="text-lg text-[#E8D8C4] border-b border-[#C7B7A3]/20 pb-1 hover:text-[#C7B7A3]"
              >
                hello@sujalkoshta.com
              </a>
            </div>

            <div className="flex gap-10">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#C7B7A3] mb-2">
                  Socials
                </h4>
                <div className="flex gap-4 text-[#E8D8C4]">
                  <FaLinkedin />
                  <FaGithub />
                  <FaInstagram />
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#C7B7A3] mb-2">
                  Resume
                </h4>
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 text-[#E8D8C4] hover:text-[#C7B7A3]"
                >
                  <FaFileDownload /> Download CV
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#E8D8C4]/5 border border-[#C7B7A3]/10 p-5 md:p-6 max-w-[460px] w-full"
        >
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#2a0a10] z-20 flex flex-col items-center justify-center text-center"
              >
                <div className="w-12 h-12 bg-[#561C24] rounded-full flex items-center justify-center mb-3">
                  <FaCheck />
                </div>
                <h3 className="text-xl mb-1">Message Sent</h3>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-xs underline opacity-60"
                >
                  Send another
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              required
              value={formState.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-[#C7B7A3]/30 py-2.5 text-sm text-[#E8D8C4] focus:outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              required
              value={formState.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-[#C7B7A3]/30 py-2.5 text-sm text-[#E8D8C4] focus:outline-none"
            />

            <textarea
              name="message"
              rows="3"
              placeholder="I'm looking to build…"
              required
              value={formState.message}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-[#C7B7A3]/30 py-2.5 text-sm text-[#E8D8C4] resize-none focus:outline-none"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-[#E8D8C4] text-[#2a0a10] py-3 text-sm font-semibold hover:bg-[#C7B7A3] transition flex items-center justify-center gap-2"
            >
              {status === "sending" ? "Sending…" : "Send Message"}
              <FaPaperPlane className="text-xs" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingSection;
