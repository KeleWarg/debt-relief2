'use client'

import * as React from 'react'
import { Button } from '@/components/ui'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import type { MotivationDriver, SavingsRange, AgeRange, IncomeRange } from '@/types/fa-funnel'

const GOAL_COPY: Record<MotivationDriver, string> = {
  behind_retirement: 'You are saving towards catching up on retirement.',
  family_protection: 'You are saving towards protecting your family.',
  windfall: 'You are saving towards positioning your new wealth.',
  optimization: 'You are saving towards optimizing your finances.',
  plan_review: 'You are saving towards a professional review of your plan.',
}

const AVG_SAVINGS_BY_AGE: Record<string, string> = {
  under_30: '$20K',
  thirties: '$45K',
  forties: '$100K',
  fifties: '$120K',
  sixties: '$165K',
}

const SAVINGS_DISPLAY: Record<SavingsRange, string> = {
  under_50k: '$25K',
  '50k_150k': '$100K',
  '150k_350k': '$250K',
  '350k_750k': '$500K+',
  '750k_1.5m': '$500K+',
  '1.5m_plus': '$500K+',
}

function getSavingsLabel(range?: SavingsRange): string {
  if (!range) return '$0'
  return SAVINGS_DISPLAY[range] ?? '$0'
}

interface SavingsInterstitialScreenProps {
  savingsRange?: SavingsRange
  savingsAmount?: number
  motivationDriver?: MotivationDriver
  ageRange?: AgeRange
  incomeRange?: IncomeRange
  onBack?: () => void
  onNext?: () => void
}

export function SavingsInterstitialScreen({
  savingsRange,
  savingsAmount,
  motivationDriver,
  ageRange,
  onBack,
  onNext,
}: SavingsInterstitialScreenProps) {
  const [stage, setStage] = React.useState(0)
  const submittedRef = React.useRef(false)

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 100),
      setTimeout(() => setStage(2), 600),
      setTimeout(() => setStage(3), 1200),
      setTimeout(() => setStage(4), 1800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleContinue = () => {
    if (submittedRef.current) return
    submittedRef.current = true
    onNext?.()
  }

  const savingsLabel = savingsAmount != null
    ? (savingsAmount >= 500000 ? '$500K+' : `$${Math.round(savingsAmount / 1000)}K`)
    : getSavingsLabel(savingsRange)
  const avgSavings = ageRange ? AVG_SAVINGS_BY_AGE[ageRange] ?? '$100K' : '$100K'
  const goalLine = motivationDriver ? GOAL_COPY[motivationDriver] : ''

  return (
    <div
      className="relative min-h-screen -mt-[120px] pt-[120px] overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #203070 0%, #1A3B9A 100%)' }}
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 96px,
            rgba(255,255,255,0.03) 96px,
            rgba(255,255,255,0.03) 97px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 96px,
            rgba(255,255,255,0.03) 96px,
            rgba(255,255,255,0.03) 97px
          )`,
        }}
      />

      <div className="relative z-10 w-full max-w-content mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
        <div className="flex flex-col items-start w-full">
          {/* Headline */}
          <div
            className="transition-all duration-500"
            style={{ opacity: stage >= 1 ? 1 : 0, transform: stage >= 1 ? 'translateY(0)' : 'translateY(12px)' }}
          >
            <h1
              className="font-display text-headline-lg sm:text-display lg:text-display-md font-bold leading-tight"
              style={{ color: 'white' }}
            >
              We can work with your savings of{' '}
              <span style={{ color: '#FFB934' }}>{savingsLabel}.</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
              The average savings for your age and income is {avgSavings}. {goalLine}
            </p>
          </div>

          {/* RECOMMENDED badge */}
          <div
            className="w-full flex justify-center my-8 transition-all duration-700"
            style={{ opacity: stage >= 2 ? 1 : 0, transform: stage >= 2 ? 'scale(1)' : 'scale(0.8)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Badge.svg"
              alt="Forbes Advisor Recommended"
              width={250}
              height={252}
              className="w-[200px] h-[202px] sm:w-[250px] sm:h-[252px]"
            />
          </div>

          {/* Social proof */}
          <p
            className="text-lg leading-relaxed text-center w-full transition-all duration-500"
            style={{
              color: 'rgba(255,255,255,0.8)',
              opacity: stage >= 3 ? 1 : 0,
              transform: stage >= 3 ? 'translateY(0)' : 'translateY(8px)',
            }}
          >
            We helped 100K+ people save millions
          </p>

          {/* CTA */}
          <div
            className="w-full flex justify-center mt-8 transition-all duration-500"
            style={{
              opacity: stage >= 4 ? 1 : 0,
              transform: stage >= 4 ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            <div className="w-full max-w-[410px]">
              <StickyButtonContainer>
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={handleContinue}
                >
                  Continue
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <path d="M3 12.006C3 11.6 3.329 11.271 3.735 11.271H18.492L14.486 7.266C14.199 6.979 14.199 6.513 14.486 6.227C14.773 5.94 15.238 5.94 15.525 6.227L20.774 11.476C20.778 11.479 20.781 11.483 20.785 11.486C20.872 11.573 20.933 11.677 20.967 11.787C20.97 11.796 20.972 11.805 20.975 11.813C20.989 11.867 20.998 11.923 21 11.981C21 11.989 21 11.997 21 12.006C21 12.2 20.924 12.378 20.8 12.509C20.792 12.518 20.783 12.527 20.774 12.536L15.525 17.785C15.238 18.072 14.773 18.072 14.486 17.785C14.199 17.498 14.199 17.033 14.486 16.746L18.491 12.74H3.735C3.329 12.74 3 12.412 3 12.006Z" fill="currentColor"/>
                  </svg>
                </Button>
              </StickyButtonContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MoneyStack() {
  const rows = [1, 2, 3]
  return (
    <div className="flex flex-col items-center -space-y-1">
      {rows.map((count, rowIndex) => (
        <div key={rowIndex} className="flex -space-x-2">
          {Array.from({ length: count }).map((_, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={i}
              src="/Money.svg"
              alt=""
              width={44}
              height={34}
              className="w-[44px] h-[34px]"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default SavingsInterstitialScreen
