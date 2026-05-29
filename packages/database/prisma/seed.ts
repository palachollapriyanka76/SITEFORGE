import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Seed templates
  const templates = [
    {
      name: "Modern Restaurant",
      slug: "modern-restaurant",
      description: "A sleek restaurant template with menu sections, reservation form, and gallery.",
      thumbnailUrl: "https://placehold.co/600x400/1a1a2e/e94560?text=Restaurant",
      category: "RESTAURANT" as const,
      tags: ["restaurant", "food", "menu", "reservation"],
      config: {
        theme: {
          primaryColor: "#e94560",
          secondaryColor: "#1a1a2e",
          fontFamily: "Inter",
          borderRadius: "8px",
        },
      },
      pages: [
        { title: "Home", slug: "home", isHomepage: true },
        { title: "Menu", slug: "menu" },
        { title: "About", slug: "about" },
        { title: "Contact", slug: "contact" },
      ],
    },
    {
      name: "Creative Portfolio",
      slug: "creative-portfolio",
      description: "Minimal portfolio template for creatives and freelancers.",
      thumbnailUrl: "https://placehold.co/600x400/0f3460/e94560?text=Portfolio",
      category: "PORTFOLIO" as const,
      tags: ["portfolio", "creative", "freelancer", "designer"],
      config: {
        theme: {
          primaryColor: "#533483",
          secondaryColor: "#0f3460",
          fontFamily: "Outfit",
          borderRadius: "12px",
        },
      },
      pages: [
        { title: "Home", slug: "home", isHomepage: true },
        { title: "Work", slug: "work" },
        { title: "About", slug: "about" },
        { title: "Contact", slug: "contact" },
      ],
    },
    {
      name: "SaaS Landing Page",
      slug: "saas-landing",
      description: "High-converting SaaS landing page with pricing and feature sections.",
      thumbnailUrl: "https://placehold.co/600x400/16213e/0f3460?text=SaaS",
      category: "SAAS" as const,
      tags: ["saas", "startup", "landing", "pricing"],
      config: {
        theme: {
          primaryColor: "#4361ee",
          secondaryColor: "#16213e",
          fontFamily: "Inter",
          borderRadius: "8px",
        },
      },
      pages: [
        { title: "Home", slug: "home", isHomepage: true },
        { title: "Features", slug: "features" },
        { title: "Pricing", slug: "pricing" },
      ],
    },
  ];

  for (const template of templates) {
    await prisma.template.upsert({
      where: { slug: template.slug },
      update: {},
      create: template,
    });
  }

  console.log(`✅ Seeded ${templates.length} templates`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
