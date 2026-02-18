"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const GRID_IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80",
  "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=80",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=80",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&q=80",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&q=80",
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
      <div className="container mx-auto px-6">
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 max-w-6xl mx-auto"
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
