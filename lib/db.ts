import { createClient } from "@supabase/supabase-js";
import { Contributor, Contribution, SummaryData } from "./types";
import { normalizeName, capitalizeName } from "./utils";

const GOAL_AMOUNT = parseInt(process.env.NEXT_PUBLIC_GOAL_AMOUNT || "1000", 10);

// Supports standard, prefixed (e.g. SUPABASE_URL) and Vercel marketplace integration variables
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  process.env.SUPABASE_PROJECT_URL ||
  process.env.VERCEL_SUPABASE_URL;

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_KEY ||
  process.env.SUPABASE_API_KEY ||
  process.env.VERCEL_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseKey!)
  : null;

// In-memory fallback for local development or preview without Supabase
let fallbackContributors: Contributor[] = [
  {
    id: "contributor-1",
    name: "Tío Alberto Barreto",
    normalized_name: "tio alberto barreto",
    total_amount: 150,
    contribution_count: 2,
    last_contribution_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    last_message: "¡Para el mejor acordeonero de la familia! 🪗",
  },
  {
    id: "contributor-2",
    name: "Madrina Carolina",
    normalized_name: "madrina carolina",
    total_amount: 120,
    contribution_count: 1,
    last_contribution_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    created_at: new Date(Date.now() - 86400000).toISOString(),
    last_message: "¡Felices 18 mi Leo amado! Que suene esa música.",
  },
  {
    id: "contributor-3",
    name: "Abuelos Finol",
    normalized_name: "abuelos finol",
    total_amount: 100,
    contribution_count: 1,
    last_contribution_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    created_at: new Date(Date.now() - 86400000).toISOString(),
    last_message: "Orgullosos de ti, Dios te bendiga.",
  },
  {
    id: "contributor-4",
    name: "Los Primos de Miami",
    normalized_name: "los primos de miami",
    total_amount: 80,
    contribution_count: 1,
    last_contribution_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    created_at: new Date(Date.now() - 86400000).toISOString(),
    last_message: "¡Nos vemos el 3 en Kissimmee! 🎉",
  },
  {
    id: "contributor-5",
    name: "Familia Mendoza Finol",
    normalized_name: "familia mendoza finol",
    total_amount: 50,
    contribution_count: 1,
    last_contribution_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    last_message: "¡Un gran abrazo Leo!",
  },
];

let fallbackContributions: Contribution[] = [
  {
    id: "c-1",
    contributor_id: "contributor-1",
    contributor_name: "Tío Alberto Barreto",
    amount: 100,
    message: "Primer granito de arena 🪗",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "c-2",
    contributor_id: "contributor-1",
    contributor_name: "Tío Alberto Barreto",
    amount: 50,
    message: "¡Para el mejor acordeonero de la familia! 🪗",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "c-3",
    contributor_id: "contributor-2",
    contributor_name: "Madrina Carolina",
    amount: 120,
    message: "¡Felices 18 mi Leo amado! Que suene esa música.",
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "c-4",
    contributor_id: "contributor-3",
    contributor_name: "Abuelos Finol",
    amount: 100,
    message: "Orgullosos de ti, Dios te bendiga.",
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "c-5",
    contributor_id: "contributor-4",
    contributor_name: "Los Primos de Miami",
    amount: 80,
    message: "¡Nos vemos el 3 en Kissimmee! 🎉",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "c-6",
    contributor_id: "contributor-5",
    contributor_name: "Familia Mendoza Finol",
    amount: 50,
    message: "¡Un gran abrazo Leo!",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

export async function getSummary(): Promise<SummaryData> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: contributorsData, error: contError } = await supabase
        .from("contributors")
        .select("*")
        .order("total_amount", { ascending: false });

      const { data: recentData, error: recError } = await supabase
        .from("contributions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (!contError && contributorsData) {
        const totalRaised = contributorsData.reduce(
          (sum: number, c: { total_amount: number }) => sum + Number(c.total_amount),
          0
        );
        const percentage = Math.min(
          Math.round((totalRaised / GOAL_AMOUNT) * 100),
          100
        );

        return {
          contributors: contributorsData as Contributor[],
          totalRaised,
          goalAmount: GOAL_AMOUNT,
          percentage,
          contributorCount: contributorsData.length,
          recentContributions: (recentData || []) as Contribution[],
        };
      }
    } catch (err) {
      console.warn("Supabase query failed, falling back to local store:", err);
    }
  }

  // Fallback
  const sortedContributors = [...fallbackContributors].sort(
    (a, b) => b.total_amount - a.total_amount
  );
  const totalRaised = sortedContributors.reduce(
    (sum, c) => sum + c.total_amount,
    0
  );
  const percentage = Math.min(
    Math.round((totalRaised / GOAL_AMOUNT) * 100),
    100
  );

  return {
    contributors: sortedContributors,
    totalRaised,
    goalAmount: GOAL_AMOUNT,
    percentage,
    contributorCount: sortedContributors.length,
    recentContributions: [...fallbackContributions].reverse().slice(0, 20),
  };
}

export async function addContribution({
  name,
  amount,
  message,
}: {
  name: string;
  amount: number;
  message?: string;
}): Promise<{ success: boolean; contributor: Contributor; isNew: boolean }> {
  const normName = normalizeName(name);
  const prettyName = capitalizeName(name);
  const cleanMessage = message?.trim() || "";
  const now = new Date().toISOString();

  if (isSupabaseConfigured && supabase) {
    try {
      // Check if contributor exists
      const { data: existingList } = await supabase
        .from("contributors")
        .select("*")
        .eq("normalized_name", normName)
        .limit(1);

      let contributor: Contributor;
      let isNew = false;

      if (existingList && existingList.length > 0) {
        const existing = existingList[0];
        const newTotal = Number(existing.total_amount) + amount;
        const newCount = (existing.contribution_count || 1) + 1;

        const { data: updated, error: updateError } = await supabase
          .from("contributors")
          .update({
            total_amount: newTotal,
            contribution_count: newCount,
            last_contribution_at: now,
            last_message: cleanMessage || existing.last_message,
          })
          .eq("id", existing.id)
          .select()
          .single();

        if (updateError) throw updateError;
        contributor = updated as Contributor;
      } else {
        isNew = true;
        const { data: created, error: createError } = await supabase
          .from("contributors")
          .insert({
            name: prettyName,
            normalized_name: normName,
            total_amount: amount,
            contribution_count: 1,
            last_contribution_at: now,
            created_at: now,
            last_message: cleanMessage || undefined,
          })
          .select()
          .single();

        if (createError) throw createError;
        contributor = created as Contributor;
      }

      // Record individual contribution
      await supabase.from("contributions").insert({
        contributor_id: contributor.id,
        contributor_name: contributor.name,
        amount,
        message: cleanMessage || null,
        created_at: now,
      });

      return { success: true, contributor, isNew };
    } catch (err) {
      console.error("Error writing to Supabase, writing to local fallback:", err);
    }
  }

  // Fallback in-memory
  const existingIdx = fallbackContributors.findIndex(
    (c) => c.normalized_name === normName
  );

  let contributor: Contributor;
  let isNew = false;

  if (existingIdx >= 0) {
    const existing = fallbackContributors[existingIdx];
    existing.total_amount += amount;
    existing.contribution_count += 1;
    existing.last_contribution_at = now;
    if (cleanMessage) existing.last_message = cleanMessage;
    contributor = existing;
  } else {
    isNew = true;
    contributor = {
      id: "contributor-" + (fallbackContributors.length + 1),
      name: prettyName,
      normalized_name: normName,
      total_amount: amount,
      contribution_count: 1,
      last_contribution_at: now,
      created_at: now,
      last_message: cleanMessage || undefined,
    };
    fallbackContributors.push(contributor);
  }

  fallbackContributions.push({
    id: "c-" + (fallbackContributions.length + 1),
    contributor_id: contributor.id,
    contributor_name: contributor.name,
    amount,
    message: cleanMessage || undefined,
    created_at: now,
  });

  return { success: true, contributor, isNew };
}

export async function deleteContribution(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: contrib } = await supabase
        .from("contributions")
        .select("*")
        .eq("id", id)
        .single();

      if (!contrib) return false;

      // Delete contribution
      await supabase.from("contributions").delete().eq("id", id);

      // Adjust contributor
      const { data: contributor } = await supabase
        .from("contributors")
        .select("*")
        .eq("id", contrib.contributor_id)
        .single();

      if (contributor) {
        const newTotal = Math.max(0, Number(contributor.total_amount) - Number(contrib.amount));
        const newCount = Math.max(0, (contributor.contribution_count || 1) - 1);

        if (newCount === 0 || newTotal <= 0) {
          await supabase.from("contributors").delete().eq("id", contributor.id);
        } else {
          await supabase
            .from("contributors")
            .update({
              total_amount: newTotal,
              contribution_count: newCount,
            })
            .eq("id", contributor.id);
        }
      }

      return true;
    } catch (err) {
      console.error("Error deleting from Supabase:", err);
      return false;
    }
  }

  // Fallback
  const idx = fallbackContributions.findIndex((c) => c.id === id);
  if (idx === -1) return false;

  const item = fallbackContributions[idx];
  fallbackContributions.splice(idx, 1);

  const contributor = fallbackContributors.find((c) => c.id === item.contributor_id);
  if (contributor) {
    contributor.total_amount = Math.max(0, contributor.total_amount - item.amount);
    contributor.contribution_count = Math.max(0, contributor.contribution_count - 1);
    if (contributor.contribution_count === 0 || contributor.total_amount <= 0) {
      fallbackContributors = fallbackContributors.filter((c) => c.id !== contributor.id);
    }
  }

  return true;
}
