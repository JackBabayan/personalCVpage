import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  const token = req.cookies.get("token");
  const isAuthPage = req.nextUrl.pathname === "/login";
  const isHomePage = req.nextUrl.pathname === "/";

  if (token && isAuthPage) {
    console.log("Пользователь авторизован, редирект на /");
    return NextResponse.redirect(new URL("/", req.url));
  } else if (!token && isHomePage && isAuthPage) {
    console.log("Пользователь не авторизован, редирект на /");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
