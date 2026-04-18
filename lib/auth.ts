import { cookies } from 'next/headers'
import { db } from './db'
import bcrypt from 'bcryptjs'

const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

// Hash password using bcrypt
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// Verify password using bcrypt
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    console.error('[v0] Password verification error:', error)
    return false
  }
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
    const adminId = parseInt(sessionCookie.value, 10)
    if (isNaN(adminId)) {
      return null
    }
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

// Login action
export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' }
    }

    const admin = await db.admins.findByEmail(email)

    if (!admin) {
      return { success: false, error: 'Invalid email or password' }
    }

    const isPasswordValid = await verifyPassword(password, admin.password_hash)

    if (!isPasswordValid) {
      return { success: false, error: 'Invalid email or password' }
    }

    await createSession(admin.id)
    return { success: true }
  } catch (error) {
    console.error('[v0] Login error:', error)
    return { success: false, error: 'An error occurred during login' }
  }
}

// Logout action
export async function logout(): Promise<void> {
  await destroySession()
}
