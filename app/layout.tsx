import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import Navigation from '@/components/shared/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LawBridge Ethiopia - AI-Powered Legal Platform',
  description: 'Access justice anytime, anywhere in Ethiopia. Free AI legal guidance and connect with verified Ethiopian lawyers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main>
        <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  )
}

