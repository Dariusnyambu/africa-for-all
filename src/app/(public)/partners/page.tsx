import type { Metadata } from "next";
import { Building2, Globe, Landmark, Briefcase } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Reveal from "@/components/shared/Reveal";
import PartnerInquiryForm from "@/components/shared/PartnerInquiryForm";

export const metadata: Metadata = {
  title: "Partners",
  description: "Meet the institutions, foundations, and corporate partners working alongside Africa For All.",
};

const FALLBACK_PARTNERS = [
  { id: "1", name: "United Nations Development Programme", category: "UN" as const },
  { id: "2", name: "LM International", category: "NGO" as const },
  { id: "3", name: "CARE Kenya", category: "NGO" as const },
  { id: "4", name: "Gates Foundation", category: "Foundation" as const },
];

const CATEGORY_META = {
  UN: { label: "UN Agencies", icon: Globe },
  NGO: { label: "NGO Partners", icon: Building2 },
  Corporate: { label: "Corporate Partners", icon: Briefcase },
  Foundation: { label: "Foundations", icon: Landmark },
};

export default async function PartnersPage() {
  let partners: { id: string; name: string; category: keyof typeof CATEGORY_META }[] = FALLBACK_PARTNERS;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("partners")
      .select("id, name, category")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (data && data.length > 0) partners = data;
  } catch {
    // fallback renders
  }

  const grouped = partners.reduce<Record<string, typeof partners>>((acc, p) => {
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p);
    return acc;
  }, {});

  return (
    <>
      <section className="section-padding pt-36 pb-16 sm:pt-44">
        <div className="container-editorial">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-500">
              Our Partners
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-forest-700 sm:text-5xl">
              Stronger together
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              We work with local communities, governments, and international
              partners to ensure every project is community-driven and
              culturally appropriate.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding pb-20">
        <div className="container-editorial space-y-14">
          {Object.entries(grouped).map(([category, list]) => {
            const meta = CATEGORY_META[category as keyof typeof CATEGORY_META];
            if (!meta) return null;
            const Icon = meta.icon;
            return (
              <div key={category}>
                <div className="flex items-center gap-2.5">
                  <Icon className="h-5 w-5 text-sage-500" />
                  <h2 className="font-display text-xl font-semibold text-forest-700">
                    {meta.label}
                  </h2>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {list.map((partner, i) => (
                    <Reveal key={partner.id} delay={i * 0.05}>
                      <div className="flex h-24 items-center justify-center rounded-xl2 bg-white px-4 text-center shadow-soft">
                        <span className="text-sm font-medium text-ink/70">{partner.name}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-padding bg-sand-50 py-20">
        <div className="container-editorial grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-forest-700">
              Become a Partner
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              Whether you represent a foundation, a corporation, or a
              government agency, there's a meaningful way to collaborate.
              Tell us about your organization and we'll follow up within a
              few business days.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink/70">
              <li>• Grants and institutional funding</li>
              <li>• Corporate social responsibility (CSR) partnerships</li>
              <li>• In-kind donations and technical expertise</li>
              <li>• Joint program implementation</li>
            </ul>
          </Reveal>
          <PartnerInquiryForm />
        </div>
      </section>
    </>
  );
}
