"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Milestone {
  id: string;
  date: string;
  title: string;
}

interface Period {
  id: string;
  title?: string;
  range: string;
  milestones: Milestone[];
}

interface HistoryTimelineProps {
  periods: Period[];
  baseDetailPath?: string;
}

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({
  periods,
  baseDetailPath = "/about/history",
}) => {
  return (
    <section className="bg-white text-slate-900  py-20 sm:py-20">
      <div className="container min-w-[1600px] mx-auto">
        {periods.map((period) => (
          <div key={period.id} className="mb-20 last:mb-0 flex items-start justify-start gap-30">
            <div className="mb-8 sticky top-[250px] bg-white z-50 w-[340px]">
              <h2 className="text-2xl sm:text-2xl font-bold text-slate-700">
                {period.title ?? period.range}
              </h2>
              {period.title && (
                <p className="text-5xl sm:text-6xl font-extralight text-emerald-400 mt-8">{period.range}</p>
              )}
            </div>
            <ul className="divide-y divide-slate-200 -mt-8">
              {period.milestones.map((m) => (
                <li key={m.id} className="group">
                  <Link
                    href={`${baseDetailPath}/${m.id}`}
                    className="flex items-center gap-4 py-7 text-left hover:bg-slate-50 -mx-4 px-4 rounded-lg transition-colors "
                  >
                    <span className="text-slate-500 font-medium text-xl shrink-0 w-20">
                      {m.date}
                    </span>
                    <span className="flex-1 text-slate-500 text-xl group-hover:text-primary-500 transition-colors">
                      {m.title}
                    </span>
                    
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
