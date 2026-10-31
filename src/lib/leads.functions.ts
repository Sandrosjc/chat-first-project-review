import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

const subscribeSchema = z.object({
  email: z.string().trim().email().max(255),
  language: z.string().trim().min(2).max(10).default("en"),
  optedIn: z.boolean().default(false),
  source: z.string().trim().max(50).default("free_guide"),
});

// Public endpoint: saves a free-guide subscriber. Runs with the service role
// because anonymous visitors have no direct access to the leads table.
export const subscribeLead = createServerFn({ method: "POST" })
  .inputValidator((data) => subscribeSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = data.email.toLowerCase();

    const { data: existing, error: lookupError } = await supabaseAdmin
      .from("leads")
      .select("id, status")
      .eq("email", email)
      .maybeSingle();

    // Do not attempt an insert when the lookup failed: that could create
    // duplicate leads or hide a database outage behind a misleading result.
    if (lookupError) {
      console.error("[leads] lookup failed", lookupError);
      throw new Error("Could not verify your email. Please try again.");
    }

    if (existing) {
      // Re-subscribing reactivates the lead and refreshes consent/language.
      const { error } = await supabaseAdmin
        .from("leads")
        .update({
          language: data.language,
          opted_in: data.optedIn,
          status: "active",
          source: data.source,
        })
        .eq("id", existing.id);
      if (error) {
        console.error("[leads] update failed", error);
        throw new Error("Could not save your subscription. Please try again.");
      }
      return { ok: true, alreadySubscribed: true };
    }

    const { error } = await supabaseAdmin.from("leads").insert({
      email,
      language: data.language,
      opted_in: data.optedIn,
      source: data.source,
      status: "active",
    });
    if (error) {
      console.error("[leads] insert failed", error);
      throw new Error("Could not save your subscription. Please try again.");
    }
    return { ok: true, alreadySubscribed: false };
  });

async function assertAdmin(supabase: {
  rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: unknown }>;
}, userId: string) {
  const { data: isAdmin } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (!isAdmin) throw new Error("Forbidden");
}

// Admin-only: dashboard counters.
export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
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
      context.supabase.from("campaign_logs").select("id", { count: "exact", head: true }),
    ]);
    return {
      totalLeads: leads.count ?? 0,
      activeOptedIn: active.count ?? 0,
      totalCampaigns: campaigns.count ?? 0,
      emailsSent: sent.count ?? 0,
    };
  });

// Admin-only: latest leads for the dashboard table.
export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
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
