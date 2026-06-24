import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { FALLBACK_PROGRAMS } from "@/lib/constants";
import ProgramCard from "@/components/programs/ProgramCard";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore our five pillars of change: Education, Healthcare, Economic Empowerment, Women & Youth, and Climate Action.",
};

export default async function ProgramsPage() {
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
    // fallback renders
  }

  return (
    <section className="section-padding pb-24 pt-36 sm:pt-44">
      <div className="container-editorial">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-sage-500">
            Our Programs
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-forest-700 sm:text-5xl">
            Five pillars of lasting change
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink/65">
            Every program is co-designed with the communities it serves —
            built to create self-reliance, not dependency.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <ProgramCard key={program.slug} program={program} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
