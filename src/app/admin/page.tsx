import { redirect } from "next/navigation"
import { auth, signOut } from "@/auth"

export default async function AdminPage() {
  const session = await auth()
  if (!session) redirect("/login")

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin</h1>
      <p>Name: {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
      <form
        action={async () => {
          "use server"
          await signOut({ redirectTo: "/" })
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  )
}
