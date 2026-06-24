import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", "about", "programs", "impact", "get-involved", "stories", "partners", "contact", "donate", "privacy",
  ];

  return routes.map((route) => ({
    url: `${SITE_CONFIG.url}/${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
