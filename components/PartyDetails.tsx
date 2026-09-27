"use client";

import React, { useState } from "react";
import { MapPin, Calendar, Clock, Navigation, Copy, Check, ExternalLink } from "lucide-react";

export default function PartyDetails() {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const address = "5131 Crown Haven Dr. Kissimmee, Fl. 34746";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(address)}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(address)}`;

  return (
    <section id="fiesta" className="w-full max-w-2xl mx-auto px-4 mb-16">
      <div className="bg-[#181818] border border-[#2b2b2b] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#B6FF00]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1c1c] border border-[#B6FF00]/40 text-[#B6FF00] text-xs font-bold uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>La Gran Celebración</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Fiesta de Cumpleaños 18 🎉
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            ¡Ven a celebrar junto a Leonardo este momento tan especial!
          </p>
        </div>

        {/* Date and Time Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#111111] border border-[#282828]">
            <div className="w-12 h-12 rounded-xl bg-[#B6FF00]/15 border border-[#B6FF00]/40 flex items-center justify-center text-[#B6FF00] shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Fecha de la Fiesta
              </span>
              <span className="text-base sm:text-lg font-black text-white">
                Viernes, 03 de Octubre
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#111111] border border-[#282828]">
            <div className="w-12 h-12 rounded-xl bg-[#B6FF00]/15 border border-[#B6FF00]/40 flex items-center justify-center text-[#B6FF00] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Hora de Inicio
              </span>
              <span className="text-base sm:text-lg font-black text-white">
                8:30 PM
              </span>
            </div>
          </div>
        </div>

        {/* Location Box */}
        <div className="bg-[#111111] border border-[#282828] rounded-2xl p-5 mb-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#1f1f1f] border border-[#333] flex items-center justify-center text-[#B6FF00] shrink-0 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Lugar del Evento
              </span>
              <p className="text-base sm:text-lg font-black text-white leading-snug">
                {address}
              </p>
            </div>
          </div>

          {/* Copy Address Button */}
          <button
            onClick={handleCopyAddress}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#333333] text-xs font-bold text-zinc-200 flex items-center justify-center gap-2 transition-colors mb-3"
          >
            {copiedAddress ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">¡Dirección copiada!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar dirección</span>
              </>
            )}
          </button>

          {/* Maps Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#181818] hover:bg-[#222] border border-[#2d2d2d] text-xs font-bold text-zinc-300 hover:text-white transition-colors text-center"
            >
              <Navigation className="w-3.5 h-3.5 text-[#B6FF00]" />
              <span>Google Maps</span>
            </a>

            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#181818] hover:bg-[#222] border border-[#2d2d2d] text-xs font-bold text-zinc-300 hover:text-white transition-colors text-center"
            >
              <Navigation className="w-3.5 h-3.5 text-slate-300" />
              <span>Apple Maps</span>
            </a>

            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#181818] hover:bg-[#222] border border-[#2d2d2d] text-xs font-bold text-zinc-300 hover:text-white transition-colors text-center"
            >
              <Navigation className="w-3.5 h-3.5 text-sky-400" />
              <span>Waze</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
