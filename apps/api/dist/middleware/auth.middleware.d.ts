import { Request, Response, NextFunction } from "express";
/**
 * Custom request interface extending standard Express request
 * to include verified Clerk user details.
 */
export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        clerkId: string;
    };
}
/**
 * Express middleware to verify Clerk session JWT tokens.
 * Attaches verified user context to req.user.
 */
export declare function verifyClerkToken(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.middleware.d.ts.map