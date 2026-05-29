export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  previewUrl: string | null;
  category: TemplateCategory;
  tags: string[];
  config: Record<string, unknown>;
  pages: Record<string, unknown>[];
  isPremium: boolean;
  isActive: boolean;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TemplateCategory =
  | "restaurant"
  | "portfolio"
  | "ecommerce"
  | "blog"
  | "landing_page"
  | "agency"
  | "saas"
  | "healthcare"
  | "education"
  | "nonprofit"
  | "real_estate"
  | "fitness"
  | "other";

export interface TemplateFilter {
  category?: TemplateCategory;
  isPremium?: boolean;
  search?: string;
  tags?: string[];
}
