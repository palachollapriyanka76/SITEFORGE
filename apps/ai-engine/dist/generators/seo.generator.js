/**
 * Generates an XML sitemap for a published website
 */
export function generateSitemap(websiteJSON, baseUrl) {
    const urls = websiteJSON.pages.map(page => {
        // Determine the full URL
        const url = page.slug === "/"
            ? baseUrl
            : `${baseUrl}${page.slug.startsWith('/') ? '' : '/'}${page.slug}`;
        return `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.slug === "/" ? "1.0" : "0.8"}</priority>
  </url>`;
    }).join('');
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
/**
 * Generates a robots.txt file string
 */
export function generateRobotsTxt(baseUrl) {
    return `User-agent: *
Allow: /

# Host
Host: ${baseUrl}

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
`;
}
/**
 * Generates JSON-LD Structured Data for LocalBusiness or Organization
 */
export function generateStructuredData(websiteJSON, baseUrl) {
    const { meta } = websiteJSON;
    // Defaulting to Organization, can be expanded to LocalBusiness if location data exists
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": meta.title,
        "url": baseUrl,
        "description": meta.description,
    };
    if (meta.favicon) {
        schema["logo"] = meta.favicon;
    }
    return schema;
}
//# sourceMappingURL=seo.generator.js.map