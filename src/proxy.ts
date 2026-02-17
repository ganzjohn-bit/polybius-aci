import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/auth"

export const proxy = auth((request: NextRequest) => {
  const hostname = request.headers.get("host") || ""

  // If accessing polybius.world (not app.polybius.world), show results page
  if (hostname === "polybius.world" || hostname === "www.polybius.world") {
    const pathname = request.nextUrl.pathname

    // Don't rewrite API routes, static assets, or specific pages
    if (
      pathname.startsWith("/api/") ||
      pathname.startsWith("/_next/") ||
      pathname.includes(".")
    ) {
      return NextResponse.next()
    }

    // Allow methodology page to pass through
    if (pathname === "/methodology") {
      return NextResponse.next()
    }

    // Rewrite root to results page
    const url = request.nextUrl.clone()
    url.pathname = "/results"
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
