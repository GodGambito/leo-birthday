"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Trophy, MapPin, Share2 } from "lucide-react";

export default function Navbar() {
  const [copied, setCopied] = useState(false);

  const handleCelebrate = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.1 },
      colors: ["#B6FF00", "#FFFFFF", "#FFD700"],
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: "Misión Acordeón para Leo 🪗 Cumpleaños 18",
      text: "¡Acompáñanos a regalarle a Leo su acordeón soñado en sus 18! Mira el ranking en vivo aquí: ",
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User dismissed share dialog
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#111111]/85 border-b border-[#252525] px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCelebrate}
            className="w-9 h-9 rounded-full bg-[#1e1e1e] border border-[#B6FF00]/40 flex items-center justify-center text-lg hover:scale-105 active:scale-95 transition-transform"
            title="¡Toca para celebrar!"
          >
            🪗
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-white text-sm sm:text-base">
                LEO <span className="text-[#B6FF00]">18</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#B6FF00]/20 text-[#B6FF00] border border-[#B6FF00]/30">
                Misión Acordeón
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium hidden sm:block">
              Leonardo Barreto Finol
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2">
          <a
            href="#ranking"
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-[#1c1c1c] text-zinc-300 hover:text-[#B6FF00] border border-[#2b2b2b] transition-colors"
          >
            <Trophy className="w-3.5 h-3.5 text-[#B6FF00]" />
            <span className="hidden xs:inline">Ranking</span>
          </a>

          <a
            href="#fiesta"
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-[#1c1c1c] text-zinc-300 hover:text-white border border-[#2b2b2b] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden xs:inline">Fiesta</span>
          </a>

          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#B6FF00] text-black hover:bg-[#a6eb00] active:scale-95 transition-all shadow-[0_0_12px_rgba(182,255,0,0.3)]"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "¡Copiado!" : "Compartir"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
