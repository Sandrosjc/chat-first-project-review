import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { useI18n } from "@/lib/i18n";
import { EbookGrid, FreeGuideBox, PostGrid } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chequetto — Healthy Hair, Greater Confidence" },
      { name: "description", content: "Practical, science-informed guides for healthier hair. Get the free mini guide and explore the complete hair-care ebook." },
      { property: "og:title", content: "Chequetto — Healthy Hair, Greater Confidence" },
      { property: "og:description", content: "A thoughtful approach to stronger, healthier-looking hair." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-gold/10 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-[1.02fr_.98fr] md:gap-14 md:py-20">
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-card/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {t("heroKicker")}
            </p>
            <h1 className="mt-6 max-w-xl font-display text-5xl leading-[0.98] text-primary md:text-7xl">{t("heroTitle")}</h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground md:text-lg">{t("heroText")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#free-guide" className="rounded-md bg-primary px-7 py-4 text-center text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 hover:opacity-95">{t("getGuide")}</a>
              <Link to="/ebooks" className="rounded-md border border-primary/30 bg-card/70 px-7 py-4 text-center text-sm font-semibold text-primary transition-colors hover:bg-accent">{t("explore")}</Link>
            </div>
            <p className="mt-5 text-xs tracking-wide text-muted-foreground">Thoughtful guidance. Simple routines. A little more confidence every day.</p>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-3 rotate-2 rounded-[2rem] border border-gold/40" />
            <img src={heroImg} alt="Woman with long, healthy, glossy hair" width={1280} height={960} className="relative aspect-[4/4.2] w-full rounded-[1.6rem] object-cover shadow-soft" />
            <div className="absolute -bottom-5 -left-3 max-w-[80%] rounded-xl border border-border bg-card/95 p-4 shadow-soft backdrop-blur">
              <p className="font-display text-xl text-primary">Care that starts with knowledge.</p>
              <p className="mt-1 text-xs text-muted-foreground">Explore practical ways to care for your hair.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="free-guide" className="mx-auto mt-12 max-w-6xl scroll-mt-28 px-4 md:mt-20"><FreeGuideBox /></section>
      <section className="mx-auto mt-24 max-w-6xl px-4">
        <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">The Chequetto collection</p><h2 className="mt-2 font-display text-4xl text-primary md:text-5xl">{t("featured")}</h2></div>
          <Link to="/ebooks" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">{t("viewAll")} →</Link>
        </div>
        <EbookGrid />
      </section>
      <section className="mx-auto mt-24 max-w-6xl px-4">
        <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Notes & inspiration</p><h2 className="mt-2 font-display text-4xl text-primary md:text-5xl">{t("journal")}</h2></div>
          <Link to="/blog" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">{t("viewAll")} →</Link>
        </div>
        <PostGrid />
      </section>
    </>
  );
}
