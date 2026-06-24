import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { FALLBACK_STATS } from "@/lib/constants";
import { getIcon } from "@/lib/icon-map";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import Reveal from "@/components/shared/Reveal";

export default async function ImpactSection() {
  let stats = FALLBACK_STATS as readonly {
    id: string;
    label: string;
    value: number;
    suffix: string;
    icon: string;
  }[];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("impact_stats")
      .select("id, label, value, suffix, icon")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (data && data.length > 0) stats = data;
  } catch {
    // fallback renders
  }

  return (
    <section id="impact" className="section-padding py-20 sm:py-28">
      <div className="container-editorial">
        <div className="overflow-hidden rounded-xl4 bg-forest-700 px-8 py-16 sm:px-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-300">
              Our Impact
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Measured change, year over year
            </h2>
            <p className="mt-4 text-base leading-relaxed text-sand-200/80">
              Every number represents a person, a family, a community moving
              toward self-reliance.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = getIcon(stat.icon);
              return (
                <Reveal key={stat.id} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sage-300">
                    <Icon className="h-5.5 w-5.5" strokeWidth={1.75} />
                  </div>
                  <p className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1.5 text-sm text-sand-200/70">{stat.label}</p>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-14 flex justify-center">
            <Link
              href="/impact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-forest-700 transition-transform hover:scale-[1.02]"
            >
              <FileText className="h-4 w-4" />
              View Annual Impact Report
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
