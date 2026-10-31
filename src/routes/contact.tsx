import { type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Page, meta } from "@/components/site/Page";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact", "Get in touch with the Chequetto team."),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    toast.error("O formulário ainda não está conectado ao envio de mensagens. Tente novamente mais tarde.");
  };
  const field = "w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:border-primary";
  return (
    <Page title={t("contact")}>
      <form onSubmit={submit} className="grid w-full max-w-xl gap-4">
        <input required maxLength={100} placeholder={t("name")} className={field} />
        <input required type="email" maxLength={255} placeholder={t("emailPh")} className={field} />
        <textarea required maxLength={2000} rows={5} placeholder={t("message")} className={field} />
        <button type="submit" className="justify-self-start rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground">{t("send")}</button>
        <p className="text-sm text-muted-foreground">O envio de mensagens será ativado quando o serviço de e-mail for configurado.</p>
      </form>
    </Page>
  );
}
