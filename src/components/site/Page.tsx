import type { ReactNode } from "react";

export function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="mb-10 font-display text-5xl text-primary">{title}</h1>
      {children}
    </section>
  );
}

export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} — Chequetto` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — Chequetto` },
    { property: "og:description", content: description },
  ],
});
