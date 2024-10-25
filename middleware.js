// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  let token = req.cookies.get("isLogin");

  if (req.nextUrl.pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname === "/login" && Boolean(token)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (req.nextUrl.pathname === "/register" && Boolean(token)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if(req.nextUrl.pathname === '/verificationOTP' && token){
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: ["/", "/login", "/register" ,"/verificationOTP"] // Protecting the dashboard route
};
