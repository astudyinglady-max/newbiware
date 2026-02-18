"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { StockPriceChart, DEFAULT_STOCK_DATA } from "./StockPriceChart";
import { FinancialHorizontalBarChart } from "./FinancialHorizontalBarChart";

const TABS = [
  { id: "stock", label: "주가정보" },
  { id: "financial", label: "재무정보" },
  { id: "disclosure", label: "공시" },
  { id: "shareholder", label: "주주공고" },
] as const;

export function InvestmentTabs() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("stock");

  return (
    <div className="w-full mt-12">
      {/* 탭 네비게이션 */}
      <div className="flex justify-between border-b border-slate-200 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "w-full px-7 py-7 text-[18px] font-bold transition-colors",
              activeTab === tab.id
                ? "text-primary-500 border-b-2 border-primary-500 bg-primary-50/50"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 컨텐츠 */}
      <div className="min-h-[400px]">
        {activeTab === "stock" && <StockInfoTab />}
        {activeTab === "financial" && <FinancialInfoTab />}
        {activeTab === "disclosure" && <DisclosureTab />}
        {activeTab === "shareholder" && <ShareholderTab />}
      </div>
    </div>
  );
}

function StockInfoTab() {
  return (
    <div className="space-y-6">
      {/* 메인 주가 카드 */}
      <div className="rounded-2xl bg-linear-to-br from-sky-50 to-blue-100 p-6 sm:p-8 border border-sky-200/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 좌측: 주가 정보 */}
          <div>
            <h3 className="text-[18px] font-semibold text-slate-700 mb-1">
              유비케어 (032620)
            </h3>
            <p className="text-[18px] text-slate-500 mb-6">2026/02/19 03:26:11 장마감</p>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl sm:text-5xl font-bold text-slate-900">
                4,090
              </span>
              <span className="text-[18px] font-medium text-slate-600">원</span>
            </div>
            <p className="text-[18px] text-slate-600 mb-6">
              어제보다 <span className="text-red-500 font-medium">0 ▼ (0%)</span>
            </p>
            <div className="grid grid-cols-2 gap-4 text-[18px]">
              <div>
                <p className="text-slate-500">시가</p>
                <p className="font-medium text-slate-800">4,090</p>
              </div>
              <div>
                <p className="text-slate-500">고가</p>
                <p className="font-medium text-slate-800">4,485</p>
              </div>
              <div>
                <p className="text-slate-500">저가</p>
                <p className="font-medium text-slate-800">3,045</p>
              </div>
              <div>
                <p className="text-slate-500">거래량</p>
                <p className="font-medium text-slate-800">-</p>
              </div>
            </div>
          </div>
          {/* 우측: 시장지수 + 차트 */}
          <div>
            <div className="flex flex-wrap gap-4 text-[18px] mb-4">
              <span className="text-slate-600">KOSPI 2,507.01 -15.26 (-0.28%)</span>
              <span className="text-slate-600">KOSDAQ 1,106.08 -19.91 (-1.77%)</span>
            </div>
            <div className="min-h-[220px] h-[220px] rounded-xl bg-transparent border border-sky-200/50 overflow-hidden flex items-stretch">
              <StockPriceChart
                data={DEFAULT_STOCK_DATA}
                width={400}
                height={220}
                lineColor="#3B82F6"
                gradientFrom="rgba(59, 130, 246, 0.2)"
                gradientTo="rgba(59, 130, 246, 0)"
                className="flex-1 min-w-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StockMetricCard
          variant="roe"
          title="ROE"
          value="13%"
          note="* 2024년 기준"
        />
        <StockMetricCard
          variant="shareholder"
          title="주주환원율"
          value="32.4%"
          note="* 2024 기준"
        />
        <StockMetricCard
          variant="performance"
          title="경영실적"
          customContent={
            <div className="space-y-3">
              <p className="font-medium text-white text-[18px]">2025년 경영실적발표</p>
              <ul className="space-y-2 text-[18px] text-white/90">
                {["실적자료", "재무제표", "Factbook"].map((item) => (
                  <li key={item} className="flex items-center gap-2 border-b border-white/20 pb-2 last:border-0 last:pb-0">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/30 shrink-0">
                      <span className="text-white">↓</span>
                    </span>
                    {item}
                  </li>
                ))}
                <li className="flex items-center gap-2 border-b border-white/20 pb-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/30 shrink-0">
                    <span className="text-white">↗</span>
                  </span>
                  Conference Call
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/30 shrink-0">
                    <span className="text-white">↗</span>
                  </span>
                  2024 JB금융그룹 통합연차보고서
                </li>
              </ul>
            </div>
          }
        />
        <StockMetricCard
          variant="dark"
          title="신용등급"
          customContent={
            <div className="flex flex-wrap gap-4 justify-start">
              {[
                { rating: "AA+", label: "NICE 신용평가" },
                { rating: "AA+", label: "한국 기업평가" },
                { rating: "AA+", label: "한국 신용평가" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-600/90 text-white text-[16px] font-bold shrink-0">
                    {item.rating}
                  </span>
                  <span className="text-[13px] text-white/70 text-center leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          }
        />
        <StockMetricCard
          variant="dark"
          title="기업소개자료"
          customContent={
            <ul className="space-y-2 text-[18px]">
              {["주주총회 관련자료", "ESG 보고서", "기업가치 제고계획"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-white/90 hover:text-primary-300 cursor-pointer group">
                  <span>{item}</span>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-primary-500/50 shrink-0">›</span>
                </li>
              ))}
            </ul>
          }
        />
        <StockMetricCard
          variant="dark"
          title="공시정보"
          customContent={
            <p className="text-[18px] text-white/70 leading-relaxed">
              수시공시, 경영공시, 사업보고서 등 공시정보 제공
            </p>
          }
        />
      </div>
    </div>
  );
}

const CARD_VARIANTS = {
  roe: "bg-[linear-gradient(145deg,rgba(56,189,248,0.9)_0%,rgba(59,130,246,0.95)_50%,rgba(37,99,235,0.9)_100%)] border-sky-300/30 text-white shadow-lg shadow-sky-500/20",
  shareholder:
    "bg-white border-slate-200/60 overflow-hidden relative group",
  performance:
    "bg-[linear-gradient(145deg,rgba(125,211,252,0.6)_0%,rgba(56,189,248,0.5)_100%)] border-sky-300/40 text-white shadow-md",
  dark: "bg-primary-950/95 border-white/10 text-white hover:border-primary-500/30",
} as const;

function StockMetricCard({
  variant = "dark",
  title,
  value,
  note,
  customContent,
}: {
  variant?: keyof typeof CARD_VARIANTS;
  title: string;
  value?: string;
  note?: string;
  customContent?: React.ReactNode;
}) {
  const isShareholder = variant === "shareholder";

  return (
    <div
      className={cn(
        "rounded-2xl p-5 border transition-colors min-h-[180px] flex flex-col relative",
        CARD_VARIANTS[variant]
      )}
    >
      {/* 주주환원율 카드: 다크 블루 영역 (상단/좌측) */}
      {isShareholder && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
          aria-hidden
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary-900/90" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-primary-800/80" />
        </div>
      )}

      <p
        className={cn(
          "flex items-center gap-2 text-[18px] mb-3 relative z-10 shrink-0",
          isShareholder ? "text-white/95" : "text-white/90"
        )}
      >
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            isShareholder ? "bg-white" : "bg-primary-300"
          )}
        />
        {title}
        <span className={isShareholder ? "text-white/90" : "text-primary-300"}>›</span>
      </p>

      <div className="flex-1 relative z-10">
        {customContent ? (
          customContent
        ) : (
          <>
            <p
              className={cn(
                "text-2xl font-bold mb-1",
                isShareholder ? "text-slate-800" : "text-white"
              )}
            >
              {value}
            </p>
            {note && (
              <p
                className={cn(
                  "text-[18px]",
                  isShareholder ? "text-slate-600" : "text-white/60"
                )}
              >
                {note}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function FinancialInfoTab() {
  const years = ["2021", "2022", "2023", "2024"];
  const chartYears = ["2021", "2020", "2019", "2018"];

  const financialStatusData = {
    assets: { label: "자산총계", color: "blue" as const, values: [149260, 154157, 136746, 129944] },
    liabilities: { label: "부채총계", color: "red" as const, values: [-22852, 44963, -30871, -25516] },
  };
  const profitLossData = {
    revenue: { label: "매출액", color: "blue" as const, values: [117616, 107818, 110852, 99897] },
    operatingProfit: { label: "영업이익", color: "red" as const, values: [-9973, -13409, -12354, -9560] },
  };

  const tableData = [
    { label: "자산총계", isHighlight: true, values: ["1,493", "1,542", "1,367", "1,299"] },
    { label: "현금 및 예치금", values: ["396", "597", "212", "66"] },
    { label: "당기손익-공정가치 측정 금융자산", values: ["12", "34", "28", "22"] },
    { label: "기타포괄손익-공정가치 측정 금융자산", values: ["89", "95", "108", "85"] },
    { label: "상각후원가 측정 유가증권", values: ["-", "18", "23", "25"] },
    { label: "매출채권", values: ["117", "263", "207", "184"] },
    { label: "재고자산", values: ["25", "39", "36", "11"] },
    { label: "기타 유동자산", values: ["102", "148", "132", "118"] },
    { label: "유형자산", values: ["83", "79", "45", "43"] },
    { label: "무형자산", values: ["21", "17", "20", "15"] },
    { label: "리스자산", values: ["65", "97", "130", "155"] },
    { label: "비유동자산", values: ["597", "169", "457", "420"] },
  ];

  return (
    <div className="space-y-8">
      {/* 상단 재무·손익 수평 막대차트 (부모카드형) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-linear-to-br from-sky-50 to-blue-100 p-6 sm:p-8 border border-sky-200/50 min-h-[320px] flex flex-col">
          <div className="flex-1 min-h-0">
            <FinancialHorizontalBarChart
              title="재무현황"
              series1={financialStatusData.assets}
              series2={financialStatusData.liabilities}
              years={chartYears}
              width={420}
              height={260}
              className="h-full"
            />
          </div>
        </div>
        <div className="rounded-2xl bg-linear-to-br from-sky-50 to-blue-100 p-6 sm:p-8 border border-sky-200/50 min-h-[320px] flex flex-col">
          <div className="flex-1 min-h-0">
            <FinancialHorizontalBarChart
              title="손익현황"
              series1={profitLossData.revenue}
              series2={profitLossData.operatingProfit}
              years={chartYears}
              width={420}
              height={260}
              className="h-full"
            />
          </div>
        </div>
      </div>

      {/* 연간 선택 */}
      <div className="flex items-center gap-2">
        <select className="px-4 py-2 border border-slate-200 rounded-lg text-[18px] bg-white">
          <option>연간</option>
        </select>
      </div>

      {/* 재무상태표 상세 테이블 */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-[18px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-4 text-left font-medium text-slate-700 w-64">
                  (단위: 억원)
                </th>
                {years.map((y) => (
                  <th
                    key={y}
                    className="px-5 py-4 text-right font-medium text-slate-700 min-w-[100px]"
                  >
                    {y}년
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr
                  key={i}
                  className={cn(
                    "border-b border-slate-100 last:border-b-0",
                    row.isHighlight && "bg-primary-50/50"
                  )}
                >
                  <td
                    className={cn(
                      "px-5 py-3 text-slate-700",
                      row.isHighlight && "font-semibold text-primary-600 underline"
                    )}
                  >
                    {row.label}
                  </td>
                  {row.values.map((val, j) => (
                    <td
                      key={j}
                      className={cn(
                        "px-5 py-3 text-right font-medium tabular-nums",
                        row.isHighlight ? "text-primary-600" : "text-slate-800"
                      )}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const DISCLOSURE_SUB_TABS = [
  "공시자료",
  "경영공시",
  "사업보고서",
  "감사보고서",
  "영업보고서",
  "공고",
  "공시규정",
];

function DisclosureTab() {
  const [activeSubTab, setActiveSubTab] = useState("공시자료");

  const items = [
    { title: "주식소각결정", date: "2026-02-05" },
    { title: "기업설명회(IR) 개최(안내공시)", date: "2026-02-05" },
    { title: "주요사항보고서(자기주식취득 신탁계약체결결정)", date: "2026-02-05" },
    { title: "현금·현물배당결정(자회사의 주요경영사항)", date: "2026-02-05" },
    { title: "임원·주요주주특정증권등소유상황보고서", date: "2026-02-05" },
    { title: "주식등의대량보유상황보고서(일반)", date: "2026-02-05" },
    { title: "주주총회소집결의", date: "2026-01-31" },
    { title: "현금·현물배당결정", date: "2026-01-15" },
  ];

  return (
    <div className="space-y-0">
      {/* 서브 탭 */}
      <div className="flex flex-wrap gap-0 border-b border-slate-200 -mb-px">
        {DISCLOSURE_SUB_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={cn(
              "px-5 py-4 text-[18px] font-medium transition-colors",
              activeSubTab === tab
                ? "bg-primary-900 text-white"
                : "text-slate-500 hover:text-slate-700 bg-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 테이블 */}
      <div className="border border-t-0 border-slate-200 rounded-b-xl overflow-hidden bg-white">
        <table className="w-full text-[18px]">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-5 py-4 text-left font-medium text-slate-700">제목</th>
              <th className="px-5 py-4 text-center font-medium text-slate-700 w-24">링크</th>
              <th className="px-5 py-4 text-right font-medium text-slate-700 w-28">날짜</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, i) => (
              <tr key={i} className="group hover:bg-slate-50/50">
                <td className="px-5 py-4 text-slate-800 align-top">
                  <span className="block leading-relaxed">{row.title}</span>
                </td>
                <td className="px-5 py-4 text-center align-top">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-[18px] font-medium"
                  >
                    LINK
                    <span className="text-slate-400">↗</span>
                  </a>
                </td>
                <td className="px-5 py-4 text-right text-slate-600 align-top">
                  {row.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ShareholderTab() {
  const notices = [
    { no: 1, date: "2026-02-05", info: "※ 제32기 현금·현물배당을 위한 주주명부폐쇄 및 기준일 설정 공고", submitter: "유비케어" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <select className="px-7 py-4 border border-slate-200 rounded-lg text-[18px]">
          <option>2026</option>
          <option>2025</option>
          <option>2024</option>
        </select>
        <button className="flex items-center gap-2 px-7 py-4 border border-slate-200 rounded-lg text-[18px] hover:bg-slate-50">
          Acrobat viewer
        </button>
      </div>
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-[18px]">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-7 py-7 text-left font-medium text-slate-700 w-16">번호</th>
              <th className="px-7 py-7 text-left font-medium text-slate-700 w-28">날짜</th>
              <th className="px-7 py-7 text-left font-medium text-slate-700">공시정보</th>
              <th className="px-7 py-7 text-left font-medium text-slate-700 w-24">제출의무자</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((row) => (
              <tr key={row.no} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="px-7 py-7 text-slate-600">{row.no}</td>
                <td className="px-7 py-7 text-slate-600">{row.date}</td>
                <td className="px-7 py-7 text-slate-700">{row.info}</td>
                <td className="px-7 py-7 text-slate-600">{row.submitter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
