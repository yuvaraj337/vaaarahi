'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ArrowRight, CalendarDays } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Background Ambience Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80"
          alt="Restaurant Ambience"
          fill
          className="object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
      </div>

      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] sm:w-[600px] sm:h-[600px] bg-[#d91f27]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 sm:p-16 md:p-24 overflow-hidden text-center shadow-[0_30px_60px_rgba(0,0,0,0.5)] group"
        >
          {/* Subtle Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#d91f27]/0 to-transparent group-hover:from-[#d91f27]/5 transition-colors duration-700 pointer-events-none" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#d91f27] font-jakarta text-sm font-bold tracking-widest uppercase mb-6 flex items-center justify-center gap-3"
          >
            <span className="w-8 h-[2px] bg-[#d91f27]" />
            Experience Excellence
            <span className="w-8 h-[2px] bg-[#d91f27]" />
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-playfair text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto"
          >
            Reserve Your <br className="hidden sm:block" />
            <span className="font-light italic text-white/90">Table Today</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/60 font-jakarta text-lg sm:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Join us for an unforgettable dining experience where premium nutrition meets Michelin-star presentation.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10"
          >
            <button className="w-full sm:w-auto bg-[#d91f27] text-white px-10 py-5 rounded-full text-lg font-semibold transition-all hover:bg-[#b81820] hover:shadow-[0_15px_30px_rgba(217,31,39,0.3)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group">
              <CalendarDays className="w-5 h-5" />
              Book a Table
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all hover:bg-white/5 hover:border-white/40 active:scale-95">
              Order Online
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
