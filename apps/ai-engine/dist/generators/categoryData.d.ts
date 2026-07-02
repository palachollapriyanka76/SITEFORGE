export interface CategoryConfig {
    name: string;
    queries: string[];
    sections: string[];
}
export declare const CATEGORIES_DATA: Record<string, CategoryConfig>;
export declare function detectCategory(businessType: string): CategoryConfig;
//# sourceMappingURL=categoryData.d.ts.map