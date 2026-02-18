
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
    <section ref={sectionRef} className="relative h-[70vh] w-full flex flex-col justify-center touch-pan-y">
    
      <div className="relative mx-auto flex max-w-[1600px] w-full flex-col items-start gap-8 pb-24 pt-20">
        <div ref={badgeRef} className="inline-flex items-center gap-3 rounded-full border border-black/5 bg-white/80 px-4 py-2 ">
          <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#0055FF]">{badgeLabel}</span>
          <div className="w-1 h-1 rounded-full bg-black/20" />
          <span className="text-[14px]  font-medium tracking-tight text-black/70">{badgeText}</span>
        </div>

        {/* <h1 
          ref={headerRef} 
          className="max-w-6xl text-left font-bold leading-[1.1] tracking-tight text-[#ffffff] font-syne lg:text-7xl  sm:text-5xl md:text-6xl "
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <p ref={paraRef} className="max-w-4xl text-left font-light leading-relaxed tracking-tight text-white text-2xl"
            dangerouslySetInnerHTML={{ __html: description }}
        /> */}
    
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
          데이터로 연결되는 <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">AI 헬스케어의 미래</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 font-light mb-10 leading-relaxed max-w-2xl">
          국내 시장 점유율 1위 EMR을 넘어, <br className="hidden md:block"/> 
          환자와 병원, 데이터를 잇는 No.1 디지털 헬스케어 플랫폼
        </p>


        {/* <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-4">
          {ctaButtons?.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className={`rounded-full px-10 py-5 text-base font-bold tracking-tight transition-all duration-300 transform active:scale-95 ${
                button.primary
                  ? "bg-[#0055FF] text-white hover:bg-[#0044EE] hover:shadow-[0_10px_30px_rgba(0,85,255,0.3)]"
                  : "bg-black/5 text-white border border-black/5 hover:bg-black/10"
              }`}
            >
              {button.text}
            </a>
          ))}
        </div> */}

        <ul className="mt-12 flex flex-wrap gap-10 text-sm font-bold tracking-[0.1em] text-white uppercase p-1">
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
