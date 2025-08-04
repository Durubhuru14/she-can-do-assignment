import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/leaderboard"];
const redirectToHomeRoutes = ["/about", "/contact", "/donate"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";

  // Redirect protected routes if not logged in
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect specific pages to home
  const shouldRedirectToHome = redirectToHomeRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (shouldRedirectToHome) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/leaderboard", "/about", "/contact", "/donate"],
};
