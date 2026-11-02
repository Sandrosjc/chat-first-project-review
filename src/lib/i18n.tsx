import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const LANGS = [
  { code: "en", label: "🇺🇸 English" },
  { code: "pt", label: "🇧🇷 Português" },
  { code: "es", label: "🇪🇸 Español" },
  { code: "de", label: "🇩🇪 Deutsch" },
  { code: "fr", label: "🇫🇷 Français" },
  { code: "it", label: "🇮🇹 Italiano" },
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
  mainSubtitle: "The 30-Day Scalp Reset Protocol to Stop Stress-Related Hair Loss and Restore Healthy Growth", appTitle: "The Chequetto Hair-Care App", appText: "Register your email to unlock access to the app.", appButton: "Register and unlock access", appOpen: "Access the app", freeTitle: "Free introduction to the 30-day plan", freeText: "Get the introductory guide and take the first step in your hair-care routine.", freeButton: "Get the free guide", price: "US$ 9.90", choosePath: "Choose your next step",
};

const T: Record<Lang, Dict> = {
  en,
  pt: { ...en, home: "Início", about: "Sobre", contact: "Contato", search: "Buscar", heroKicker: "Bem-estar capilar natural", heroTitle: "Cabelos Saudáveis, Mais Confiança", heroText: "Guias baseados em ciência para crescer, fortalecer e cuidar do seu cabelo.", explore: "Conheça Nossos E-books", guideTitle: "Guia Grátis de 10 Páginas", guideText: "Cinco hábitos diários para cabelos mais fortes e brilhantes. Cadastre seu e-mail para receber o guia quando a entrega estiver ativada.", emailPh: "Seu e-mail", getGuide: "Quero o guia", consent: "Aceito receber e-mails ocasionais da Chequetto. Cancele quando quiser.", guideOk: "Seu e-mail foi cadastrado. A entrega do guia será ativada em breve.", featured: "E-books em Destaque", buyPayhip: "Comprar no Payhip", journal: "O Diário do Cabelo", readMore: "Ler artigo", viewAll: "Ver todos", footerText: "Guias editoriais para cabelos saudáveis e confiantes.", privacy: "Política de Privacidade", terms: "Termos de Uso", rights: "Todos os direitos reservados.", send: "Enviar mensagem", name: "Nome", message: "Mensagem", sent: "Mensagem enviada. Responderemos em breve.", mainSubtitle: "O protocolo de 30 dias para cuidar do couro cabeludo e organizar sua rotina capilar", appTitle: "Aplicativo de cuidados capilares Chequetto", appText: "Cadastre seu e-mail para liberar o acesso ao aplicativo.", appButton: "Cadastrar e liberar acesso", appOpen: "Acessar aplicativo", freeTitle: "Introdução gratuita ao plano de 30 dias", freeText: "Receba o guia introdutório e dê o primeiro passo na sua rotina capilar.", freeButton: "Receber guia gratuito", price: "US$ 9,90", choosePath: "Escolha seu próximo passo" },
  es: { ...en, home: "Inicio", about: "Nosotros", contact: "Contacto", search: "Buscar", heroKicker: "Bienestar capilar natural", heroTitle: "Cabello Sano, Más Confianza", heroText: "Guías basadas en ciencia para hacer crecer, fortalecer y cuidar tu cabello.", explore: "Descubre Nuestros E-books", guideTitle: "Guía Gratis de 10 Páginas", guideText: "Cinco hábitos diarios para un cabello más fuerte y brillante. Registra tu correo para recibir la guía cuando la entrega esté activada.", emailPh: "Tu correo electrónico", getGuide: "Quiero la guía", consent: "Acepto recibir correos ocasionales de Chequetto. Puedo darme de baja cuando quiera.", guideOk: "Tu correo ha sido registrado. La entrega de la guía se activará pronto.", featured: "E-books Destacados", buyPayhip: "Comprar en Payhip", journal: "El Diario del Cabello", readMore: "Leer artículo", viewAll: "Ver todos", privacy: "Política de Privacidad", terms: "Términos de Uso", rights: "Todos los derechos reservados.", send: "Enviar mensaje", name: "Nombre", message: "Mensaje", mainSubtitle: "El protocolo de 30 días para cuidar el cuero cabelludo y organizar tu rutina capilar", appTitle: "Aplicación de cuidado capilar Chequetto", appText: "Registra tu correo electrónico para acceder a la aplicación.", appButton: "Registrarme y desbloquear acceso", appOpen: "Acceder a la aplicación", freeTitle: "Introducción gratuita al plan de 30 días", freeText: "Recibe la guía introductoria y da el primer paso en tu rutina capilar.", freeButton: "Obtener la guía gratis", price: "US$ 9,90", choosePath: "Elige tu próximo paso" },
  fr: { ...en, home: "Accueil", ebooks: "E-books", blog: "Blog", about: "À propos", contact: "Contact", search: "Rechercher", heroKicker: "Bien-être capillaire", heroTitle: "Des cheveux sains, plus de confiance", heroText: "Des guides pratiques pour prendre soin de vos cheveux et construire une routine capillaire réfléchie.", explore: "Découvrir nos e-books", guideTitle: "Guide gratuit de 10 pages", guideText: "Cinq habitudes quotidiennes pour des cheveux plus forts et plus brillants.", emailPh: "Votre adresse e-mail", getGuide: "Recevoir le guide", consent: "J’accepte de recevoir occasionnellement des e-mails de Chequetto. Désinscription possible à tout moment.", guideOk: "Votre adresse e-mail a été enregistrée.", featured: "E-books à la une", buyPayhip: "Acheter sur Payhip", googlePlay: "Google Play Livres", journal: "Le journal capillaire", readMore: "Lire l’article", viewAll: "Tout voir", footerText: "Des guides éditoriaux pour des cheveux sains et pleins de confiance.", privacy: "Politique de confidentialité", terms: "Conditions d’utilisation", rights: "Tous droits réservés.", send: "Envoyer", name: "Nom", message: "Message", sent: "Message envoyé.", mainSubtitle: "Le protocole de 30 jours pour prendre soin du cuir chevelu et structurer votre routine capillaire", appTitle: "Application capillaire Chequetto", appText: "Inscrivez votre e-mail pour accéder à l’application.", appButton: "M’inscrire et débloquer l’accès", appOpen: "Accéder à l’application", freeTitle: "Introduction gratuite au programme de 30 jours", freeText: "Recevez le guide d’introduction et commencez votre routine capillaire.", freeButton: "Recevoir le guide gratuit", price: "9,90 $US", choosePath: "Choisissez votre prochaine étape" },
  de: { ...en, guideText: "Fünf tägliche Gewohnheiten für kräftigeres, glänzenderes Haar. Registrieren Sie Ihre E-Mail-Adresse, um den Leitfaden zu erhalten, sobald der Versand aktiviert ist.", guideOk: "Ihre E-Mail-Adresse wurde registriert. Der Versand des Leitfadens wird in Kürze aktiviert.", consent: "Ich möchte gelegentlich E-Mails von Chequetto erhalten. Eine Abmeldung ist jederzeit möglich.", home: "Start", about: "Über uns", contact: "Kontakt", search: "Suche", heroTitle: "Gesundes Haar, Mehr Selbstvertrauen", explore: "Unsere E-Books entdecken", guideTitle: "Kostenloser 10-Seiten-Leitfaden", emailPh: "Ihre E-Mail-Adresse", getGuide: "Leitfaden senden", featured: "Ausgewählte E-Books", buyPayhip: "Bei Payhip kaufen", journal: "Das Haar-Journal", readMore: "Artikel lesen", viewAll: "Alle ansehen", privacy: "Datenschutz", terms: "Nutzungsbedingungen" },
  it: { ...en, home: "Home", ebooks: "E-book", blog: "Blog", about: "Chi siamo", contact: "Contatti", search: "Cerca", heroKicker: "Benessere naturale dei capelli", heroTitle: "Capelli sani, più sicurezza", heroText: "Guide pratiche per prenderti cura dei capelli e creare una routine consapevole.", explore: "Scopri i nostri e-book", guideTitle: "Guida gratuita di 10 pagine", guideText: "Cinque abitudini quotidiane per capelli più forti e luminosi.", emailPh: "Il tuo indirizzo email", getGuide: "Ricevi la guida", consent: "Accetto di ricevere occasionalmente email da Chequetto. Posso annullare l’iscrizione in qualsiasi momento.", guideOk: "La tua email è stata registrata.", featured: "E-book in evidenza", buyPayhip: "Acquista su Payhip", googlePlay: "Google Play Libri", journal: "Il diario dei capelli", readMore: "Leggi l’articolo", viewAll: "Vedi tutti", footerText: "Guide editoriali per capelli sani e pieni di sicurezza.", privacy: "Informativa sulla privacy", terms: "Termini d’uso", rights: "Tutti i diritti riservati.", send: "Invia", name: "Nome", message: "Messaggio", sent: "Messaggio inviato.", mainSubtitle: "Il protocollo di 30 giorni per prenderti cura del cuoio capelluto e organizzare la tua routine", appTitle: "App Chequetto per la cura dei capelli", appText: "Registrati con la tua email per accedere all’app.", appButton: "Registrati e sblocca l’accesso", appOpen: "Accedi all’app", freeTitle: "Introduzione gratuita al piano di 30 giorni", freeText: "Ricevi la guida introduttiva e inizia la tua routine di cura dei capelli.", freeButton: "Ricevi la guida gratuita", price: "9,90 USD", choosePath: "Scegli il tuo prossimo passo" },
  nl: { ...en, guideText: "Vijf dagelijkse gewoonten voor sterker en glanzender haar. Registreer je e-mailadres om de gids te ontvangen zodra de verzending is geactiveerd.", guideOk: "Je e-mailadres is geregistreerd. De verzending van de gids wordt binnenkort geactiveerd.", consent: "Ik ga ermee akkoord af en toe e-mails van Chequetto te ontvangen. Afmelden kan op elk moment.", about: "Over ons", search: "Zoeken", heroTitle: "Gezond Haar, Meer Zelfvertrouwen", explore: "Ontdek Onze E-books", guideTitle: "Gratis Gids van 10 Pagina's", emailPh: "Je e-mailadres", getGuide: "Stuur mij de gids", featured: "Uitgelichte E-books", buyPayhip: "Kopen op Payhip", readMore: "Lees artikel", viewAll: "Bekijk alles" },
  ja: { ...en, guideText: "髪をより強く、つややかに保つための5つの毎日の習慣。ガイドの配信開始後に受け取れるよう、メールアドレスをご登録ください。", guideOk: "メールアドレスを登録しました。ガイドの配信は近日中に開始予定です。", consent: "Chequettoからのお知らせメールを不定期に受け取ることに同意します。配信はいつでも停止できます。", home: "ホーム", about: "私たちについて", contact: "お問い合わせ", search: "検索", heroTitle: "健やかな髪、大きな自信", explore: "電子書籍を見る", guideTitle: "無料10ページガイド", emailPh: "メールアドレス", getGuide: "ガイドを受け取る", featured: "おすすめ電子書籍", buyPayhip: "Payhipで購入", journal: "ヘアジャーナル", readMore: "記事を読む", viewAll: "すべて見る" },
  zh: { ...en, guideText: "五个让头发更强韧、更有光泽的日常习惯。登记电子邮箱，待指南开放发送后即可接收。", guideOk: "您的邮箱已登记。指南发送服务即将开放。", consent: "我同意偶尔接收 Chequetto 的邮件。可随时取消订阅。", home: "首页", ebooks: "电子书", blog: "博客", about: "关于", contact: "联系", search: "搜索", heroTitle: "健康秀发，更多自信", explore: "浏览我们的电子书", guideTitle: "免费10页指南", emailPh: "您的电子邮箱", getGuide: "发送指南给我", featured: "精选电子书", buyPayhip: "在 Payhip 购买", journal: "护发日志", readMore: "阅读文章", viewAll: "查看全部" },
};

/** Selects one of the six supported languages from the browser locale; English is the fallback. */
export function detectLang(locale: string | undefined): Lang {
  const code = (locale ?? "en").replace("_", "-").split("-")[0].toLowerCase();
  return (LANGS.find((l) => l.code === code)?.code ?? "en") as Lang;
}

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "en", setLang: () => {}, t: (k) => en[k] ?? k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("chequetto-lang");
    // First visit: infer language from the browser's regional locale. A saved visitor choice always wins.
    setLangState(saved ? detectLang(saved) : detectLang(navigator.languages?.[0] || navigator.language));
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => { localStorage.setItem("chequetto-lang", l); setLangState(l); };
  const t = (k: string) => T[lang][k] ?? en[k] ?? k;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
