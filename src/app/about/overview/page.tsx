import { AboutSubPageLayout } from "@/components/about/AboutSubPageLayout";
import { OverviewGridSection } from "@/components/about/OverviewGridSection";

export const metadata = {
  title: "기업개요 | UBcare",
  description: "UBcare 기업 개요 및 비전",
};

export default function OverviewPage() {
  return (
    <AboutSubPageLayout
      pageTitle="기업개요"
      subLabel="Company Overview"
      headline={
        <>
         건강한 삶의 가치,<br />
         유비케어가 함께 만들어갑니다.
        </>
      }
    >
      <div>
       <div className="space-y-6 text-slate-700 text-lg sm:text-xl leading-relaxed py-0 sm:py-12">
        <p className="text-slate-600 font-reguler break-keep">
        유비케어는 국내 요양기관 EMR(Electronic Medical Record) 시장 점유율1위 기업입니다.<br /><br />

전국 25,700여 병의원/약국(17,700여 개의 병원, 의원, 8,000여 개 약국)과 38개에 이르는 전국 법인 대리점을 포함한 국내 최대 의료 네트워크를 보유하고 있으며, <br />이를 바탕으로 EMR, 유통, 제약/데이터 등의 사업을 영위하고 있습니다. <br />
새로운 도전에 망설이지 않고 시장을 선도해 온 유비케어는 헬스케어에 최신 ICT 기술을 융합 및 접목하여 개인 및 나아가 대한민국 사회에 효과적인 맞춤형 헬스케어를 제공하여 <br />국민건강 증진 및 의료비 절감에 기여하도록 하겠습니다 .
          </p>
        </div>
        <OverviewGridSection />
      </div>
    </AboutSubPageLayout>
  );
}
