import React from "react";
import { getSummary } from "@/lib/db";
import MainView from "@/components/MainView";

// Ensure dynamic rendering so server-side data is always fresh
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const initialSummary = await getSummary();

  return <MainView initialSummary={initialSummary} />;
}
