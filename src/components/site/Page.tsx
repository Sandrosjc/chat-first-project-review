import type { ReactNode } from "react";

export function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <h1 className="mb-8 break-words font-display text-4xl leading-tight text-primary sm:mb-10 sm:text-5xl">{title}</h1>
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
