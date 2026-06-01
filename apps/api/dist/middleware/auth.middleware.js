import { getAuth } from "@clerk/express";
/**
 * Express middleware to verify Clerk session JWT tokens.
 * Attaches verified user context to req.user.
 */
export function verifyClerkToken(req, res, next) {
    try {
        const authState = getAuth(req);
        if (!authState.userId) {
            return res.status(401).json({
                success: false,
                error: {
                    code: "UNAUTHORIZED",
                    message: "Authentication required. Please provide a valid Clerk session token."
                }
            });
        }
        // Attach verified user payload to the request object
        req.user = {
            userId: authState.userId,
            clerkId: authState.userId
        };
        next();
    }
    catch (error) {
        console.error("❌ Clerk token verification error:", error);
        return res.status(401).json({
            success: false,
            error: {
                code: "UNAUTHORIZED",
                message: "Invalid or expired session token."
            }
        });
    }
}
//# sourceMappingURL=auth.middleware.js.map