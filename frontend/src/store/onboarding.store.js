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
    text: "👋 Welcome to SiteForge\n\nLet's build your website.\n\n🏪 What's your business name?",
    timestamp: new Date().toISOString(),
    type: "text",
  },
];

export const useOnboardingStore = create(
  persist(
    (set, get) => ({
      userId: null,
      businessData: initialBusinessData,
      messages: initialMessages,
      currentStep: 0,
      isComplete: false,
      isGenerating: false,
      setUserId: (id) => {
        const storedUserId = get().userId;
        if (id !== storedUserId) {
          console.log(`[Store Reset] User context changed from ${storedUserId} to ${id}. Wiping onboarding session history.`);
          // Force state wipe
          set({
            businessData: initialBusinessData,
            messages: initialMessages,
            currentStep: 0,
            isComplete: false,
            isGenerating: false,
          });
        }
        set({ userId: id });
      },
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
