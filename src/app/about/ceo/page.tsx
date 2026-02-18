import { AboutSubPageLayout } from "@/components/about/AboutSubPageLayout";

export const metadata = {
  title: "CEO메시지 | UBcare",
  description: "UBcare CEO 인사말",
};

export default function CEOPage() {
  return (
    <AboutSubPageLayout
      pageTitle="CEO메시지"
      subLabel="CEO Message"
      headline={
        <>
       헬스케어 비즈니스,<br />더 높은 가치로
        </>
      }
    >
      <div className="space-y-6 text-slate-700 text-lg sm:text-xl leading-relaxed py-0 sm:py-12">
        <p className="text-slate-600 font-bold text-2xl">
        헬스케어 신규사업에 집중하여
          <br />
          &apos;의미 있는 성장&apos;을 이루어 내겠습니다.
        </p>
        <p className="text-slate-600 font-medium">
          유비케어는 국내 최초로 의원용 EMR(Electronic Medical Record) Solution을 개발하여 출시한 기업입니다. 이를 바탕으로 병·의원·약국 맞춤형 의료기기 제공, 병·의원·약국 온라인 쇼핑몰 서비스 제공, 의약품 데이터 및 시장분석 서비스 제공, 제약 회사용 온라인 마케팅 채널 제공 등 대한민국 디지털 헬스케어의 모든 분야를 선도해 가고 있습니다.
        </p>
        <p className="text-slate-600 font-medium">
          유비케어의 임직원은 대한민국 디지털 헬스케어로의 시장 트렌드 변화에 발 맞추어 관련 사업 포트폴리오 구축을 통한 빠른 선점으로 건실한 성장을 이루어 내고 있으며, 디지털 헬스케어 시장의 선두주자로서 사명감과 책임감을 갖고 오늘도 최선을 다해 뛰고 있습니다.
        </p>
        <p className="text-slate-600 font-medium">
          특히, 최근 다양한 자사 서비스의 기능 및 품질을 고도화하며 제품 경쟁력을 제고하는데 주력하고 있습니다. EMR, 유통, 제약/마케팅 및 데이터, 헬스케어 플랫폼 등 디지털 헬스케어 산업 전체를 아우르는 사업 포트폴리오를 바탕으로, 각 사업분야별 핵심 경쟁력과 제품 라인업을 강화하여 EMR 기반 연계 사업들이 지속 성장 가능할 수 있도록 성장동력을 확보할 계획입니다.
        </p>
      </div>
    </AboutSubPageLayout>
  );
}
