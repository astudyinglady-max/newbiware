import React from 'react';
import {AboutSubPageLayout} from '@/components/about/AboutSubPageLayout';
export const metadata = {
  title: "전국대리점 | UBcare",
  description: "UBcare Networks",
};
const branchesPage: React.FC = () => {
  return (
    <AboutSubPageLayout
      pageTitle="전국대리점"
      subLabel="UBcare Networks"
      headline={<>
        필요한 곳 어디든,<br />
        신뢰할 수 있는 지원
      </>}
    >
      <section className="py-12 sm:py-16">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            전국 대리점 안내
          </h2>
          <p className="text-slate-600 leading-relaxed">
            현재 대리점 상세 화면은 준비 중입니다. 곧 지역별 대리점 검색과 연락처 정보를
            확인하실 수 있습니다.
          </p>
        </div>
      </section>
    </AboutSubPageLayout>
  );
};

export default branchesPage;