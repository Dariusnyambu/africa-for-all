import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, Users, Briefcase, ArrowRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Donate, volunteer, or partner with Africa For All to create lasting change across communities.",
};

const WAYS_TO_HELP = [
  {
    icon: HeartHandshake,
    title: "Donate",
    description: "One-time or monthly gifts directly fund education, healthcare, and livelihood programs.",
    cta: "Give Now",
    href: "/donate",
  },
  {
    icon: Users,
    title: "Volunteer",
    description: "Lend your time and skills — from field coordination to remote support roles.",
    cta: "Apply to Volunteer",
    href: "/contact",
  },
  {
    icon: Briefcase,
    title: "Partner With Us",
    description: "Foundations, corporations, and agencies can co-fund or co-deliver programs at scale.",
    cta: "Become a Partner",
    href: "/partners",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <section className="section-padding pt-36 pb-16 sm:pt-44">
        <div className="container-editorial">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-500">
              Get Involved
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-forest-700 sm:text-5xl">
              Every role matters in building dignity for all.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              Whether through a gift, your time, or your organization's
              resources — there's a place for you in this work.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding pb-24">
        <div className="container-editorial grid gap-6 lg:grid-cols-3">
          {WAYS_TO_HELP.map((way, i) => (
            <Reveal key={way.title} delay={i * 0.1}>
              <div className="card-editorial flex h-full flex-col">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl2 bg-forest-500 text-white shadow-glow-sage">
                  <way.icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-forest-700">
                  {way.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">
                  {way.description}
                </p>
                <Link href={way.href} className="btn-secondary mt-6">
                  {way.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
