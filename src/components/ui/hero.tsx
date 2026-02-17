import { useEffect, useRef, useState } from "react"
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import { Activity } from "lucide-react"
import Link from "next/link"
import NeuralNetworkHero from "./NeuralNetworkHero"

interface HeroProps {
    headline: string
    subHeadline: string
    ctaPrimary: {
        label: string
        link: string
    }
    ctaSecondary: {
        label: string
        link: string
    }
}

export default function ShaderShowcase({ headline, subHeadline, ctaPrimary, ctaSecondary }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        const handleMouseEnter = () => setIsActive(true)
        const handleMouseLeave = () => setIsActive(false)
        const container = containerRef.current

        if (container) {
            container.addEventListener("mouseenter", handleMouseEnter)
            container.addEventListener("mouseleave", handleMouseLeave)
        }

        return () => {
            if (container) {
                container.removeEventListener("mouseenter", handleMouseEnter)
                container.removeEventListener("mouseleave", handleMouseLeave)
            }
        }
    }, [])

    return (
        <div ref={containerRef} className="min-h-[720px] md:min-h-[820px] bg-black relative overflow-hidden flex flex-col justify-center items">
            <svg className="absolute inset-0 w-0 h-0">
                <defs>
                    <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
                        <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
                        <feColorMatrix
                            type="matrix"
                            values="1 0 0 0 0.02 0 1 0 0 0.02 0 0 1 0 0.05 0 0 0 0.9 0"
                            result="tint"
                        />
                    </filter>
                    <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9"
                            result="gooey"
                        />
                        <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
                    </filter>
                    <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="50%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                    <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            {/* Primary Blue Mesh Gradient without background color prop */}
            <MeshGradient
                className="absolute inset-0 w-full h-full"
                colors={[ "#2563EB", "#1d4ed8", "#001A3D", "#60A5FA"]}
                speed={0.3}
            />
            <MeshGradient
                className="absolute inset-0 w-full h-full opacity-60"
                colors={["#ffffff", "#2563EB", "#60A5FA"]}
                speed={0.2}
            />

            <main className="relative z-20 max-w-[1600px] px-8 w-full mx-auto md:mx-0 md:pl-20 mt-12 md:mt-0">
                <NeuralNetworkHero 
                    title="데이터로 연결되는<br /> AI 헬스케어"
                    description="UBcare는 국내 1위 EMR 기술력을 바탕으로 병원 경영의 디지털 트랜스포메이션을 선도하며,<br />데이터 중심의 새로운 의료 경험을 설계합니다."
                    badgeText="Next-Gen Digital Healthcare"
                    badgeLabel="Innovation"
                    ctaButtons={[
                        { text: "도입 상담 신청", href: "#cta", primary: true },
                        { text: "솔루션 보기", href: "#solutions" }
                    ]}
                    microDetails={["EMR 시장 점유율 1위", "24,000+ 의료 네트워크", "30년+ 전문성"]}
                    />
            </main>


        </div>
    )
}
