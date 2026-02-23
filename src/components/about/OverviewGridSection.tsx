"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// 헬스케어, 회사, 건강, AI, 병원 관련 이미지
const GRID_IMAGES = [
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80", // 의료/청진기
  "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&q=80", // 병원/의료진
  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&q=80", // AI/기술
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80", // AI/디지털
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80", // 회사/협업
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80", // 건강/웰니스
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80", // 건강식/라이프스타일
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const centerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

export function OverviewGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto max-w-[1600px]">
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {GRID_IMAGES.slice(0, 5).map((src, i) => (
            <motion.div
              key={`r1-${i}`}
              variants={itemVariants}
              className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          ))}
          {GRID_IMAGES.slice(5, 7).map((src, i) => (
            <motion.div
              key={`r2-${i}`}
              variants={itemVariants}
              className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          ))}
          <motion.div
            key="center"
            variants={centerVariants}
            className="aspect-square rounded-xl overflow-hidden shadow-lg col-span-1 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)",
            }}
          >
            <svg
              viewBox="0 0 120 120"
              className="w-3/4 h-3/4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path d="M30 90 L60 50 L90 60 L90 90 Z" fill="rgba(255,255,255,0.2)" />
              <path d="M60 50 L90 60 L90 30 L70 20 Z" fill="rgba(255,255,255,0.25)" />
              <path d="M50 60 L75 45 L95 75 L65 90 Z" fill="white" opacity="0.9" />
            </svg>
          </motion.div>
          {GRID_IMAGES.slice(7, 9).map((src, i) => (
            <motion.div
              key={`r2r-${i}`}
              variants={itemVariants}
              className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          ))}
          {GRID_IMAGES.slice(9, 14).map((src, i) => (
            <motion.div
              key={`r3-${i}`}
              variants={itemVariants}
              className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
