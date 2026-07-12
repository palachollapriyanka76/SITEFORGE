import { PrismaClient } from "../client";
import { BaseRepository } from "./BaseRepository";

export { BaseRepository };

export class TemplateRepository extends BaseRepository<any> {
  constructor(prisma: PrismaClient) {
    super(prisma, "template");
  }

  async searchTemplates(query: string, categoryId?: string, limit = 10): Promise<any[]> {
    return this.findMany({
      take: limit,
      where: {
        status: "active",
        ...(categoryId && { categoryId }),
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { tags: { has: query } },
        ],
      },
      orderBy: { popularity: "desc" },
    });
  }
}

export class CategoryRepository extends BaseRepository<any> {
  constructor(prisma: PrismaClient) {
    super(prisma, "businessCategory");
  }

  async findRoots(): Promise<any[]> {
    return this.findMany({
      where: { parentId: null },
      include: { children: true },
    });
  }

  async findFullProfile(categoryId: string): Promise<any | null> {
    const record = await this.prisma.businessCategory.findUnique({
      where: { id: categoryId },
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
    if (record && (record as any).deletedAt !== null) {
      return null;
    }
    return record;
  }
}

export class ImageRepository extends BaseRepository<any> {
  constructor(prisma: PrismaClient) {
    super(prisma, "image");
  }

  async searchImages(params: {
    query?: string;
    categoryId?: string;
    section?: string;
    aspectRatio?: string;
    limit?: number;
  }): Promise<any[]> {
    return this.findMany({
      take: params.limit || 20,
      where: {
        ...(params.categoryId && { categoryId: params.categoryId }),
        ...(params.section && { section: params.section }),
        ...(params.aspectRatio && { aspectRatio: params.aspectRatio }),
        ...(params.query && {
          OR: [
            { keywords: { has: params.query } },
            { altText: { contains: params.query, mode: "insensitive" } },
            { description: { contains: params.query, mode: "insensitive" } },
          ],
        }),
      },
      orderBy: { priority: "desc" },
    });
  }
}

export class ProductRepository extends BaseRepository<any> {
  constructor(prisma: PrismaClient) {
    super(prisma, "product");
  }

  async findByBusiness(businessId: string, limit = 50, skip = 0): Promise<any[]> {
    return this.findMany({
      take: limit,
      skip,
      where: { businessId },
    });
  }

  async findBySku(sku: string): Promise<any | null> {
    const records = await this.findMany({
      where: { sku },
      take: 1,
    });
    return records.length ? records[0] : null;
  }
}

export class ServiceRepository extends BaseRepository<any> {
  constructor(prisma: PrismaClient) {
    super(prisma, "service");
  }

  async findByBusiness(businessId: string, limit = 50, skip = 0): Promise<any[]> {
    return this.findMany({
      take: limit,
      skip,
      where: { businessId },
    });
  }
}

export class ThemeRepository extends BaseRepository<any> {
  constructor(prisma: PrismaClient) {
    super(prisma, "theme");
  }
}

export class LayoutRepository extends BaseRepository<any> {
  constructor(prisma: PrismaClient) {
    super(prisma, "layout");
  }
}

export class SectionRepository extends BaseRepository<any> {
  constructor(prisma: PrismaClient) {
    super(prisma, "templateSection");
  }
}

export class WebsiteRepository extends BaseRepository<any> {
  constructor(prisma: PrismaClient) {
    super(prisma, "website");
  }

  async findByBusiness(businessId: string): Promise<any[]> {
    return this.findMany({
      where: { businessId },
      include: {
        template: true,
        theme: true,
        customization: true,
        seo: true,
      },
    });
  }
}
