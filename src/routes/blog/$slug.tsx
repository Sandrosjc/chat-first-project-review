import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { posts } from "@/lib/content";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Chequetto` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Article not found — Chequetto" }, { name: "robots", content: "noindex" }],
  }),
  component: Article,
});

function Article() {
  const post = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-2xl px-4 py-14">
      <Link to="/blog" className="text-sm text-primary">← The Hair Journal</Link>
      <time className="mt-6 block text-xs uppercase tracking-widest text-gold">{post.date}</time>
      <h1 className="mt-2 font-display text-5xl leading-tight text-primary">{post.title}</h1>
      {post.body.map((p, i) => <p key={i} className="mt-6 text-lg leading-relaxed">{p}</p>)}
    </article>
  );
}
