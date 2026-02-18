"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

export type FinancialBarSeries = {
  label: string;
  color: "blue" | "red";
  values: number[];
};

type FinancialHorizontalBarChartProps = {
  title: string;
  series1: FinancialBarSeries;
  series2: FinancialBarSeries;
  years: string[];
  width?: number;
  height?: number;
  className?: string;
};

const PADDING = { top: 32, right: 56, bottom: 40, left: 52 };
const BLUE = "#3B82F6";
const RED = "#EF4444";

export function FinancialHorizontalBarChart({
  title,
  series1,
  series2,
  years,
  width = 420,
  height = 220,
  className = "",
}: FinancialHorizontalBarChartProps) {
  const { plotLeft, plotRight, plotTop, plotH, xScale, originX, rowHeight } = useMemo(() => {
    const allValues = [...series1.values, ...series2.values];
    const minVal = Math.min(...allValues, 0);
    const maxVal = Math.max(...allValues, 0);
    const range = maxVal - minVal || 1;
    const pad = Math.max(range * 0.08, Math.abs(minVal) * 0.1, maxVal * 0.1);
    const xMin = minVal - pad;
    const xMax = maxVal + pad;
    const totalRange = xMax - xMin;

    const plotLeft = PADDING.left;
    const plotRight = width - PADDING.right;
    const plotW = plotRight - plotLeft;
    const originX = plotLeft + ((0 - xMin) / totalRange) * plotW;

    const plotTop = PADDING.top;
    const plotBottom = height - PADDING.bottom;
    const plotH = plotBottom - plotTop;
    const rowHeight = plotH / years.length;

    const xScale = (v: number) => plotLeft + ((v - xMin) / totalRange) * plotW;

    return { plotLeft, plotRight, plotTop, plotH, xScale, originX, rowHeight };
  }, [series1.values, series2.values, years.length, width, height]);

  const xTicks = useMemo(() => {
    const allValues = [...series1.values, ...series2.values];
    const minVal = Math.min(...allValues, 0);
    const maxVal = Math.max(...allValues, 0);
    const range = Math.max(maxVal - minVal, Math.abs(minVal), maxVal) || 1;
    const step = range <= 100 ? 20 : range <= 500 ? 100 : range <= 5000 ? 1000 : range <= 50000 ? 10000 : 50000;
    const ticks: number[] = [];
    let t = Math.floor(minVal / step) * step;
    while (t <= maxVal + step * 0.5) {
      ticks.push(t);
      t += step;
    }
    return ticks.filter((v, i, arr) => arr.indexOf(v) === i).slice(0, 8);
  }, [series1.values, series2.values]);

  return (
    <div className={cn("relative w-full h-full min-w-0", className)}>
      <p className="text-[18px] font-medium text-slate-700">{title}</p>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full min-w-0"
      >
        {/* 그리드 */}
        {xTicks
          .filter((t) => t !== 0)
          .map((tick, i) => {
            const x = xScale(tick);
            if (x <= plotLeft || x >= plotRight) return null;
            return (
              <line
                key={i}
                x1={x}
                y1={plotTop}
                x2={x}
                y2={plotTop + plotH}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
            );
          })}

        {/* 0 기준선 */}
        {originX > plotLeft && originX < plotRight && (
          <line
            x1={originX}
            y1={plotTop}
            x2={originX}
            y2={plotTop + plotH}
            stroke="#94a3b8"
            strokeWidth="1"
          />
        )}

        {/* 막대 */}
        {years.map((year, i) => {
          const rowTop = plotTop + rowHeight * i;
          const y1 = rowTop + rowHeight * 0.22;
          const y2 = rowTop + rowHeight * 0.62;
          const v1 = series1.values[i];
          const v2 = series2.values[i];
          const x1 = xScale(v1);
          const x2 = xScale(v2);
          const barHeight = rowHeight * 0.2;

          return (
            <g key={year}>
              {/* 연도 라벨 */}
              <text
                x={plotLeft - 25}
                y={rowTop + rowHeight * 0.4}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-slate-500 text-[9px] font-medium"
              >
                {year}
              </text>

              {/* 시리즈1 (blue) */}
              <rect
                x={Math.min(originX, x1)}
                y={y1 - barHeight / 2}
                width={Math.abs(x1 - originX) || 2}
                height={barHeight}
                fill={series1.color === "blue" ? BLUE : RED}
                rx="2"
              />
              <text
                x={x1 + (v1 >= 0 ? 6 : -6)}
                y={y1}
                textAnchor={v1 >= 0 ? "start" : "end"}
                dominantBaseline="middle"
                className="fill-slate-700 text-[10px] font-medium tabular-nums"
              >
                {v1.toLocaleString()}
              </text>

              {/* 시리즈2 (red) */}
              <rect
                x={Math.min(originX, x2)}
                y={y2 - barHeight / 2}
                width={Math.abs(x2 - originX) || 2}
                height={barHeight}
                fill={series2.color === "blue" ? BLUE : RED}
                rx="2"
              />
              <text
                x={x2 + (v2 >= 0 ? 6 : -6)}
                y={y2}
                textAnchor={v2 >= 0 ? "start" : "end"}
                dominantBaseline="middle"
                className="fill-slate-700 text-[10px] font-medium tabular-nums"
              >
                {v2.toLocaleString()}
              </text>
            </g>
          );
        })}

        {/* X축 눈금 */}
        {xTicks.map((tick, i) => {
          const x = xScale(tick);
          if (x < plotLeft + 24 || x > plotRight - 24) return null;
          return (
            <text
              key={i}
              x={x}
              y={height - 12}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-500 text-[10px] font-medium tabular-nums"
            >
              {tick >= 10000 ? `${(tick / 10000).toFixed(0)}만` : tick.toLocaleString()}
            </text>
          );
        })}
      </svg>

      {/* 범례 */}
      <div className="flex gap-6 mt-4">
        <div className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-sm shrink-0"
            style={{ backgroundColor: BLUE }}
          />
          <span className="text-[18px] text-slate-500">{series1.label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-sm shrink-0"
            style={{ backgroundColor: RED }}
          />
          <span className="text-[18px] text-slate-500">{series2.label}</span>
        </div>
      </div>
    </div>
  );
}
