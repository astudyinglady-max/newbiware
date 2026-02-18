import { AboutSubPageLayout } from "@/components/about/AboutSubPageLayout";
import { InvestmentTabs } from "@/components/about/InvestmentTabs";

export const metadata = {
  title: "투자정보 | UBcare",
  description: "UBcare 투자정보 - 주가정보, 재무정보, 공시, 주주공고",
};

export default function InvestmentPage() {
  return (
    <AboutSubPageLayout
      pageTitle="투자정보"
      subLabel="Investment Information"
      headline={
        <>
          헬스케어 혁신을
          <br />
          이끄는 기업의 투자 정보
        </>
      }
    >
      <InvestmentTabs />
    </AboutSubPageLayout>
  );
}
