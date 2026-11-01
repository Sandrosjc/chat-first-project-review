import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { listAdminEbooks, saveAdminEbook, deleteAdminEbook } from "@/lib/ebooks.functions";
import { getFreeGuideUrl, saveFreeGuideUrl } from "@/lib/site-settings.functions";
import { getAdminStats, listLeads, getPageViewStats } from "@/lib/leads.functions";
import { toast } from "sonner";

type Product = {
  id?: string; slug: string; title: string; subtitle: string; description: string;
  price: string; cover_image_url: string; product_url: string; payhip_url: string; google_play_url: string;
  is_featured: boolean; is_main: boolean;
  is_free?: false;
};
const empty: Product = { slug:"", title:"", subtitle:"", description:"", price:"", cover_image_url:"", product_url:"", payhip_url:"", google_play_url:"", is_featured:false, is_main:false };

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(empty);
  const [busy, setBusy] = useState(false);
  const [cover, setCover] = useState<File | null>(null);
  const [freeGuideUrl, setFreeGuideUrl] = useState("");
  const [guideUrlBusy, setGuideUrlBusy] = useState(false);
  const [stats, setStats] = useState<{ totalLeads: number; activeOptedIn: number; totalCampaigns: number; emailsSent: number } | null>(null);
  const [leads, setLeads] = useState<Array<{ id: string; email: string; language: string; source: string; opted_in: boolean; status: string; created_at: string }>>([]);
  const [dashboardError, setDashboardError] = useState("");
  const [visitorStats, setVisitorStats] = useState<{ totalPageViews: number; countries: Array<{ country: string; views: number }> } | null>(null);

  async function load() {
    try { setProducts(await listAdminEbooks() as Product[]); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Falha ao carregar produtos."); }
  }
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => { if (!session) return; void load(); getFreeGuideUrl().then(setFreeGuideUrl).catch(() => toast.error("Não foi possível carregar o link do guia.")); Promise.all([getAdminStats(), listLeads(), getPageViewStats()]).then(([nextStats, nextLeads, nextVisitorStats]) => { setStats(nextStats); setLeads(nextLeads as typeof leads); setVisitorStats(nextVisitorStats); setDashboardError(""); }).catch((error) => { console.error("[admin] dashboard load failed", error); setDashboardError("Não foi possível carregar os indicadores e contatos."); }); }, [session]);

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
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(cover.type)) {
          throw new Error("A capa deve estar em JPG, PNG ou WebP.");
        }
        if (cover.size > 5 * 1024 * 1024) {
          throw new Error("A capa deve ter no máximo 5 MB.");
        }
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
    <section className="mb-10">
      <h2 className="mb-4 font-display text-xl sm:text-2xl">Visão geral</h2>
      {dashboardError && <p role="alert" className="mb-4 rounded border border-destructive/40 p-3 text-sm text-destructive">{dashboardError}</p>}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border bg-card p-4"><p className="text-sm text-muted-foreground">Cadastros de e-mail</p><p className="mt-2 font-display text-3xl">{stats?.totalLeads ?? "—"}</p></article>
        <article className="rounded-xl border bg-card p-4"><p className="text-sm text-muted-foreground">Contatos autorizados</p><p className="mt-2 font-display text-3xl">{stats?.activeOptedIn ?? "—"}</p></article>
        <article className="rounded-xl border bg-card p-4"><p className="text-sm text-muted-foreground">Campanhas cadastradas</p><p className="mt-2 font-display text-3xl">{stats?.totalCampaigns ?? "—"}</p></article>
        <article className="rounded-xl border bg-card p-4"><p className="text-sm text-muted-foreground">E-mails enviados</p><p className="mt-2 font-display text-3xl">{stats?.emailsSent ?? "—"}</p></article>
      </div>
      <div className="mt-8"><div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h3 className="font-display text-lg">Contatos recentes</h3><span className="text-xs text-muted-foreground">Últimos 100 registros</span></div>
      {leads.length === 0 ? <p className="rounded-lg border p-4 text-sm text-muted-foreground">Nenhum contato cadastrado ou lista ainda não carregada.</p> : <div className="overflow-x-auto rounded-lg border"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-muted/50"><tr><th className="p-3">E-mail</th><th className="p-3">Idioma</th><th className="p-3">Origem</th><th className="p-3">Marketing</th><th className="p-3">Situação</th><th className="p-3">Cadastro</th></tr></thead><tbody>{leads.map((lead) => <tr key={lead.id} className="border-t"><td className="p-3">{lead.email}</td><td className="p-3 uppercase">{lead.language}</td><td className="p-3">{lead.source}</td><td className="p-3">{lead.opted_in ? "Autorizado" : "Não autorizado"}</td><td className="p-3">{lead.status}</td><td className="p-3">{new Date(lead.created_at).toLocaleDateString("pt-BR")}</td></tr>)}</tbody></table></div>}</div>
      <div className="mt-8 rounded-xl border p-4">
        <div className="flex flex-wrap items-end justify-between gap-2"><div><h3 className="font-display text-lg">Visitas ao site</h3><p className="text-sm text-muted-foreground">Visualizações de páginas registradas, sem armazenar endereço IP.</p></div><p className="font-display text-3xl">{visitorStats?.totalPageViews ?? "—"}</p></div>
        <div className="mt-4"><h4 className="mb-2 text-sm font-semibold">Países identificados</h4>{visitorStats?.countries.length ? <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{visitorStats.countries.map((item) => <li key={item.country} className="flex justify-between rounded bg-muted/40 px-3 py-2 text-sm"><span>{item.country === "unknown" ? "Não identificado" : item.country}</span><strong>{item.views}</strong></li>)}</ul> : <p className="text-sm text-muted-foreground">Ainda não há visitas registradas.</p>}</div>
      </div>
      <div className="mt-8 rounded-xl border border-dashed p-4"><h3 className="font-display text-lg">Campanhas</h3><p className="mt-1 text-sm text-muted-foreground">A estrutura de campanhas está no banco. A criação, o envio e os relatórios serão conectados na etapa de comunicação por e-mail.</p></div>
    </section>
    <form onSubmit={save} className="mb-10 grid min-w-0 gap-4 rounded-xl border p-4 sm:p-5 md:grid-cols-2">
      <h2 className="font-display text-xl sm:text-2xl md:col-span-2">{form.id ? "Editar produto" : "Cadastrar produto"}</h2>
      <p className="text-sm text-muted-foreground md:col-span-2">Cadastre um ebook principal e até três ebooks complementares. Selecione a categoria de cada produto; o principal não ocupa uma das três vagas complementares.</p>
      {field("Título","title",true)}{field("Identificador (slug)","slug",true)}{field("Subtítulo","subtitle")}{field("Preço","price",true)}
      <label className="grid gap-1 text-sm md:col-span-2">Descrição<textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={4} className="min-w-0 rounded border bg-background p-2"/></label>
      <label className="grid gap-1 text-sm md:col-span-2">Imagem da capa<input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>setCover(e.target.files?.[0] ?? null)} className="min-w-0 max-w-full"/></label>
      {field("Link de compra Payhip","payhip_url",true)}{field("Link Google Play Books","google_play_url",true)}
      <label className="grid gap-1 text-sm">Categoria do produto<select value={form.is_main ? "main" : "complementary"} onChange={e=>setForm({...form,is_main:e.target.value === "main"})} className="rounded border bg-background p-2"><option value="main">Ebook principal</option><option value="complementary">Ebook complementar</option></select></label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_featured} onChange={e=>setForm({...form,is_featured:e.target.checked})}/>Destacar no site</label>
      <div className="flex flex-wrap gap-3 md:col-span-2"><button disabled={busy} className="rounded bg-primary px-5 py-3 text-primary-foreground">{busy ? "Salvando..." : "Salvar produto"}</button><button type="button" onClick={()=>{setForm(empty);setCover(null)}} className="rounded border px-5 py-3">Limpar</button></div>
    </form>
    <section className="mb-10 rounded-xl border p-4 sm:p-5">
      <h2 className="font-display text-xl sm:text-2xl">Link do guia gratuito (Payhip)</h2>
      <p className="mt-1 text-sm text-muted-foreground">Cole aqui o endereço do produto gratuito no Payhip. Você poderá alterá-lo quando quiser.</p>
      <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={async (e)=>{e.preventDefault();setGuideUrlBusy(true);try{await saveFreeGuideUrl({data:{url:freeGuideUrl.trim()}});toast.success("Link do guia salvo.");}catch(err){toast.error(err instanceof Error?err.message:"Não foi possível salvar o link.");}finally{setGuideUrlBusy(false);}}}>
        <input type="url" value={freeGuideUrl} onChange={e=>setFreeGuideUrl(e.target.value)} placeholder="https://payhip.com/..." className="min-w-0 flex-1 rounded border border-input bg-background p-3" />
        <button disabled={guideUrlBusy} className="rounded bg-primary px-5 py-3 text-primary-foreground">{guideUrlBusy?"Salvando...":"Salvar link do guia"}</button>
      </form>
    </section>
    <h2 className="mb-4 font-display text-xl sm:text-2xl">Produtos cadastrados</h2><div className="grid gap-3">{products.map(p=><article key={p.id} className="flex min-w-0 flex-wrap items-center justify-between gap-3 rounded border p-3 sm:p-4"><div className="min-w-0"><strong className="break-words">{p.title}</strong><p className="break-all text-sm text-muted-foreground">{p.is_main ? "Principal" : "Complementar"} · {p.price} · {p.slug}</p></div><div className="flex shrink-0 gap-3"><button onClick={()=>setForm(p)} className="underline">Editar</button><button onClick={()=>void remove(p.id)} className="text-destructive underline">Excluir</button></div></article>)}</div>
  </main>;
}
