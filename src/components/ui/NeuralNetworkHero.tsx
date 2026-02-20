
'use client';

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

interface HeroProps {
  title: string;
  description: string;
  badgeText?: string;
  badgeLabel?: string;
  ctaButtons?: Array<{ text: string; href: string; primary?: boolean }>;
  microDetails?: Array<string>;
}

export default function NeuralNetworkHero({
  title,
  description,
  badgeText = "Next-Gen Digital Healthcare",
  badgeLabel = "Innovation",
  ctaButtons = [
    { text: "Get started", href: "#", primary: true },
    { text: "View showcase", href: "#" }
  ],
  microDetails = ["Industry Leader", "Proven Technology", "Data-Driven"]
}: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const microItemsRefs = useRef<Array<HTMLLIElement | null>>([]);

  useGSAP(
    () => {
      if (!headerRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });
      
      if (badgeRef.current) {
        gsap.set(badgeRef.current, { autoAlpha: 0, y: -20 });
        tl.to(badgeRef.current, { autoAlpha: 1, y: 0 }, 0.2);
      }

      gsap.set(headerRef.current, { filter: 'blur(10px)', y: 30, autoAlpha: 0 });
      tl.to(headerRef.current, { filter: 'blur(0px)', y: 0, autoAlpha: 1 }, 0.4);

      if (paraRef.current) {
        gsap.set(paraRef.current, { autoAlpha: 0, y: 15 });
        tl.to(paraRef.current, { autoAlpha: 1, y: 0 }, 0.6);
      }
      
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { autoAlpha: 0, y: 15 });
        tl.to(ctaRef.current, { autoAlpha: 1, y: 0 }, 0.8);
      }

      if (microItemsRefs.current.length > 0) {
        gsap.set(microItemsRefs.current, { autoAlpha: 0, x: -5 });
        tl.to(microItemsRefs.current, { autoAlpha: 1, x: 0, stagger: 0.1 }, 1.0);
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-[60vh] h-[70vh] sm:min-h-[65vh] w-full flex flex-col justify-center touch-pan-y">
    
      <div className="relative mx-auto flex max-w-[1600px] w-full flex-col items-start gap-5 sm:gap-6 md:gap-8 pb-16 sm:pb-20 md:pb-24 pt-12 sm:pt-16 md:pt-20 px-4 sm:px-6">
        <div ref={badgeRef} className="inline-flex items-center gap-3 rounded-full border border-black/5 bg-white/80 px-4 py-2 ">
          <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#0055FF]">{badgeLabel}</span>
          <div className="w-1 h-1 rounded-full bg-black/20" />
          <span className="text-[14px]  font-medium tracking-tight text-black/70">{badgeText}</span>
        </div>

        
    
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-4 sm:mb-6 tracking-tight">
          데이터로 연결되는 <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">AI 헬스케어의 미래</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 font-light mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-2xl">
          국내 시장 점유율 1위 EMR을 넘어, <br className="hidden md:block"/> 
          환자와 병원, 데이터를 잇는 No.1 디지털 헬스케어 플랫폼
        </p>


       

        <ul className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap gap-4 sm:gap-6 md:gap-10 text-xs sm:text-sm font-bold tracking-[0.1em] text-white uppercase p-1">
          {microDetails?.map((detail, index) => (
            <li 
              key={index} 
              ref={el => { microItemsRefs.current[index] = el; }} 
              className="flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffffff]/50" /> {detail}
            </li>
          ))}
        </ul>
      </div>

     
    </section>
  );
}
