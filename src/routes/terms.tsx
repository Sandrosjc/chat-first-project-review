import { createFileRoute } from "@tanstack/react-router";
import { Page, meta } from "@/components/site/Page";

export const Route = createFileRoute("/terms")({
  head: () => meta("Terms of Use", "Terms for using Chequetto.online and its e-books."),
  component: () => (
    <Page title="Terms of Use">
      <div className="max-w-2xl space-y-4 leading-relaxed">
        <p>The content on Chequetto.online is educational and does not replace medical advice.</p>
        <p>E-books are licensed for personal use. Sales and refunds follow the policies of Payhip and Google Play.</p>
      </div>
    </Page>
  ),
});
