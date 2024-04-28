import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export default async function middleware(req) {
    const session = await getToken({ req })
    const url = req.nextUrl.pathname

    if (url.startsWith('/dashboard')) {
        if (session === null) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }

    if (!url.startsWith('/dashboard')) {
        if (session !== null) {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }
    }
}

export const config = {
    matcher: ['/', '/dashboard/:path*']
}