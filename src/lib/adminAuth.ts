// Secure admin authentication using API routes
export const loginAdmin = async (email: string, password: string): Promise<{ success: boolean; message: string; email?: string }> => {
  try {
    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      return { success: true, message: data.message, email: data.email }
    } else {
      return { success: false, message: data.error }
    }
  } catch (error) {
    return { success: false, message: 'Network error' }
  }
}

export const logoutAdmin = async (): Promise<void> => {
  try {
    await fetch('/api/admin/auth', {
      method: 'DELETE',
    })
  } catch (error) {
    console.error('Logout error:', error)
  }
}

export const verifyAdminAuth = async (): Promise<{ authenticated: boolean; email?: string }> => {
  try {
    const response = await fetch('/api/admin/verify')
    const data = await response.json()
    
    if (response.ok && data.authenticated) {
      return { authenticated: true, email: data.email }
    } else {
      return { authenticated: false }
    }
  } catch (error) {
    return { authenticated: false }
  }
}
  
// Client-side authentication status (for UI purposes only)
export const isAdminAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem('adminAuthenticated') === 'true'
}

export const setAdminAuthenticated = (email: string): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('adminAuthenticated', 'true')
    sessionStorage.setItem('adminEmail', email)
  }
}

export const clearAdminAuthentication = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('adminAuthenticated')
    sessionStorage.removeItem('adminEmail')
  }
}