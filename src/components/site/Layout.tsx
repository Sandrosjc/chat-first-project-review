import { Link } from "@tanstack/react-router";
import { Globe, Search, Instagram, Facebook, Youtube } from "lucide-react";
import { LANGS, useI18n, type Lang } from "@/lib/i18n";

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const nav = [
    { to: "/", k: "home" }, { to: "/ebooks", k: "ebooks" }, { to: "/blog", k: "blog" },
    { to: "/about", k: "about" }, { to: "/contact", k: "contact" },
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link to="/" className="font-display text-2xl tracking-wide text-primary">Chequetto</Link>
        <nav className="order-3 flex w-full gap-5 overflow-x-auto text-sm md:order-2 md:w-auto">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="whitespace-nowrap text-foreground/80 hover:text-primary" activeProps={{ className: "text-primary font-medium" }}>{t(n.k)}</Link>
          ))}
        </nav>
        <div className="order-2 flex items-center gap-3 md:order-3">
          <label className="flex items-center gap-1 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" aria-hidden />
            <select aria-label="Language" value={lang} onChange={(e) => setLang(e.target.value as Lang)} className="bg-transparent text-foreground outline-none">
              {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </label>
          <Link to="/blog" aria-label={t("search")} className="text-muted-foreground hover:text-primary"><Search className="h-4 w-4" /></Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-gold">Chequetto</p>
          <p className="mt-2 text-sm opacity-80">{t("footerText")}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/ebooks" className="hover:text-gold">{t("ebooks")}</Link>
          <Link to="/blog" className="hover:text-gold">{t("blog")}</Link>
          <Link to="/privacy" className="hover:text-gold">{t("privacy")}</Link>
          <Link to="/terms" className="hover:text-gold">{t("terms")}</Link>
        </div>
        <div className="flex gap-4 md:justify-end">
          <a href="https://instagram.com" aria-label="Instagram" className="hover:text-gold"><Instagram /></a>
          <a href="https://facebook.com" aria-label="Facebook" className="hover:text-gold"><Facebook /></a>
          <a href="https://youtube.com" aria-label="YouTube" className="hover:text-gold"><Youtube /></a>
        </div>
      </div>
      <p className="border-t border-secondary-foreground/15 py-4 text-center text-xs opacity-70">© 2026 Chequetto.online — {t("rights")}</p>
    </footer>
  );
}
