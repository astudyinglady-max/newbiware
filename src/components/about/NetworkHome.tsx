"use client";

import React from "react";
import { RegionSection } from "@/components/about/RegionSection";
import { MapPin, Info, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { MapSearchSection } from "@/components/about/MapSearchSection";
import mapAsset from "figma:asset/2252743076d6808b088b33d673488ae95839d717.png";

const NetworkHome: React.FC = () => {
  const regions = [
    {
      title: "서울 · 경기 · 인천 지역",
      agencies: [
        {
          name: "이안메드",
          areas: "서울(중부) · 고양 · 파주",
          phone: "1644-9491",
          types: ["clinic", "pharmacy"] as any,
        },
        {
          name: "세일메디넷",
          areas: "서울(북동) · 경기북부",
          phone: "1644-9541",
          types: ["clinic"] as any,
        },
        {
          name: "세일메디팜",
          areas: "서울(북동) · 경기북부",
          phone: "1644-9541",
          types: ["pharmacy"] as any,
        },
        {
          name: "비즈현메디칼",
          areas: "서울(남서) · 부천",
          phone: "1644-5491",
          types: ["clinic", "pharmacy"] as any,
        },
        {
          name: "본사직영",
          areas: "서울(강남) · 하남",
          phone: "1644-2969",
          types: ["clinic", "pharmacy"] as any,
        },
        {
          name: "대호메디케어",
          areas: "인천 · 시흥 · 김포 · 안양 · 안산",
          phone: "1644-7589",
          types: ["clinic"] as any,
        },
        {
          name: "대호메디팜",
          areas: "인천 · 시흥 · 김포 · 안양 · 안산",
          phone: "1644-7589",
          types: ["pharmacy"] as any,
        },
        {
          name: "에버넷",
          areas: "수원 · 경기이남",
          phone: "1644-6806",
          types: ["clinic", "pharmacy"] as any,
        },
        {
          name: "병원전문 파트너",
          areas: "서울 · 경기 · 인천 (병원 전문)",
          types: ["hospital"] as any,
          description:
            "헥톤씨앤씨, 세일헬스케어, 브레인HMT, 헥톤엠티에스(MTS), 헥톤아이앤씨",
        },
      ],
    },
    {
      title: "강원 · 충청 지역",
      agencies: [
        {
          name: "아이포커스",
          areas: "원주 · 강원(영서)",
          phone: "1644-4596",
          types: ["clinic", "pharmacy", "hospital"] as any,
        },
        {
          name: "메디케어",
          areas: "청주 · 충북 · 세종",
          phone: "1644-9516",
          types: ["clinic", "pharmacy"] as any,
        },
        {
          name: "메디네트",
          areas: "대전 · 충남 · 충북(영동·옥천)",
          phone: "1644-7795",
          types: ["clinic"] as any,
        },
        {
          name: "올데이팜",
          areas: "대전 · 충남 · 충북(영동·옥천)",
          phone: "1644-9636",
          types: ["pharmacy"] as any,
        },
        {
          name: "병원전문 파트너",
          areas: "대전 · 충청 (병원 전문)",
          types: ["hospital"] as any,
          description: "조은시스템, 헥톤케어",
        },
      ],
    },
    {
      title: "전라 · 제주 지역",
      agencies: [
        {
          name: "이오넷",
          areas: "전주 · 전북",
          phone: "1644-0646",
          types: ["clinic"] as any,
        },
        {
          name: "이오앤팜",
          areas: "전주 · 전북",
          phone: "1644-0646",
          types: ["pharmacy"] as any,
        },
        {
          name: "리드케어",
          areas: "광주 · 전남",
          phone: "1644-7959",
          types: ["clinic"] as any,
        },
        {
          name: "두리앤팜",
          areas: "광주 · 전남",
          phone: "1644-7959",
          types: ["pharmacy"] as any,
        },
        {
          name: "제주메디넷",
          areas: "제주도",
          phone: "1644-4647",
          types: ["clinic"] as any,
        },
        {
          name: "이소프트",
          areas: "제주도",
          phone: "064-724-7759",
          types: ["pharmacy"] as any,
        },
        {
          name: "병원전문 파트너",
          areas: "광주 · 전라 · 제주 (병원 전문)",
          types: ["hospital"] as any,
          description: "브레인소프트, 리드케어, 브레인HMT",
        },
      ],
    },
    {
      title: "경상 지역",
      agencies: [
        {
          name: "동원메디텍",
          areas: "포항 · 경주 · 영천 · 영덕 · 울진",
          phone: "1644-7836",
          types: ["clinic", "pharmacy"] as any,
        },
        {
          name: "올댓메디",
          areas: "대구 · 경북(서부)",
          phone: "1644-7995",
          types: ["clinic"] as any,
        },
        {
          name: "동원메디텍",
          areas: "대구 · 경북(동부)",
          phone: "1644-7836",
          types: ["clinic"] as any,
        },
        {
          name: "디케이팜케어",
          areas: "대구 · 경북",
          phone: "1644-9584",
          types: ["pharmacy"] as any,
        },
        {
          name: "메디플랜",
          areas: "부산 · 울산 · 양산",
          phone: "1644-0466",
          types: ["clinic"] as any,
        },
        {
          name: "올케어플러스",
          areas: "부산 · 울산 · 양산",
          phone: "1644-0466",
          types: ["pharmacy"] as any,
        },
        {
          name: "디원케어",
          areas: "부산 · 울산 · 양산",
          phone: "1644-7660",
          types: ["hospital"] as any,
        },
        {
          name: "디라인",
          areas: "마산 · 경남",
          phone: "1644-1937",
          types: ["clinic", "pharmacy"] as any,
        },
        {
          name: "병원전문 파트너",
          areas: "대구 · 경북 · 경남 (병원 전문)",
          types: ["hospital"] as any,
          description:
            "비에이치디, 디알에스케어, 바로케어, 올케어테크",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">


      {/* Hero / Map Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pb-10 bg-gradient-to-b from-blue-50/50 to-white mt-24 sm:mt-12">
        <div className="container mx-auto px-6 sm:px-0">
          <div className="w-full flex justify-between items-end">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Legend Box */}
              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-4">
                <h5 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <MapPin size={16} className="text-blue-600" />{" "}
                  대리점 범례 안내
                </h5>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-pink-500"></span>
                    <span className="text-xs font-medium text-gray-600">
                      의원 전문 대리점
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                    <span className="text-xs font-medium text-gray-600">
                      약국 전문 대리점
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-medium text-gray-600">
                      병원 전문 대리점 (헥톤)
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Search Section */}
      <MapSearchSection />

      {/* Details Section */}
      <main className="container mx-auto px-6 py-12 ">
        <div className="max-w-6xl mx-auto">
          {regions.map((region, idx) => (
            <motion.div
              key={region.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <RegionSection {...region} />
            </motion.div>
          ))}
        </div>
      </main>

      
    </div>
  );
};

export default NetworkHome;