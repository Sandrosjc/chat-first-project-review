import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { listAdminEbooks, saveAdminEbook, deleteAdminEbook } from "@/lib/ebooks.functions";
import { toast } from "sonner";

type Product = {
  id?: string; slug: string; title: string; subtitle: string; description: string;
  price: string; cover_image_url: string; product_url: string; payhip_url: string; google_play_url: string;
  is_featured: boolean;
  is_free?: false;
};
const empty: Product = { slug:"", title:"", subtitle:"", description:"", price:"", cover_image_url:"", product_url:"", payhip_url:"", google_play_url:"", is_featured:false };

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(empty);
  const [busy, setBusy] = useState(false);
  const [cover, setCover] = useState<File | null>(null);

  async function load() {
    try { setProducts(await listAdminEbooks() as Product[]); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Falha ao carregar produtos."); }
  }
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => { if (session) void load(); }, [session]);

  async function login(e: FormEvent) {
    e.preventDefault(); setBusy(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error("E-mail ou senha inválidos.");
    else setSession(data.session);
  }
  async function save(e: FormEvent) {
    e.preventDefault(); setBusy(true);
    try {
      let coverUrl = form.cover_image_url || null;
      if (cover) {
        const ext = cover.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("ebook-covers").upload(path, cover, { upsert: false, contentType: cover.type });
        if (error) throw error;
        coverUrl = supabase.storage.from("ebook-covers").getPublicUrl(path).data.publicUrl;
      }
      await saveAdminEbook({ data: { ...form, cover_image_url: coverUrl, product_url: form.product_url || null, payhip_url: form.payhip_url || null, google_play_url: form.google_play_url || null, is_free: false } });
      setForm(empty); setCover(null); await load(); toast.success("Produto salvo.");
    } catch (e) { toast.error(e instanceof Error ? e.message : "Não foi possível salvar."); }
    finally { setBusy(false); }
  }
  async function remove(id?: string) {
    if (!id || !confirm("Excluir este produto?")) return;
    try { await deleteAdminEbook({ data: { id } }); await load(); toast.success("Produto excluído."); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Falha ao excluir."); }
  }

  if (!session) return <main className="mx-auto w-full max-w-md px-4 py-12 sm:px-5 sm:py-16"><h1 className="mb-6 break-words font-display text-2xl sm:text-3xl">Administração Chequetto</h1><form onSubmit={login} className="grid gap-4"><label className="grid gap-1">E-mail<input required type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} className="min-w-0 rounded border p-3"/></label><label className="grid gap-1">Senha<input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} className="min-w-0 rounded border p-3"/></label><button disabled={busy} className="rounded bg-primary p-3 text-primary-foreground">{busy ? "Entrando..." : "Entrar"}</button></form></main>;

  const field = (label: string, key: keyof Product, required=false) => <label className="grid min-w-0 gap-1 text-sm">{label}<input required={required} value={String(form[key] ?? "")} onChange={e=>setForm({...form,[key]:e.target.value})} className="min-w-0 rounded border border-input bg-background p-2"/></label>;
  return <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10"><header className="mb-8 flex flex-wrap items-center justify-between gap-3"><h1 className="font-display text-2xl sm:text-3xl">Painel de produtos</h1><button onClick={()=>supabase.auth.signOut()} className="rounded border px-3 py-2 text-sm underline">Sair</button></header>
    <form onSubmit={save} className="mb-10 grid min-w-0 gap-4 rounded-xl border p-4 sm:p-5 md:grid-cols-2">
      <h2 className="font-display text-xl sm:text-2xl md:col-span-2">{form.id ? "Editar produto" : "Cadastrar produto"}</h2>
      {field("Título","title",true)}{field("Identificador (slug)","slug",true)}{field("Subtítulo","subtitle")}{field("Preço","price",true)}
      <label className="grid gap-1 text-sm md:col-span-2">Descrição<textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={4} className="min-w-0 rounded border bg-background p-2"/></label>
      <label className="grid gap-1 text-sm md:col-span-2">Imagem da capa<input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>setCover(e.target.files?.[0] ?? null)} className="min-w-0 max-w-full"/></label>
      {field("Link de compra Payhip","payhip_url",true)}{field("Link Google Play Books","google_play_url",true)}
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_featured} onChange={e=>setForm({...form,is_featured:e.target.checked})}/>Destacar no site</label>
      <div className="flex flex-wrap gap-3 md:col-span-2"><button disabled={busy} className="rounded bg-primary px-5 py-3 text-primary-foreground">{busy ? "Salvando..." : "Salvar produto"}</button><button type="button" onClick={()=>{setForm(empty);setCover(null)}} className="rounded border px-5 py-3">Limpar</button></div>
    </form>
    <h2 className="mb-4 font-display text-xl sm:text-2xl">Produtos cadastrados</h2><div className="grid gap-3">{products.map(p=><article key={p.id} className="flex min-w-0 flex-wrap items-center justify-between gap-3 rounded border p-3 sm:p-4"><div className="min-w-0"><strong className="break-words">{p.title}</strong><p className="break-all text-sm text-muted-foreground">{p.price} · {p.slug}</p></div><div className="flex shrink-0 gap-3"><button onClick={()=>setForm(p)} className="underline">Editar</button><button onClick={()=>void remove(p.id)} className="text-destructive underline">Excluir</button></div></article>)}</div>
  </main>;
}
