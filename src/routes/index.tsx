import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { useI18n } from "@/lib/i18n";
import { AppAccessBox, EbookGrid, FreeGuideBox, MainEbookFeature, PostGrid } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chequetto — Hair Loss Reset | A 30-Day Scalp Reset Protocol" },
      { name: "description", content: "Choose your next step: explore the Hair Loss Reset ebook, access the Chequetto hair-care app, or begin with the free 30-day introduction." },
      { property: "og:title", content: "Hair Loss Reset — Chequetto" },
      { property: "og:description", content: "A clear 30-day starting point for a more thoughtful hair-care routine." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  const pt = lang === "pt";
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#101b17] text-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#c99b48]/20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:gap-12 lg:py-16">
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e5c47d]">CH E Q U E T T O · HAIR CARE</p>
            <h1 className="mt-5 max-w-2xl font-display text-4xl leading-[1.06] sm:text-5xl lg:text-6xl">
              {pt ? "Um novo começo para o cuidado com seus cabelos." : "A fresh start for your hair-care journey."}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              {pt ? "Conheça o Hair Loss Reset, acompanhe sua rotina no aplicativo Chequetto ou comece gratuitamente com a introdução ao plano de 30 dias." : "Discover Hair Loss Reset, follow your routine with the Chequetto app, or start free with the 30-day plan introduction."}
            </p>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              <a href="#main-ebook-offer" className="rounded-lg bg-[#d7b66f] px-4 py-3 text-center text-sm font-bold text-[#17221d] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e7ca8b]">
                {pt ? "Comprar ebook" : "Get the ebook"}
              </a>
              <a href="#companion-app" className="rounded-lg border border-white/35 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10">
                {pt ? "Acessar aplicativo" : "Open the app"}
              </a>
              <a href="#free-guide" className="rounded-lg border border-[#d7b66f]/70 px-4 py-3 text-center text-sm font-semibold text-[#f1d99f] transition hover:bg-white/10">
                {pt ? "Começar grátis" : "Start for free"}
              </a>
            </div>
            <p className="mt-5 text-xs tracking-wide text-white/55">
              {pt ? "Escolha seu caminho. Comece no seu ritmo." : "Choose your path. Start at your own pace."}
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] border border-[#d7b66f]/30" />
            <div className="relative overflow-hidden rounded-2xl border border-[#d7b66f]/40 shadow-2xl">
              <img src={heroImg} alt={pt ? "Editorial Chequetto sobre cuidado capilar" : "Chequetto hair-care editorial"} className="aspect-[4/3] w-full object-cover" fetchPriority="high" />
            </div>
            <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-[0.24em] text-[#e5c47d]">A thoughtful approach to healthy-looking hair</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:pt-14" aria-label={pt ? "Oferta principal" : "Featured offer"}>
        <div id="main-ebook-offer" className="scroll-mt-24">
          <div className="mb-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{pt ? "O método em destaque" : "The featured method"}</p>
            <h2 className="mt-2 font-display text-3xl text-primary sm:text-4xl">{pt ? "Hair Loss Reset" : "Hair Loss Reset"}</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{pt ? "O protocolo de 30 dias para organizar uma rotina de cuidado do couro cabeludo." : "A 30-day protocol to help you build a more intentional scalp-care routine."}</p>
          </div>
          <MainEbookFeature />
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          <div id="companion-app" className="scroll-mt-24"><AppAccessBox /></div>
          <div id="free-guide" className="scroll-mt-24"><FreeGuideBox /></div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6" aria-labelledby="collection-title">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">The Chequetto editorial collection</p><h2 id="collection-title" className="mt-2 font-display text-4xl text-primary md:text-5xl">{pt ? "Continue explorando" : "Explore the collection"}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{pt ? "Guias complementares para diferentes etapas da sua jornada de cuidado capilar." : "Thoughtful guides for every stage of your hair-care journey."}</p></div>
          <Link to="/ebooks" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">{t("viewAll")} →</Link>
        </div>
        <EbookGrid />
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{pt ? "Conhecimento e inspiração" : "Knowledge & inspiration"}</p><h2 className="mt-2 font-display text-4xl text-primary md:text-5xl">{t("journal")}</h2></div>
          <Link to="/blog" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">{t("viewAll")} →</Link>
        </div>
        <PostGrid />
      </section>
    </>
  );
}
