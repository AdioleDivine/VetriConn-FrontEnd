import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";

/**
 * Generates sitemap.xml for search engine crawlers
 * Requirements: 3.2, 3.4
 * - Includes static pages with appropriate priority and changeFrequency
 * - Placeholder for dynamic job pages integration
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // Static pages with their SEO priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signin`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Placeholder for dynamic job pages
  // TODO: Integrate with job data source to generate dynamic job page entries
  // Example implementation:
  // const jobs = await fetchAllJobs();
  // const jobPages: MetadataRoute.Sitemap = jobs.map((job) => ({
  //   url: `${baseUrl}/jobs/${job.id}`,
  //   lastModified: new Date(job.updatedAt || job.createdAt),
  //   changeFrequency: "weekly" as const,
  //   priority: 0.7,
  // }));
  const jobPages: MetadataRoute.Sitemap = [];

  return [...staticPages, ...jobPages];
}
