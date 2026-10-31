import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { useI18n } from "@/lib/i18n";
import { EbookGrid, FreeGuideBox, PostGrid } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chequetto — Healthy Hair, Greater Confidence" },
      { name: "description", content: "Science-backed e-books and a free 10-page guide for stronger, shinier hair." },
      { property: "og:title", content: "Chequetto — Healthy Hair, Greater Confidence" },
      { property: "og:description", content: "Science-backed e-books and a free 10-page guide for stronger, shinier hair." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">{t("heroKicker")}</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-primary md:text-6xl">{t("heroTitle")}</h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">{t("heroText")}</p>
          <Link to="/ebooks" className="mt-8 inline-block rounded-md bg-primary px-7 py-3 font-medium text-primary-foreground shadow-soft hover:opacity-90">{t("explore")}</Link>
        </div>
        <img src={heroImg} alt="Woman with long, healthy, glossy hair" width={1280} height={960} className="aspect-[4/3] w-full rounded-xl object-cover shadow-soft" />
      </section>
      <div className="mx-auto max-w-4xl px-4"><FreeGuideBox /></div>
      <section className="mx-auto mt-20 max-w-6xl px-4">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-4xl">{t("featured")}</h2>
          <Link to="/ebooks" className="text-sm text-primary hover:underline">{t("viewAll")} →</Link>
        </div>
        <EbookGrid />
      </section>
      <section className="mx-auto mt-20 max-w-6xl px-4">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-4xl">{t("journal")}</h2>
          <Link to="/blog" className="text-sm text-primary hover:underline">{t("viewAll")} →</Link>
        </div>
        <PostGrid />
      </section>
    </>
  );
}
