'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Fitness Coach',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    quote: 'The best healthy food I have ever tasted. The protein shakes and salads are perfect for my post-workout meals. The quality is simply unmatched.',
  },
  {
    name: 'David Chen',
    role: 'Professional Athlete',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    quote: 'Varahi Eat & Fit has completely changed my diet. The food is not only nutritious but looks and tastes like a 5-star restaurant experience.',
  },
  {
    name: 'Emma Thompson',
    role: 'Nutritionist',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    quote: 'I recommend this place to all my clients. Clean ingredients, zero-oil cooking, and beautiful presentation. Absolutely flawless execution.',
  },
  {
    name: 'Michael Wong',
    role: 'Food Critic',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    quote: 'A revelation in healthy dining. Every dish is a masterpiece of flavors, elegantly presented without the guilt of processed ingredients.',
  },
  {
    name: 'Sophia Patel',
    role: 'Yoga Instructor',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    quote: 'The organic ingredients make such a difference. I feel energized and light after every meal here. Truly a sanctuary for mindful eating.',
  }
];

type CustomerReview = {
  id: string;
  name: string;
  image: string;
  rating: number;
  review: string;
  createdAt?: unknown;
};

export default function Testimonials() {
  const [customerReviews, setCustomerReviews] = useState<CustomerReview[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'customerReviews'),
      (snapshot) => {
        const reviews = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            name: String(data.name ?? 'Customer'),
            image: String(data.image ?? ''),
            rating: Math.max(1, Math.min(5, Number(data.rating ?? 5))),
            review: String(data.review ?? ''),
            createdAt: data.createdAt,
          };
        });

        // Newest reviews first when createdAt exists.
        reviews.sort((a, b) => {
          const aTime =
            typeof (a.createdAt as { toMillis?: () => number } | undefined)?.toMillis === 'function'
              ? (a.createdAt as { toMillis: () => number }).toMillis()
              : 0;

          const bTime =
            typeof (b.createdAt as { toMillis?: () => number } | undefined)?.toMillis === 'function'
              ? (b.createdAt as { toMillis: () => number }).toMillis()
              : 0;

          return bTime - aTime;
        });

        setCustomerReviews(reviews.filter((item) => item.review.trim()));
      },
      (error) => {
        console.error('Unable to load customer reviews:', error);
        setCustomerReviews([]);
      }
    );

    return () => unsubscribe();
  }, []);

  const liveReviewItems = customerReviews.map((review) => ({
    name: review.name,
    role: 'Customer',
    image: review.image,
    quote: review.review,
    rating: review.rating,
    isCustomerReview: true,
  }));

  const marqueeItems = [...testimonials, ...liveReviewItems, ...testimonials, ...liveReviewItems];

  return (
    <section className="py-32 bg-transparent relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#d91f27]/5 rounded-full blur-[150px] pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16">
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#d91f27] font-jakarta text-sm font-bold tracking-widest uppercase mb-4 flex items-center gap-3"
          >
            <span className="w-8 h-[2px] bg-[#d91f27]" />
            Testimonials
            <span className="w-8 h-[2px] bg-[#d91f27]" />
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            What Our <span className="font-light italic text-white/90">Guests Say</span>
          </motion.h2>
        </div>
      </div>

      <div className="relative w-full flex overflow-hidden z-10 py-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex gap-8 px-4 w-max hover:[animation-play-state:paused]"
        >
          {marqueeItems.map((test, index) => (
            <div
              key={index}
              className="w-[320px] sm:w-[420px] shrink-0 group relative bg-gradient-to-b from-[#1a1a1a]/80 to-[#121212]/80 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] hover:border-white/10 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] cursor-pointer"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#d91f27]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] pointer-events-none" />
              
              <Quote className="absolute top-8 right-8 w-12 h-12 text-white/[0.03] group-hover:text-[#d91f27]/20 transition-colors duration-500 transform group-hover:scale-110" />
              
              <div className="flex items-center gap-1 mb-8 relative z-10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      star <= (test.rating ?? 5)
                        ? "fill-[#d91f27] text-[#d91f27]"
                        : "text-white/20"
                    }`}
                  />
                ))}
              </div>
              
              <p className="font-jakarta text-white/70 text-base sm:text-lg leading-relaxed mb-10 relative z-10 font-light">
                &quot;{test.quote}&quot;
              </p>
              
              <div className="flex items-center gap-4 mt-auto relative z-10 pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
                <div className="w-14 h-14 rounded-full overflow-hidden relative border-2 border-white/10 group-hover:border-[#d91f27]/50 transition-colors shadow-lg">
                  {test.isCustomerReview ? (
                    test.image ? (
                      <img
                        src={test.image}
                        alt={test.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#d91f27] flex items-center justify-center text-white font-bold text-lg">
                        {test.name.charAt(0).toUpperCase()}
                      </div>
                    )
                  ) : (
                    <Image
                      src={test.image}
                      alt={test.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                <div>
                  <h4 className="font-playfair text-lg font-bold text-white group-hover:text-[#d91f27] transition-colors">{test.name}</h4>
                  <p className="font-jakarta text-xs sm:text-sm text-white/40 uppercase tracking-wider font-semibold mt-1">
                    {test.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}