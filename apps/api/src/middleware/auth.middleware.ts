import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

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
export function verifyClerkToken(req: Request, res: Response, next: NextFunction) {
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
    (req as any).user = {
      userId: authState.userId,
      clerkId: authState.userId
    };

    next();
  } catch (error) {
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
