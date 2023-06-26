import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "./lib/database";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const { data } = await supabase.auth.getSession();
  const { session } = data;

  const pathname = req.nextUrl.pathname;

  const onConnexionRoute = pathname.startsWith("/connexion");
  const onProtectedRoutes = !onConnexionRoute;
  const onCompleteProfRoute = pathname.startsWith("/complete-profile");

  const accessAuthorized = session && onProtectedRoutes;
  const accessRestricted = !session && onProtectedRoutes;
  const alreadyAuthenticated = session && onConnexionRoute;

  if (accessRestricted) {
    // User is trying to access protected route but is NOT authenticated
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/connexion";
    return NextResponse.redirect(redirectUrl);
  }

  if (alreadyAuthenticated) {
    // User is trying to access "/connexion" but is already authenticated
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  if (accessAuthorized) {
    const { data } = await supabase.from("profiles").select();

    if (!data) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/connexion";
      return NextResponse.redirect(redirectUrl);
    }

    const profileComplete = data.length > 0;

    // user's profile is complete, prevent access to page "/c-p"
    if (profileComplete && onCompleteProfRoute) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }

    // user did not complete his profile, redirect to "/c-p" page
    if (!profileComplete && !onCompleteProfRoute) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/complete-profile";
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (pathname === "/historique") {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/historique/all";
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/complete-profile",
    "/connexion",
    "/historique",
    "/profil",
    "/update-password",
    "/support",
    "/tarot",
  ],
};
