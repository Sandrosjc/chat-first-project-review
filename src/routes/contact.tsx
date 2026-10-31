import { useState, type FormEvent } from "react";
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
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); toast.success(t("sent")); };
  const field = "w-full rounded-md border border-input bg-background px-4 py-3 outline-none focus:border-primary";
  return (
    <Page title={t("contact")}>
      {sent ? <p className="text-secondary">{t("sent")}</p> : (
        <form onSubmit={submit} className="grid max-w-xl gap-4">
          <input required maxLength={100} placeholder={t("name")} className={field} />
          <input required type="email" maxLength={255} placeholder={t("emailPh")} className={field} />
          <textarea required maxLength={2000} rows={5} placeholder={t("message")} className={field} />
          <button className="justify-self-start rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground">{t("send")}</button>
        </form>
      )}
    </Page>
  );
}
