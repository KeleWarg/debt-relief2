'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

interface StickyButtonContainerProps {
  children: React.ReactNode
  className?: string
}

export function StickyButtonContainer({ 
  children, 
  className 
}: StickyButtonContainerProps) {
  const [keyboardOffset, setKeyboardOffset] = React.useState(0)
  const [isSticky, setIsSticky] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const sentinelRef = React.useRef<HTMLDivElement>(null)
  const anchorRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [mounted])

  React.useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 639px)').matches
    if (!isMobile) return

    const visualViewport = window.visualViewport
    if (!visualViewport) return

    const handleResize = () => {
      const keyboardHeight = window.innerHeight - visualViewport.height
      if (keyboardHeight > 100) {
        const offset = keyboardHeight - visualViewport.offsetTop
        setKeyboardOffset(Math.max(0, offset))
      } else {
        setKeyboardOffset(0)
      }
    }

    visualViewport.addEventListener('resize', handleResize)
    visualViewport.addEventListener('scroll', handleResize)
    handleResize()

    return () => {
      visualViewport.removeEventListener('resize', handleResize)
      visualViewport.removeEventListener('scroll', handleResize)
    }
  }, [])

  const handlePortalClick = (e: React.MouseEvent) => {
    const button = (e.target as HTMLElement).closest('button')
    if (!button || button.disabled) return
    if (button.type === 'submit') {
      e.preventDefault()
      const form = anchorRef.current?.closest('form')
      if (form) {
        form.requestSubmit()
      }
    }
  }

  const fixedBar = (
    <div
      className={cn(
        'fixed left-0 right-0 bottom-0 bg-white border-t border-neutral-200 px-4 pt-4 pb-6 z-[9999] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]',
        'transition-[bottom] duration-150 ease-out',
      )}
      style={{ bottom: keyboardOffset > 0 ? `${keyboardOffset}px` : 0 }}
    >
      <div
        className="max-w-content mx-auto [&_.btn-continue-wrapper]:w-full [&_button]:w-full"
        onClick={handlePortalClick}
      >
        {children}
      </div>
    </div>
  )

  return (
    <>
      <div ref={anchorRef} className={cn(isSticky ? 'invisible' : '', className)}>
        <div ref={sentinelRef}>
          {children}
        </div>
      </div>
      {mounted && isSticky && createPortal(fixedBar, document.body)}
    </>
  )
}

export default StickyButtonContainer
