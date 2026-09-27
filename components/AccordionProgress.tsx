"use client";

import React from "react";
import { formatCurrency } from "@/lib/utils";
import { Target, Users, Flame, CheckCircle2 } from "lucide-react";

interface AccordionProgressProps {
  totalRaised: number;
  goalAmount: number;
  contributorCount: number;
}

export default function AccordionProgress({
  totalRaised,
  goalAmount,
  contributorCount,
}: AccordionProgressProps) {
  const percentage = Math.min(
    Math.round((totalRaised / (goalAmount || 1000)) * 100),
    100
  );

  const rawPercentage = ((totalRaised / (goalAmount || 1000)) * 100).toFixed(0);

  // Motivational message
  const getMotivationalStatus = () => {
    if (percentage >= 100) {
      return {
        badge: "¡META ALCANZADA! 🥳🎉",
        text: "¡El acordeón está 100% asegurado para Leo! ¡A seguir sumando para el estuche y accesorios!",
        color: "text-[#B6FF00]",
      };
    }
    if (percentage >= 75) {
      return {
        badge: "¡Casi casi listo! 🔥",
        text: "¡Falta muy poco para alcanzar el objetivo! Leo ya se ve tocando vallenato.",
        color: "text-[#B6FF00]",
      };
    }
    if (percentage >= 50) {
      return {
        badge: "¡A mitad de camino! 🚀",
        text: "¡Ya superamos el 50%! El fuelle del acordeón ya se empieza a escuchar.",
        color: "text-amber-400",
      };
    }
    if (percentage >= 25) {
      return {
        badge: "¡Tomando fuerza! 🪗",
        text: "¡Los aportes van llegando con todo el cariño de la familia y amigos!",
        color: "text-zinc-300",
      };
    }
    return {
      badge: "¡Arrancando la misión! 🎵",
      text: "Cada aporte acerca a Leo a su gran regalo de 18 años.",
      color: "text-zinc-400",
    };
  };

  const status = getMotivationalStatus();

  return (
    <section className="w-full max-w-2xl mx-auto px-4 mb-12">
      <div className="bg-[#181818] border-2 border-[#2b2b2b] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Neon accent top border */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#B6FF00] to-transparent" />

        {/* Section title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🪗</span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Termómetro del Acordeón
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Meta para comprar el acordeón de cumpleaños
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] border border-[#333333] text-xs font-bold text-zinc-300">
            <Users className="w-3.5 h-3.5 text-[#B6FF00]" />
            <span>{contributorCount} personas sumadas</span>
          </div>
        </div>

        {/* Big numbers */}
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-zinc-400 block mb-1">
              Total Recaudado
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-[#B6FF00] tracking-tight">
                {formatCurrency(totalRaised)}
              </span>
              <span className="text-zinc-400 text-sm font-semibold">
                de {formatCurrency(goalAmount)}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {rawPercentage}%
            </span>
            <span className="text-[11px] uppercase font-bold text-zinc-400 block">
              Alcanzado
            </span>
          </div>
        </div>

        {/* Custom Accordion Progress Bar */}
        <div className="relative w-full h-7 bg-[#111111] rounded-2xl p-1 border border-[#2e2e2e] overflow-hidden mb-4 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#8ec800] via-[#B6FF00] to-[#d6ff47] rounded-xl transition-all duration-1000 ease-out flex items-center justify-end pr-2 shadow-[0_0_15px_rgba(182,255,0,0.5)]"
            style={{ width: `${Math.max(percentage, 5)}%` }}
          >
            {percentage >= 15 && (
              <span className="text-black font-extrabold text-[11px] tracking-wider animate-pulse">
                🪗
              </span>
            )}
          </div>
        </div>

        {/* Visual Accordion Bellows Illustration */}
        <div className="flex items-center justify-center gap-1 py-1 px-2 rounded-xl bg-[#121212] border border-[#242424] mb-4">
          <span className="text-xs font-bold text-zinc-500 mr-2 uppercase tracking-wider">
            Fuelle:
          </span>
          {[...Array(12)].map((_, i) => {
            const isLit = (i / 12) * 100 < percentage;
            return (
              <div
                key={i}
                className={`h-4 sm:h-5 w-2 sm:w-2.5 rounded-sm transition-all duration-500 ${
                  isLit
                    ? "bg-[#B6FF00] shadow-[0_0_8px_rgba(182,255,0,0.6)]"
                    : "bg-[#252525]"
                }`}
                style={{
                  transform: isLit ? "scaleY(1.15)" : "scaleY(0.85)",
                }}
              />
            );
          })}
        </div>

        {/* Motivational status message */}
        <div className="flex items-start gap-2.5 bg-[#121212] border border-[#262626] rounded-xl p-3 sm:p-3.5">
          <Flame className="w-5 h-5 text-[#B6FF00] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className={`font-bold block ${status.color}`}>
              {status.badge}
            </span>
            <span className="text-zinc-300 font-medium">
              {status.text}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
