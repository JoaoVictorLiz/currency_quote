import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Exchange Tracker'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-bg-site'>
      <body className={inter.className}>
        <NavBar />
        <main className='max-w-10xl mx-auto '>
          {children}
        </main>
      </body>
    </html>
  )
}
