'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/adminAuth'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      // Skip auth check for login page
      if (pathname === '/admin/login') {
        setLoading(false)
        return
      }

      // Check if admin is authenticated
      if (!isAdminAuthenticated()) {
        router.push('/admin/login')
        return
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