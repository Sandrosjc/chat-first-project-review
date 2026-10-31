import { createFileRoute } from "@tanstack/react-router";
import { Page, meta } from "@/components/site/Page";
import { PostGrid } from "@/components/site/Sections";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/blog/")({
  head: () => meta("The Hair Journal", "Articles on hair growth, scalp health and natural care."),
  component: () => { const { t } = useI18n(); return <Page title={t("journal")}><PostGrid /></Page>; },
});
