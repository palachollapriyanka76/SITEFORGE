import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialBusinessData = {
  name: "",
  type: "",
  products: [],
  services: [],
  categories: [],
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

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      isOpen: false,
      setOpen: (status) => set({ isOpen: status }),
      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
      addToCart: (product, quantity = 1, variant = null) => {
        set((state) => {
          const selectedVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : "Standard");
          const existingIndex = state.items.findIndex(
            (item) => item.id === product.id && item.selectedVariant === selectedVariant
          );
          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantity;
            return { items: updatedItems, isOpen: true };
          } else {
            return {
              items: [
                ...state.items,
                {
                  ...product,
                  quantity,
                  selectedVariant,
                },
              ],
              isOpen: true,
            };
          }
        });
      },
      removeFromCart: (productId, variant = null) => {
        set((state) => ({
          items: state.items.filter((item) => {
            if (variant) return !(item.id === productId && item.selectedVariant === variant);
            return item.id !== productId;
          }),
        }));
      },
      updateQuantity: (productId, quantity, variant = null) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, variant);
          return;
        }
        set((state) => ({
          items: state.items.map((item) => {
            const match = variant ? item.id === productId && item.selectedVariant === variant : item.id === productId;
            if (match) return { ...item, quantity };
            return item;
          }),
        }));
      },
      clearCart: () => set({ items: [] }),
      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.wishlist.some((item) => item.id === product.id);
          if (exists) {
            return { wishlist: state.wishlist.filter((item) => item.id !== product.id) };
          } else {
            return { wishlist: [...state.wishlist, product] };
          }
        });
      },
    }),
    {
      name: "siteforge-cart-store",
    }
  )
);
