import { redirect } from "next/navigation"
import { auth, signIn } from "@/auth"

export default async function LoginPage(props: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const session = await auth()
  if (session) redirect("/admin")

  const { callbackUrl } = await props.searchParams

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <form
        action={async () => {
          "use server"
          await signIn("github", { redirectTo: callbackUrl ?? "/admin" })
        }}
      >
        <button type="submit">Sign in with GitHub</button>
      </form>
    </div>
  )
}
