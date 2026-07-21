import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "@/constants/api";

/**
 * Clears the httpOnly auth cookie on the frontend origin.
 */
export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out",
  });

  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });

  return response;
}
