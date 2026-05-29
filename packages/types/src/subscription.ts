export type SubscriptionPlan = "free" | "pro" | "business" | "enterprise";
export type SubscriptionInterval = "monthly" | "yearly";
export type PaymentStatus = "active" | "canceled" | "past_due" | "incomplete" | "trialing";

export interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string | null;
  plan: SubscriptionPlan;
  interval: SubscriptionInterval;
  status: PaymentStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanFeatures {
  maxWebsites: number;
  maxPagesPerSite: number;
  maxStorageMb: number;
  customDomain: boolean;
  removeWatermark: boolean;
  prioritySupport: boolean;
  aiGenerationsPerMonth: number;
  analytics: boolean;
}

export const PLAN_FEATURES: Record<SubscriptionPlan, PlanFeatures> = {
  free: {
    maxWebsites: 1,
    maxPagesPerSite: 5,
    maxStorageMb: 100,
    customDomain: false,
    removeWatermark: false,
    prioritySupport: false,
    aiGenerationsPerMonth: 10,
    analytics: false,
  },
  pro: {
    maxWebsites: 5,
    maxPagesPerSite: 20,
    maxStorageMb: 1024,
    customDomain: true,
    removeWatermark: true,
    prioritySupport: false,
    aiGenerationsPerMonth: 100,
    analytics: true,
  },
  business: {
    maxWebsites: 20,
    maxPagesPerSite: 50,
    maxStorageMb: 5120,
    customDomain: true,
    removeWatermark: true,
    prioritySupport: true,
    aiGenerationsPerMonth: 500,
    analytics: true,
  },
  enterprise: {
    maxWebsites: -1, // unlimited
    maxPagesPerSite: -1,
    maxStorageMb: -1,
    customDomain: true,
    removeWatermark: true,
    prioritySupport: true,
    aiGenerationsPerMonth: -1,
    analytics: true,
  },
};

export interface CreateCheckoutInput {
  plan: SubscriptionPlan;
  interval: SubscriptionInterval;
  successUrl: string;
  cancelUrl: string;
}
