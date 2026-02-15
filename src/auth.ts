import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    authorized: () => true,
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
