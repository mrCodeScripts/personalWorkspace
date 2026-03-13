import { type NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "./lib/auth";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
    const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
        baseURL: request.nextUrl.origin,
        headers: {
            // Important: Forward the cookies from the request
            cookie: request.headers.get("cookie") || "", 
        },
    });

    if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};