"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import type { Program } from "@/types/database";

interface ProgramCardProps {
  program: Pick<Program, "slug" | "title" | "icon" | "summary">;
  index?: number;
}

export default function ProgramCard({ program, index = 0 }: ProgramCardProps) {
  const Icon = getIcon(program.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-xl3 bg-white p-8 shadow-soft transition-shadow duration-500 hover:shadow-softer"
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sage-50 transition-transform duration-500 group-hover:scale-150" />

      <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl2 bg-forest-500 text-white shadow-glow-sage transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </span>

      <h3 className="relative z-10 mt-6 font-display text-xl font-semibold text-forest-700">
        {program.title}
      </h3>
      <p className="relative z-10 mt-3 text-sm leading-relaxed text-ink/65">
        {program.summary}
      </p>

      <Link
        href={`/programs/${program.slug}`}
        className="relative z-10 mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-600 transition-colors group-hover:text-forest-600"
      >
        Learn more
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}
