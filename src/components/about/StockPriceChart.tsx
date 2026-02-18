"use client";

import React, { useMemo, useId } from "react";
import { cn } from "@/lib/utils";

type DataPoint = { date: string; value: number };

const PADDING = { top: 12, right: 12, bottom: 28, left: 48 };

export function StockPriceChart({
  data,
  width = 400,
  height = 220,
  lineColor = "#3B82F6",
  gradientFrom = "rgba(59, 130, 246, 0.25)",
  gradientTo = "rgba(59, 130, 246, 0)",
  className = "",
}: {
  data: DataPoint[];
  width?: number;
  height?: number;
  lineColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
}) {
  const { path, areaPath, minVal, maxVal, ticks } = useMemo(() => {
    if (data.length < 2) {
      return { path: "", areaPath: "", minVal: 0, maxVal: 0, ticks: [] };
    }

    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const pad = range * 0.05;
    const yMin = min - pad;
    const yMax = max + pad;
    const yRange = yMax - yMin;

    const w = width - PADDING.left - PADDING.right;
    const h = height - PADDING.top - PADDING.bottom;

    const xScale = (i: number) => PADDING.left + (i / (data.length - 1)) * w;
    const yScale = (v: number) =>
      PADDING.top + h - ((v - yMin) / yRange) * h;

    const points = data.map((d, i) => [xScale(i), yScale(d.value)] as [number, number]);
    const pathD = points
      .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
      .join(" ");
    const areaD =
      pathD +
      ` L ${points[points.length - 1][0]} ${PADDING.top + h} L ${points[0][0]} ${PADDING.top + h} Z`;

    const tickCount = 5;
    const tickStep = yRange / (tickCount - 1);
    const tickValues = Array.from(
      { length: tickCount },
      (_, i) => yMin + tickStep * i
    ).map((v) => Math.round(v));

    return {
      path: pathD,
      areaPath: areaD,
      minVal: yMin,
      maxVal: yMax,
      ticks: tickValues,
    };
  }, [data, width, height]);

  const dateLabels = useMemo(() => {
    const step = Math.max(1, Math.floor(data.length / 5));
    return data.filter((_, i) => i % step === 0 || i === data.length - 1);
  }, [data]);

  const gradientId = useId().replace(/:/g, "-");

  if (data.length < 2) return null;

  const w = width - PADDING.left - PADDING.right;
  const h = height - PADDING.top - PADDING.bottom;

  return (
    <div className={cn("relative w-full h-full", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full min-w-0"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor={gradientFrom} stopOpacity="1" />
            <stop offset="1" stopColor={gradientTo} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* 그리드 */}
        {ticks.slice(1, -1).map((val, i) => {
          const y = PADDING.top + h - ((val - ticks[0]) / (ticks[ticks.length - 1] - ticks[0])) * h;
          return (
            <line
              key={i}
              x1={PADDING.left}
              y1={y}
              x2={width - PADDING.right}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray="4 2"
            />
          );
        })}

        {/* 영역 채우기 */}
        <path d={areaPath} fill={`url(#${gradientId})`} />

        {/* 라인 */}
        <path
          d={path}
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Y축 라벨 */}
        {ticks.map((val, i) => {
          const y =
            PADDING.top +
            h -
            ((val - ticks[0]) / (ticks[ticks.length - 1] - ticks[0])) * h;
          return (
            <text
              key={i}
              x={PADDING.left - 8}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-slate-500 text-[13px] font-medium tabular-nums"
            >
              {val.toLocaleString()}
            </text>
          );
        })}

        {/* X축 라벨 */}
        {dateLabels.map((d, i) => {
          const idx = data.indexOf(d);
          const x = PADDING.left + (idx / (data.length - 1)) * w;
          return (
            <text
              key={i}
              x={x}
              y={height - 8}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-500 text-[13px] font-medium"
            >
              {d.date}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// 주가정보 탭용 기본 데이터 (시가 4,090 / 고가 4,485 / 저가 3,045 반영)
export const DEFAULT_STOCK_DATA: DataPoint[] = (() => {
  const base = [
    3045, 3120, 3280, 3350, 3480, 3520, 3680, 3720, 3650, 3580,
    3620, 3780, 3850, 3920, 3990, 4090, 4180, 4250, 4320, 4280,
    4220, 4300, 4380, 4450, 4485, 4420, 4320, 4180, 4090,
  ];
  const dates: string[] = [];
  for (let i = 28; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(`${d.getMonth() + 1}/${d.getDate()}`);
  }
  return base.map((v, i) => ({ date: dates[i], value: v }));
})();
