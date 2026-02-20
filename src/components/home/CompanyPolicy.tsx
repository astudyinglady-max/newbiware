"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CARDS = [
  {
    title: "UB Life",
    description: "생활과 건강을 연결하는 플랫폼",
    href: "/platform/ub-life",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
  },
  {
    title: "Business",
    description: "의료·사업 인프라와 솔루션",
    href: "/business",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    title: "Recruit",
    description: "함께 성장할 인재를 찾습니다",
    href: "/recruit",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
  },
];

export function CompanyPolicy() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-slate-100/80">
      <div className="container max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={card.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 text-white">
                  <h3 className="text-lg sm:text-xl font-bold">{card.title}</h3>
                  <p className="text-white/90 text-xs sm:text-sm mt-1">{card.description}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    자세히 보기
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
