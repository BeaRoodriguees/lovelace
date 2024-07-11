import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import NextAuth, { type DefaultSession } from "next-auth"
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from '@/lib/routes';

export const BASE_PATH = '/api/auth'

declare module "next-auth" {
    interface Session {
      user: {
        username: string,
        token: string
      } & DefaultSession["user"]
    }
  }

export const authConfig: NextAuthConfig = {
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // one Day
  },
  providers: [
    Credentials({
      name: 'Sign in',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@example.com'},
        password: { label: 'Password', type: 'password'}
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const payload = new URLSearchParams()
        payload.append('username', credentials.email as string)
        payload.append('password', credentials.password as string)
        payload.append('grant_type', 'password')
        
        // Request jwt token with user Login data
        const token_res = await fetch('http://localhost:8000/auth/token', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },    
          body: payload
        });
        
        if (!token_res.ok) {
          throw new Error("User not found!");
        }

        const data = await token_res.json();
        // console.log("fez a requisição do TOKEN")
        // console.log(data)

        const token = data.access_token

        // Request for logged user data
        const user_res = await fetch('http://localhost:8000/auth/me', {
          method: 'GET',
          headers:{Authorization: `Bearer ${token}`},    
        });

        const user = await user_res.json()
        // console.log('REQUISIÇÃO DO USER')
        // console.log(user)
        
        // If no error and we have user data, return it
        if (user_res.ok && data) {
          return {
            ...user,
            token: token,
          };
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    // authorized: async ({ request, auth }) => {
    //   console.log("######################3 auth authorized")
    //   // console.log(auth)
    //   // console.log(request)
    //   const isAuthenticated = !!auth;
    //   const isPublicRoute = PUBLIC_ROUTES.includes(request.nextUrl.pathname);
    //   if (!isAuthenticated && !isPublicRoute) {
    //     return false
    //   }
    //   return true
    // },
    // async redirect({ url, baseUrl }) {
    //   const nextUrl = new URL(url);

    //   if (nextUrl.search.includes("comingFromThisUrl")) {
    //     const [key, value] = nextUrl.search.split("=");
    //     return decodeURIComponent(value);
    //   } else {
    //     return `${baseUrl}/${DEFAULT_REDIRECT}`;
    //   }
    // },
    async jwt({ token, trigger, session, user }) {
      // console.log('############### JWT CALLBACK ###############')
      // console.log("jwt-token", token)
      // console.log("jwt-trigger", trigger)
      // console.log("jwt-session", session)
      // // console.log("jwt-account", account)
      // console.log("jwt-user", user)
      // console.log('############### END CALLBACK ###############')

      if (user) {
          return {
            ...token,
            ...user
          };
        }
      return token;
    },
    async session({ session, token }) {
      // console.log('############### SESSION CALLBACK ###############')
      // console.log("ses-session", session)
      // console.log("ses-token", token)
      // // console.log("ses-user", user)
      // console.log('############### END CALLBACK ###############')      
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          token: token.token,
          username: token.username,
          email: token.email
        }
      };
    },
  },
};