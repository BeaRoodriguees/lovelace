import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server';
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ADMIN_ROUTES, NOT_FOUND_ROUTE } from '@/lib/routes';
import { withAuth } from 'next-auth/middleware'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

export default withAuth(
  async function middleware(req) {
    const { nextUrl } = req;
    const token = await getToken({ req })

    const isAuthenticated = !!token;
    const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
    if (!isAuthenticated && !isPublicRoute) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    const isAuthPage = ["/login", "/register"].includes(nextUrl.pathname)
    if (isAuthenticated && isAuthPage) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, req.nextUrl.origin))
    }

    const isAdminRoute = ADMIN_ROUTES.includes(nextUrl.pathname)
    if (isAdminRoute && token?.role == 'user') {
      return Response.redirect(new URL(NOT_FOUND_ROUTE, req.nextUrl.origin))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { nextUrl } = req;
        const isAuthenticated = !!token;
        const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

        if (!isAuthenticated && !isPublicRoute) {
          return false
        }

        return true
      },
    },
  },
)