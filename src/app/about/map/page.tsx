import { AboutSubPageLayout } from "@/components/about/AboutSubPageLayout";
import NetworkHomeDynamic from "@/components/about/NetworkHomeDynamic";

export const metadata = {
  title: "전국대리점",
  description: "어디에서나 유비케어의 대리점",
};

export default function MapPage() {
  return (
    <AboutSubPageLayout
      pageTitle="전국대리점"
      subLabel="Company Overview"
      headline={
        <>
          건강한 삶의 가치,<br />
          유비케어가 함께 만들어갑니다.
        </>
      }
    >
      <div>
        <NetworkHomeDynamic />
      </div>
    </AboutSubPageLayout>
  );
}
