import type { Metadata } from "next";
import Image from "next/image";
import { getIcon } from "@/lib/icon-map";
import { CORE_VALUES } from "@/lib/constants";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Africa For All is committed to inclusive development across Africa — improving access to education, healthcare, economic opportunity, and environmental sustainability.",
};

export default function AboutPage() {
  return (
    <>
      <section className="section-padding pt-36 pb-16 sm:pt-44">
        <div className="container-editorial">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-500">
              Our Story
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-forest-700 sm:text-5xl">
              Building a continent where dignity is universal.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              To create a continent where every individual, regardless of
              background or social standing, has the tools and opportunities
              to achieve a better quality of life — free from poverty,
              inequality, and lack of access to basic services.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding pb-20">
        <div className="container-editorial relative h-[420px] overflow-hidden rounded-xl4">
          <Image
            src="https://images.unsplash.com/photo-1632215861513-130b66fe97f4?w=1600&q=80"
            alt="Community members working together in Kenya"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="section-padding pb-20">
        <div className="container-editorial grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-forest-700">
              Mission
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              Africa For All is committed to fostering inclusivity and
              equitable development across Africa. We empower indigenous and
              marginalized communities by improving access to education,
              healthcare, and economic opportunities, while advocating for
              environmental sustainability.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-semibold text-forest-700">
              Who We Serve
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              Urban and rural communities with limited access to essential
              services; women and girls facing barriers to education, health,
              and economic participation; youth seeking vocational and
              leadership opportunities; and marginalized groups including
              ethnic minorities, the disabled, and refugee communities.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-sand-50 py-20">
        <div className="container-editorial">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl font-semibold text-forest-700 sm:text-4xl">
              What We Stand For
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES.map((value, i) => {
              const Icon = getIcon(value.icon);
              return (
                <Reveal key={value.title} delay={i * 0.1}>
                  <div className="card-editorial h-full text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl2 bg-sage-100 text-forest-600">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
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

      <section className="section-padding py-20">
        <div className="container-editorial">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold text-forest-700 sm:text-4xl">
              How We Work
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Board of Directors",
                desc: "Oversees governance and strategic direction, with experts spanning education, healthcare, finance, and community development.",
              },
              {
                title: "Program Managers",
                desc: "Lead specific program areas — Education, Health, Economic Empowerment, and Sustainability — ensuring quality delivery.",
              },
              {
                title: "Field Coordinators",
                desc: "Work directly within communities, ensuring every initiative is culturally appropriate and genuinely community-led.",
              },
            ].map((role) => (
              <div key={role.title} className="card-editorial">
                <h3 className="font-display text-lg font-semibold text-forest-700">
                  {role.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
