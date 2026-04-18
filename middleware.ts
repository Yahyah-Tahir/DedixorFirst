import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE_NAME = 'admin_session'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Only protect /admin routes (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)
    
    if (!sessionCookie?.value) {
      // Redirect to login
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
    
    // Validate session
    try {
      const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString())
      
      // Check if session is expired
      if (sessionData.expiresAt < Date.now()) {
        const loginUrl = new URL('/admin/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        const response = NextResponse.redirect(loginUrl)
        response.cookies.delete(SESSION_COOKIE_NAME)
        return response
      }
    } catch {
      // Invalid session, redirect to login
      const loginUrl = new URL('/admin/login', request.url)
      const response = NextResponse.redirect(loginUrl)
      response.cookies.delete(SESSION_COOKIE_NAME)
      return response
    }
  }
  
  // If logged in and trying to access login page, redirect to admin
  if (pathname === '/admin/login') {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)
    
    if (sessionCookie?.value) {
      try {
        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString())
        
        if (sessionData.expiresAt > Date.now()) {
          return NextResponse.redirect(new URL('/admin', request.url))
        }
      } catch {
        // Invalid session, continue to login page
      }
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
