import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Techspark - SDIT',
  description: 'Register for SDIT Techspark event',
  icons: {
    icon: [
      {
        url: '/assets/logo/faviconn/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        url: '/assets/logo/faviconn/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        url: '/assets/logo/faviconn/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      }
    ],
    apple: {
      url: '/assets/logo/faviconn/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png'
    },
    shortcut: [
      {
        url: '/assets/logo/faviconn/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/assets/logo/faviconn/favicon.svg'
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}