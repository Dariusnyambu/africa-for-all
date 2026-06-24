import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Reveal from "@/components/shared/Reveal";

const FALLBACK_PARTNERS = [
  "United Nations Development Programme",
  "LM International",
  "CARE Kenya",
  "Gates Foundation",
];

export default async function PartnersSection() {
  let partners: { id: string; name: string }[] = FALLBACK_PARTNERS.map((name) => ({ id: name, name }));

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("partners")
      .select("id, name")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (data && data.length > 0) partners = data;
  } catch {
    // fallback renders
  }

  return (
    <section id="partners" className="section-padding bg-sand-50 py-20">
      <div className="container-editorial">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-sage-500">
            Trusted By
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-forest-700 sm:text-3xl">
            Working alongside leading institutions
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {partners.map((partner, i) => (
            <Reveal key={partner.id} delay={i * 0.06}>
              <div className="flex h-24 items-center justify-center gap-2 rounded-xl2 bg-white px-4 text-center shadow-soft">
                <Building2 className="h-4 w-4 shrink-0 text-sage-400" />
                <span className="text-sm font-medium text-ink/70">{partner.name}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/partners" className="btn-secondary">
            Partner With Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
