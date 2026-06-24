import type { Metadata } from "next";
import { FileText, Download } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { FALLBACK_STATS } from "@/lib/constants";
import { getIcon } from "@/lib/icon-map";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Impact",
  description: "See the measurable change Africa For All has created across education, health, economic empowerment, and climate action.",
};

const PROGRAM_BREAKDOWN = [
  { label: "Education", value: 62, color: "bg-sage-400" },
  { label: "Healthcare", value: 24, color: "bg-forest-500" },
  { label: "Economic Empowerment", value: 18, color: "bg-highlight" },
  { label: "Climate Action", value: 12, color: "bg-sand-400" },
];

export default async function ImpactPage() {
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

  const maxBreakdown = Math.max(...PROGRAM_BREAKDOWN.map((p) => p.value));

  return (
    <>
      <section className="section-padding pt-36 pb-16 sm:pt-44">
        <div className="container-editorial">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-500">
              Annual Impact Report
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-forest-700 sm:text-5xl">
              Measured change, year over year
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              We believe transparency builds trust. Every figure below is
              tracked through our monitoring and evaluation framework, and
              independently audited annually.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding pb-20">
        <div className="container-editorial">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = getIcon(stat.icon);
              return (
                <Reveal key={stat.id}>
                  <div className="card-editorial text-center">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-forest-600">
                      <Icon className="h-5.5 w-5.5" strokeWidth={1.75} />
                    </span>
                    <p className="mt-5 font-display text-3xl font-bold text-forest-700 sm:text-4xl">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-1.5 text-sm text-ink/60">{stat.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-sand-50 py-20">
        <div className="container-editorial grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-forest-700 sm:text-3xl">
              Where Funding Goes
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              A breakdown of program investment over the last fiscal year.
            </p>

            <div className="mt-8 space-y-5">
              {PROGRAM_BREAKDOWN.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-forest-700">{item.label}</span>
                    <span className="text-ink/60">{item.value}%</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-sand-200">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${(item.value / maxBreakdown) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-editorial flex h-full flex-col items-center justify-center text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-500 text-white">
                <FileText className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-forest-700">
                Full Annual Impact Report
              </h3>
              <p className="mt-3 max-w-xs text-sm text-ink/65">
                Download our complete report including financials, program
                outcomes, and beneficiary stories.
              </p>
              <button className="btn-primary mt-6">
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding py-20">
        <div className="container-editorial">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-semibold text-forest-700 sm:text-3xl">
              How We Measure Success
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Impact Assessment",
                desc: "KPIs tracked per program — school enrollment rates, disease reduction, business start-ups, and more.",
              },
              {
                title: "Feedback Loops",
                desc: "Regular input from beneficiaries and community stakeholders ensures programs evolve to meet real needs.",
              },
              {
                title: "External Audits",
                desc: "Independent auditors review our financial reports and program activities annually for full transparency.",
              },
            ].map((item) => (
              <div key={item.title} className="card-editorial">
                <h3 className="font-display text-lg font-semibold text-forest-700">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
