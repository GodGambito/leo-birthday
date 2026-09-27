"use client";

import React, { useState } from "react";
import { Contributor } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Search, Trophy, MessageCircle, Heart, Star, Sparkles } from "lucide-react";

interface RankingListProps {
  contributors: Contributor[];
}

export default function RankingList({ contributors }: RankingListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  // We filter based on search
  const filtered = contributors.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  // If not searching, we show remaining contributors (starting from 4th place onwards, or all if requested)
  // Let's provide a clear list: if searching, show all matches; if not searching, show from 4th place or all with toggle
  const listToDisplay = searchTerm
    ? filtered
    : showAll
    ? contributors
    : contributors.slice(3);

  const startIndex = searchTerm || showAll ? 0 : 3;

  return (
    <section id="ranking" className="w-full max-w-2xl mx-auto px-4 mb-14">
      <div className="bg-[#181818] border border-[#2b2b2b] rounded-3xl p-5 sm:p-7 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#B6FF00]" />
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Tabla General de Posiciones
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Todos los aportes acumulados con mucho cariño
            </p>
          </div>

          <div className="text-xs font-bold text-zinc-400 bg-[#111111] px-3 py-1.5 rounded-full border border-[#2e2e2e]">
            {contributors.length} {contributors.length === 1 ? "Aportante" : "Aportantes"}
          </div>
        </div>

        {/* Search input */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o familia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#111111] border border-[#2e2e2e] focus:border-[#B6FF00] rounded-xl text-sm text-white placeholder-zinc-500 outline-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white px-1.5 py-0.5"
            >
              Borrar
            </button>
          )}
        </div>

        {/* Toggle between "Solo resto" and "Ver lista completa con Top 3" if not searching */}
        {!searchTerm && contributors.length > 3 && (
          <div className="flex items-center justify-end mb-3">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs font-bold text-[#B6FF00] hover:underline"
            >
              {showAll
                ? "Ocultar Top 3 de esta lista"
                : "Ver lista completa desde el 1°"}
            </button>
          </div>
        )}

        {/* List items */}
        {listToDisplay.length === 0 ? (
          <div className="py-8 text-center text-zinc-400 text-sm">
            {searchTerm ? (
              <p>No se encontraron aportes con &ldquo;{searchTerm}&rdquo;</p>
            ) : (
              <div className="flex flex-col items-center">
                <Sparkles className="w-8 h-8 text-zinc-500 mb-2" />
                <p>¡El Top 3 acapara el podio! ¿Quién será el 4° en sumarse?</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2.5">
            {listToDisplay.map((contributor) => {
              // Calculate actual position index in original array
              const globalIndex = contributors.findIndex(
                (c) => c.id === contributor.id
              );
              const position = globalIndex + 1;

              return (
                <div
                  key={contributor.id}
                  className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-[#121212] border border-[#242424] hover:border-[#B6FF00]/40 transition-colors group"
                >
                  {/* Left: Position and Name */}
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                        position === 1
                          ? "bg-[#B6FF00] text-black shadow-[0_0_10px_rgba(182,255,0,0.5)]"
                          : position === 2
                          ? "bg-slate-300 text-black"
                          : position === 3
                          ? "bg-amber-600 text-white"
                          : "bg-[#1f1f1f] text-zinc-400 border border-[#2e2e2e]"
                      }`}
                    >
                      {position}°
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-sm sm:text-base truncate group-hover:text-[#B6FF00] transition-colors">
                          {contributor.name}
                        </span>
                        {contributor.contribution_count > 1 && (
                          <span className="text-[10px] font-bold text-[#B6FF00] bg-[#B6FF00]/10 px-2 py-0.5 rounded-full border border-[#B6FF00]/30 shrink-0">
                            {contributor.contribution_count} aportes
                          </span>
                        )}
                      </div>

                      {contributor.last_message && (
                        <p className="text-xs text-zinc-400 italic line-clamp-1 mt-0.5">
                          &ldquo;{contributor.last_message}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Amount */}
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-white tabular-nums">
                      {formatCurrency(contributor.total_amount)}
                    </span>
                    <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      Acumulado
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Motivational footer note */}
        <div className="mt-5 pt-4 border-t border-[#262626] text-center">
          <p className="text-xs text-zinc-400">
            ¿Quieres subir en el ranking?{" "}
            <a href="#zelle" className="text-[#B6FF00] font-bold hover:underline">
              ¡Puedes hacer varios aportes y se sumarán automáticamente! 🚀
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
