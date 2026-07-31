'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Star, Leaf, Clock, Flame } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#050505]">
      {/* 1. Base dark vignette around the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none z-0 opacity-90" />

      {/* 2. Soft, luxurious brand red glow behind the main text & image */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4D57] rounded-full blur-[150px] opacity-[0.07] pointer-events-none z-0" />

      {/* 3. Subtle noise texture for a premium matte finish */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=1920&q=80")' }} 
      />

      <div className="max-w-[1400px] mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN - TYPOGRAPHY & CTA */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-12 lg:pt-0">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-[1px] w-8 lg:w-12 bg-gradient-to-r from-transparent to-[#FF4D57]" />
            <span className="font-jakarta text-[11px] lg:text-xs font-bold uppercase tracking-[0.3em] text-[#FF4D57]">
              Michelin Star Quality
            </span>
            <div className="h-[1px] w-8 lg:w-12 bg-gradient-to-l from-transparent to-[#FF4D57]" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2 mb-8 leading-[1.05]"
          >
            <span className="font-playfair text-[55px] sm:text-[70px] lg:text-[85px] xl:text-[95px] font-bold text-white tracking-tight">
              It&apos;s not just
            </span>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6 mt-[-10px]">
              <span className="font-playfair text-[55px] sm:text-[70px] lg:text-[85px] xl:text-[95px] italic text-[#e5e5e5] tracking-tight">
                Food,
              </span>
              <span className="font-playfair text-[55px] sm:text-[70px] lg:text-[85px] xl:text-[95px] italic font-bold text-[#FF4D57] tracking-tight pr-4">
                It&apos;s an
              </span>
            </div>
            <span className="font-playfair text-[55px] sm:text-[70px] lg:text-[85px] xl:text-[95px] italic font-bold text-[#FF4D57] tracking-tight mt-[-10px]">
              Experience.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-jakarta text-white/60 text-[15px] lg:text-[17px] leading-[1.8] max-w-[480px] font-light mb-10"
          >
            Elevating healthy dining into a luxurious art form. Savor our meticulously crafted, organic high-protein meals designed to nourish both body and soul.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
          >
            <a
               href="#menu"
               className="w-full sm:w-auto bg-[#FF4D57] text-white px-10 py-4 lg:py-5 rounded-full text-[13px] lg:text-[14px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#ff333f] hover:shadow-[0_10px_30px_rgba(255,77,87,0.3)] hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-3"
               >            
               Explore Menu
             
               <svg
                 width="16"
                 height="16"
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke="currentColor"
                 strokeWidth="2.5"
                 strokeLinecap="round"
                 strokeLinejoin="round"
               >
                 <path d="M5 12h14" />
                 <path d="m12 5 7 7-7 7" />
               </svg>
              </a>
          </motion.div>

          {/* Review Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 mt-12"
          >
            <div className="flex -space-x-4 relative">
              {[
                '1534528741775-53994a69daeb',
                '1506794778202-cad84cf45f1d',
                '1494790108377-be9c29b29330'
              ].map((id, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-[#0a0a0a] overflow-hidden relative shadow-lg">
                  <Image
                    src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=150&q=80`}
                    alt="Customer"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-[#0a0a0a] bg-[#FF4D57] flex items-center justify-center text-[13px] font-bold text-white relative z-10 shadow-lg">
                4k+
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5 text-left">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FF4D57] text-[#FF4D57]" />
                ))}
              </div>
              <p className="text-[13px] font-jakarta text-white/60 font-medium">
                Over 2k+ happy customers
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - IMAGE & STATS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:h-full flex flex-col items-center justify-center lg:justify-end mt-16 lg:mt-0 z-10 w-full"
        >
          {/* Main Food Image Container (Matte Black Plate effect) */}
          <div className="relative w-full max-w-[450px] sm:max-w-[550px] lg:max-w-[650px] aspect-square flex items-center justify-center">
            
            <motion.div
              animate={{ y: [-8, 8, -8], rotate: [0, 2, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[80%] h-[80%] group"
            >
              {/* Premium Matte Black Plate (Simulated with div) */}
              <div className="absolute inset-[-10%] bg-gradient-to-br from-[#1c1c1c] to-[#050505] rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_2px_10px_rgba(255,255,255,0.05)] border border-white/[0.02]" />
              
              {/* Soft shadow underneath the bowl */}
              <div className="absolute inset-[5%] bg-black/80 rounded-full blur-2xl translate-y-6 scale-90 pointer-events-none" />
              
              {/* Inner Plate rim */}
              <div className="absolute inset-[-5%] bg-gradient-to-tl from-[#121212] to-[#1a1a1a] rounded-full shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)] border border-black/50" />
              
              {/* The Food Image */}
              <Image
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=100"
                alt="Premium Healthy Food"
                fill
                className="object-cover rounded-full transition-transform duration-700 ease-out group-hover:scale-[1.03] scale-[0.9]"
                referrerPolicy="no-referrer"
                priority
              />
            </motion.div>
            
            {/* Elegant Floating Elements (Basil & Particles) */}
            <motion.div 
              animate={{ y: [-15, 15, -15], rotate: [0, 30, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="absolute top-[15%] left-[5%] w-16 h-16 rounded-full overflow-hidden shadow-2xl z-20 pointer-events-none opacity-90 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
            >
              <Image src="https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=200&q=80" alt="basil leaf" fill className="object-cover scale-[1.8] translate-y-2" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [15, -15, 15], rotate: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="absolute bottom-[25%] left-0 w-12 h-12 rounded-full overflow-hidden shadow-2xl z-20 pointer-events-none blur-[1px] opacity-80 drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]"
            >
              <Image src="https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=200&q=80" alt="basil leaf" fill className="object-cover scale-[1.8]" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [-10, 10, -10], rotate: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              className="absolute top-[40%] -right-[5%] w-14 h-14 rounded-full overflow-hidden shadow-2xl z-20 pointer-events-none opacity-90 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
            >
              <Image src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80" alt="cherry tomato" fill className="object-cover scale-[1.4]" />
            </motion.div>
          </div>

          {/* Stats Horizontal Bar (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 lg:absolute lg:bottom-[5%] lg:right-[5%] xl:right-0 bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/10 rounded-full px-8 py-5 flex items-center gap-8 sm:gap-12 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Stat 1 */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-[#FF4D57]">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-playfair font-bold text-white text-[15px] leading-tight">30 Mins</span>
                <span className="font-jakarta text-[11px] text-white/50 uppercase tracking-widest font-medium">Delivery</span>
              </div>
            </div>
            
            {/* Divider */}
            <div className="w-[1px] h-8 bg-white/10" />
            
            {/* Stat 2 */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-[#4ade80]">
                <Leaf className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-playfair font-bold text-white text-[15px] leading-tight">100%</span>
                <span className="font-jakarta text-[11px] text-white/50 uppercase tracking-widest font-medium">Organic</span>
              </div>
            </div>
            
            {/* Divider */}
            <div className="hidden sm:block w-[1px] h-8 bg-white/10" />
            
            {/* Stat 3 */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-[#fb923c]">
                <Flame className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-playfair font-bold text-white text-[15px] leading-tight">500+</span>
                <span className="font-jakarta text-[11px] text-white/50 uppercase tracking-widest font-medium">Healthy Menu</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
