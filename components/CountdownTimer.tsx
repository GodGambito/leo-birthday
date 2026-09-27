"use client";

import React, { useState, useEffect } from "react";
import { Clock, Calendar, Sparkles } from "lucide-react";

export default function CountdownTimer() {
  // Target dates:
  // Birthday: Sept 28, 2026 00:00:00
  // Party: Oct 3, 2026 20:30:00 (Kissimmee, FL / Eastern Time)
  const currentYear = new Date().getFullYear();
  const partyDate = new Date(`${currentYear}-10-03T20:30:00`);
  const birthdayDate = new Date(`${currentYear}-09-28T00:00:00`);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthdayPassed: false,
    isPartyPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const partyTime = partyDate.getTime();
      const birthdayTime = birthdayDate.getTime();

      const diffParty = partyTime - now;
      const diffBirthday = birthdayTime - now;

      const isBirthdayPassed = diffBirthday <= 0;
      const isPartyPassed = diffParty <= 0;

      // Primary countdown is to the party (Oct 3 8:30 PM)
      const targetDiff = isPartyPassed ? 0 : Math.max(0, diffParty);

      const days = Math.floor(targetDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (targetDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((targetDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((targetDiff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isBirthdayPassed,
        isPartyPassed,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mb-10">
      <div className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#B6FF00]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#B6FF00]" />
            <h3 className="font-extrabold text-white text-base sm:text-lg">
              Cuenta Regresiva para la Gran Fiesta
            </h3>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#222222] text-zinc-300 border border-[#333333]">
            <Calendar className="w-3.5 h-3.5 text-[#B6FF00]" />
            <span>Viernes, 03 de Octubre • 8:30 PM</span>
          </div>
        </div>

        {/* Countdown units */}
        {timeLeft.isPartyPassed ? (
          <div className="py-6 text-center">
            <span className="text-3xl sm:text-4xl font-black text-[#B6FF00]">
              ¡LA FIESTA YA COMENZÓ! 🥳🪗
            </span>
            <p className="text-zinc-400 mt-2 text-sm">
              ¡Que suene ese acordeón a todo volumen!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: "DÍAS", value: timeLeft.days },
              { label: "HORAS", value: timeLeft.hours },
              { label: "MINUTOS", value: timeLeft.minutes },
              { label: "SEGUNDOS", value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-[#111111] border border-[#282828] hover:border-[#B6FF00]/40 transition-colors"
              >
                <span className="text-2xl sm:text-4xl font-black text-white tracking-tight tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-[#B6FF00] tracking-wider mt-0.5">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Birthday banner notice */}
        <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B6FF00]" />
            <span>
              Cumpleaños oficial: <strong className="text-white">28 de Septiembre</strong>
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-[#252525] text-zinc-300">
            Kissimmee, FL
          </span>
        </div>
      </div>
    </div>
  );
}
