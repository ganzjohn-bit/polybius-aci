import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { isProductionEnv } from '@/lib/environments'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    authorized: () => true,
    // sign-in is restricted to an allowlist of specific emails
    signIn({ profile }) {
      // Parse email allowlist
      const allowList = process.env.AUTH_ALLOWED_EMAILS;
      const allowedEmails = allowList?.split(",").map((e) => e.trim()).filter(Boolean) [];
      const hasAllowedEmail = !!profile?.email && allowedEmails.includes(profile.email);

      // Allowlist is required in production
      if (isProductionEnv()) {
        if (!allowedEmails || allowedEmails.length === 0) {
          console.error("Allowed emails not configured. Sign-in is disabled.")
          return false;
        }

        return hasAllowedEmail;
      }

      if (!hasAllowedEmail) {
        console.info(`Proceeding with unallowed email "${profile?.email.slice(0, 5)}..."`);
      }
      
      return !!profile?.email;
    },
    jwt({ token, profile }) {
      if (profile?.email) {
        token.email = profile.email
      }
      return token
    },
    session({ session, token }) {
      if (token.email) {
        session.user.email = token.email as string
      }
      return session
    },
  },
})
