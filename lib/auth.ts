import { cookies } from 'next/headers'
import { db } from './db'

const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

// Simple hash function using Web Crypto API (SHA-256)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// Session management
export async function createSession(adminId: number): Promise<string> {
  // Create a simple session token
  const sessionToken = crypto.randomUUID()
  const sessionData = JSON.stringify({ adminId, token: sessionToken, expiresAt: Date.now() + SESSION_MAX_AGE * 1000 })
  const encodedSession = Buffer.from(sessionData).toString('base64')
  
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, encodedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })
  
  return sessionToken
}

export async function getSession(): Promise<{ adminId: number } | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
  
  if (!sessionCookie?.value) {
    return null
  }
  
  try {
    const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString())
    
    // Check if session is expired
    if (sessionData.expiresAt < Date.now()) {
      await destroySession()
      return null
    }
    
    return { adminId: sessionData.adminId }
  } catch {
    return null
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session !== null
}

export async function getCurrentAdmin() {
  const session = await getSession()
  if (!session) return null
  
  // For now, we just return the session info
  // In a more complex app, you'd fetch the admin from the database
  return session
}

// Auth actions
export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await db.admins.findByEmail(email)
    
    if (!admin) {
      return { success: false, error: 'Invalid email or password' }
    }
    
    const isValid = await verifyPassword(password, admin.password_hash)
    
    if (!isValid) {
      return { success: false, error: 'Invalid email or password' }
    }
    
    await createSession(admin.id)
    return { success: true }
  } catch (error) {
    console.error('[Auth] Login error:', error)
    return { success: false, error: 'An error occurred during login' }
  }
}

export async function logout(): Promise<void> {
  await destroySession()
}
