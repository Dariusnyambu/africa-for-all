import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import StoryCard from "@/components/home/StoryCard";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Stories",
  description: "Real stories of transformation from communities across Africa.",
};

const FALLBACK_STORIES: {
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string | null;
  location: string | null;
}[] = [
  {
    slug: "amina-classroom",
    title: "Amina's Classroom: From Tent to Foundation",
    excerpt:
      "What began as lessons under a tarpaulin in Turkana has grown into a permanent learning center serving 400 children.",
    cover_image_url: "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=800&q=80",
    location: "Turkana, Kenya",
  },
  {
    slug: "grace-cooperative",
    title: "Grace and the Women's Farming Cooperative",
    excerpt:
      "A microloan and a season of training turned twelve women smallholders into a thriving agricultural cooperative.",
    cover_image_url: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?w=800&q=80",
    location: "Kisumu, Kenya",
  },
  {
    slug: "mobile-clinic-machakos",
    title: "The Clinic That Comes to You",
    excerpt:
      "Mobile health outreach has brought prenatal care and immunizations to over 3,000 families.",
    cover_image_url: "https://images.unsplash.com/photo-1631217871099-88310a909a32?w=800&q=80",
    location: "Machakos, Kenya",
  },
  {
    slug: "samuel-vocational",
    title: "Samuel's Workshop: A Trade, A Future",
    excerpt:
      "Vocational training in carpentry gave Samuel the skills to open his own workshop — and now he trains four apprentices.",
    cover_image_url: "https://images.unsplash.com/photo-1741874299706-2b8e16839aaa?w=800&q=80",
    location: "Eldoret, Kenya",
  },
  {
    slug: "solar-village",
    title: "Light After Dark in Baringo",
    excerpt:
      "A solar microgrid partnership now powers homes, a clinic, and a school in a community that was off-grid for generations.",
    cover_image_url: "https://images.unsplash.com/photo-1509099381441-ea3c0cf98b94?w=800&q=80",
    location: "Baringo, Kenya",
  },
  {
    slug: "girls-scholarship",
    title: "Keeping Girls in School",
    excerpt:
      "A scholarship and mentorship program has kept 220 girls enrolled through secondary school in its first two years.",
    cover_image_url: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?w=800&q=80",
    location: "Kakamega, Kenya",
  },
];

export default async function StoriesPage() {
  let stories = FALLBACK_STORIES;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("stories")
      .select("slug, title, excerpt, cover_image_url, location")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (data && data.length > 0) stories = data;
  } catch {
    // fallback renders
  }

  return (
    <section className="section-padding pb-24 pt-36 sm:pt-44">
      <div className="container-editorial">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-sage-500">
            Stories of Change
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-forest-700 sm:text-5xl">
            Real people. Real transformation.
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, i) => (
            <Reveal key={story.slug} delay={(i % 3) * 0.1}>
              <StoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
