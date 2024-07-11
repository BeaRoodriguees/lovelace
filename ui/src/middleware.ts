import { auth } from "@/auth"
import { NextResponse } from 'next/server';
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from '@/lib/routes';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// export { auth as middleware } from "@/auth"

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  console.log("------------------MIDDLEWARE------------------")
  // console.log(req.auth)
  // console.log("req:", req.url)
  // console.log("nexturl", nextUrl)
  // console.log("isAuthed", isAuthenticated)

  if (isAuthenticated && isPublicRoute && nextUrl.pathname !== ROOT) {
    console.log("CAIU NO CASO'")
    return Response.redirect(new URL(DEFAULT_REDIRECT, req.nextUrl.origin))
  }

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
})