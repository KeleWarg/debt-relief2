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
  const [isMobile, setIsMobile] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  React.useEffect(() => {
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
  }, [isMobile])

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

  const mobileBar = (
    <div
      className={cn(
        'fixed left-0 right-0 bg-white border-t border-neutral-200 px-4 pt-4 pb-6 z-[9999] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]',
        'transition-[bottom] duration-150 ease-out',
        className
      )}
      style={{ bottom: keyboardOffset > 0 ? `${keyboardOffset}px` : 0 }}
    >
      <div
        className="[&_.btn-continue-wrapper]:w-full [&_button]:w-full"
        onClick={handlePortalClick}
      >
        {children}
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <div ref={anchorRef} className="hidden" />
        {createPortal(mobileBar, document.body)}
      </>
    )
  }

  return (
    <div className={cn('sm:relative sm:bg-transparent sm:border-0 sm:p-0 sm:shadow-none', className)}>
      {children}
    </div>
  )
}

export default StickyButtonContainer
