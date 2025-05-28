import type { NextRequest, NextResponse } from 'next/server';

// This is a no-op middleware.
// It's added to ensure that if Next.js is expecting a middleware manifest,
// the build process for middleware is triggered, which should create the manifest.
export function middleware(request: NextRequest): NextResponse | void {
  // Middleware logic can be added here if needed in the future.
  // For now, we are just letting the request pass through.
  // return NextResponse.next(); // You can uncomment this if you need to return a response
}

// Optionally, you can define a matcher to specify which paths this middleware applies to.
// If no matcher is defined, it applies to all paths.
// export const config = {
//   matcher: '/:path*', // Example: applies to all paths
// };
