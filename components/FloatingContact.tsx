"use client";

import { Phone, MessageCircle, Bot } from "lucide-react";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">

      {/* AI Assistant */}
      <button
        className="group flex items-center gap-3 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 px-4 py-3 shadow-2xl hover:scale-105 hover:border-[#E63946] transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-[#E63946] flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>

        <span className="hidden md:block text-white font-medium">
          AI Assistant
        </span>
      </button>

      {/* WhatsApp */}
      <a
        href="https://wa.me/916302094687"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 px-4 py-3 shadow-2xl hover:scale-105 hover:border-green-500 transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>

        <span className="hidden md:block text-white font-medium">
          WhatsApp
        </span>
      </a>

      {/* Call */}
      <a
        href="tel:+916302094687"
        className="group flex items-center gap-3 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 px-4 py-3 shadow-2xl hover:scale-105 hover:border-[#E63946] transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-[#E63946] flex items-center justify-center">
          <Phone className="w-6 h-6 text-white" />
        </div>

        <span className="hidden md:block text-white font-medium">
          Call Now
        </span>
      </a>

    </div>
  );
}