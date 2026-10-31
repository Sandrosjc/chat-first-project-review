import { createFileRoute } from "@tanstack/react-router";
import { Page, meta } from "@/components/site/Page";

export const Route = createFileRoute("/about")({
  head: () => meta("About", "Chequetto publishes clear, research-informed guides on hair health."),
  component: () => (
    <Page title="About Chequetto">
      <div className="max-w-2xl space-y-5 text-lg leading-relaxed">
        <p>Chequetto was born from a simple belief: healthy hair begins with good information.</p>
        <p>We publish beautifully written, research-informed guides that turn science into simple daily rituals — so you can care for your hair with confidence.</p>
      </div>
    </Page>
  ),
});
