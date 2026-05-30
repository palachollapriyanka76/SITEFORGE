import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/editor(.*)",
  "/settings(.*)",
  "/billing(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Remove port for exact domain matching
  const currentHost = hostname.replace(`:${url.port}`, "");

  // Detect custom domains or siteforge subdomains
  // We exclude localhost, exact siteforge.app, exact siteforge.in and their www variants
  const isBaseDomain = 
    currentHost === "localhost" ||
    currentHost === "siteforge.in" ||
    currentHost === "www.siteforge.in" ||
    currentHost === "siteforge.app" ||
    currentHost === "www.siteforge.app";

  if (!isBaseDomain) {
    // It's a custom domain or a subdomain
    // For subdomain, extract it by removing the base domain parts
    let domainSlug = currentHost;
    
    if (currentHost.includes("localhost")) {
      domainSlug = currentHost.replace(".localhost", "");
    } else {
      domainSlug = currentHost.replace(".siteforge.app", "").replace(".siteforge.in", "");
    }

    // Allow Next.js static assets and API routes to bypass the dynamic rewrite
    if (!url.pathname.startsWith("/_next") && !url.pathname.startsWith("/api")) {
      return NextResponse.rewrite(new URL(`/sites/${domainSlug}${url.pathname}`, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
