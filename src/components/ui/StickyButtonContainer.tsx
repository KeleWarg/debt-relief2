'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface StickyButtonContainerProps {
  children: React.ReactNode
  className?: string
}

/**
 * StickyButtonContainer Component
 * 
 * Wraps a button (typically the form submit button) and makes it sticky/fixed 
 * at the bottom of the screen on mobile devices. On tablet and desktop, 
 * the button renders inline as normal.
 * 
 * Features:
 * - Fixed position on mobile (< 640px)
 * - White background with subtle top shadow
 * - Safe area padding for iOS devices with home indicator
 * - Normal inline flow on tablet/desktop
 * - Unsticks when user scrolls to bottom so footer is visible
 * 
 * @example
 * <StickyButtonContainer>
 *   <Button type="submit" fullWidth>Continue</Button>
 * </StickyButtonContainer>
 */
export function StickyButtonContainer({ 
  children, 
  className 
}: StickyButtonContainerProps) {
  const [isSticky, setIsSticky] = React.useState(true)
  const sentinelRef = React.useRef<HTMLDivElement>(null)
  
  // Use IntersectionObserver to detect when sentinel is visible (user scrolled to bottom)
  React.useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is visible, unstick the button
        setIsSticky(!entry.isIntersecting)
      },
      { 
        threshold: 0,
        rootMargin: '0px 0px 80px 0px' // Start transition slightly before reaching bottom
      }
    )
    
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])
  
  return (
    <>
      {/* Button container - sticky on mobile (until scrolled to bottom), normal on desktop */}
      <div
        className={cn(
          // Base transition for smooth unsticking
          'transition-all duration-200',
          // Mobile: fixed at bottom with styling (when sticky)
          isSticky && 'fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-[calc(1rem+env(safe-area-inset-bottom))]',
          // Mobile: normal flow (when not sticky / scrolled to bottom)
          !isSticky && 'relative bg-transparent border-0 p-0 shadow-none mt-6',
          // Tablet/Desktop: always normal positioning
          'sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:bg-transparent sm:border-0 sm:p-0 sm:shadow-none sm:pb-0 sm:mt-6',
          className
        )}
      >
        <div className="max-w-[410px] mx-auto sm:max-w-none">
          {children}
        </div>
      </div>
      
      {/* Sentinel element - when this is visible, unstick the button */}
      <div 
        ref={sentinelRef} 
        className="h-20 sm:hidden pointer-events-none" 
        aria-hidden="true" 
      />
    </>
  )
}

export default StickyButtonContainer
