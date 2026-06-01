export const generateSEOContent = async (businessData) => {
    // In a full implementation, this could call OpenAI. For now, we generate basic sensible defaults based on business data.
    const name = businessData.name || "My Business";
    const type = businessData.type || "Services";
    const location = businessData.location ? ` in ${businessData.location}` : "";
    return {
        metaTitle: `${name} - Professional ${type}${location}`,
        metaDescription: `Welcome to ${name}. We provide top-notch ${type.toLowerCase()} tailored to your needs. Contact us today to learn more.`,
        keywords: [name, type.toLowerCase(), businessData.location || "local", "professional services"]
    };
};
export const generateTestimonials = async (businessType) => {
    // Mock realistic fake testimonials based on business type
    return [
        {
            id: "t1",
            name: "Sarah Jenkins",
            role: "Customer",
            content: `I've been looking for a reliable ${businessType.toLowerCase()} for ages, and they completely exceeded my expectations. Highly recommend!`,
            rating: 5
        },
        {
            id: "t2",
            name: "Michael Chen",
            role: "Client",
            content: `Professional, timely, and excellent quality. They truly understand their craft and delivered exactly what we needed.`,
            rating: 5
        },
        {
            id: "t3",
            name: "Emily Rodriguez",
            role: "Local Resident",
            content: `Fantastic experience from start to finish. The team is friendly and the results speak for themselves.`,
            rating: 4
        }
    ];
};
export const generateFAQ = async (businessType) => {
    // Mock relevant question/answer pairs based on business type
    return [
        {
            id: "faq1",
            question: "What are your working hours?",
            answer: "We are open Monday through Friday from 9:00 AM to 5:00 PM. Weekend appointments are available upon request."
        },
        {
            id: "faq2",
            question: `Do you provide custom ${businessType.toLowerCase()} quotes?`,
            answer: "Yes, we offer free personalized quotes based on your specific needs. Please contact us through our form."
        },
        {
            id: "faq3",
            question: "How long does the process usually take?",
            answer: "The timeline depends on the scope of the project, but we strive to complete standard requests within 1-2 weeks."
        }
    ];
};
//# sourceMappingURL=content.generator.js.map