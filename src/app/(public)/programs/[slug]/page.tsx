import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PROGRAM_DETAILS } from "@/lib/program-details";
import { getIcon } from "@/lib/icon-map";
import Reveal from "@/components/shared/Reveal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(PROGRAM_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAM_DETAILS[slug];
  if (!program) return {};
  return { title: program.title, description: program.summary };
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Try Supabase first (CMS-editable), then fall back to static detail content.
  let title = PROGRAM_DETAILS[slug]?.title;
  let summary = PROGRAM_DETAILS[slug]?.summary;
  let iconName = PROGRAM_DETAILS[slug]?.icon;
  let description: string | null = null;
  let coverImage = PROGRAM_DETAILS[slug]?.heroImage;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("programs")
      .select("title, summary, icon, description, cover_image_url")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (data) {
      title = data.title;
      summary = data.summary;
      iconName = data.icon;
      description = data.description;
      if (data.cover_image_url) coverImage = data.cover_image_url;
    }
  } catch {
    // static fallback used
  }

  const detail = PROGRAM_DETAILS[slug];

  if (!title && !detail) notFound();

  const Icon = getIcon(iconName || "HeartHandshake");

  return (
    <>
      <section className="section-padding pt-32 pb-12 sm:pt-40">
        <div className="container-editorial">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 transition-colors hover:text-forest-600"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Programs
          </Link>

          <Reveal className="mt-6">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl2 bg-forest-500 text-white shadow-glow-sage">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-forest-700 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
              {description || summary}
            </p>
          </Reveal>
        </div>
      </section>

      {coverImage && (
        <section className="section-padding pb-16">
          <div className="container-editorial relative h-[380px] overflow-hidden rounded-xl4 sm:h-[460px]">
            <Image src={coverImage} alt={title || "Program"} fill className="object-cover" />
          </div>
        </section>
      )}

      {detail && (
        <section className="section-padding pb-24">
          <div className="container-editorial">
            <h2 className="font-display text-2xl font-semibold text-forest-700 sm:text-3xl">
              Key Initiatives
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {detail.initiatives.map((initiative, i) => (
                <Reveal key={initiative.title} delay={i * 0.08}>
                  <div className="card-editorial h-full">
                    <h3 className="font-display text-lg font-semibold text-forest-700">
                      {initiative.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/65">
                      {initiative.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-14 rounded-xl3 bg-sage-50 p-8 text-center sm:p-12">
              <h3 className="font-display text-2xl font-semibold text-forest-700">
                Help us expand this program
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-ink/65">
                Your support funds the people and resources behind every
                initiative listed here.
              </p>
              <Link href="/donate" className="btn-primary mt-6 inline-flex">
                Support This Program
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
