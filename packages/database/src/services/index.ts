import { PrismaClient } from "../client";
import {
  TemplateRepository,
  CategoryRepository,
  ImageRepository,
  ProductRepository,
  ServiceRepository,
  ThemeRepository,
  LayoutRepository,
  SectionRepository,
  WebsiteRepository,
} from "../repositories";

export class DatabaseService {
  public templates: TemplateRepository;
  public categories: CategoryRepository;
  public images: ImageRepository;
  public products: ProductRepository;
  public services: ServiceRepository;
  public themes: ThemeRepository;
  public layouts: LayoutRepository;
  public sections: SectionRepository;
  public websites: WebsiteRepository;
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
    this.templates = new TemplateRepository(prismaClient);
    this.categories = new CategoryRepository(prismaClient);
    this.images = new ImageRepository(prismaClient);
    this.products = new ProductRepository(prismaClient);
    this.services = new ServiceRepository(prismaClient);
    this.themes = new ThemeRepository(prismaClient);
    this.layouts = new LayoutRepository(prismaClient);
    this.sections = new SectionRepository(prismaClient);
    this.websites = new WebsiteRepository(prismaClient);
  }

  // High-level website generation service
  async generateWebsite(params: {
    name: string;
    businessId: string;
    templateId: string;
    themeId: string;
    seoTitle?: string;
    seoDescription?: string;
  }): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      // Find template details to populate customization
      const template = await tx.template.findUnique({
        where: { id: params.templateId },
      });
      if (!template) throw new Error("Template not found");

      // Find business details to get userId
      const business = await tx.business.findUnique({
        where: { id: params.businessId },
      });
      if (!business) throw new Error("Business not found");

      const generatedSlug = `${params.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;

      // 1. Create website entry
      const website = await tx.website.create({
        data: {
          name: params.name,
          slug: generatedSlug,
          userId: business.userId,
          businessId: params.businessId,
          templateId: params.templateId,
          themeId: params.themeId,
          status: "DRAFT",
          version: "1.0.0",
        },
      });

      // 2. Create customization with template structures
      await tx.customization.create({
        data: {
          websiteId: website.id,
          sections: (template.jsonStructure as any) || {},
        },
      });

      // 3. Create initial SEO details
      await tx.seo.create({
        data: {
          websiteId: website.id,
          metaTitle: params.seoTitle || `${params.name} - Home`,
          metaDescription: params.seoDescription || `Welcome to ${params.name} professional website.`,
        },
      });

      return tx.website.findUnique({
        where: { id: website.id },
        include: {
          customization: true,
          seo: true,
          theme: true,
        },
      });
    });
  }

  // Instant Website Generator (AI-Free)
  async generateInstantWebsite(params: {
    name: string;
    businessId: string;
    categoryId: string;
  }): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      // Find category detailed knowledge profile
      const categoryProfile = await tx.businessCategory.findUnique({
        where: { id: params.categoryId },
        include: {
          profile: true,
          serviceKnowledge: true,
          productKnowledge: true,
          faqs: true,
          testimonials: true,
          seo: true,
          theme: true,
          templates: true,
        },
      });
      if (!categoryProfile) throw new Error("Category knowledge base not found");

      // Find business details to get userId
      const business = await tx.business.findUnique({
        where: { id: params.businessId },
      });
      if (!business) throw new Error("Business not found");

      const generatedSlug = `${params.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;

      // 1. Create website entry
      const website = await tx.website.create({
        data: {
          name: params.name,
          slug: generatedSlug,
          userId: business.userId,
          businessId: params.businessId,
          status: "DRAFT",
          version: "1.0.0",
        },
      });

      // 2. Assemble Layout structure
      const preconfiguredSections = {
        hero: {
          title: categoryProfile.profile?.heroTitles?.[0] || `Welcome to ${params.name}`,
          subtitle: categoryProfile.profile?.heroSubtitles?.[0] || categoryProfile.profile?.tagline,
          buttonText: (categoryProfile.profile?.heroButtons as any)?.primary || "Book Now",
        },
        about: {
          title: "About Us",
          text: categoryProfile.profile?.aboutContent || categoryProfile.profile?.longDescription,
        },
        services: categoryProfile.serviceKnowledge.map(s => ({
          name: s.name,
          description: s.description,
          price: s.priceRange,
          duration: `${s.duration} min`
        })),
        products: categoryProfile.productKnowledge.slice(0, 10).map(p => ({
          name: p.name,
          description: p.description,
          price: p.priceRange
        })),
        faqs: categoryProfile.faqs.slice(0, 5).map(f => ({
          question: f.question,
          answer: f.answer
        })),
        testimonials: categoryProfile.testimonials.slice(0, 3).map(t => ({
          name: t.authorName,
          role: t.authorRole,
          quote: t.quote
        })),
        contact: {
          phone: categoryProfile.profile?.phoneFormat,
          email: categoryProfile.profile?.emailFormat,
          hours: categoryProfile.profile?.businessHours
        }
      };

      // 3. Create customization with assembled layouts
      await tx.customization.create({
        data: {
          websiteId: website.id,
          sections: preconfiguredSections,
          colors: categoryProfile.theme ? {
            primary: categoryProfile.theme.primaryColor,
            secondary: categoryProfile.theme.secondaryColor,
            accent: categoryProfile.theme.accentColor,
            background: categoryProfile.theme.background,
          } : undefined,
          fonts: categoryProfile.theme ? (categoryProfile.theme.typography as any) : undefined,
        },
      });

      // 4. Create initial SEO details
      await tx.seo.create({
        data: {
          websiteId: website.id,
          metaTitle: categoryProfile.seo?.metaTitle || `${params.name} - Home`,
          metaDescription: categoryProfile.seo?.metaDescription || categoryProfile.profile?.shortDescription,
          keywords: categoryProfile.seo?.keywords || [],
        },
      });

      return tx.website.findUnique({
        where: { id: website.id },
        include: {
          customization: true,
          seo: true,
        },
      });
    });
  }
}
