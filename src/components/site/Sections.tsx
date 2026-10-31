import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { ebooks, posts, type Ebook } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import journalImg from "@/assets/journal.jpg";

const toneClass: Record<Ebook["tone"], string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  gold: "bg-gold text-foreground",
};

export function EbookCard({ book }: { book: Ebook }) {
  const { t } = useI18n();
  return (
    <article className="flex flex-col rounded-lg border border-border bg-card p-5 shadow-soft">
      <div className={`flex aspect-[3/4] flex-col justify-between rounded-md p-6 ${toneClass[book.tone]}`}>
        <span className="text-xs uppercase tracking-[0.3em] opacity-80">Chequetto</span>
        <span className="font-display text-3xl leading-tight">{book.title}</span>
      </div>
      <h3 className="mt-4 font-display text-xl">{book.title}</h3>
      <p className="mt-1 flex-1 text-sm text-muted-foreground">{book.subtitle}</p>
      <p className="mt-3 font-semibold text-primary">{book.price}</p>
      <div className="mt-4 grid gap-2">
        <a href={book.payhipUrl} target="_blank" rel="noopener noreferrer" className="rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:opacity-90">{t("buyPayhip")}</a>
        <a href={book.googlePlayUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-primary px-4 py-2 text-center text-sm font-medium text-primary hover:bg-primary/5">{t("googlePlay")}</a>
      </div>
    </article>
  );
}

export function EbookGrid() {
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{ebooks.map((b) => <EbookCard key={b.id} book={b} />)}</div>;
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
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!emailSchema.safeParse(email).success) { toast.error(t("emailPh")); return; }
    // Stage 2: save { email, language: lang, opted_in: consent } to the leads table.
    void lang; void consent;
    setDone(true);
    toast.success(t("guideOk"));
  };
  return (
    <section className="rounded-xl border border-gold/50 bg-card p-8 shadow-soft md:p-10">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">PDF · 10 pages</p>
      <h2 className="mt-2 font-display text-3xl">{t("guideTitle")}</h2>
      <p className="mt-2 text-muted-foreground">{t("guideText")}</p>
      {done ? <p className="mt-6 font-medium text-secondary">{t("guideOk")}</p> : (
        <form onSubmit={submit} className="mt-6 grid gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("emailPh")} className="flex-1 rounded-md border border-input bg-background px-4 py-3 outline-none focus:border-primary" />
            <button className="rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90">{t("getGuide")}</button>
          </div>
          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-primary" />
            {t("consent")}
          </label>
        </form>
      )}
    </section>
  );
}
