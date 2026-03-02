import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const HEADER_LINKS = [
  { label: 'Advertiser Disclosure', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Contact Us', href: '#' },
]

interface HeaderProps {
  className?: string
  /** When true, hides the right-side links */
  minimal?: boolean
}

export function Header({ className, minimal }: HeaderProps) {
  return (
    <header
      className={cn(
        'w-full bg-white sticky top-0 z-50',
        className
      )}
    >
      <div className="w-full h-14 px-4 sm:pl-[80px] sm:pr-[80px] flex items-center justify-center sm:justify-start gap-6">
        <Image
          src="/forbes-advisor-logo.svg"
          alt="Forbes Advisor"
          width={167}
          height={21}
          priority
          className="flex-shrink-0"
        />

        {!minimal && (
          <nav className="hidden sm:flex items-center gap-5 ml-auto">
            {HEADER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
