export declare const generateSEOContent: (businessData: any) => Promise<{
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
}>;
export declare const generateTestimonials: (businessType: string) => Promise<{
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
}[]>;
export declare const generateFAQ: (businessType: string) => Promise<{
    id: string;
    question: string;
    answer: string;
}[]>;
//# sourceMappingURL=content.generator.d.ts.map