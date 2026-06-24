import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Reveal from "@/components/shared/Reveal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("stories")
      .select("title, excerpt")
      .eq("slug", slug)
      .maybeSingle();
    if (data) return { title: data.title, description: data.excerpt };
  } catch {
    // ignore
  }
  return { title: "Story" };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let story = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("stories")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    story = data;
  } catch {
    // Supabase not configured
  }

  if (!story) notFound();

  return (
    <article className="pb-24 pt-32 sm:pt-40">
      <div className="section-padding container-editorial max-w-3xl">
        <Link
          href="/stories"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 transition-colors hover:text-forest-600"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Stories
        </Link>

        <Reveal className="mt-6">
          {story.location && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-forest-600">
              <MapPin className="h-3 w-3" />
              {story.location}
            </span>
          )}
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-forest-700 sm:text-4xl">
            {story.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">{story.excerpt}</p>
        </Reveal>
      </div>

      {story.cover_image_url && (
        <div className="section-padding container-editorial mt-10">
          <div className="relative h-[420px] overflow-hidden rounded-xl4">
            <Image src={story.cover_image_url} alt={story.title} fill className="object-cover" />
          </div>
        </div>
      )}

      {story.body && (
        <div className="section-padding container-editorial mt-10 max-w-3xl">
          <div className="prose prose-lg max-w-none whitespace-pre-line text-ink/75">
            {story.body}
          </div>
        </div>
      )}

      <div className="section-padding container-editorial mt-14 max-w-3xl">
        <div className="rounded-xl3 bg-sage-50 p-8 text-center">
          <h3 className="font-display text-xl font-semibold text-forest-700">
            Help write the next story
          </h3>
          <Link href="/donate" className="btn-primary mt-5 inline-flex">
            Support Our Mission
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
