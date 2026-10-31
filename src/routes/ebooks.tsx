import { createFileRoute } from "@tanstack/react-router";
import { Page, meta } from "@/components/site/Page";
import { EbookGrid } from "@/components/site/Sections";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/ebooks")({
  head: () => meta("E-books", "Hair-care e-books available on Payhip and Google Play Books."),
  component: () => { const { t } = useI18n(); return <Page title={t("ebooks")}><EbookGrid /></Page>; },
});
