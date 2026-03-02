'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Header } from './Header'
import { Footer } from './Footer'
import { TrustBadges } from './TrustBadges'

const DEFAULT_CAROUSEL: CarouselSlide[] = [
  { src: '/hero-4.png', alt: 'Man celebrating a financial milestone' },
  { src: '/hero-5.png', alt: 'Retired couple enjoying life together' },
  { src: '/image.png', alt: 'Woman reviewing Forbes Advisor savings dashboard on phone' },
]

const SLIDE_INTERVAL = 5000
const FADE_DURATION = 800

interface CarouselSlide {
  src: string
  alt: string
  fit?: 'cover' | 'contain'
}

interface HeroLayoutProps {
  children: React.ReactNode
  /** Single image or array of images for carousel */
  imageSrc?: string | CarouselSlide[]
  imageAlt?: string
  className?: string
  trustBadgeVariant?: 'default' | 'longevity'
  /** When false, render only hero content (no header/footer/trust badges). */
  showChrome?: boolean
}

const TRUST_STATS = [
  { icon: 'dollar', text: '$2B+ in financial advice' },
  { icon: 'users', text: '100K+ people matched' },
  { icon: 'shield', text: '100% free & confidential' },
  { icon: 'clock', text: 'Takes only ~3 minutes' },
] as const

function StatIcon({ type }: { type: string }) {
  const cls = "w-4 h-4 text-white/60"
  switch (type) {
    case 'dollar':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      )
    case 'users':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
        </svg>
      )
    case 'clock':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      )
    default:
      return null
  }
}

function GlassTrustOverlay() {
  return (
    <div className="absolute bottom-10 left-4 right-4 z-10 hidden lg:flex flex-col items-center gap-2">
      <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/50">
        As seen on
      </span>
      <div
        className="w-full rounded-xl border border-white/20 px-5 py-4"
        style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
      >
        {/* Forbes Advisor logo */}
        <div className="flex justify-center mb-3">
          <Image
            src="/forbes-advisor-logo.svg"
            alt="Forbes Advisor"
            width={130}
            height={16}
            className="brightness-0 invert opacity-70"
          />
        </div>

        <div className="w-full h-px bg-white/15 mb-3" />

        {/* 2x2 stat grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
          {TRUST_STATS.map((stat) => (
            <div key={stat.icon} className="flex items-center gap-2">
              <StatIcon type={stat.icon} />
              <span className="text-[15px] text-white/80 leading-snug">{stat.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function HeroCarousel({ slides }: { slides: CarouselSlide[] }) {
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <>
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          unoptimized
          className={slide.fit === 'contain' ? 'object-contain' : 'object-cover'}
          priority={i === 0}
          sizes="50vw"
          style={{
            opacity: i === active ? 1 : 0,
            transition: `opacity ${FADE_DURATION}ms ease-in-out`,
          }}
        />
      ))}

      {/* Glass trust overlay */}
      <GlassTrustOverlay />

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                i === active ? 'bg-white w-5' : 'bg-white/50'
              )}
            />
          ))}
        </div>
      )}
    </>
  )
}

export function HeroLayout({
  children,
  imageSrc,
  imageAlt = 'Woman reviewing her financial plan on a phone',
  className,
  trustBadgeVariant,
  showChrome = true,
}: HeroLayoutProps) {
  const slides: CarouselSlide[] = Array.isArray(imageSrc)
    ? imageSrc
    : imageSrc
      ? [{ src: imageSrc, alt: imageAlt }]
      : DEFAULT_CAROUSEL

  return (
    <div className={cn(
      'flex flex-col bg-white overflow-hidden',
      showChrome ? 'h-screen' : 'h-full'
    )}>
      {showChrome && <Header minimal />}

      {/* Desktop: 50/50 split with carousel */}
      <main
        className={cn(
          'hidden lg:flex flex-row flex-1 min-h-0',
          className
        )}
      >
        <div className="w-1/2 flex items-center justify-center py-10 xl:py-14 pl-10 xl:pl-16 pr-6">
          <div
            className="relative w-full max-w-[624px] rounded-2xl overflow-hidden aspect-[3/4]"
            style={{ maxHeight: 'calc(100vh - 10rem)' }}
          >
            <HeroCarousel slides={slides} />
          </div>
        </div>

        <div className="w-1/2 flex flex-col justify-center overflow-y-auto px-10 lg:pl-12 lg:pr-16 xl:pl-16 xl:pr-20 py-8">
          <div className="w-full max-w-[520px]">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile: stacked layout with carousel */}
      <div className="lg:hidden flex-1 flex flex-col min-h-0 overflow-y-auto">
        <div className="relative w-full aspect-[5/2] max-h-[23vh] overflow-hidden flex-shrink-0">
          <HeroCarousel slides={slides} />
        </div>
        <main className="flex-1 flex flex-col px-6 sm:px-10 pt-3 sm:pt-4 pb-24 sm:pb-8">
          <div className="w-full max-w-[520px] mx-auto">
            {children}
          </div>
        </main>
      </div>

      {showChrome && <TrustBadges variant={trustBadgeVariant} />}
      {showChrome && <Footer />}
    </div>
  )
}

export default HeroLayout
