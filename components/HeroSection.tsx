"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Heart, ArrowDown, ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-6 pb-10 px-4 overflow-hidden">
      {/* Decorative gradient glow behind hero */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#B6FF00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Top celebratory badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c1c1c] border border-[#B6FF00]/40 text-[#B6FF00] text-xs font-bold uppercase tracking-wider mb-5 shadow-[0_0_15px_rgba(182,255,0,0.15)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>¡Gran Cumpleaños 18!</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B6FF00] animate-pulse" />
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-2 leading-[1.1]">
          MISIÓN <span className="text-[#B6FF00]">ACORDEÓN</span>
        </h1>
        <p className="text-lg sm:text-xl font-semibold text-zinc-300 mb-6">
          Para <span className="text-white border-b-2 border-[#B6FF00]">Leonardo Barreto Finol</span>
        </p>

        {/* Leo photo card */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#B6FF00] via-[#8ec800] to-[#B6FF00] rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition duration-500" />
          <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#B6FF00] bg-[#1a1a1a] shadow-2xl">
            <Image
              src="/foto_leo.jpeg"
              alt="Leonardo Barreto Finol - Cumpleaños 18"
              fill
              className="object-cover object-top hover:scale-105 transition-transform duration-500"
              priority
            />
            {/* 18 badge overlay */}
            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-[#B6FF00] font-black text-xl px-2.5 py-0.5 rounded-xl border border-[#B6FF00]/60 shadow-lg">
              18
            </div>
            {/* Name pill */}
            <div className="absolute bottom-2.5 inset-x-2.5 bg-black/85 backdrop-blur-md py-1 px-2 rounded-xl text-center border border-white/10">
              <span className="text-xs font-bold text-white tracking-wide">
                ¡El cumpleañero! 🪗
              </span>
            </div>
          </div>
        </div>

        {/* Invitation humor quote */}
        <div className="max-w-xl bg-[#191919] border border-[#2c2c2c] rounded-2xl p-4 sm:p-5 mb-8 shadow-xl text-left relative">
          <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-md bg-[#B6FF00] text-black text-[11px] font-black uppercase tracking-wider">
            El Regalo Soñado 🎁
          </div>
          <p className="text-zinc-200 text-sm sm:text-base leading-relaxed mt-1">
            <span className="font-semibold text-white">
              &ldquo;Leo fue bastante específico este año: quiere un acordeón. Sí, un acordeón.&rdquo;
            </span>{" "}
            🪗😂
          </p>
          <div className="mt-3 pt-3 border-t border-[#2a2a2a] flex items-center justify-between text-xs text-zinc-400">
            <span>🎂 Cumpleaños: <strong>28 de Septiembre</strong></span>
            <span>🎉 Fiesta: <strong>03 de Octubre</strong></span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href="#zelle"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#B6FF00] text-black font-extrabold text-base hover:bg-[#a5eb00] active:scale-95 transition-all shadow-[0_0_20px_rgba(182,255,0,0.35)]"
          >
            <Heart className="w-5 h-5 fill-black" />
            <span>Sumarme con mi Aporte (Zelle)</span>
          </a>

          <a
            href="#ranking"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1a1a1a] text-white font-bold text-base border border-[#333333] hover:border-[#B6FF00] hover:text-[#B6FF00] active:scale-95 transition-all"
          >
            <span>Ver Tabla de Posiciones</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
