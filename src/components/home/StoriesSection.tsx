import { createClient } from "@/lib/supabase/server";
import StoryCard from "@/components/home/StoryCard";
import Reveal from "@/components/shared/Reveal";

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
      "What began as lessons under a tarpaulin in Turkana has grown into a permanent learning center serving 400 children — built by the community, for the community.",
    cover_image_url: "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=800&q=80",
    location: "Turkana, Kenya",
  },
  {
    slug: "grace-cooperative",
    title: "Grace and the Women's Farming Cooperative",
    excerpt:
      "A microloan and a season of training turned twelve women smallholders into a thriving agricultural cooperative supplying three local markets.",
    cover_image_url: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?w=800&q=80",
    location: "Kisumu, Kenya",
  },
  {
    slug: "mobile-clinic-machakos",
    title: "The Clinic That Comes to You",
    excerpt:
      "Mobile health outreach has brought prenatal care and immunizations to over 3,000 families across hard-to-reach villages in Machakos County.",
    cover_image_url: "https://images.unsplash.com/photo-1631217871099-88310a909a32?w=800&q=80",
    location: "Machakos, Kenya",
  },
];

export default async function StoriesSection() {
  let stories = FALLBACK_STORIES;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("stories")
      .select("slug, title, excerpt, cover_image_url, location")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(3);

    if (data && data.length > 0) stories = data;
  } catch {
    // fallback renders
  }

  return (
    <section id="stories" className="section-padding py-20 sm:py-28">
      <div className="container-editorial">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-sage-500">
            Stories of Change
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-forest-700 sm:text-4xl">
            Real people. Real transformation.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, i) => (
            <Reveal key={story.slug} delay={i * 0.1}>
              <StoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
