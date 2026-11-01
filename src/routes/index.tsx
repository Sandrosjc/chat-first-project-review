import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { useI18n } from "@/lib/i18n";
import { EbookGrid, FreeGuideBox, MainEbookFeature, PostGrid } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chequetto — Healthy Hair, Greater Confidence" },
      { name: "description", content: "Practical, science-informed guides for healthier hair. Discover the 30-Day Hair Reset, get the free guide and explore the collection." },
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
        <div className="mx-auto grid max-w-7xl items-start gap-7 px-4 py-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-10 lg:py-14">
          <div className="relative min-w-0">
            <div className="overflow-hidden rounded-2xl border border-gold/30 bg-secondary shadow-soft">
              <img
                src={heroImg}
                alt="Chequetto hair-care editorial"
                className="aspect-video w-full object-cover"
                fetchPriority="high"
              />
            </div>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Chequetto · Hair-care editorial</p>
            <h1 className="mt-2 max-w-2xl font-display text-3xl leading-tight text-primary sm:text-4xl lg:text-5xl">{t("heroTitle")}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{t("heroText")}</p>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <MainEbookFeature />
            <div id="free-guide" className="scroll-mt-24">
              <FreeGuideBox />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto mt-12 max-w-7xl px-4">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">The Chequetto collection</p><h2 className="mt-2 font-display text-4xl text-primary md:text-5xl">More from Chequetto</h2></div>
          <Link to="/ebooks" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">{t("viewAll")} →</Link>
        </div>
        <EbookGrid />
      </section>
      <section className="mx-auto mt-24 max-w-7xl px-4">
        <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Notes & inspiration</p><h2 className="mt-2 font-display text-4xl text-primary md:text-5xl">{t("journal")}</h2></div>
          <Link to="/blog" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">{t("viewAll")} →</Link>
        </div>
        <PostGrid />
      </section>
    </>
  );
}
