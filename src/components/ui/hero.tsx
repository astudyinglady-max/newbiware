import { useRef } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
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

    return (
        <div ref={containerRef} className="min-h-[40vh] h-[50vh] sm:min-h-[45vh] md:h-[55vh] bg-black relative overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12">

            {/* Single Mesh Gradient — merged two layers into one to reduce GPU load */}
            <MeshGradient
                className="absolute inset-0 w-full h-full"
                colors={[ "#2563EB", "#1d4ed8", "#001A3D", "#60A5FA"]}
                speed={0.25}
            />

            <main className="relative z-20 max-w-[1600px] w-full mx-auto md:mx-0 mt-8 sm:mt-10 md:mt-0">
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
