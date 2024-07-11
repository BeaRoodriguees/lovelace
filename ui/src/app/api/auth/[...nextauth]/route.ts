import { authConfig } from "@/auth.config"
import NextAuth from 'next-auth'

const handler = NextAuth(authConfig)
export { handler as GET, handler as POST }
