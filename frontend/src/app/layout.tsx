import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Golf Charity Platform | Play, Win, Give',
  description: 'A modern golf score tracking and subscription platform where your scores can win prizes and support charities.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8 justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                Lumina Golf
              </span>
            </Link>
            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-2 text-sm font-medium">
                <Link href="/dashboard" className="transition-colors hover:text-primary px-4 py-2">
                  Dashboard
                </Link>
                <Link
                  href="/login"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-full transition-all"
                >
                  Sign In
                </Link>
              </nav>
            </div>
          </div>
        </nav>
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  )
}
