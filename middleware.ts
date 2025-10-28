export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/blog/new",
    "/blog/edit/:path*",
    "/profile",
    "/settings",
  ],
};