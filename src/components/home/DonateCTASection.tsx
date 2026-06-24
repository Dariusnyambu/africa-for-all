import Link from "next/link";
import { ShieldCheck, Lock, ArrowRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

export default function DonateCTASection() {
  return (
    <section className="section-padding py-20 sm:py-28">
      <div className="container-editorial">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl4 bg-gradient-to-br from-sage-500 via-sage-500 to-forest-600 px-8 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-forest-800/10" />

            <h2 className="relative z-10 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Invest in Sustainable Change
            </h2>
            <p className="relative z-10 mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85">
              Every contribution — large or small — funds education,
              healthcare, and opportunity for a family that needs it most.
            </p>

            <div className="relative z-10 mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/donate?frequency=monthly"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-forest-700 shadow-softer transition-transform hover:scale-[1.02]"
              >
                Donate Monthly
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/donate?frequency=one_time"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10"
              >
                One-Time Donation
              </Link>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                Secure, encrypted checkout
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Independently audited annually
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
