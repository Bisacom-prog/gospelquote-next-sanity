import { draftMode } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const slug = searchParams.get("slug")

  if (secret !== process.env.SANITY_PREVIEW_TOKEN || !slug) {
    return new Response("Invalid token", { status: 401 })
  }

  const dm = await draftMode()
  dm.enable()

  return NextResponse.redirect(
    new URL(`/writeups/${slug}`, request.url)
  )
}
