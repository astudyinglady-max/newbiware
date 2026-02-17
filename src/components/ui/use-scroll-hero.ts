"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollHeroConfig {
    start?: string;
    end?: string;
    scrub?: number | boolean;
}

export function useScrollHero(
    containerRef: React.RefObject<HTMLElement | null>,
    config: UseScrollHeroConfig = {}
) {
    const [motionValues, setMotionValues] = useState({
        scrollProgress: 0,
        scrollVelocity: 0,
        rotation: 0,
        parallaxY: 0,
    });

    // Backend state to track values without triggering re-renders for internal logic
    const stateRef = useRef({
        progress: 0,
        velocity: 0,
        lastY: 0,
        rotation: 0,
    });

    useEffect(() => {
        if (!containerRef.current) return;

        // We'll use a proxy object to tween the velocity back to 0
        const velocityProxy = { value: 0 };
        let velTimeout: NodeJS.Timeout;

        // Initial position
        stateRef.current.lastY = window.scrollY;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: config.start || "top top",
                end: config.end || "bottom top",
                scrub: config.scrub ?? 1, // Default scrub to 1 for smoothness
                onUpdate: (self) => {
                    const currentY = window.scrollY;
                    const deltaY = currentY - stateRef.current.lastY;
                    stateRef.current.lastY = currentY;

                    // Velocity calculation
                    const rawVel = deltaY * 0.01;
                    const velocity = Math.max(-1, Math.min(1, rawVel));

                    // Update proxy immediately
                    velocityProxy.value = velocity;

                    // Update state values
                    stateRef.current.progress = self.progress;
                    stateRef.current.velocity = velocity;

                    // Derived values
                    // Rotation: -30 to 30 degrees based on velocity + progress
                    const rotation = velocity * 15 + (self.progress * 20);
                    const parallax = self.progress * 150;

                    // Trigger React render
                    setMotionValues({
                        scrollProgress: self.progress,
                        scrollVelocity: velocity,
                        rotation,
                        parallaxY: parallax,
                    });

                    // Decay logic
                    if (velTimeout) clearTimeout(velTimeout);

                    // If no scroll for 100ms, tween velocity to 0
                    velTimeout = setTimeout(() => {
                        gsap.to(velocityProxy, {
                            value: 0,
                            duration: 0.5,
                            ease: "power2.out",
                            onUpdate: () => {
                                setMotionValues(prev => ({
                                    ...prev,
                                    scrollVelocity: velocityProxy.value,
                                    // Update rotation as it depends on velocity
                                    rotation: velocityProxy.value * 15 + (stateRef.current.progress * 20)
                                }));
                            }
                        });
                    }, 100);
                },
            });
        }, containerRef);

        return () => {
            ctx.revert();
            if (velTimeout) clearTimeout(velTimeout);
        };
    }, [containerRef, config.start, config.end, config.scrub]);

    return motionValues;
}
