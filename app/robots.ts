import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";

/**
 * Generates robots.txt for search engine crawlers
 * Requirements: 3.1, 3.3
 * - Allows crawling of public pages (/, /jobs, /signin, /signup)
 * - Disallows /api/ and /dashboard/ routes
 * - Includes sitemap reference
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/jobs", "/signin", "/signup"],
        disallow: ["/api/", "/dashboard/"],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
