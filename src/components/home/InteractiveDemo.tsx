
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const steps = [
  {
    id: '01',
    title: '예약 및 접수',
    description: '환자의 모바일 예약 데이터가 EMR로 실시간 연동되어 대기 시간을 획기적으로 줄입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '02',
    title: '진료 및 기록',
    description: '직관적인 인터페이스와 AI 진단 보조 솔루션으로 보다 정확하고 빠른 진료가 가능합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '03',
    title: '처방 및 원내 조제',
    description: '심평원 연동 및 처방 가이드라인을 실시간으로 확인하여 오류 없는 처방을 지원합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '04',
    title: '청구 및 심사',
    description: '복잡한 청구 프로세스를 자동화하고, 사전 심사 기능을 통해 삭감을 방지합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '05',
    title: '데이터 분석',
    description: '병의원 경영 데이터를 시각화하여 더 나은 의사결정을 위한 인사이트를 제공합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
  }
];

const InteractiveDemo: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveStep((prev) => (prev + newDirection + steps.length) % steps.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeStep]);

  return (
    <section className="py-24 bg-white overflow-hidden touch-pan-y">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Header */}


        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <span className="text-sm font-bold tracking-[0.2em] text-[#0055FF] uppercase">PRODUCT WORKFLOW</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0F]">EMR 하나로 연결되는 의료 경험</h2>
          </div>

        </div>

        {/* Carousel Content — touch-action: pan-y so vertical scroll is not captured by horizontal drag */}
        <div className="relative bg-[#F8FAFF] rounded-[16px] overflow-hidden min-h-[500px] border border-black/5 touch-pan-y">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 h-full touch-pan-y"
              style={{ touchAction: 'pan-y' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              dragDirectionLock
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              {/* Left Content */}
              <div className="p-8 md:p-16 flex flex-col justify-center h-full relative z-10 bg-[#F8FAFF]">

                 <h3 className="text-3xl font-bold text-[#0A0A0F] leading-tight mb-8">
                    {steps[activeStep].title}
                 </h3>
                 <p className="text-black/60 text-lg mb-10 max-w-md">
                    {steps[activeStep].description}
                 </p>
                 <div>
                    <button className="px-8 py-3 rounded-full border border-[#0055FF] text-[#0055FF] font-bold text-sm hover:bg-[#0055FF] hover:text-white transition-all">
                        더 알아보기
                    </button>
                 </div>
              </div>

              {/* Right Image */}
              <div className="relative h-64 lg:h-full overflow-hidden">
                <img 
                    src={steps[activeStep].imageUrl} 
                    alt={steps[activeStep].title} 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-l from-transparent to-black/10 lg:hidden"></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center gap-8">
            {/* Progress Bar */}
            <div className="flex-1 h-[2px] bg-black/10 rounded-full overflow-hidden relative">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-[#0055FF]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => paginate(-1)}
                    className="w-10 h-10 rounded-full bg-[#F0F4FF] text-[#0055FF] flex items-center justify-center hover:bg-[#0055FF] hover:text-white transition-all disabled:opacity-50"
                    aria-label="이전 단계"
                >
                    <ChevronLeft className="w-5 h-5" aria-hidden />
                </button>
                <button
                    type="button"
                    onClick={() => paginate(1)}
                    className="w-10 h-10 rounded-full bg-[#F0F4FF] text-[#0055FF] flex items-center justify-center hover:bg-[#0055FF] hover:text-white transition-all"
                    aria-label="다음 단계"
                >
                    <ChevronRight className="w-5 h-5" aria-hidden />
                </button>
            </div>
        </div>

      </div>
    </section>
  );
};

export default InteractiveDemo;
