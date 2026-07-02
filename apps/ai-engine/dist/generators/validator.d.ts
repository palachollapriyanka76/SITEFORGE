import { WebsiteJSON } from "@siteforge/types";
export declare const IMAGE_CATEGORIES: Record<string, string>;
export declare const INDUSTRY_ALLOWED_KEYWORDS: Record<string, string[]>;
export declare const INDUSTRY_DISALLOWED_KEYWORDS: Record<string, string[]>;
export declare const PRODUCT_PRICE_RANGES: Record<string, {
    min: number;
    max: number;
}>;
export declare function getImageIdFromUrl(url: string): string;
export declare function getImageCategory(url: string): string;
export declare function getProductCategory(name: string): string;
export declare function extractPriceNumber(priceStr: string): number;
export interface AuditResult {
    imageMatchScore: number;
    productMatchScore: number;
    duplicateScore: number;
    visualScore: number;
    valid: boolean;
    logs: string[];
}
export declare function runQualityAudit(websiteJson: WebsiteJSON, businessData: any): AuditResult;
export declare function passesIndustryRecognitionTest(websiteJson: WebsiteJSON, industry: string): boolean;
//# sourceMappingURL=validator.d.ts.map