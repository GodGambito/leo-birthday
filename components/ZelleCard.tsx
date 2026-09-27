"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Copy, Check, Heart, ExternalLink, HelpCircle, AlertCircle } from "lucide-react";

export default function ZelleCard() {
  const [copied, setCopied] = useState(false);
  const zelleNumber = "3056804441";
  const zelleFormatted = "305-680-4441";
  const zelleHolder = "Americo Barreto";

  const handleCopy = () => {
    navigator.clipboard.writeText(zelleNumber);
    setCopied(true);

    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.8 },
      colors: ["#B6FF00", "#7414CA", "#FFFFFF"],
    });

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <section id="zelle" className="w-full max-w-2xl mx-auto px-4 mb-14">
      <div className="bg-[#181818] border-2 border-[#B6FF00]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_35px_rgba(182,255,0,0.12)] relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#B6FF00]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Zelle badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">💜</span>
              <h3 className="text-2xl font-black text-white tracking-tight">
                ¿Cómo hacer tu aporte?
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Vía Zelle directo • Rápido, seguro y sin comisiones
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7414CA]/20 border border-[#7414CA]/50 text-purple-300 text-xs font-black uppercase tracking-wider">
            <span>Zelle Oficial</span>
          </div>
        </div>

        {/* Zelle Info Box */}
        <div className="bg-[#111111] border border-[#2b2b2b] rounded-2xl p-5 mb-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-1">
                Número de Teléfono Zelle
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#B6FF00] tracking-wider tabular-nums">
                {zelleFormatted}
              </div>
              <div className="text-sm font-semibold text-zinc-300 mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Titular: <strong>{zelleHolder}</strong></span>
              </div>
            </div>

            {/* Big 1-tap copy button */}
            <button
              onClick={handleCopy}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
                copied
                  ? "bg-emerald-500 text-black shadow-emerald-500/20"
                  : "bg-[#B6FF00] text-black hover:bg-[#a6eb00] shadow-[0_0_20px_rgba(182,255,0,0.3)]"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Copiado al portapapeles!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Teléfono Zelle</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Important note for ranking */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-3.5 sm:p-4 mb-5 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#B6FF00] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-zinc-300">
            <span className="font-bold text-white block mb-0.5">
              ⚠️ ¡Muy importante para salir en el ranking!
            </span>
            En la nota o descripción de tu transferencia Zelle, escribe tu{" "}
            <strong className="text-[#B6FF00]">Nombre y Apellido</strong> (o tu
            dedicatoria) para que Leonardo y su mamá Paola puedan registrar tu aporte y
            actualizar tu posición en el podio.
          </div>
        </div>

        {/* Flyer humorous highlight */}
        <div className="text-center p-3 rounded-xl bg-[#B6FF00]/10 border border-[#B6FF00]/25">
          <p className="text-xs sm:text-sm text-zinc-200 italic font-medium">
            &ldquo;Cualquier aporte suma... aunque ya sabemos que quien más quiera a
            Leo, más va a contribuir. 👀😂&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
