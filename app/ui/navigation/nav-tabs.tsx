'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const tabs = [
  { name: 'Home', href: '/' },
  { name: 'Skaters', href: '/skaters' },
  { name: 'Goalies', href: '/goalies' },
  { name: 'Teams', href: '/teams' },
]

export default function NavTabs() {
  const pathname = usePathname()

  return (
    <div className="nav-tabs flex flex-row justify-between items-center w-full p-3">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className={clsx('nav-tab', {
            'font-bold border-b-2 border-b-solid border-b-black':
              pathname === tab.href,
          })}
        >
          <Link href={tab.href}>{tab.name}</Link>
        </div>
      ))}
    </div>
  )
}
