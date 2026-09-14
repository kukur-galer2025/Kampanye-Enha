import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || "supersecret" });

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
