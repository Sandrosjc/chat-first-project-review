import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { attachSupabaseAuth } from "@/lib/auth-attacher";

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error || data !== true) throw new Error("Acesso restrito ao administrador.");
}

export const getFreeGuideUrl = createServerFn({ method: "GET" })
  .handler(async () => {
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;
    if (!url || !key) return "";
    const client = createClient(url, key);
    const { data } = await client.from("site_settings").select("value").eq("key", "free_guide_payhip_url").maybeSingle();
    return data?.value ?? "";
  });

export const saveFreeGuideUrl = createServerFn({ method: "POST" })
  .middleware([attachSupabaseAuth, requireSupabaseAuth])
  .inputValidator((input) => z.object({ url: z.string().url().or(z.literal("")) }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("site_settings").upsert({
      key: "free_guide_payhip_url", value: data.url, updated_at: new Date().toISOString()
    }, { onConflict: "key" });
    if (error) throw new Error("Não foi possível salvar o link do guia.");
    return { ok: true };
  });
