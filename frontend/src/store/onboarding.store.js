import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialBusinessData = {
  name: "",
  type: "",
  products: [],
  audience: "",
  style: "",
  colorTheme: "",
  logoUrl: "",
  ordering: false,
  whatsappEnabled: false,
  whatsappNumber: "",
  socialLinks: {
    instagram: "",
    facebook: "",
    twitter: "",
  },
};

const initialMessages = [
  {
    id: "welcome-ai",
    sender: "ai",
    text: "Namaste! 🙏 I am your SiteForge digital advisor. I will help you build a professional, premium website for your shop or business. Let's get started!\n\nFirst, **what is the name of your business?**",
    timestamp: new Date().toISOString(),
    type: "text",
  },
];

export const useOnboardingStore = create(
  persist(
    (set) => ({
      businessData: initialBusinessData,
      messages: initialMessages,
      currentStep: 0,
      isComplete: false,
      isGenerating: false,
      updateBusinessData: (data) =>
        set((state) => ({
          businessData: {
            ...state.businessData,
            ...data,
            socialLinks: data.socialLinks
              ? { ...state.businessData.socialLinks, ...data.socialLinks }
              : state.businessData.socialLinks,
          },
        })),
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      setStep: (step) =>
        set({
          currentStep: step,
        }),
      setComplete: (status) =>
        set({
          isComplete: status,
        }),
      setGenerating: (status) =>
        set({
          isGenerating: status,
        }),
      resetOnboarding: () =>
        set({
          businessData: initialBusinessData,
          messages: initialMessages,
          currentStep: 0,
          isComplete: false,
          isGenerating: false,
        }),
    }),
    {
      name: "siteforge-onboarding-store",
    }
  )
);
