"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import businessImage from "@/assets/images/starpowder_Shot_on_Canon_R5_200mm_telephoto_lens_f4_cool_neut_3e02ec75-606e-4518-9088-c1cdb431f690_2.png";
import ubLifeImage from "@/assets/images/starpowder_Shot_on_Sony_A7R_V_85mm_lens_f1.8_warm_muted_color_d8e61034-8ba4-483c-bf46-1c02c7773d7b_1.png";
import recruitImage from "@/assets/images/starpowder_Shot_on_Canon_R5_200mm_telephoto_lens_f4_cool_neut_8c3457eb-b32e-40b8-864d-9614ea76de12_1.png";

const policies = [
  {
    id: "ub-life",
    title: "UB Life",
    description: "도전! 변화! 상호 존중!으로 뭉친 유비인의 생활 (HEALTHY LIFE)",
    imageUrl: ubLifeImage.src,
    href: "#",
  },
  {
    id: "business",
    title: "Business",
    description: "의료정보와 ICT의 융합을 통해 디지털 헬스케어 솔루션의 미래를 만들어 갑니다.",
    imageUrl: businessImage.src,
    href: "#",
  },
  {
    id: "recruit",
    title: "Recruit",
    description: "열정과 꿈을 펼칠 기회! 유비케어에서 도전하세요",
    imageUrl: recruitImage.src,
    href: "#",
  },
];

export const CompanyPolicy: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0A0A0F] mb-4">
          건강을 잇는 기술로, 더 단단한 삶을
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          유비케어는 디지털 혁신으로 의료와 일상을 연결해 모든 이의 건강한 내일을 만들어갑니다.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {policies.map((item, idx) => (
            <motion.div
              className="min-w-0"
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
            >
              <Link
                href={item.href}
                className="group block bg-white overflow-hidden"
              >
                <div className="aspect-4/3 overflow-hidden rounded-2xl">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-[#0A0A0F] mb-2 group-hover:text-[#0055FF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-md leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
