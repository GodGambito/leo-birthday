"use client";

import React from "react";
import { Contributor } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Crown, Medal, Sparkles, MessageCircle, Heart } from "lucide-react";

interface LeaderboardPodiumProps {
  contributors: Contributor[];
}

export default function LeaderboardPodium({
  contributors,
}: LeaderboardPodiumProps) {
  const first = contributors[0];
  const second = contributors[1];
  const third = contributors[2];

  if (!first) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-8 text-center bg-[#181818] border border-[#2b2b2b] rounded-2xl mb-12">
        <Crown className="w-12 h-12 text-[#B6FF00] mx-auto mb-3 animate-bounce" />
        <h3 className="text-xl font-bold text-white mb-1">
          ¡El podio de honor está esperando!
        </h3>
        <p className="text-zinc-400 text-sm max-w-md mx-auto mb-4">
          Sé el primero en enviar tu aporte por Zelle para coronarte en el 1er lugar del ranking de Leo.
        </p>
        <a
          href="#zelle"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B6FF00] text-black font-extrabold text-sm hover:bg-[#a5eb00] transition-colors"
        >
          <Heart className="w-4 h-4 fill-black" />
          Aportar ahora
        </a>
      </div>
    );
  }

  return (
    <section id="podio" className="w-full max-w-3xl mx-auto px-4 mb-10">
      {/* Section Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1c1c] border border-[#B6FF00]/40 text-[#B6FF00] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Líderes de la Misión</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          PODIO DE HONOR 🏆
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-lg mx-auto">
          Los mayores padrinos musicales de Leonardo. Recuerda:{" "}
          <span className="text-zinc-300 italic">
            &ldquo;quien más quiera a Leo, más va a contribuir&rdquo;
          </span>{" "}
          👀😂
        </p>
      </div>

      {/* Podium Cards Grid (Mobile responsive: 2nd, 1st, 3rd) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-4">
        {/* SECOND PLACE (Silver) */}
        {second ? (
          <div className="order-2 md:order-1 bg-gradient-to-b from-[#1e1e1e] to-[#141414] border-2 border-slate-400/40 rounded-2xl p-5 shadow-xl relative flex flex-col items-center text-center">
            {/* Medal badge */}
            <div className="w-12 h-12 rounded-full bg-slate-200/10 border-2 border-slate-300 flex items-center justify-center text-slate-200 mb-3 shadow-[0_0_15px_rgba(226,232,240,0.2)]">
              <span className="text-xl font-black">2°</span>
            </div>

            <span className="text-[11px] font-extrabold text-slate-300 uppercase tracking-widest px-2 py-0.5 rounded bg-slate-400/10 mb-2 border border-slate-400/20">
              Plata 🥈
            </span>

            <h3 className="text-base sm:text-lg font-extrabold text-white mb-1 line-clamp-1">
              {second.name}
            </h3>

            <div className="text-2xl font-black text-slate-100 mb-1">
              {formatCurrency(second.total_amount)}
            </div>

            {second.contribution_count > 1 && (
              <span className="text-[10px] font-bold text-[#B6FF00] bg-[#B6FF00]/10 px-2 py-0.5 rounded-full border border-[#B6FF00]/20 mb-2">
                {second.contribution_count} aportes sumados
              </span>
            )}

            {second.last_message && (
              <div className="mt-2 text-xs text-zinc-400 italic bg-[#111111] p-2 rounded-lg border border-[#262626] w-full flex items-start gap-1.5 line-clamp-2">
                <MessageCircle className="w-3.5 h-3.5 shrink-0 text-slate-400 mt-0.5" />
                <span>&ldquo;{second.last_message}&rdquo;</span>
              </div>
            )}
          </div>
        ) : (
          <div className="order-2 md:order-1 border border-dashed border-[#333333] rounded-2xl p-6 text-center text-zinc-500 text-xs">
            2do Lugar vacante 🥈
          </div>
        )}

        {/* FIRST PLACE (Gold / Neon Lime Halo) */}
        <div className="order-1 md:order-2 bg-gradient-to-b from-[#242424] via-[#1a1a1a] to-[#121212] border-2 border-[#B6FF00] rounded-3xl p-6 sm:p-7 shadow-[0_0_30px_rgba(182,255,0,0.25)] relative flex flex-col items-center text-center -translate-y-1 sm:-translate-y-2">
          {/* Crown badge */}
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-full bg-[#B6FF00]/15 border-2 border-[#B6FF00] flex items-center justify-center text-[#B6FF00] shadow-[0_0_20px_rgba(182,255,0,0.5)]">
              <Crown className="w-8 h-8 text-[#B6FF00] fill-[#B6FF00]/20 animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#B6FF00] text-black font-black text-xs px-2 py-0.5 rounded-full border border-black shadow">
              1°
            </div>
          </div>

          <span className="text-[11px] font-black text-black bg-[#B6FF00] uppercase tracking-widest px-3 py-0.5 rounded-full mb-2 shadow-[0_0_10px_rgba(182,255,0,0.4)]">
            👑 FAN #1 DE LEO 👑
          </span>

          <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
            {first.name}
          </h3>

          <div className="text-3xl sm:text-4xl font-black text-[#B6FF00] tracking-tight mb-1">
            {formatCurrency(first.total_amount)}
          </div>

          {first.contribution_count > 1 && (
            <span className="text-xs font-bold text-white bg-[#B6FF00]/20 px-2.5 py-0.5 rounded-full border border-[#B6FF00]/40 mb-2">
              🔥 {first.contribution_count} aportes sumados
            </span>
          )}

          {first.last_message && (
            <div className="mt-2 text-xs text-zinc-300 italic bg-[#111111] p-2.5 rounded-xl border border-[#B6FF00]/20 w-full flex items-start gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 shrink-0 text-[#B6FF00] mt-0.5" />
              <span>&ldquo;{first.last_message}&rdquo;</span>
            </div>
          )}
        </div>

        {/* THIRD PLACE (Bronze) */}
        {third ? (
          <div className="order-3 bg-gradient-to-b from-[#1e1e1e] to-[#141414] border-2 border-amber-700/40 rounded-2xl p-5 shadow-xl relative flex flex-col items-center text-center">
            {/* Medal badge */}
            <div className="w-12 h-12 rounded-full bg-amber-700/10 border-2 border-amber-600 flex items-center justify-center text-amber-500 mb-3 shadow-[0_0_15px_rgba(205,127,50,0.2)]">
              <span className="text-xl font-black">3°</span>
            </div>

            <span className="text-[11px] font-extrabold text-amber-500 uppercase tracking-widest px-2 py-0.5 rounded bg-amber-700/10 mb-2 border border-amber-700/20">
              Bronce 🥉
            </span>

            <h3 className="text-base sm:text-lg font-extrabold text-white mb-1 line-clamp-1">
              {third.name}
            </h3>

            <div className="text-2xl font-black text-amber-400 mb-1">
              {formatCurrency(third.total_amount)}
            </div>

            {third.contribution_count > 1 && (
              <span className="text-[10px] font-bold text-[#B6FF00] bg-[#B6FF00]/10 px-2 py-0.5 rounded-full border border-[#B6FF00]/20 mb-2">
                {third.contribution_count} aportes sumados
              </span>
            )}

            {third.last_message && (
              <div className="mt-2 text-xs text-zinc-400 italic bg-[#111111] p-2 rounded-lg border border-[#262626] w-full flex items-start gap-1.5 line-clamp-2">
                <MessageCircle className="w-3.5 h-3.5 shrink-0 text-amber-500 mt-0.5" />
                <span>&ldquo;{third.last_message}&rdquo;</span>
              </div>
            )}
          </div>
        ) : (
          <div className="order-3 border border-dashed border-[#333333] rounded-2xl p-6 text-center text-zinc-500 text-xs">
            3er Lugar vacante 🥉
          </div>
        )}
      </div>
    </section>
  );
}
