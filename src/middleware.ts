import { NextRequest, NextResponse } from "next/server";
import { extractSubdomain } from "@/lib/tenant";

export function middleware(request: NextRequest) {
  const subdomain = extractSubdomain(request.headers.get("host"));
  const { pathname } = request.nextUrl;

  if (subdomain && pathname === "/") {
    return NextResponse.rewrite(new URL(`/t/${subdomain}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"]
};
