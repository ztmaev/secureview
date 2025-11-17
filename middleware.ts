import { NextRequest, NextResponse } from 'next/server';

// These routes require admin access
const ADMIN_ONLY_ROUTES = [
  '/dashboard/analytics',
  '/dashboard/content-manager',
  '/dashboard/projects',
  '/dashboard/proposals',
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if this is an admin-only route
  const isAdminRoute = ADMIN_ONLY_ROUTES.some(route => 
    pathname.startsWith(route)
  );

  if (isAdminRoute) {
    // For now, we can't check Firebase auth in middleware
    // This is a limitation of Next.js middleware
    // The real check will happen in the components
    // This middleware serves as a backup for route protection
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
