import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/shared/ContactForm";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Africa For All — Nairobi, Kenya.",
};

const CONTACT_DETAILS = [
  { icon: Phone, label: "Phone", value: "+254 700 000 000" },
  { icon: Mail, label: "Email", value: "hello@africaforall.org" },
  { icon: MapPin, label: "Office", value: "Nairobi, Kenya" },
];

export default function ContactPage() {
  return (
    <section className="section-padding pb-24 pt-36 sm:pt-44">
      <div className="container-editorial grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wider text-sage-500">
            Contact Us
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-forest-700 sm:text-5xl">
            Let's talk
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            Questions about our programs, partnership opportunities, or how
            to get involved? We'd love to hear from you.
          </p>

          <div className="mt-10 space-y-5">
            {CONTACT_DETAILS.map((detail) => (
              <div key={detail.label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-forest-600">
                  <detail.icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-ink/50">{detail.label}</p>
                  <p className="text-sm font-medium text-forest-700">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <ContactForm />
      </div>
    </section>
  );
}
