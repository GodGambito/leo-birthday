import React from "react";
import { Metadata } from "next";
import AdminMobilePanel from "@/components/AdminMobilePanel";

export const metadata: Metadata = {
  title: "Panel Privado • Misión Acordeón Leo",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminSecretPage() {
  return (
    <main className="min-h-screen bg-[#111111]">
      <AdminMobilePanel />
    </main>
  );
}
