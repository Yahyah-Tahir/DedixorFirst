import { cookies } from 'next/headers'
import { db } from './db'
import bcrypt from 'bcryptjs'

const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

// Hash password using bcrypt
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

// Verify password using bcrypt
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Session management
export async function createSession(adminId: number): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, adminId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })
}

export async function getSession(): Promise<{ adminId: number } | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
  
  if (!sessionCookie?.value) {
    return null
  }
  
  try {
    const adminId = parseInt(sessionCookie.value)
    return { adminId }
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
    console.error('[v0] Login error:', error)
    return { success: false, error: 'An error occurred during login' }
  }
}

export async function logout(): Promise<void> {
  await destroySession()
}
