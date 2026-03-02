'use client'

import * as React from 'react'
import { Button } from '@/components/ui/Button'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import { USMap } from '@/components/ui/USMap'
import type { MotivationDriver, Homeownership, FAFunnelData } from '@/types/fa-funnel'
import { getStateFromZip } from '@/lib/zip-lookup'
import { getAdvisorContext } from '@/data/stateAdvisorContext'
import { cn } from '@/lib/utils'

const BLUE = '#0066CC'

const ZIP_CONTENT: Record<MotivationDriver, {
  headline: React.ReactNode
  subCopy: string
}> = {
  behind_retirement: {
    headline: <>Two more to go (3/4).<br /><span style={{ color: BLUE }}>Let{'\u2019'}s check advisor availability</span> in your area.</>,
    subCopy: 'State tax rules affect your catch-up strategy. Your location helps us match smarter.',
  },
  family_protection: {
    headline: <>Two more to go (3/4).<br /><span style={{ color: BLUE }}>Let{'\u2019'}s check advisor availability</span> in your area.</>,
    subCopy: 'Estate and insurance laws vary by state. Your location ensures we match you with a licensed advisor.',
  },
  windfall: {
    headline: <>Two more to go (3/4).<br /><span style={{ color: BLUE }}>Let{'\u2019'}s check advisor availability</span> in your area.</>,
    subCopy: 'State tax rules can significantly impact how new wealth is positioned. Your ZIP helps us account for that.',
  },
  optimization: {
    headline: <>Two more to go (3/4).<br /><span style={{ color: BLUE }}>Let{'\u2019'}s check advisor availability</span> in your area.</>,
    subCopy: 'State tax rules affect your optimization strategy. Your ZIP helps us find the right fit.',
  },
  plan_review: {
    headline: <>Two more to go (3/4).<br /><span style={{ color: BLUE }}>Let{'\u2019'}s check advisor availability</span> in your area.</>,
    subCopy: 'This ensures your advisor is licensed in your state and easy to reach when you need them.',
  },
}

function ZipStateBadge({ zip }: { zip: string }) {
  const state = React.useMemo(() => getStateFromZip(zip), [zip])
  const isComplete = zip.length === 5

  if (zip.length < 3) return null

  if (isComplete && !state) {
    return (
      <span
        className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
        style={{ color: '#EB4015', backgroundColor: '#FEF2F0' }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
          <path d="M6 3.5V6.5M6 8V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        Invalid
      </span>
    )
  }

  if (!state) return null

  if (!isComplete) {
    return (
      <span
        className="text-xs font-medium px-2.5 py-1 rounded-full"
        style={{ color: '#666666', backgroundColor: '#F2F2F2' }}
      >
        {state.name}
      </span>
    )
  }

  return (
    <span
      className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
      style={{ color: '#0B6E4F', backgroundColor: '#ECFDF5' }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3.5 7.5L5.5 9.5L10.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {state.name}
    </span>
  )
}

interface ZipCodeScreenProps {
  initialValue?: string
  homeownership?: Homeownership
  motivationDriver?: MotivationDriver
  funnelData?: FAFunnelData
  onBack?: () => void
  onSubmit?: (zip: string, derivedState?: string) => void
}

export function ZipCodeScreen({
  initialValue,
  homeownership,
  motivationDriver,
  funnelData,
  onBack,
  onSubmit,
}: ZipCodeScreenProps) {
  const [zip, setZip] = React.useState(initialValue ?? '')
  const [error, setError] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const resolvedState = React.useMemo(() => getStateFromZip(zip), [zip])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5)
    setZip(value)
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^\d{5}$/.test(zip)) {
      setError('Please enter a valid ZIP code')
      return
    }
    const state = getStateFromZip(zip)
    if (!state) {
      setError('Please enter a valid ZIP code')
      return
    }
    onSubmit?.(zip, state.abbr)
  }

  const content = motivationDriver ? ZIP_CONTENT[motivationDriver] : null
  const isStateResolved = zip.length === 5 && resolvedState !== null
  const advisorContext = isStateResolved ? getAdvisorContext(resolvedState!.abbr) : null
  const guidanceText = advisorContext ? advisorContext.guidance : content?.subCopy ?? ''
  const guidanceKey = isStateResolved ? resolvedState!.abbr : 'default'

  return (
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
        {/* Section label */}
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Your life situation
        </p>

        {/* Headline */}
        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          {content?.headline ?? <>Two more to go (3/4).<br /><span style={{ color: BLUE }}>Let{'\u2019'}s check advisor availability in your area.</span></>}
        </h1>

        {/* Input */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="animate-fade-in-up relative" style={{ animationDelay: '500ms' }}>
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              placeholder="ZIP code"
              value={zip}
              onChange={handleChange}
              maxLength={5}
              className={cn(
                'w-full bg-white outline-none transition-colors duration-150',
                error
                  ? 'border-[#EB4015] focus:border-[#EB4015]'
                  : 'border-[#E0E0E0] focus:border-[#0066CC]'
              )}
              style={{
                height: '48px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '8px',
                padding: '0 16px',
                paddingRight: resolvedState || (zip.length === 5) ? '140px' : '16px',
                fontSize: '16px',
                color: '#1B2A4A',
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
              <ZipStateBadge zip={zip} />
            </div>
            {error && (
              <p className="mt-2" style={{ fontSize: '14px', color: '#EB4015' }}>
                {error}
              </p>
            )}
          </div>

          {guidanceText && (
            <p
              key={guidanceKey}
              className={cn('mt-4', isStateResolved ? 'animate-fade-in' : 'animate-fade-in-up')}
              style={{ animationDelay: isStateResolved ? '0ms' : '600ms', fontSize: '14px', color: '#666666' }}
            >
              {guidanceText}
            </p>
          )}

          <div className="animate-fade-in-up mt-6" style={{ animationDelay: '600ms' }}>
            <StickyButtonContainer>
              <Button type="submit" fullWidth showTrailingIcon disabled={zip.length !== 5}>
                Continue
              </Button>
            </StickyButtonContainer>
          </div>

          {isStateResolved && resolvedState && (
            <div className="mt-8 animate-fade-in">
              <USMap
                selectedState={resolvedState.name}
                hoveredState={null}
                onStateSelect={() => {}}
                onStateHover={() => {}}
                className="w-full max-w-[560px]"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default ZipCodeScreen
