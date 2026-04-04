import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'McQueen Realty',
  description: 'Luxury real estate website for McQueen Realty',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
