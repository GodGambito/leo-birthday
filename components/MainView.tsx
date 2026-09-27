"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import CountdownTimer from "./CountdownTimer";
import AccordionProgress from "./AccordionProgress";
import LeaderboardPodium from "./LeaderboardPodium";
import RankingList from "./RankingList";
import ZelleCard from "./ZelleCard";
import PartyDetails from "./PartyDetails";
import { SummaryData } from "@/lib/types";
import { Heart, RefreshCw } from "lucide-react";

interface MainViewProps {
  initialSummary: SummaryData;
}

export default function MainView({ initialSummary }: MainViewProps) {
  const [summary, setSummary] = useState<SummaryData>(initialSummary);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Poll for updates every 30 seconds so attendees see changes live
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/contributions");
        if (res.ok) {
          const data: SummaryData = await res.json();
          setSummary(data);
        }
      } catch (err) {
        console.warn("Error refreshing summary:", err);
      }
    };

    const interval = setInterval(fetchLatest, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/contributions");
      if (res.ok) {
        const data: SummaryData = await res.json();
        setSummary(data);
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#f4f4f4] bg-grid-pattern flex flex-col">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto pt-2 pb-12">
        {/* Hero Section */}
        <HeroSection />

        {/* Countdown */}
        <CountdownTimer />

        {/* Accordion Progress Thermometer */}
        <AccordionProgress
          totalRaised={summary.totalRaised}
          goalAmount={summary.goalAmount}
          contributorCount={summary.contributorCount}
        />

        {/* Live update indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-[#2b2b2b] text-[11px] font-semibold text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-[#B6FF00] animate-ping" />
            <span>Ranking en vivo</span>
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="ml-1 p-0.5 text-zinc-400 hover:text-[#B6FF00] transition-colors"
              title="Actualizar ranking"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>
          </span>
        </div>

        {/* Top 3 Podium */}
        <LeaderboardPodium contributors={summary.contributors} />

        {/* General Leaderboard Table */}
        <RankingList contributors={summary.contributors} />

        {/* Zelle Information & 1-Tap Copy */}
        <ZelleCard />

        {/* Celebration / Party Details in Kissimmee */}
        <PartyDetails />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#222222] bg-[#0d0d0d] py-8 px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-2">
          <p className="text-xs sm:text-sm text-zinc-400 font-medium flex items-center justify-center gap-1.5">
            Hecho con <Heart className="w-3.5 h-3.5 fill-[#B6FF00] text-[#B6FF00]" /> para{" "}
            <strong className="text-white">Leonardo Barreto Finol</strong> en sus 18
          </p>
          <p className="text-[11px] text-zinc-600">
            Kissimmee, Florida • 28 Septiembre & 03 Octubre
          </p>
        </div>
      </footer>
    </div>
  );
}
