import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Define protected paths
  const protectedRoutes = [
    '/dashboard',
    '/analytics',
    '/leads',
    '/settings',
    '/publish',
    '/onboarding',
    '/editor',
    '/vendor'
  ];

  // Check if the current route is protected
  const isProtected = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtected) {
    // Read the siteforge-auth-token cookie
    const token = request.cookies.get('siteforge-auth-token')?.value;

    // Case 4: If unauthenticated, redirect directly to login
    if (!token) {
      console.log(`[Middleware] Blocking unauthenticated access to: ${pathname}`);
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Clean URL mappings: Redirect root paths to their actual vendor sub-routes
    if (pathname === '/dashboard') {
      return NextResponse.redirect(new URL('/vendor/dashboard', request.url));
    }
    if (pathname === '/analytics') {
      return NextResponse.redirect(new URL('/vendor/analytics', request.url));
    }
    if (pathname === '/leads') {
      return NextResponse.redirect(new URL('/vendor/customers', request.url));
    }
    if (pathname === '/settings') {
      return NextResponse.redirect(new URL('/vendor/settings', request.url));
    }
    if (pathname === '/publish') {
      return NextResponse.redirect(new URL('/vendor/publish', request.url));
    }
    if (pathname === '/editor') {
      // Direct access to editor without a websiteId redirects to dashboard
      return NextResponse.redirect(new URL('/vendor/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// Configured matcher to target all protected routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/analytics/:path*',
    '/leads/:path*',
    '/settings/:path*',
    '/publish/:path*',
    '/onboarding/:path*',
    '/editor/:path*',
    '/vendor/:path*',
  ],
};
