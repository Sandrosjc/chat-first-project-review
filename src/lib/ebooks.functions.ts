import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error || data !== true) throw new Error("Acesso restrito ao administrador.");
}

const schema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().trim().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(2).max(160),
  subtitle: z.string().trim().max(300).default(""),
  description: z.string().trim().max(5000).default(""),
  price: z.string().trim().max(40).default(""),
  cover_image_url: z.string().url().nullable().optional(),
  payhip_url: z.string().url().nullable().optional(),
  google_play_url: z.string().url().nullable().optional(),
  download_url: z.string().url().nullable().optional(),
  is_free: z.boolean().default(false),
  is_featured: z.boolean().default(false),
}).superRefine((v, ctx) => {
  if (v.is_free && !v.download_url) ctx.addIssue({ code: "custom", path: ["download_url"], message: "Informe o link de acesso ao guia gratuito." });
  if (!v.is_free && !v.payhip_url && !v.google_play_url) ctx.addIssue({ code: "custom", path: ["payhip_url"], message: "Informe pelo menos um link de venda." });
});

export const listAdminEbooks = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase.from("ebooks")
      .select("id, slug, title, subtitle, description, price, cover_image_url, payhip_url, google_play_url, download_url, is_free, is_featured, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error("Não foi possível carregar os produtos.");
    return data ?? [];
  });

export const saveAdminEbook = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => schema.parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { id, ...values } = data;
    if (values.is_free) {
      const { data: existing } = await context.supabase.from("ebooks").select("id").eq("is_free", true).maybeSingle();
      if (existing && existing.id !== id) throw new Error("Já existe um produto gratuito. Edite o guia existente.");
    }
    const result = id
      ? await context.supabase.from("ebooks").update(values).eq("id", id).select("id").single()
      : await context.supabase.from("ebooks").insert(values).select("id").single();
    if (result.error) throw new Error("Não foi possível salvar. Verifique se o slug já está em uso.");
    return { id: result.data.id };
  });

export const deleteAdminEbook = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("ebooks").delete().eq("id", data.id);
    if (error) throw new Error("Não foi possível excluir o produto.");
    return { ok: true };
  });
