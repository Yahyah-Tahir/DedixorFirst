'use server'

import { login as authLogin, logout as authLogout } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function loginAction(email: string, password: string) {
  const result = await authLogin(email, password)
  if (result.success) {
    redirect('/admin')
  }
  return result
}

export async function logoutAction() {
  await authLogout()
  redirect('/admin/login')
}
