import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const pageViewSchema = z.object({
  path: z.string().trim().min(1).max(300).refine((value) => value.startsWith("/") && !value.startsWith("//")),
  language: z.string().trim().max(10).default("en"),
});

export const recordPageView = createServerFn({ method: "POST" })
  .inputValidator((data) => pageViewSchema.parse(data))
  .handler(async ({ data }) => {
    const country = getRequestHeader("x-vercel-ip-country")?.toUpperCase() ?? null;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.rpc("record_page_view", {
      p_path: data.path,
      p_country_code: country,
      p_language: data.language,
    });
    if (error) {
      console.error("[analytics] page view failed", error);
      return { ok: false };
    }
    return { ok: true };
  });
