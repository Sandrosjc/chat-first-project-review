// Catalogue content. In Stage 2 this moves to the database and is edited from /admin.
export type Ebook = { id: string; title: string; subtitle: string; price: string; payhipUrl: string; googlePlayUrl: string; tone: "primary" | "secondary" | "gold" };

export const ebooks: Ebook[] = [
  { id: "grow", title: "The Growth Ritual", subtitle: "A 90-day plan for longer, fuller hair", price: "$14.90", payhipUrl: "https://payhip.com", googlePlayUrl: "https://play.google.com/store/books", tone: "primary" },
  { id: "scalp", title: "Scalp First", subtitle: "The foundation of every healthy strand", price: "$12.90", payhipUrl: "https://payhip.com", googlePlayUrl: "https://play.google.com/store/books", tone: "secondary" },
  { id: "oils", title: "Botanical Oils", subtitle: "Nature's remedies for strength & shine", price: "$11.90", payhipUrl: "https://payhip.com", googlePlayUrl: "https://play.google.com/store/books", tone: "gold" },
];

export type Post = { slug: string; title: string; excerpt: string; date: string; body: string[] };

export const posts: Post[] = [
  { slug: "rosemary-oil-for-hair-growth", title: "Rosemary Oil for Hair Growth: What the Research Says", excerpt: "A closer look at the herb everyone is talking about, and how to use it safely.", date: "2026-10-12", body: ["Rosemary oil has become one of the most talked-about natural remedies for thinning hair.", "Used consistently and diluted in a carrier oil, it may support circulation to the scalp. Always patch-test first and give any routine at least three months."] },
  { slug: "five-habits-that-damage-hair", title: "Five Everyday Habits That Quietly Damage Your Hair", excerpt: "From hot showers to tight ponytails — small changes that make a big difference.", date: "2026-09-28", body: ["Hair damage is rarely the result of a single event. It accumulates from small daily habits.", "Lower the water temperature, loosen your hairstyles, use a heat protectant and sleep on silk. Your hair will thank you."] },
  { slug: "nutrition-for-strong-hair", title: "Eating for Strong Hair: The Nutrients That Matter", excerpt: "Protein, iron, zinc and biotin — what your strands need from your plate.", date: "2026-09-10", body: ["Hair is made mostly of keratin, a protein. Without enough protein in your diet, growth slows.", "Iron, zinc, vitamin D and omega-3 fats also play key roles. A balanced plate beats any supplement."] },
];
