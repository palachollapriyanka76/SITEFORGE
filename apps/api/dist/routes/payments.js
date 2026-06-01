import { Router } from "express";
import { requireAuth, getAuth } from "@clerk/express";
import Stripe from "stripe";
import { prisma } from "@siteforge/database";
const router = Router();
let _stripe = null;
function getStripe() {
    if (!_stripe) {
        _stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
            apiVersion: "2024-12-18.acacia",
        });
    }
    return _stripe;
}
// POST /api/payments/create-checkout — Create Stripe Checkout Session
router.post("/create-checkout", requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId)
            return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
        const { priceId, successUrl, cancelUrl } = req.body;
        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user)
            return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });
        // Get or create Stripe customer
        let subscription = await prisma.subscription.findUnique({ where: { userId: user.id } });
        let customerId = subscription?.stripeCustomerId;
        if (!customerId) {
            const customer = await getStripe().customers.create({
                email: user.email,
                metadata: { clerkId: userId, userId: user.id },
            });
            customerId = customer.id;
        }
        const session = await getStripe().checkout.sessions.create({
            customer: customerId,
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
            cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=true`,
            metadata: { userId: user.id },
        });
        return res.json({ success: true, data: { url: session.url } });
    }
    catch (error) {
        console.error("Checkout error:", error);
        return res.status(500).json({ success: false, error: { code: "CHECKOUT_ERROR", message: "Failed to create checkout session" } });
    }
});
// POST /api/payments/webhook — Stripe webhook handler
router.post("/webhook", async (req, res) => {
    const sig = req.headers["stripe-signature"];
    try {
        const event = getStripe().webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || "");
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object;
                const userId = session.metadata?.userId;
                if (userId && session.subscription) {
                    const sub = await getStripe().subscriptions.retrieve(session.subscription);
                    await prisma.subscription.upsert({
                        where: { userId },
                        create: {
                            userId,
                            stripeCustomerId: session.customer,
                            stripeSubscriptionId: sub.id,
                            plan: "PRO",
                            status: "ACTIVE",
                            currentPeriodStart: new Date(sub.current_period_start * 1000),
                            currentPeriodEnd: new Date(sub.current_period_end * 1000),
                        },
                        update: {
                            stripeSubscriptionId: sub.id,
                            plan: "PRO",
                            status: "ACTIVE",
                            currentPeriodStart: new Date(sub.current_period_start * 1000),
                            currentPeriodEnd: new Date(sub.current_period_end * 1000),
                        },
                    });
                }
                break;
            }
            case "customer.subscription.updated": {
                const sub = event.data.object;
                await prisma.subscription.update({
                    where: { stripeSubscriptionId: sub.id },
                    data: {
                        status: sub.status === "active" ? "ACTIVE" : "PAST_DUE",
                        cancelAtPeriodEnd: sub.cancel_at_period_end,
                        currentPeriodEnd: new Date(sub.current_period_end * 1000),
                    },
                });
                break;
            }
            case "customer.subscription.deleted": {
                const sub = event.data.object;
                await prisma.subscription.update({
                    where: { stripeSubscriptionId: sub.id },
                    data: { status: "CANCELED", plan: "FREE" },
                });
                break;
            }
        }
        return res.json({ received: true });
    }
    catch (error) {
        console.error("Stripe webhook error:", error);
        return res.status(400).json({ error: "Webhook signature verification failed" });
    }
});
// GET /api/payments/subscription — Get current subscription
router.get("/subscription", requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId)
            return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user)
            return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });
        const subscription = await prisma.subscription.findUnique({ where: { userId: user.id } });
        return res.json({ success: true, data: subscription || { plan: "FREE", status: "ACTIVE" } });
    }
    catch (error) {
        console.error("Subscription fetch error:", error);
        return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to fetch subscription" } });
    }
});
export default router;
//# sourceMappingURL=payments.js.map