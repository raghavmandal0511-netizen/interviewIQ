import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "@/constants/api";

type SessionBody = {
  token?: string;
};

/**
 * Mirrors the backend JWT onto the Next.js origin as an httpOnly cookie
 * so middleware can protect `/dashboard` routes. Cross-origin Set-Cookie
 * from Render is not relied on for local development.
 */
export async function POST(request: Request) {
  let body: SessionBody = {};
  try {
    body = (await request.json()) as SessionBody;
  } catch {
    body = {};
  }

  const token = typeof body.token === "string" ? body.token.trim() : "";
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Token is required" },
      { status: 400 },
    );
  }

  const response = NextResponse.json({
    success: true,
    message: "Session established",
  });

  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
