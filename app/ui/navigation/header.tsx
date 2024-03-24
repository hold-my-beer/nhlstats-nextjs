import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="header flex flex-row justify-between items-center p-3 bg-light">
      <div className="branding flex flex-row justify-center items-center h-full space-x-2 text-lg font-bold">
        <div className="logo flex flex-row justify-center items-center h-full">
          <Link href="/">
            <Image
              src="/puck.png"
              width={30}
              height={30}
              alt="NHL Stats Logo"
            />
          </Link>
        </div>
        <div className="branding-title">
          <Link href="/">
            <span>NHL Stats</span>
          </Link>
        </div>
      </div>
      <div className="nav">Nav</div>
    </header>
  )
}
