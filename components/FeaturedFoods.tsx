'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Leaf, Coffee, Utensils, Flame, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  {
    id: 1,
    name: 'Fresh Salads',
    desc: 'Organic & Crisp',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Protein Shakes',
    desc: 'Pre & Post Workout',
    icon: Coffee,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Power Bowls',
    desc: 'Nutrient Dense',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Hot Soups',
    desc: 'Warm & Comforting',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80',
  }
];

export default function FeaturedFoods() {
  const [hoveredId, setHoveredId] = useState<number | null>(1);

  return (
    <section className="py-24 bg-[#0a0a0a] relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-12 text-center sm:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Featured <span className="text-[#d91f27]">Categories</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 font-jakarta max-w-md mx-auto sm:mx-0"
          >
            Explore our thoughtfully curated selections designed for your healthy lifestyle.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            const isActive = hoveredId === cat.id;
            
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(1)} // Default back to first item on mobile/leave
                className={cn(
                  "relative rounded-[32px] p-2 transition-all duration-500 ease-out cursor-pointer overflow-hidden group",
                  isActive 
                    ? "bg-white/5 border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] -translate-y-2" 
                    : "bg-[#141414]/50 border-white/5 hover:border-white/10 shadow-lg"
                )}
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              >
                {/* Active glow */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-b from-[#d91f27]/10 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none",
                  isActive && "opacity-100"
                )} />

                {/* Image Container */}
                <div className="relative w-full h-56 md:h-64 rounded-[24px] overflow-hidden mb-6">
                  {/* Overlay gradient */}
                  <div className={cn(
                    "absolute inset-0 z-10 transition-all duration-500",
                    isActive ? "bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent opacity-90" : "bg-black/60 opacity-100"
                  )} />
                  
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-700 ease-out",
                      isActive ? "scale-110" : "scale-100"
                    )}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Icon */}
                  <div className={cn(
                    "absolute bottom-4 left-4 z-20 flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md transition-all duration-500",
                    isActive ? "bg-gradient-to-br from-[#d91f27] to-[#ba151c] border-white/20 text-white shadow-[0_0_20px_rgba(217,31,39,0.4)]" : "bg-white/10 border border-white/10 text-white/70"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="px-4 pb-6 relative z-20">
                  <h3 className={cn(
                    "font-playfair text-2xl font-bold mb-2 transition-colors duration-300",
                    isActive ? "text-white" : "text-white/80"
                  )}>
                    {cat.name}
                  </h3>
                  <p className="font-jakarta text-sm text-white/50 mb-6 font-light">
                    {cat.desc}
                  </p>
                  
                  <div className={cn(
                    "flex items-center gap-2 font-medium text-sm transition-all duration-300",
                    isActive ? "text-[#d91f27]" : "text-white/40"
                  )}>
                    Explore menu 
                    <ArrowRight className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      isActive ? "translate-x-1" : "translate-x-0"
                    )} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
