import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server';
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from '@/lib/routes';
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

    if (isAuthenticated && isPublicRoute && nextUrl.pathname !== ROOT) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, req.nextUrl.origin))
    }

    if (!isAuthenticated && !isPublicRoute) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { nextUrl } = req;
        const isAuthenticated = !!token;
        const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

        if (!isAuthenticated && !isPublicRoute && nextUrl.pathname !== ROOT) {
          return false
        }

        return true
      },
    },
  },
)