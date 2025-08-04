import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  (await cookies()).delete("isLoggedIn");
  (await cookies()).delete("user");

  const redirectUrl = new URL("/", req.url);
  return NextResponse.redirect(redirectUrl);
}
