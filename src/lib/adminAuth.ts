// Simple admin authentication
export const ADMIN_CREDENTIALS = {
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@techevent.com',
    password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
  }
  
  export const validateAdminCredentials = (email: string, password: string): boolean => {
    return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
  }
  
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