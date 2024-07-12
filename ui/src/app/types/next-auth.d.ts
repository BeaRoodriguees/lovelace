import { type DefaultSession } from "next-auth"
import { type DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
      user: {
        username: string,
        token: string,
        id: number
        role: "admin" | "user"
      } & DefaultSession["user"]
    }
  }

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT extends DefaultJWT {
      role: string | null | undefined
    }
  }