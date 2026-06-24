import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { FALLBACK_PROGRAMS } from "@/lib/constants";
import ProgramCard from "@/components/programs/ProgramCard";
import Reveal from "@/components/shared/Reveal";

export default async function ProgramsSection() {
  let programs = FALLBACK_PROGRAMS as readonly { slug: string; title: string; icon: string; summary: string }[];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("programs")
      .select("slug, title, icon, summary")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (data && data.length > 0) programs = data;
  } catch {
    // Supabase not yet configured — fallback data renders instead.
  }

  return (
    <section id="programs" className="section-padding bg-sand-50 py-20 sm:py-28">
      <div className="container-editorial">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-sage-500">
            Our Programs
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-forest-700 sm:text-4xl">
            Five pillars of lasting change
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65">
            Every program is designed with the community, for the community —
            built to outlast any single grant cycle.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <ProgramCard key={program.slug} program={program} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/programs" className="btn-secondary">
            View all programs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
