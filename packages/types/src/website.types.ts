export interface WebsiteJSONMeta {
  title: string;
  description: string;
  favicon: string;
  keywords: string[];
}

export interface WebsiteJSONTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  style: string;
}

export type SectionType = "hero" | "about" | "services" | "products" | "gallery" | "testimonials" | "faq" | "contact" | "footer";

export interface WebsiteJSONSection {
  id: string;
  type: SectionType;
  order: number;
  visible: boolean;
  content: Record<string, any>;
  styles: Record<string, any>;
  animations: Record<string, any>;
}

export interface WebsiteJSONPage {
  name: string;
  slug: string;
  sections: WebsiteJSONSection[];
}

export interface WebsiteJSONGlobalSettings {
  navbarStyle: string;
  footerStyle: string;
  whatsappButton: boolean;
  whatsappNumber: string | null;
}

export interface WebsiteJSON {
  meta: WebsiteJSONMeta;
  theme: WebsiteJSONTheme;
  pages: WebsiteJSONPage[];
  globalSettings: WebsiteJSONGlobalSettings;
}
