"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Contributor, Contribution, SummaryData } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Users,
  DollarSign,
  Send,
  LogOut,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

interface AdminMobilePanelProps {
  onAporteSuccess?: () => void;
}

export default function AdminMobilePanel({ onAporteSuccess }: AdminMobilePanelProps) {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "history">("form");

  // Form states
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Data states
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [recentContributions, setRecentContributions] = useState<Contribution[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Check saved session
  useEffect(() => {
    const savedPin = sessionStorage.getItem("leo_admin_pin");
    if (savedPin) {
      verifyAndLogin(savedPin, false);
    }
  }, []);

  // Fetch updated data
  const loadData = async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/contributions");
      if (res.ok) {
        const data: SummaryData = await res.json();
        setSummary(data);
        setRecentContributions(data.recentContributions || []);
      }
    } catch (err) {
      console.error("Error loading contributions:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const verifyAndLogin = async (inputPin: string, triggerVibrate = true) => {
    setLoading(true);
    setPinError("");

    try {
      const res = await fetch("/api/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: inputPin }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem("leo_admin_pin", inputPin);
        if (triggerVibrate && typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([40, 60, 40]);
        }
        loadData();
      } else {
        const data = await res.json();
        setPinError(data.error || "PIN incorrecto");
        setPin("");
        if (triggerVibrate && typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([150]);
        }
      }
    } catch {
      setPinError("Error de conexión al verificar PIN");
      setPin("");
    } finally {
      setLoading(false);
    }
  };

  // Tactile PIN Pad Click
  const handleDigitPress = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 4) {
        verifyAndLogin(newPin);
      }
    }
  };

  const handleDeleteDigit = () => {
    setPin((prev) => prev.slice(0, -1));
    setPinError("");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("leo_admin_pin");
    setIsAuthenticated(false);
    setPin("");
  };

  // Submit contribution
  const handleSubmitContribution = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const savedPin = sessionStorage.getItem("leo_admin_pin") || pin;
    if (!donorName.trim()) {
      setFeedback({ type: "error", text: "Por favor escribe o selecciona un nombre." });
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setFeedback({ type: "error", text: "Ingresa un monto válido mayor a 0." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: donorName.trim(),
          amount: parsedAmount,
          message: message.trim(),
          pin: savedPin,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#B6FF00", "#FFFFFF", "#FFD700"],
        });

        const isAccumulated = !data.result?.isNew;
        setFeedback({
          type: "success",
          text: isAccumulated
            ? `¡Aporte de $${parsedAmount} sumado al acumulado de "${donorName}"! 🚀`
            : `¡Nuevo aporte de $${parsedAmount} registrado para "${donorName}"! 🪗`,
        });

        // Reset form
        setDonorName("");
        setAmount("");
        setMessage("");

        // Refresh data
        loadData();
        if (onAporteSuccess) onAporteSuccess();
      } else {
        setFeedback({ type: "error", text: data.error || "Error al registrar el aporte." });
      }
    } catch {
      setFeedback({ type: "error", text: "Error de red al registrar el aporte." });
    } finally {
      setLoading(false);
    }
  };

  // Delete contribution
  const handleDeleteContribution = async (id: string, name: string, contribAmount: number) => {
    const confirmDelete = window.confirm(
      `¿Deseas anular el aporte de $${contribAmount} de "${name}"?`
    );
    if (!confirmDelete) return;

    const savedPin = sessionStorage.getItem("leo_admin_pin") || pin;
    try {
      const res = await fetch(`/api/contributions/${id}?pin=${encodeURIComponent(savedPin)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFeedback({ type: "success", text: "Aporte eliminado correctamente." });
        loadData();
      } else {
        setFeedback({ type: "error", text: "No se pudo eliminar el aporte." });
      }
    } catch {
      setFeedback({ type: "error", text: "Error al intentar eliminar el aporte." });
    }
  };

  // Quick amount helper
  const handleAddAmount = (addVal: number) => {
    const current = parseFloat(amount) || 0;
    setAmount(String(current + addVal));
  };

  // -------------------------------------------------------------
  // SCREEN 1: PIN UNLOCK PAD (Mobile optimized)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111111] flex flex-col justify-between px-4 py-8 max-w-md mx-auto select-none">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg bg-[#181818] border border-[#262626]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la Fiesta</span>
          </Link>
          <span className="text-[11px] font-black text-[#B6FF00] uppercase tracking-wider px-2 py-0.5 rounded bg-[#B6FF00]/10 border border-[#B6FF00]/20">
            Exclusivo Leo y Paola
          </span>
        </div>

        {/* Center Pad */}
        <div className="flex flex-col items-center text-center my-auto">
          <div className="w-16 h-16 rounded-3xl bg-[#1c1c1c] border-2 border-[#B6FF00]/40 flex items-center justify-center text-[#B6FF00] mb-4 shadow-[0_0_25px_rgba(182,255,0,0.15)]">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight mb-1">
            Ingreso de Aportes
          </h2>
          <p className="text-xs text-zinc-400 max-w-xs mb-6">
            Introduce el PIN de 4 dígitos para registrar los montos que van llegando por Zelle
          </p>

          {/* PIN dots display */}
          <div className="flex items-center gap-4 mb-6">
            {[0, 1, 2, 3].map((index) => {
              const isFilled = pin.length > index;
              return (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    isFilled
                      ? "bg-[#B6FF00] scale-125 shadow-[0_0_12px_rgba(182,255,0,0.6)]"
                      : "bg-[#252525] border border-[#3a3a3a]"
                  }`}
                />
              );
            })}
          </div>

          {pinError && (
            <div className="text-rose-400 text-xs font-bold mb-4 bg-rose-950/40 border border-rose-800/40 px-3 py-1.5 rounded-xl">
              {pinError}
            </div>
          )}

          {/* Tactile Keypad (1 - 9, 0, backspace) */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-[280px]">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
              <button
                key={num}
                onClick={() => handleDigitPress(num)}
                disabled={loading}
                className="h-16 rounded-2xl bg-[#1c1c1c] active:bg-[#B6FF00] active:text-black text-white font-bold text-2xl border border-[#2b2b2b] flex items-center justify-center transition-colors shadow-sm select-none"
              >
                {num}
              </button>
            ))}

            <div />

            <button
              onClick={() => handleDigitPress("0")}
              disabled={loading}
              className="h-16 rounded-2xl bg-[#1c1c1c] active:bg-[#B6FF00] active:text-black text-white font-bold text-2xl border border-[#2b2b2b] flex items-center justify-center transition-colors shadow-sm select-none"
            >
              0
            </button>

            <button
              onClick={handleDeleteDigit}
              disabled={loading || pin.length === 0}
              className="h-16 rounded-2xl bg-[#1c1c1c] active:bg-rose-900 text-zinc-300 font-bold text-sm border border-[#2b2b2b] flex items-center justify-center transition-colors shadow-sm select-none disabled:opacity-30"
            >
              Borrar
            </button>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="text-center text-[11px] text-zinc-600">
          Misión Acordeón • Cumpleaños 18
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SCREEN 2: ADMIN FORM & MANAGEMENT (Mobile first)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#111111] text-white px-4 py-6 max-w-lg mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-5">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg bg-[#181818] border border-[#262626]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ver Ranking Público</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-xs font-bold text-zinc-400 hover:text-rose-400 px-2.5 py-1.5 rounded-lg bg-[#181818] border border-[#262626]"
          title="Bloquear panel"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Bloquear</span>
        </button>
      </div>

      {/* Title */}
      <div className="bg-[#181818] border border-[#2b2b2b] rounded-2xl p-4 mb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase text-[#B6FF00] tracking-wider block">
            Panel de Administración
          </span>
          <h1 className="text-lg font-black text-white">
            Hola Leo y Paola 👋
          </h1>
        </div>

        <button
          onClick={loadData}
          disabled={loadingData}
          className="p-2 rounded-xl bg-[#111111] border border-[#2f2f2f] text-zinc-300 hover:text-[#B6FF00]"
          title="Actualizar datos"
        >
          <RefreshCw className={`w-4 h-4 ${loadingData ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <button
          onClick={() => setActiveTab("form")}
          className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === "form"
              ? "bg-[#B6FF00] text-black shadow-[0_0_15px_rgba(182,255,0,0.3)]"
              : "bg-[#181818] text-zinc-400 border border-[#2b2b2b]"
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Aporte</span>
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === "history"
              ? "bg-[#B6FF00] text-black shadow-[0_0_15px_rgba(182,255,0,0.3)]"
              : "bg-[#181818] text-zinc-400 border border-[#2b2b2b]"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Historial ({recentContributions.length})</span>
        </button>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div
          className={`p-3.5 rounded-xl text-xs font-bold mb-4 flex items-start gap-2 ${
            feedback.type === "success"
              ? "bg-emerald-950/50 border border-emerald-500/40 text-emerald-200"
              : "bg-rose-950/50 border border-rose-500/40 text-rose-200"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* TAB 1: FORM TO REGISTER CONTRIBUTION */}
      {activeTab === "form" && (
        <form
          onSubmit={handleSubmitContribution}
          className="bg-[#181818] border border-[#2b2b2b] rounded-3xl p-5 shadow-2xl"
        >
          {/* Quick Select existing contributors (Sum rule) */}
          {summary && summary.contributors.length > 0 && (
            <div className="mb-4">
              <label className="text-[11px] font-bold text-zinc-400 block mb-1.5 uppercase tracking-wider">
                ⚡ Toca para sumar a alguien existente:
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-[#111111] rounded-xl border border-[#252525]">
                {summary.contributors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setDonorName(c.name)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                      donorName.toLowerCase() === c.name.toLowerCase()
                        ? "bg-[#B6FF00] text-black border-[#B6FF00] font-black"
                        : "bg-[#181818] text-zinc-300 border-[#2c2c2c] hover:border-[#B6FF00]/40"
                    }`}
                  >
                    {c.name} ({formatCurrency(c.total_amount)})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Name Input */}
          <div className="mb-4">
            <label className="text-xs font-bold text-zinc-300 block mb-1">
              Nombre de la persona o familia <span className="text-[#B6FF00]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Tío Roberto, Familia Pérez, Andrés..."
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl bg-[#111111] border border-[#2e2e2e] focus:border-[#B6FF00] text-sm text-white placeholder-zinc-500 outline-none"
            />
            <span className="text-[10px] text-zinc-400 mt-1 block">
              💡 Si el nombre ya existe, el monto se sumará automáticamente a su acumulado.
            </span>
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label className="text-xs font-bold text-zinc-300 block mb-1">
              Monto del aporte ($ USD) <span className="text-[#B6FF00]">*</span>
            </label>
            <div className="relative mb-2">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-zinc-400 text-lg">
                $
              </span>
              <input
                type="number"
                step="any"
                min="1"
                required
                placeholder="50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-xl bg-[#111111] border border-[#2e2e2e] focus:border-[#B6FF00] text-xl font-black text-[#B6FF00] placeholder-zinc-600 outline-none tabular-nums"
              />
            </div>

            {/* Quick amount chips */}
            <div className="grid grid-cols-4 gap-1.5">
              {[20, 50, 100, 200].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleAddAmount(val)}
                  className="py-1.5 rounded-lg bg-[#222222] border border-[#333333] hover:border-[#B6FF00]/50 text-xs font-bold text-zinc-300 active:scale-95 transition-all"
                >
                  +{val}$
                </button>
              ))}
            </div>
          </div>

          {/* Message / Dedication */}
          <div className="mb-6">
            <label className="text-xs font-bold text-zinc-300 block mb-1">
              Dedicatoria o Nota en Zelle (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ej: ¡Felices 18 Leo! Que suene ese acordeón"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111] border border-[#2e2e2e] focus:border-[#B6FF00] text-sm text-white placeholder-zinc-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-[#B6FF00] text-black font-black text-base hover:bg-[#a6eb00] active:scale-95 transition-all shadow-[0_0_20px_rgba(182,255,0,0.35)] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-5 h-5 fill-black" />
            <span>{loading ? "Registrando..." : "Registrar Aporte 🚀"}</span>
          </button>
        </form>
      )}

      {/* TAB 2: RECENT CONTRIBUTIONS HISTORY & DELETION */}
      {activeTab === "history" && (
        <div className="bg-[#181818] border border-[#2b2b2b] rounded-3xl p-5 shadow-2xl">
          <h3 className="text-sm font-black text-white uppercase tracking-wider mb-3">
            Últimos Aportes Registrados
          </h3>

          {recentContributions.length === 0 ? (
            <p className="text-xs text-zinc-500 py-6 text-center">
              No hay aportes registrados aún.
            </p>
          ) : (
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {recentContributions.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#111111] border border-[#262626]"
                >
                  <div className="min-w-0 pr-2">
                    <span className="font-bold text-sm text-white block truncate">
                      {item.contributor_name}
                    </span>
                    {item.message && (
                      <span className="text-xs text-zinc-400 italic block line-clamp-1">
                        &ldquo;{item.message}&rdquo;
                      </span>
                    )}
                    <span className="text-[10px] text-zinc-500 block mt-0.5">
                      {new Date(item.created_at).toLocaleDateString("es-ES", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-black text-[#B6FF00] text-base">
                      {formatCurrency(item.amount)}
                    </span>

                    <button
                      onClick={() =>
                        handleDeleteContribution(
                          item.id,
                          item.contributor_name,
                          item.amount
                        )
                      }
                      className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900 border border-rose-800/30 transition-colors"
                      title="Eliminar aporte"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
