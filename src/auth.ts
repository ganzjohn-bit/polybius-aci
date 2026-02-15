import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    authorized: () => true,
    // sign-in is restricted to an allowlist of specific emails, set in env var
    signIn({ profile }) {
      const allowList = process.env.AUTH_ALLOWED_EMAILS;
      const allowedEmails = allowList?.split(",").map((e) => e.trim()).filter(Boolean)
      if (!allowedEmails || allowedEmails.length === 0) {
        console.error("Allowed emails not configured. Sign-in is disabled.")
        return false
      }
      return !!profile?.email && allowedEmails.includes(profile.email)
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
