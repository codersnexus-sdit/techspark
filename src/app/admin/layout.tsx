'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isAdminAuthenticated, verifyAdminAuth } from '@/lib/adminAuth'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check for login page
      if (pathname === '/admin/login') {
        setLoading(false)
        return
      }

      // Redirect to login if visiting admin root
      if (pathname === '/admin') {
        router.push('/admin/login')
        return
      }

      // Verify authentication with server
      const authResult = await verifyAdminAuth()
      
      if (!authResult.authenticated) {
        // Clear client-side session if server says not authenticated
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('adminAuthenticated')
          sessionStorage.removeItem('adminEmail')
        }
        router.push('/admin/login')
        return
      }

      // Update client-side session if authenticated
      if (authResult.email && typeof window !== 'undefined') {
        sessionStorage.setItem('adminAuthenticated', 'true')
        sessionStorage.setItem('adminEmail', authResult.email)
      }

      setLoading(false)
    }

    checkAuth()
  }, [router, pathname])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-600/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}