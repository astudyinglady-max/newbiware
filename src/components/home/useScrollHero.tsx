"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export interface UseScrollHeroConfig {
    start?: string;
    end?: string;
    scrub?: boolean | number;
}

export function useScrollHero(
    containerRef: React.RefObject<HTMLElement | null>,
    config: UseScrollHeroConfig = {}
) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [scrollVelocity, setScrollVelocity] = useState(0);

    // Refs for tracking velocity without re-renders
    const lastScrollY = useRef(0);
    const velocityRef = useRef(0);
    const rafId = useRef<number | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // 1. Setup ScrollTrigger for progress
        const trigger = ScrollTrigger.create({
            trigger: el,
            start: config.start || "top top",
            end: config.end || "bottom top",
            scrub: config.scrub ?? true,
            onUpdate: (self) => {
                setScrollProgress(self.progress);
            },
        });

        // 2. Velocity Calculation Logic
        const handleScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastScrollY.current;

            // vel = (y - lastY) * 0.01 (as requested)
            const rawVel = delta * 0.01;

            // Clamp between -1 and 1
            const clampedVel = Math.max(-1, Math.min(1, rawVel));

            velocityRef.current = clampedVel;
            setScrollVelocity(clampedVel);

            lastScrollY.current = currentY;

            // Decay velocity when scrolling stops
            if (rafId.current) cancelAnimationFrame(rafId.current);

            const decay = () => {
                if (Math.abs(velocityRef.current) < 0.001) {
                    velocityRef.current = 0;
                    setScrollVelocity(0);
                    return;
                }

                // Decay factor
                velocityRef.current *= 0.9;
                setScrollVelocity(velocityRef.current);
                rafId.current = requestAnimationFrame(decay);
            };

            // Clear existing timeout
            if ((window as any).scrollTimeout) clearTimeout((window as any).scrollTimeout);

            (window as any).scrollTimeout = setTimeout(() => {
                gsap.to(velocityRef, {
                    current: 0,
                    duration: 0.5,
                    onUpdate: () => setScrollVelocity(velocityRef.current)
                });
            }, 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            trigger.kill();
            window.removeEventListener("scroll", handleScroll);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [containerRef, config.start, config.end, config.scrub]);

    // Derived values purely for convenience
    const rotation = scrollVelocity * 15;
    const parallaxY = scrollProgress * 100;

    return {
        scrollProgress,
        scrollVelocity,
        rotation,
        parallaxY
    };
}
