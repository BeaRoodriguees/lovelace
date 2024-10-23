import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const BASE_PATH = '/api/auth';

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const payload = new URLSearchParams();
        payload.append('username', credentials.email as string);
        payload.append('password', credentials.password as string);
        payload.append('grant_type', 'password');

        // Request jwt token with user Login data
        const token_res = await fetch(`${process.env.API_URL}/auth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload,
        });

        if (!token_res.ok) {
          throw new Error('User not found!');
        }
        const data = await token_res.json();
        const token = data.access_token;

        // Request for logged user data
        const user_res = await fetch(`${process.env.API_URL}/auth/me`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = await user_res.json();

        // If no error and we have user data, return it
        if (user_res.ok && user) {
          return {
            ...user,
            token: token,
          };
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          token: token.token,
          username: token.username,
          email: token.email,
          role: token.role,
        },
      };
    },
  },
};
