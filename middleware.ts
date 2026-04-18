import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './lib/auth'

const SESSION_COOKIE_NAME = 'admin_session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow login page without authentication
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)

    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      const adminId = parseInt(sessionCookie.value, 10)
      if (isNaN(adminId)) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
