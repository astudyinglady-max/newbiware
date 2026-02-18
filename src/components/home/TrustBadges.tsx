
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Link2, MapPin, CheckCircle2 } from 'lucide-react';

const TrustBadges: React.FC = () => {
  const badges = [
    { name: 'GC Family', icon: <ShieldCheck className="w-5 h-5" />, sub: 'Green Cross Group' },
    { name: 'ISO 인증', icon: <Award className="w-5 h-5" />, sub: 'Quality & Security' },
    { name: '심평원 연동', icon: <Link2 className="w-5 h-5" />, sub: 'HIRA Certified' },
    { name: '전국 대리점', icon: <MapPin className="w-5 h-5" />, sub: 'Nationwide Network' },
    { name: 'KISA 보안', icon: <CheckCircle2 className="w-5 h-5" />, sub: 'Data Privacy' }
  ];

  return (
    <div className="py-16 bg-[#F0F4FF] border-y border-black/5">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-y-12 gap-x-16">
          {badges.map((badge, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-all duration-500 cursor-default group"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: idx * 0.07, ease: 'easeOut' }}
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#0055FF] group-hover:shadow-md transition-all border border-black/5">
                {badge.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#0A0A0F] tracking-tight leading-tight">
                  {badge.name}
                </span>
                <span className="text-sm font-medium text-black/40 uppercase tracking-widest mt-0.5">
                  {badge.sub}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
