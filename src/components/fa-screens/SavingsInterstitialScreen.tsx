'use client'

import * as React from 'react'
import Image from 'next/image'
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
  motivationDriver?: MotivationDriver
  ageRange?: AgeRange
  incomeRange?: IncomeRange
  onBack?: () => void
  onNext?: () => void
}

export function SavingsInterstitialScreen({
  savingsRange,
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

  const savingsLabel = getSavingsLabel(savingsRange)
  const avgSavings = ageRange ? AVG_SAVINGS_BY_AGE[ageRange] ?? '$100K' : '$100K'
  const goalLine = motivationDriver ? GOAL_COPY[motivationDriver] : ''

  return (
    <div
      className="relative min-h-screen -mt-[120px] pt-[120px] overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 py-12"
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

      <div className="relative z-10 w-full max-w-[700px] flex flex-col items-center gap-8 text-center">
        {/* Headline */}
        <div
          className="transition-all duration-500"
          style={{ opacity: stage >= 1 ? 1 : 0, transform: stage >= 1 ? 'translateY(0)' : 'translateY(12px)' }}
        >
          <h1
            className="font-display text-[36px] sm:text-[44px] lg:text-[48px] font-bold leading-tight"
            style={{ color: 'white' }}
          >
            We can work with your savings of{' '}
            <span style={{ color: '#FFB934' }}>{savingsLabel}.</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'white' }}>
            The average savings for your age and income is {avgSavings}.
            <br />
            {goalLine}
          </p>
        </div>

        {/* RECOMMENDED badge */}
        <div
          className="transition-all duration-700"
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
          className="text-lg leading-relaxed transition-all duration-500"
          style={{
            color: 'white',
            opacity: stage >= 3 ? 1 : 0,
            transform: stage >= 3 ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          We helped 100K+ people save millions
        </p>

        {/* CTA */}
        <div
          className="w-full max-w-[410px] transition-all duration-500"
          style={{
            opacity: stage >= 4 ? 1 : 0,
            transform: stage >= 4 ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          <StickyButtonContainer>
            <Button
              variant="secondary"
              fullWidth
              showTrailingIcon
              onClick={handleContinue}
            >
              Continue
            </Button>
          </StickyButtonContainer>
        </div>

        {/* Partner logos */}
        <div
          className="flex items-center justify-center gap-10 sm:gap-14 mt-4 transition-opacity duration-500"
          style={{ opacity: stage >= 4 ? 0.5 : 0 }}
        >
          <Image src="/forbes-advisor-logo.svg" alt="Forbes Advisor" width={115} height={36} unoptimized className="brightness-0 invert opacity-70" />
          <Image src="/logo-embrace.svg" alt="Partner" width={65} height={36} unoptimized className="brightness-0 invert opacity-70" />
          <Image src="/logo-fetch.svg" alt="Partner" width={65} height={36} unoptimized className="brightness-0 invert opacity-70" />
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
