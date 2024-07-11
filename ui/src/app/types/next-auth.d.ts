import NextAuth, { type DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
      user: {
        username: string,
        token: string,
        id: number
      } & DefaultSession["user"]
    }
  }