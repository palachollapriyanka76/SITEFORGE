export type AIJobStatus = "pending" | "processing" | "completed" | "failed";
export type AIJobType = "generate_website" | "generate_page" | "generate_component" | "edit_content" | "generate_seo" | "generate_copy";

export interface AIJob {
  id: string;
  userId: string;
  websiteId: string | null;
  type: AIJobType;
  status: AIJobStatus;
  prompt: string;
  context: Record<string, unknown>;
  result: Record<string, unknown> | null;
  error: string | null;
  tokensUsed: number;
  processingTimeMs: number | null;
  createdAt: Date;
  completedAt: Date | null;
}

export interface AIGenerateWebsiteInput {
  businessName: string;
  businessType: string;
  description: string;
  style: "modern" | "classic" | "minimal" | "bold" | "playful";
  colorPreference?: string;
  pages?: string[];
}

export interface AIGeneratePageInput {
  websiteId: string;
  pageType: string;
  description: string;
  existingContent?: string;
}

export interface AIEditContentInput {
  websiteId: string;
  pageId: string;
  componentId: string;
  instruction: string;
  currentContent: Record<string, unknown>;
}

export interface AIGenerationResult {
  success: boolean;
  data: Record<string, unknown>;
  tokensUsed: number;
  model: string;
}
