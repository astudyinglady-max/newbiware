import { AboutSubPageLayout } from "@/components/about/AboutSubPageLayout";
import { HistoryTimeline } from "@/components/about/HistoryTimeline";
import historyData from "@/data/history.json";

export const metadata = {
  title: "연혁 | UBcare",
  description: "UBcare 연혁 및 주요 마일스톤",
};

export default function HistoryPage() {
  return (
    <AboutSubPageLayout
      pageTitle="연혁"
      subLabel="Company History"
      headline={
        <>
          도전으로 써온<br />디지털 헬스케어의 역사
        </>
      }
    >
      <HistoryTimeline periods={historyData.periods} />
    </AboutSubPageLayout>
  );
}
