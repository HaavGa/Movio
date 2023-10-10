// middleware.ts
import { NextResponse } from "next/server";

export function middleware(request: Request) {
  // get the URL from request header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  // pass the header to the layout
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
