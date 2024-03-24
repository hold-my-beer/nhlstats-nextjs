import type { Metadata } from 'next'
import { inter } from '@/app/ui/fonts'
import '@/app/ui/global.css'
import Header from './ui/navigation/header'
import NavTabs from './ui/navigation/nav-tabs'

export const metadata: Metadata = {
  title: {
    template: '%s | NHL Stats',
    default: 'NHL Stats',
  },
  description: 'NHL Stats app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        {/* <div className="contain px-5 py-3 bg-light"> */}
        <NavTabs />
        <div>{children}</div>
        {/* </div> */}
      </body>
    </html>
  )
}
