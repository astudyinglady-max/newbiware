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
    <section className="bg-white text-slate-900 py-14 sm:py-16 md:py-20">
      <div className="container max-w-[1600px] mx-auto px-6 md:px-0">
        {periods.map((period) => (
          <div
            key={period.id}
            className="mb-14 sm:mb-16 md:mb-20 last:mb-0 flex flex-col gap-8 sm:gap-10 md:grid md:grid-cols-[3fr_7fr] md:items-start md:gap-14"
          >
            <div className="mb-4 sm:mb-6 md:mb-8 md:sticky md:top-[270px] bg-white z-10 w-full min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-700">
                {period.title ?? period.range}
              </h2>
              {period.title && (
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-emerald-400 mt-4 sm:mt-6 md:mt-8">
                  {period.range}
                </p>
              )}
            </div>
            <ul className="w-full min-w-0 divide-y divide-slate-200">
              {period.milestones.map((m) => (
                <li key={m.id} className="group">
                  <Link
                    href={'#'}
                    className="flex items-start sm:items-center gap-3 sm:gap-4 py-5 sm:py-6 md:py-7 text-left hover:bg-slate-50 -mx-2 sm:-mx-4 px-2 sm:px-4 rounded-lg transition-colors"
                  >
                    <span className="text-slate-500 font-medium text-sm sm:text-base md:text-xl shrink-0 w-16 sm:w-20">
                      {m.date}
                    </span>
                    <span className="flex-1 text-slate-500 text-sm sm:text-base md:text-xl leading-relaxed group-hover:text-primary-500 transition-colors">
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
