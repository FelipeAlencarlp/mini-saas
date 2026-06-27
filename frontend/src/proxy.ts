import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get('auth');
    const url = request.nextUrl.clone();
    const isLoginRoute = request.nextUrl.pathname.startsWith('/login');
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

    if (
        (!token && isAdminRoute) ||
        url.pathname === '/'
    ) {
        return NextResponse.redirect(
            new URL('/login', request.url)
        );
    }

    if (token && isLoginRoute) {
        return NextResponse.redirect(
            new URL('/admin', request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/admin/:path*', '/login'],
};