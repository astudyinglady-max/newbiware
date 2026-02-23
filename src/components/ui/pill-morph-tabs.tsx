"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export interface PillTab {
  value: string;
  label: React.ReactNode;
  panel?: React.ReactNode;
}

interface PillMorphTabsProps {
  items?: PillTab[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export default function PillMorphTabs({
  items = [],
  defaultValue,
  onValueChange,
  className,
}: PillMorphTabsProps) {
  const first = items[0]?.value ?? "tab-0";
  const [value, setValue] = React.useState<string>(defaultValue ?? first);
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  const [indicator, setIndicator] = React.useState<{ left: number; width: number } | null>(null);
  const [isExpanding, setIsExpanding] = React.useState(false);

  const measure = React.useCallback(() => {
    const list = listRef.current;
    const activeEl = triggerRefs.current[value];
    if (!list || !activeEl) {
      setIndicator(null);
      return;
    }
    const listRect = list.getBoundingClientRect();
    const tRect = activeEl.getBoundingClientRect();
    setIndicator({
      left: tRect.left - listRect.left + list.scrollLeft,
      width: tRect.width,
    });
  }, [value]);

  React.useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    Object.values(triggerRefs.current).forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  React.useEffect(() => {
    setIsExpanding(true);
    const id = window.setTimeout(() => setIsExpanding(false), 300);
    return () => window.clearTimeout(id);
  }, [value]);

  React.useEffect(() => {
    if (onValueChange) onValueChange(value);
  }, [value, onValueChange]);

  return (
    <div className={cn("w-full", className)}>
      <Tabs value={value} onValueChange={(v) => setValue(v)}>
        <div
          ref={listRef}
          className={cn(
            "relative",
            "flex items-center gap-1 rounded-full py-4 px-24 mt-4 mb-4 min-h-[80px]",
          )}
        >
          {indicator && (
            <motion.div
              layout
              initial={false}
              animate={{
                left: indicator.left,
                width: indicator.width,
                scaleY: isExpanding ? 1.02 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 50,
              }}
              className="absolute pointer-events-none top-1 bottom-1 rounded-full bg-[#0A31A8] hover:bg-[#666666] min-w-[80px] "
              style={{
                left: indicator.left,
                width: indicator.width,
              }}
            />
          )}

          <TabsList className="relative flex gap-4 p-0 bg-transparent items-center">
            {items.map((it) => {
              const isActive = it.value === value;
              return (
                <TabsTrigger
                  key={it.value}
                  value={it.value}
                  ref={(el: HTMLButtonElement | null) => (triggerRefs.current[it.value] = el)}
                  className={cn(
                    "relative z-10 px-5 py-2 rounded-full text-xl font-medium transition-all duration-200 bg-transparent border-0 shadow-none",
                    "data-[state=active]:bg-transparent",
                    isActive 
                      ? " text-white font-medium"
                      : "text-slate-700 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  )}
                >
                  {it.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        <div className="mt-4">
          {items.map((it) => (
            <TabsContent key={it.value} value={it.value} className="p-0 mt-8">
              {it.panel ?? null}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

