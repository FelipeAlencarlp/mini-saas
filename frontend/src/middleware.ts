import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth');
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

    if (!token && isAdminRoute) {
        return NextResponse.redirect(
            new URL('/login', request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};