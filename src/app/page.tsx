"use client";

import React from "react";
import renewalData from "@/data/renewal.json";

// Types
import {
  RenewalData,
  HeroProps,
  StatsBarProps,
  TabbedCardsProps,
  SynergySectionProps,
  WhyUBcareProps,
  IRNewsProps,
  ContactCTAProps
} from "@/types/renewal";

// Components
import ShaderShowcase from "@/components/ui/hero";
import { StatsBar } from "@/components/home/StatsBar";
import { TabbedCards } from "@/components/home/TabbedCards";
import { SynergySection } from "@/components/home/SynergySection";
import { WhyUBcare } from "@/components/home/WhyUBcare";
import { IRNews } from "@/components/home/IRNews";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Hero3D } from "@/components/home/Hero3D";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Activity, Pill, LineChart } from "lucide-react";
import SolutionsGrid from "@/components/home/SolutionGrid";
import TrustBadges from "@/components/home/TrustBadges";
import InteractiveDemo from "@/components/home/InteractiveDemo";


export default function Home() {
  const data = renewalData as unknown as RenewalData;
  const { sections } = data.pageContent.home;

  // Helper to extract props safely with generics
  const getProps = <T,>(id: string) => sections.find(s => s.id === id)?.props as T | undefined;

  const heroProps = getProps<HeroProps>("hero");
  const hero3DProps = heroProps ? {
    headline: heroProps.headline,
    subHeadline: heroProps.subHeadline,
    badge: { label: "2024 Renewal", color: "blue" },
    cta: {
      primary: heroProps.ctaPrimary,
      secondary: heroProps.ctaSecondary
    }
  } : null;

  const metricsProps = getProps<StatsBarProps>("metrics");
  const businessProps = getProps<TabbedCardsProps>("business_solutions");
  const synergyProps = getProps<SynergySectionProps>("synergy");
  const whyProps = getProps<WhyUBcareProps>("why_ubcare");
  const irProps = getProps<IRNewsProps>("ir_news");
  const contactProps = getProps<ContactCTAProps>("contact");

  return (
    <div className="flex flex-col w-full bg-white min-h-screen text-slate-900">

      {/* 1. Hero Section (Shader) */}
      {heroProps && <ShaderShowcase {...heroProps} />}

      {/* 2. Trust Metrics Bar */}
      {metricsProps && (
        <StatsBar items={metricsProps.items} />
      )}

      
      {/* 3. Business Solutions */}
      {businessProps && (
        <SolutionsGrid />

      )}

      <InteractiveDemo />

      {/* 4. Synergy Spotlight (Ddocdoc + Dr.Vice) */}
      {synergyProps && (
        <SynergySection
          headline={synergyProps.headline}
          center={synergyProps.center}
          left={synergyProps.left}
          right={synergyProps.right}
        />
      )}

      {/* 5. Why UBcare */}
      {whyProps && (
        <WhyUBcare
          headline={whyProps.headline}
          subHeadline={whyProps.subHeadline}
          features={whyProps.features}
        />
      )}

     
    

      {/* 6. IR & News */}
      {irProps && (
        <IRNews
          headline={irProps.headline}
          stockPrice={irProps.stockPrice}
          stockChange={irProps.stockChange}
          news={irProps.news}
        />
      )}

       <TrustBadges />

      {/* 7. Contact CTA */}
      {contactProps && (
        <ContactCTA
          headline={contactProps.headline}
          primaryBtn={contactProps.primaryBtn}
          secondaryBtn={contactProps.secondaryBtn}
        />
      )}


      

    </div>
  );
}
