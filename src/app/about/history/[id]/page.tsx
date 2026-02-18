import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/about/PageHeader";
import historyData from "@/data/history.json";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

function findMilestone(id: string) {
  for (const period of historyData.periods) {
    const m = period.milestones.find((milestone) => milestone.id === id);
    if (m) return { milestone: m, period };
  }
  return null;
}

export async function generateStaticParams() {
  const ids: { id: string }[] = [];
  for (const period of historyData.periods) {
    for (const m of period.milestones) {
      ids.push({ id: m.id });
    }
  }
  return ids;
}

export default async function MilestoneDetailPage({ params }: PageProps) {
  const { id } = await params;
  const found = findMilestone(id);
  if (!found) notFound();

  const { milestone, period } = found;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <PageHeader
        title={milestone.title}
        breadcrumbs={[
          { label: "홈", href: "/" },
          { label: "기업 개요", href: "/about/overview" },
          { label: "연혁", href: "/about/history" },
          { label: milestone.title },
        ]}
      />
      <section className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="mb-8">
          <span className="text-primary-500 font-medium">{milestone.date}</span>
          <span className="text-slate-400 mx-2">·</span>
          <span className="text-slate-600">{period.range}</span>
        </div>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 leading-relaxed">
            {milestone.title}에 대한 상세 내용입니다. UBcare는 지속적인 혁신을 통해
            국내 의료정보화 산업을 이끌어 왔으며, 이 마일스톤은 그 여정의 중요한
            단계를 나타냅니다.
          </p>
        </div>
        <Link
          href="/about/history"
          className="inline-flex items-center gap-2 mt-12 text-primary-500 hover:text-primary-600 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          연혁 목록으로
        </Link>
      </section>
    </div>
  );
}
