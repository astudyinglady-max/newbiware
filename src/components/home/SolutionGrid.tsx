
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Pill, ShoppingCart, BarChart3, ChevronRight } from 'lucide-react';

const solutions = [
  {
    title: '의사랑 (Medical EMR)',
    description: '국내 시장 점유율 1위, 최신 트렌드를 선도하는 의원용 EMR 솔루션입니다.',
    icon: <Activity className="w-8 h-8" />,
    stats: '17,000+ 병의원'
  },
  {
    title: '유팜 (Pharmacy EMR)',
    description: '약국 경영에 필요한 처방, 조제, 재고관리를 한 번에 해결합니다.',
    icon: <Pill className="w-8 h-8" />,
    stats: '7,000+ 약국'
  },
  {
    title: '미소몰 (Distribution)',
    description: '의료기기부터 소모품까지, 검증된 품질의 헬스케어 전문 커머스입니다.',
    icon: <ShoppingCart className="w-8 h-8" />,
    stats: '전국 37개 대리점'
  },
  {
    title: 'UBIST (Data Analysis)',
    description: '방대한 의료 데이터를 정밀 분석하여 제약 마케팅 전략을 제시합니다.',
    icon: <BarChart3 className="w-8 h-8" />,
    stats: '제약사 100+ 파트너'
  }
];

const SolutionsGrid: React.FC = () => {
  return (
    <div className="py-32 bg-white relative touch-pan-y overflow-visible">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <span className="text-sm font-bold tracking-[0.2em] text-[#0055FF] uppercase">Core Solutions</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0F]">유비케어의 4대 핵심 솔루션</h2>
          </div>
         
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((item, idx) => (
            <motion.div
              key={idx}
              className="group relative bg-[#F8FAFF] border border-black/5 p-10 rounded-2xl transition-all duration-500 hover:border-[#0055FF]/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
            >
              <div className="relative z-10 space-y-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#9CAFB7] group-hover:bg-[#0055FF] group-hover:text-white transition-all shadow-sm">
                  {item.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold text-[#0A0A0F] group-hover:text-[#0055FF] transition-colors">{item.title}</h3>
                  <p className="text-black/50 text-md leading-relaxed">{item.description}</p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-black/5">
                  <span className="text-md font-bold text-[#0055FF] tracking-widest uppercase">{item.stats}</span>
                  <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-[#0055FF] transition-colors">
                     <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionsGrid;
