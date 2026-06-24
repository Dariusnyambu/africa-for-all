import { getIcon } from "@/lib/icon-map";
import { CORE_VALUES } from "@/lib/constants";
import Reveal from "@/components/shared/Reveal";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding py-20 sm:py-28">
      <div className="container-editorial grid gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wider text-sage-500">
            Who We Are
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-forest-700 sm:text-4xl">
            Committed to inclusive development, across every corner of Africa.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink/70">
            Africa For All is committed to inclusive development across
            Africa by improving access to education, healthcare, economic
            opportunities, and environmental sustainability — partnering
            directly with the communities we serve to build solutions that
            last.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            We work with local leaders, governments, and global partners to
            ensure every initiative is culturally grounded and genuinely
            community-driven.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-5">
          {CORE_VALUES.map((value, i) => {
            const Icon = getIcon(value.icon);
            return (
              <Reveal key={value.title} delay={i * 0.1}>
                <div className="card-editorial h-full">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-sage-100 text-forest-600">
                    <Icon className="h-5.5 w-5.5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-forest-700">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
