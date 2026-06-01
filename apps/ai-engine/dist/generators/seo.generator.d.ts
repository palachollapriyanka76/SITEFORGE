import { WebsiteJSON } from "@siteforge/types";
/**
 * Generates an XML sitemap for a published website
 */
export declare function generateSitemap(websiteJSON: WebsiteJSON, baseUrl: string): string;
/**
 * Generates a robots.txt file string
 */
export declare function generateRobotsTxt(baseUrl: string): string;
/**
 * Generates JSON-LD Structured Data for LocalBusiness or Organization
 */
export declare function generateStructuredData(websiteJSON: WebsiteJSON, baseUrl: string): {
    "@context": string;
    "@type": string;
    name: string;
    url: string;
    description: string;
};
//# sourceMappingURL=seo.generator.d.ts.map