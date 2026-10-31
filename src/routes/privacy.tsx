import { createFileRoute } from "@tanstack/react-router";
import { Page, meta } from "@/components/site/Page";

export const Route = createFileRoute("/privacy")({
  head: () => meta("Privacy Policy", "How Chequetto collects and protects your data."),
  component: () => (
    <Page title="Privacy Policy">
      <div className="max-w-2xl space-y-4 leading-relaxed">
        <p>We collect your email address and preferred language only when you request our free guide or contact us.</p>
        <p>Marketing emails are sent only with your consent, and every email includes a one-click unsubscribe link.</p>
        <p>Purchases are processed by Payhip or Google Play; we never see your payment details.</p>
      </div>
    </Page>
  ),
});
