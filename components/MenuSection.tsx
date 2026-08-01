"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { categories, menuItems } from "@/data/menu";
import {
  ShoppingCart,
  Heart,
  Star,
  Flame,
  Leaf,
  Dumbbell,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/CartContext";


export default function MenuSection() {
  const { addToCart } = useCart();

  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredItems = menuItems.filter((item) =>
    activeCategory === "All"
      ? true
      : item.category === activeCategory
  );

  return (
    <section
  id="menu"
  className="scroll-mt-28 py-24 bg-[#0F0F10] border-t border-white/5 relative"
>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#E63946]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">

          <div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-5xl font-bold text-white mb-4"
            >
              The <span className="text-[#E63946]">Menu</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white/60 max-w-md"
            >
              Explore our premium healthy meals made with fresh,
              organic ingredients.
            </motion.p>

          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-wrap gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2 rounded-full transition",
                  activeCategory === cat
                    ? "bg-[#E63946] text-white"
                    : "bg-[#1a1a1a] text-white/60 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>

        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >

          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
  <motion.div
    key={item.id}
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className="relative bg-gradient-to-b from-[#1c1c1c] to-[#121212] rounded-[32px] p-3 group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.8)] border border-white/5 hover:border-white/10"
  >
    {/* Favorite Button */}
    <div className="absolute top-6 right-6 z-20">
      <button
  onClick={() => {
    if (favorites.includes(item.id)) {
      setFavorites(favorites.filter((id) => id !== item.id));
      toast.success("Removed from favourites");
    } else {
      setFavorites([...favorites, item.id]);
      toast.success("Added to favourites");
    }
  }}
  className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center transition-all duration-300"
>
  <Heart
    className={`w-4 h-4 transition-all ${
      favorites.includes(item.id)
        ? "fill-red-500 text-red-500"
        : "text-white/70"
    }`}
  />
</button>
    </div>

    {/* Veg Badge */}
    {item.isVegetarian && (
      <div className="absolute top-6 left-6 z-20">
        <div className="w-8 h-8 rounded-full bg-green-500/20 backdrop-blur-md flex items-center justify-center border border-green-500/30">
          <Leaf className="w-4 h-4 text-green-400" />
        </div>
      </div>
    )}

    {/* Food Image */}
    <div className="relative w-full aspect-square overflow-hidden rounded-[24px] mb-6">
      <Image
        src={item.image}
        alt={item.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />

      {/* Rating */}
      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl flex items-center gap-2">
        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
        <span className="text-white text-xs">
          {item.rating}
        </span>
      </div>
    </div>

    <div className="px-3 pb-2">

      <h3 className="font-playfair text-xl text-white font-bold mb-2">
        {item.name}
      </h3>

      <p className="text-white/50 text-sm mb-5">
        {item.desc}
      </p>

      {/* Nutrition */}
      <div className="flex gap-3 mb-6">

        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-xs text-white">
            {item.calories} kcal
          </span>
        </div>

        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1">
          <Dumbbell className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-white">
            {item.protein}
          </span>
        </div>

      </div>
            {/* Bottom */}
      <div className="flex items-center justify-between border-t border-white/10 pt-5">

        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider">
            Price
          </p>

          <h4 className="text-2xl font-bold text-white">
            ₹{item.price}
          </h4>
        </div>

        <button
          onClick={() =>
            addToCart({
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image,
            })
          }
          className="w-12 h-12 rounded-full bg-[#E63946] hover:bg-[#cf2430] transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95"
        >
          <ShoppingCart className="w-5 h-5 text-white" />
        </button>

      </div>

    </div>

  </motion.div>
))}

          </AnimatePresence>

        </motion.div>

      </div>

    </section>
  );
}