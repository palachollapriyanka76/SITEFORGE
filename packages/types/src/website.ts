export type WebsiteStatus = "draft" | "published" | "archived";

export interface WebsiteConfig {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    borderRadius: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string | null;
  };
  analytics: {
    googleAnalyticsId: string | null;
  };
}

export interface Website {
  id: string;
  userId: string;
  name: string;
  slug: string;
  customDomain: string | null;
  description: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
  config: WebsiteConfig;
  status: WebsiteStatus;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
}

export interface CreateWebsiteInput {
  name: string;
  slug: string;
  description?: string;
  config?: Partial<WebsiteConfig>;
}

export interface UpdateWebsiteInput {
  name?: string;
  slug?: string;
  description?: string;
  customDomain?: string;
  logoUrl?: string;
  faviconUrl?: string;
  config?: Partial<WebsiteConfig>;
  status?: WebsiteStatus;
}
