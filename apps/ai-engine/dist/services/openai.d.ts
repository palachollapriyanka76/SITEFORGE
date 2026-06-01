interface GenerateWebsitePrompt {
    businessName: string;
    businessType: string;
    description: string;
    style: string;
    colorPreference?: string;
    pages?: string[];
}
interface GenerationOutput {
    data: Record<string, unknown>;
    tokensUsed: number;
}
export declare function generateWebsite(prompt: GenerateWebsitePrompt): Promise<GenerationOutput>;
export declare function generatePageContent(pageType: string, businessContext: string, description: string): Promise<GenerationOutput>;
export declare function generateSEO(businessName: string, description: string, pageContent: string): Promise<GenerationOutput>;
export {};
//# sourceMappingURL=openai.d.ts.map