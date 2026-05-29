import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  type?: "text" | "type_choice" | "style_choice" | "color_choice" | "logo_upload" | "boolean_choice" | "whatsapp_input" | "social_input";
  choices?: string[];
}

export interface BusinessData {
  name: string;
  type: string;
  products: string[];
  audience: string;
  style: string;
  colorTheme: string;
  logoUrl: string;
  ordering: boolean;
  whatsappEnabled: boolean;
  whatsappNumber: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
}

interface OnboardingState {
  businessData: BusinessData;
  messages: Message[];
  currentStep: number; // 0 to 9 for Q1-Q10, 10 is complete
  isComplete: boolean;
  isGenerating: boolean;
  updateBusinessData: (data: Partial<BusinessData>) => void;
  addMessage: (message: Message) => void;
  setStep: (step: number) => void;
  setComplete: (status: boolean) => void;
  setGenerating: (status: boolean) => void;
  resetOnboarding: () => void;
}

const initialBusinessData: BusinessData = {
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

const initialMessages: Message[] = [
  {
    id: "welcome-ai",
    sender: "ai",
    text: "Namaste! 🙏 I am your SiteForge digital advisor. I will help you build a professional, premium website for your shop or business. Let's get started!\n\nFirst, **what is the name of your business?**",
    timestamp: new Date().toISOString(),
    type: "text",
  },
];

export const useOnboardingStore = create<OnboardingState>()(
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
