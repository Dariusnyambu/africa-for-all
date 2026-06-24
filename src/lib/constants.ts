export const SITE_CONFIG = {
  name: "Africa For All",
  tagline: "Dignity for Every Life",
  taglineFull: "Dignity for Every Life — Sustainability for Every Generation",
  description:
    "Empowering communities across Africa through sustainable education, healthcare, economic opportunity, and environmental action.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Stories", href: "/stories" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Reports", href: "/impact" },
  { label: "Privacy", href: "/privacy" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
] as const;

export const CORE_VALUES = [
  {
    icon: "HeartHandshake",
    title: "Inclusivity",
    description: "Equal opportunities for everyone, irrespective of gender, ethnicity, or socioeconomic background.",
  },
  {
    icon: "Leaf",
    title: "Sustainability",
    description: "Every initiative is designed for long-term impact, in step with environmental preservation.",
  },
  {
    icon: "ShieldCheck",
    title: "Empowerment",
    description: "Equipping individuals and communities with the skills and resources to become self-reliant.",
  },
  {
    icon: "Globe",
    title: "Collaboration",
    description: "Working hand in hand with local communities, governments, and global partners.",
  },
] as const;

// Fallback data — used if Supabase is not yet connected or returns empty.
// Once Supabase is wired up, data fetched from the database takes priority.
export const FALLBACK_PROGRAMS = [
  {
    id: "fallback-1",
    slug: "education",
    title: "Education",
    icon: "GraduationCap",
    summary: "Community learning centers, teacher training, girl child education, and adult literacy programs.",
    description: null,
    cover_image_url: null,
    is_published: true,
    display_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-2",
    slug: "healthcare",
    title: "Healthcare",
    icon: "Stethoscope",
    summary: "Mobile clinics, maternal care, disease prevention, and mental wellness support.",
    description: null,
    cover_image_url: null,
    is_published: true,
    display_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-3",
    slug: "economic-empowerment",
    title: "Economic Empowerment",
    icon: "BriefcaseBusiness",
    summary: "Vocational skills training, entrepreneurship support, and microfinance access.",
    description: null,
    cover_image_url: null,
    is_published: true,
    display_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-4",
    slug: "women-youth",
    title: "Women & Youth",
    icon: "Users",
    summary: "Leadership development, gender equality advocacy, and youth empowerment.",
    description: null,
    cover_image_url: null,
    is_published: true,
    display_order: 4,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-5",
    slug: "climate-action",
    title: "Climate Action",
    icon: "Leaf",
    summary: "Renewable energy, reforestation, and community-led recycling initiatives.",
    description: null,
    cover_image_url: null,
    is_published: true,
    display_order: 5,
    created_at: "",
    updated_at: "",
  },
] as const;

export const FALLBACK_STATS = [
  { id: "s1", label: "Lives Impacted", value: 150000, suffix: "+", icon: "Users", display_order: 1, is_published: true, updated_at: "" },
  { id: "s2", label: "Communities", value: 25, suffix: "+", icon: "Globe", display_order: 2, is_published: true, updated_at: "" },
  { id: "s3", label: "Active Programs", value: 12, suffix: "+", icon: "HeartHandshake", display_order: 3, is_published: true, updated_at: "" },
  { id: "s4", label: "Partner Organizations", value: 25, suffix: "+", icon: "ShieldCheck", display_order: 4, is_published: true, updated_at: "" },
] as const;

export const DONATION_PRESETS = [25, 50, 100, 250, 500] as const;
