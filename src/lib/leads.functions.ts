import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { attachSupabaseAuth } from "@/lib/auth-attacher";

const subscribeSchema = z.object({
  email: z.string().trim().email().max(255),
  language: z.enum(["en", "pt", "es", "fr", "de", "it", "nl", "ja", "zh"]).default("en"),
  optedIn: z.boolean().default(false),
  source: z.enum(["free_guide", "app_access"]).default("free_guide"),
});

// Public endpoint: saves a free-guide subscriber. Runs with the service role
// because anonymous visitors have no direct access to the leads table.
export const subscribeLead = createServerFn({ method: "POST" })
  .inputValidator((data) => subscribeSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.rpc("register_site_lead", {
      p_email: data.email.trim().toLowerCase(),
      p_language: data.language,
      p_opted_in: data.optedIn,
      p_source: data.source,
    });

    if (error) {
      console.error("[leads] save failed", error);
      throw new Error("Could not save your subscription. Please try again.");
    }

    return { ok: true };
  });

async function assertAdmin(supabase: {
  rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: unknown; error?: unknown }>;
}, userId: string) {
  const { data: isAdmin, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error || isAdmin !== true) throw new Error("Forbidden");
}

// Admin-only: dashboard counters.
export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([attachSupabaseAuth, requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const [leads, active, campaigns, sent] = await Promise.all([
      context.supabase.from("leads").select("id", { count: "exact", head: true }),
      context.supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("status", "active")
        .eq("opted_in", true),
      context.supabase.from("campaigns").select("id", { count: "exact", head: true }),
      context.supabase.from("campaign_logs").select("id", { count: "exact", head: true }).eq("status", "sent"),
    ]);
    const statsError = leads.error ?? active.error ?? campaigns.error ?? sent.error;
    if (statsError) {
      console.error("[leads] dashboard stats failed", statsError);
      throw new Error("Could not load dashboard statistics.");
    }

    return {
      totalLeads: leads.count ?? 0,
      activeOptedIn: active.count ?? 0,
      totalCampaigns: campaigns.count ?? 0,
      emailsSent: sent.count ?? 0,
    };
  });

// Admin-only: latest leads for the dashboard table.
export const listLeads = createServerFn({ method: "GET" })
  .middleware([attachSupabaseAuth, requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("leads")
      .select("id, email, first_name, language, source, opted_in, status, created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) {
      console.error("[leads] list failed", error);
      throw new Error("Could not load leads.");
    }
    return data ?? [];
  });


// Admin-only: anonymous page-view totals and country breakdown.
export const getPageViewStats = createServerFn({ method: "GET" })
  .middleware([attachSupabaseAuth, requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, count, error } = await context.supabase
      .from("page_views")
      .select("country_code", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(5000);
    if (error) {
      console.error("[analytics] page-view stats failed", error);
      throw new Error("Could not load visitor statistics.");
    }
    const countries = new Map<string, number>();
    for (const row of data ?? []) {
      const code = row.country_code ?? "unknown";
      countries.set(code, (countries.get(code) ?? 0) + 1);
    }
    return {
      totalPageViews: count ?? 0,
      countries: Array.from(countries, ([country, views]) => ({ country, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10),
    };
  });
