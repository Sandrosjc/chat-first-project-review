import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { posts, type Ebook } from "@/lib/content";
import { subscribeLead } from "@/lib/leads.functions";
import { getFreeGuideUrl } from "@/lib/site-settings.functions";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import journalImg from "@/assets/journal.jpg";

const toneClass: Record<Ebook["tone"], string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  gold: "bg-gold text-foreground",
};

type CatalogBook = Ebook & { coverImageUrl?: string | null; productUrl?: string | null; googlePlayUrl?: string | null; description?: string };

export function EbookCard({ book }: { book: CatalogBook }) {
  const { t } = useI18n();
  return (
    <article className="group flex flex-col rounded-2xl border border-border/80 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/70 hover:shadow-xl">
      {book.coverImageUrl ? <img src={book.coverImageUrl} alt={`Cover of ${book.title}`} loading="lazy" className="aspect-[3/4] w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.015]" /> : <div className={`flex aspect-[3/4] flex-col justify-between rounded-md p-6 ${toneClass[book.tone]}`}><span className="text-xs uppercase tracking-[0.3em] opacity-80">Chequetto</span><span className="font-display text-3xl leading-tight">{book.title}</span></div>}
      <h3 className="mt-4 font-display text-xl">{book.title}</h3>
      <p className="mt-1 flex-1 text-sm text-muted-foreground">{book.description || book.subtitle}</p>
      <p className="mt-3 font-semibold text-primary">{book.price}</p>
      <div className="mt-5 grid gap-2">
        {book.payhipUrl && <a href={book.payhipUrl} target="_blank" rel="noopener noreferrer" className="rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:opacity-90">{t("buyPayhip")}</a>}
        {book.googlePlayUrl && <a href={book.googlePlayUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-primary px-4 py-2 text-center text-sm font-medium text-primary hover:bg-primary/5">{t("googlePlay")}</a>}
      </div>
    </article>
  );
}

export function MainEbookFeature() {
  const [book, setBook] = useState<CatalogBook | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    let active = true;
    supabase.from("ebooks")
      .select("id, slug, title, subtitle, description, price, cover_image_url, product_url, payhip_url, google_play_url, is_free, is_featured")
      .eq("is_free", false)
      .ilike("title", "%30-Day Hair Reset%")
      .limit(1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) console.error("[catalog] main ebook load failed", error);
        if (data) setBook({
          id: data.id, title: data.title, subtitle: data.subtitle ?? "",
          price: data.price ?? "", payhipUrl: data.payhip_url ?? "",
          googlePlayUrl: data.google_play_url ?? "", productUrl: data.product_url,
          coverImageUrl: data.cover_image_url, description: data.description ?? "",
          tone: "primary",
        });
        setLoading(false);
      });
    return () => { active = false; };
  }, []);

  if (loading) return <div className="animate-pulse rounded-xl bg-secondary/60 p-6" aria-label="Loading featured ebook" />;
  if (!book) return (
    <div className="rounded-xl border border-dashed border-gold/50 bg-card p-5">
      <p className="font-display text-2xl text-primary">The 30-Day Hair Reset</p>
      <p className="mt-2 text-sm text-muted-foreground">The featured ebook is being prepared. Its purchase link will appear here when the product is configured.</p>
    </div>
  );

  return (
    <article className="grid grid-cols-[104px_1fr] gap-4 rounded-xl border border-gold/40 bg-card p-4 shadow-soft sm:grid-cols-[128px_1fr] sm:p-5">
      {book.coverImageUrl ? (
        <img src={book.coverImageUrl} alt={`Cover of ${book.title}`} className="aspect-[3/4] w-full rounded-lg object-cover" />
      ) : (
        <div className="flex aspect-[3/4] items-center justify-center rounded-lg bg-primary p-3 text-center font-display text-lg text-primary-foreground">The 30-Day Hair Reset</div>
      )}
      <div className="flex min-w-0 flex-col justify-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Chequetto featured method</p>
        <h2 className="mt-2 font-display text-2xl leading-tight text-primary sm:text-3xl">{book.title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{book.description || book.subtitle}</p>
        {book.price && <p className="mt-3 font-semibold text-primary">{book.price}</p>}
        <div className="mt-4 grid gap-2">
          {book.payhipUrl && <a href={book.payhipUrl} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground hover:opacity-90">{t("buyPayhip")}</a>}
          {book.googlePlayUrl && <a href={book.googlePlayUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-primary px-4 py-2 text-center text-sm font-medium text-primary hover:bg-primary/5">{t("googlePlay")}</a>}
          {!book.payhipUrl && !book.googlePlayUrl && <p className="text-xs text-muted-foreground">Purchase options will appear when configured in the administration.</p>}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Includes the 30-day companion app as a purchase bonus.</p>
      </div>
    </article>
  );
}

export function EbookGrid() {
  const [books, setBooks] = useState<CatalogBook[]>([]);
  useEffect(() => {
    let active = true;
    supabase.from("ebooks").select("id, slug, title, subtitle, description, price, cover_image_url, product_url, payhip_url, google_play_url, download_url, is_free, is_featured")
      .eq("is_free", false).order("is_featured", { ascending: false }).order("created_at", { ascending: false }).limit(10)
      .then(({ data, error }) => {
        if (!active || error) return;
        setBooks(data.filter((book) => !book.title.toLowerCase().includes("30-day hair reset")).slice(0, 3).map((book, index) => ({
          id: book.id, title: book.title, subtitle: book.subtitle ?? "",
          price: book.price ?? "", payhipUrl: book.payhip_url ?? "",
          googlePlayUrl: book.google_play_url ?? "", productUrl: book.product_url, coverImageUrl: book.cover_image_url,
          description: book.description ?? "",
          tone: (["primary", "secondary", "gold"] as const)[index % 3],
        })));
      });
    return () => { active = false; };
  }, []);
  return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{books.slice(0, 3).map((b) => <EbookCard key={b.id} book={b} />)}</div>;
}

export function PostGrid() {
  const { t } = useI18n();
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {posts.map((p) => (
        <article key={p.slug} className="overflow-hidden rounded-lg border border-border bg-card">
          <img src={journalImg} alt="" loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
          <div className="p-5">
            <time className="text-xs uppercase tracking-widest text-gold">{p.date}</time>
            <h3 className="mt-2 font-display text-xl leading-snug">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            <Link to="/blog/$slug" params={{ slug: p.slug }} className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline">{t("readMore")} →</Link>
          </div>
        </article>
      ))}
    </div>
  );
}

const emailSchema = z.string().trim().email().max(255);

export function FreeGuideBox() {
  const { t, lang } = useI18n();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!emailSchema.safeParse(email).success) { toast.error(t("emailPh")); return; }
    if (submitting) return;
    setSubmitting(true);
    try {
      const guideUrl = await getFreeGuideUrl();
      if (!guideUrl) throw new Error(lang === "pt" ? "O link do guia ainda não foi configurado. Tente novamente mais tarde." : "The guide link is not configured yet. Please try again later.");
      await subscribeLead({ data: { email, language: lang, optedIn: consent } });
      setDone(true);
      toast.success(t("guideOk"));
      window.location.assign(guideUrl);
    } catch (error) {
      console.error("[guide] subscription failed", error);
      toast.error(error instanceof Error ? error.message : (lang === "pt" ? "Não foi possível salvar seu e-mail. Tente novamente." : "We couldn't save your email. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section className="relative overflow-hidden rounded-[1.5rem] border border-gold/50 bg-card shadow-soft md:grid md:grid-cols-[0.85fr_1.15fr]">
      <div className="relative flex min-h-64 flex-col justify-center overflow-hidden bg-secondary p-8 text-secondary-foreground md:p-10">
        <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-gold/30" />
        <div className="pointer-events-none absolute -bottom-24 -left-12 h-56 w-56 rounded-full border border-gold/20" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.25em] text-gold">FREE MINI E-BOOK · PDF</p>
        <p className="relative mt-5 max-w-xs font-display text-4xl leading-tight md:text-5xl">A gentle start for your hair-care journey.</p>
        <p className="relative mt-4 text-sm text-secondary-foreground/75">A practical gift from Chequetto.</p>
      </div>
      <div className="p-8 md:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Your complimentary guide</p>
      <h2 className="mt-3 font-display text-3xl text-primary md:text-4xl">{t("guideTitle")}</h2>
      <p className="mt-3 max-w-xl leading-7 text-muted-foreground">{t("guideText")}</p>
      {done ? <p className="mt-6 font-medium text-secondary">{t("guideOk")}</p> : (
        <form onSubmit={submit} className="mt-6 grid gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("emailPh")} className="min-w-0 flex-1 rounded-md border border-input bg-background px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10" />
            <button type="submit" disabled={submitting} className="download-cta-pulse rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? (lang === "pt" ? "Enviando..." : "Sending...") : t("getGuide")}</button>
          </div>
          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-primary" />
            {t("consent")}
          </label>
        </form>
      )}
      </div>
    </section>
  );
}
