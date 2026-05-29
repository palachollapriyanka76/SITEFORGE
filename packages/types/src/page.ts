export type PageComponentType =
  | "hero"
  | "header"
  | "footer"
  | "text"
  | "image"
  | "gallery"
  | "cta"
  | "features"
  | "pricing"
  | "testimonials"
  | "contact"
  | "faq"
  | "map"
  | "video"
  | "custom";

export interface PageComponent {
  id: string;
  type: PageComponentType;
  order: number;
  props: Record<string, unknown>;
  styles: Record<string, string>;
  children?: PageComponent[];
}

export interface Page {
  id: string;
  websiteId: string;
  title: string;
  slug: string;
  description: string | null;
  components: PageComponent[];
  isHomepage: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePageInput {
  title: string;
  slug: string;
  description?: string;
  components?: PageComponent[];
  isHomepage?: boolean;
}

export interface UpdatePageInput {
  title?: string;
  slug?: string;
  description?: string;
  components?: PageComponent[];
  isHomepage?: boolean;
  order?: number;
}
