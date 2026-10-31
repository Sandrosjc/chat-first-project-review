import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const LANGS = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "nl", label: "Nederlands" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
] as const;

export type Lang = (typeof LANGS)[number]["code"];

type Dict = Record<string, string>;

const en: Dict = {
  home: "Home", ebooks: "E-books", blog: "Blog", about: "About", contact: "Contact",
  search: "Search", heroKicker: "Natural hair wellness",
  heroTitle: "Healthy Hair, Greater Confidence",
  heroText: "Science-backed guides to grow, strengthen and care for your hair — written to be read, practised and loved.",
  explore: "Explore Our E-books",
  guideTitle: "Free 10-Page Guide",
  guideText: "Five daily habits for stronger, shinier hair. Register your email to receive the guide when delivery is activated.",
  emailPh: "Your email address", getGuide: "Send me the guide",
  consent: "I agree to receive occasional emails from Chequetto. Unsubscribe anytime.",
  guideOk: "Your email has been registered. Guide delivery will be activated soon.",
  featured: "Featured E-books", buyPayhip: "Buy on Payhip", googlePlay: "Google Play Books",
  journal: "The Hair Journal", readMore: "Read article", viewAll: "View all",
  footerText: "Editorial guides for healthy, confident hair.",
  privacy: "Privacy Policy", terms: "Terms of Use", rights: "All rights reserved.",
  send: "Send message", name: "Name", message: "Message", sent: "Message sent. We will reply soon.",
};

const T: Record<Lang, Dict> = {
  en,
  pt: { ...en, home: "Início", about: "Sobre", contact: "Contato", search: "Buscar", heroKicker: "Bem-estar capilar natural", heroTitle: "Cabelos Saudáveis, Mais Confiança", heroText: "Guias baseados em ciência para crescer, fortalecer e cuidar do seu cabelo.", explore: "Conheça Nossos E-books", guideTitle: "Guia Grátis de 10 Páginas", guideText: "Cinco hábitos diários para cabelos mais fortes e brilhantes. Cadastre seu e-mail para receber o guia quando a entrega estiver ativada.", emailPh: "Seu e-mail", getGuide: "Quero o guia", consent: "Aceito receber e-mails ocasionais da Chequetto. Cancele quando quiser.", guideOk: "Seu e-mail foi cadastrado. A entrega do guia será ativada em breve.", featured: "E-books em Destaque", buyPayhip: "Comprar no Payhip", journal: "O Diário do Cabelo", readMore: "Ler artigo", viewAll: "Ver todos", footerText: "Guias editoriais para cabelos saudáveis e confiantes.", privacy: "Política de Privacidade", terms: "Termos de Uso", rights: "Todos os direitos reservados.", send: "Enviar mensagem", name: "Nome", message: "Mensagem", sent: "Mensagem enviada. Responderemos em breve." },
  es: { ...en, home: "Inicio", about: "Nosotros", contact: "Contacto", search: "Buscar", heroKicker: "Bienestar capilar natural", heroTitle: "Cabello Sano, Más Confianza", heroText: "Guías basadas en ciencia para hacer crecer, fortalecer y cuidar tu cabello.", explore: "Descubre Nuestros E-books", guideTitle: "Guía Gratis de 10 Páginas", guideText: "Cinco hábitos diarios para un cabello más fuerte y brillante.", emailPh: "Tu correo electrónico", getGuide: "Quiero la guía", consent: "Acepto recibir correos ocasionales de Chequetto. Puedo darme de baja cuando quiera.", guideOk: "¡Gracias! Tu guía va en camino.", featured: "E-books Destacados", buyPayhip: "Comprar en Payhip", journal: "El Diario del Cabello", readMore: "Leer artículo", viewAll: "Ver todos", privacy: "Política de Privacidad", terms: "Términos de Uso", rights: "Todos los derechos reservados.", send: "Enviar mensaje", name: "Nombre", message: "Mensaje" },
  fr: { ...en, home: "Accueil", about: "À propos", search: "Rechercher", heroTitle: "Des Cheveux Sains, Plus de Confiance", explore: "Découvrir nos E-books", guideTitle: "Guide Gratuit de 10 Pages", emailPh: "Votre adresse e-mail", getGuide: "Recevoir le guide", featured: "E-books à la Une", buyPayhip: "Acheter sur Payhip", journal: "Le Journal du Cheveu", readMore: "Lire l'article", viewAll: "Tout voir", privacy: "Politique de confidentialité", terms: "Conditions d'utilisation" },
  de: { ...en, home: "Start", about: "Über uns", contact: "Kontakt", search: "Suche", heroTitle: "Gesundes Haar, Mehr Selbstvertrauen", explore: "Unsere E-Books entdecken", guideTitle: "Kostenloser 10-Seiten-Leitfaden", emailPh: "Ihre E-Mail-Adresse", getGuide: "Leitfaden senden", featured: "Ausgewählte E-Books", buyPayhip: "Bei Payhip kaufen", journal: "Das Haar-Journal", readMore: "Artikel lesen", viewAll: "Alle ansehen", privacy: "Datenschutz", terms: "Nutzungsbedingungen" },
  it: { ...en, about: "Chi siamo", contact: "Contatti", search: "Cerca", heroTitle: "Capelli Sani, Più Sicurezza", explore: "Scopri i Nostri E-book", guideTitle: "Guida Gratuita di 10 Pagine", emailPh: "Il tuo indirizzo email", getGuide: "Inviami la guida", featured: "E-book in Evidenza", buyPayhip: "Acquista su Payhip", journal: "Il Diario dei Capelli", readMore: "Leggi l'articolo", viewAll: "Vedi tutti", terms: "Termini d'uso" },
  nl: { ...en, about: "Over ons", search: "Zoeken", heroTitle: "Gezond Haar, Meer Zelfvertrouwen", explore: "Ontdek Onze E-books", guideTitle: "Gratis Gids van 10 Pagina's", emailPh: "Je e-mailadres", getGuide: "Stuur mij de gids", featured: "Uitgelichte E-books", buyPayhip: "Kopen op Payhip", readMore: "Lees artikel", viewAll: "Bekijk alles" },
  ja: { ...en, home: "ホーム", about: "私たちについて", contact: "お問い合わせ", search: "検索", heroTitle: "健やかな髪、大きな自信", explore: "電子書籍を見る", guideTitle: "無料10ページガイド", emailPh: "メールアドレス", getGuide: "ガイドを受け取る", featured: "おすすめ電子書籍", buyPayhip: "Payhipで購入", journal: "ヘアジャーナル", readMore: "記事を読む", viewAll: "すべて見る" },
  zh: { ...en, home: "首页", ebooks: "电子书", blog: "博客", about: "关于", contact: "联系", search: "搜索", heroTitle: "健康秀发，更多自信", explore: "浏览我们的电子书", guideTitle: "免费10页指南", emailPh: "您的电子邮箱", getGuide: "发送指南给我", featured: "精选电子书", buyPayhip: "在 Payhip 购买", journal: "护发日志", readMore: "阅读文章", viewAll: "查看全部" },
};

/** Maps a browser locale (e.g. "pt-BR") to one of the 9 site languages; English is the fallback. */
export function detectLang(locale: string | undefined): Lang {
  const code = (locale ?? "en").slice(0, 2).toLowerCase();
  return (LANGS.find((l) => l.code === code)?.code ?? "en") as Lang;
}

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "en", setLang: () => {}, t: (k) => en[k] ?? k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("chequetto-lang");
    setLangState(saved ? detectLang(saved) : detectLang(navigator.language));
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => { localStorage.setItem("chequetto-lang", l); setLangState(l); };
  const t = (k: string) => T[lang][k] ?? en[k] ?? k;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
