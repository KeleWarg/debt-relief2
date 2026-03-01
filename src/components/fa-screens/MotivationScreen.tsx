'use client'

import * as React from 'react'
import { HeroLayout } from '@/components/layout/HeroLayout'
import { Button } from '@/components/ui/Button'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import { FAProgressBar } from './FAProgressBar'
import { MOTIVATION_OPTIONS, AGE_OPTIONS } from '@/types/fa-funnel'
import type { MotivationDriver, AgeRange } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

const AGE_CONTENT: Record<string, {
  confirmation: string
  headline: [string, string]
  subCopy: string
}> = {
  behind_retirement: {
    confirmation: 'Got it! You want to catch up on retirement.',
    headline: ['Your age is your runway.', "And there's more of it than you think."],
    subCopy: 'Your age tells an advisor how much runway you have, and which strategies will close the gap fastest.',
  },
  family_protection: {
    confirmation: 'Got it! You want to protect your family.',
    headline: ['Your age shapes the plan.', 'And right now is the best time to build one.'],
    subCopy: 'Your age tells an advisor what type of coverage and estate planning makes the most sense right now.',
  },
  windfall: {
    confirmation: "Got it! You're managing new wealth.",
    headline: ['Your age decides the strategy.', 'And yours opens up the most options.'],
    subCopy: 'Your age tells an advisor how to balance growing this money with protecting it.',
  },
  optimization: {
    confirmation: 'Got it! You want to optimize your finances.',
    headline: ['Your age unlocks the levers.', 'And every year you act earlier compounds.'],
    subCopy: 'Your age tells an advisor which tax and investment strategies will have the biggest impact.',
  },
  plan_review: {
    confirmation: 'Got it! You want a professional review.',
    headline: ['Your age sets the priorities.', 'And knowing them is half the work.'],
    subCopy: 'Your age tells an advisor which parts of your plan to stress-test first.',
  },
}

type Phase = 'motivation' | 'age'

const PHASE_CONTENT = {
  motivation: {
    headline: <>You deserve a plan that works as hard as you do.</>,
    sub: "What matters most to you right now?",
  },
  age: {
    headline: <>How old are you?</>,
    sub: "Advisors typically assess strategies by your financial horizon which is determined by your age.",
  },
} as const

interface MotivationScreenProps {
  initialMotivation?: MotivationDriver
  initialAge?: AgeRange
  onSubmit?: (motivation: MotivationDriver, age: AgeRange) => void
  onPhaseChange?: (phase: 'motivation' | 'age') => void
}

type LayoutTransition = 'idle' | 'exiting' | 'pre-enter' | 'entering'

const LAYOUT_EXIT_MS = 350
const LAYOUT_ENTER_MS = 450

export function MotivationScreen({ initialMotivation, initialAge, onSubmit, onPhaseChange }: MotivationScreenProps) {
  const [phase, setPhase] = React.useState<Phase>(initialMotivation ? 'age' : 'motivation')
  const [motivationValue, setMotivationValue] = React.useState<string>(initialMotivation ?? '')
  const [ageValue, setAgeValue] = React.useState<string>(initialAge ?? '')
  const submittedRef = React.useRef(false)

  const [layoutTransition, setLayoutTransition] = React.useState<LayoutTransition>('idle')
  const pendingPhase = React.useRef<Phase | null>(null)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    onPhaseChange?.(phase)
  }, [phase, onPhaseChange])

  React.useEffect(() => {
    if (layoutTransition === 'exiting') {
      timerRef.current = setTimeout(() => {
        if (pendingPhase.current) {
          setPhase(pendingPhase.current)
          pendingPhase.current = null
        }
        setLayoutTransition('pre-enter')
      }, LAYOUT_EXIT_MS)
    } else if (layoutTransition === 'pre-enter') {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => {
          setLayoutTransition('entering')
        })
      })
    } else if (layoutTransition === 'entering') {
      timerRef.current = setTimeout(() => setLayoutTransition('idle'), LAYOUT_ENTER_MS)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [layoutTransition])

  const crossfadeTo = (nextPhase: Phase) => {
    pendingPhase.current = nextPhase
    setLayoutTransition('exiting')
  }

  const handleMotivationSelect = (value: string) => {
    setMotivationValue(value)
    setTimeout(() => crossfadeTo('age'), 500)
  }

  const handleAgeSelect = (value: string) => {
    setAgeValue(value)
    setTimeout(() => {
      if (submittedRef.current) return
      submittedRef.current = true
      onSubmit?.(motivationValue as MotivationDriver, value as AgeRange)
    }, 300)
  }

  const handleBack = () => {
    if (phase === 'age') {
      crossfadeTo('motivation')
    }
  }

  const opacityStyle: React.CSSProperties = (() => {
    switch (layoutTransition) {
      case 'exiting':
        return {
          opacity: 0,
          transition: `opacity ${LAYOUT_EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }
      case 'pre-enter':
        return { opacity: 0, transition: 'none' }
      case 'entering':
        return {
          opacity: 1,
          transition: `opacity ${LAYOUT_ENTER_MS}ms cubic-bezier(0, 0, 0.2, 1)`,
        }
      default:
        return { opacity: 1 }
    }
  })()


  const motivationContent = (
    <div>
      <div className="mt-6">
        <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 mb-3">
          {PHASE_CONTENT.motivation.headline}
        </h1>
        <p className="text-body text-neutral-500 mb-8">
          {PHASE_CONTENT.motivation.sub}
        </p>
      </div>
      <MotivationOptions
        selected={motivationValue}
        onSelect={handleMotivationSelect}
            onContinue={() => motivationValue && crossfadeTo('age')}
      />
    </div>
  )

  const ageData = AGE_CONTENT[motivationValue]

  const ageContent = (
    <div className="flex flex-col items-start w-full">
      {/* Zone 1: Confirmation */}
      {ageData && (
        <>
          <div className="animate-fade-in-up mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0B6E4F' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <p
            className="animate-fade-in-up font-sans text-lg font-bold mb-2"
            style={{ animationDelay: '200ms', color: '#1B2A4A' }}
          >
            {ageData.confirmation}
          </p>
        </>
      )}

      {/* Divider */}
      <div
        className="animate-fade-in-up w-full border-t mb-6 mt-4"
        style={{ animationDelay: '300ms', borderColor: '#E0E0E0' }}
      />

      {/* Zone 2: Question */}
      <p
        className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
        style={{ animationDelay: '400ms' }}
      >
        Let&apos;s understand you
      </p>
      {ageData && (
        <h1
          className="animate-fade-in-up font-display text-display sm:text-display-md lg:text-display-lg mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          {ageData.headline[0]}{' '}
          <span style={{ color: '#0066CC' }}>{ageData.headline[1]}</span>
        </h1>
      )}
      {ageData && (
        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          {ageData.subCopy}
        </p>
      )}
      <AgeOptions
        selected={ageValue}
        motivation={motivationValue}
        onSelect={handleAgeSelect}
        onContinue={() => {
          if (ageValue && !submittedRef.current) {
            submittedRef.current = true
            onSubmit?.(motivationValue as MotivationDriver, ageValue as AgeRange)
          }
        }}
        onBack={handleBack}
      />
    </div>
  )

  if (phase === 'motivation') {
    return (
      <div style={opacityStyle} className="h-full">
        <HeroLayout showChrome={false}>{motivationContent}</HeroLayout>
      </div>
    )
  }

  return (
    <div style={opacityStyle} className="h-full w-full">
      <div className="w-full max-w-content mx-auto px-4 sm:px-6 py-8">
        <FAProgressBar stepName="age" onBack={handleBack} />
        <div className="mt-6">
          {ageContent}
        </div>
      </div>
    </div>
  )
}

function MotivationOptions({
  selected,
  onSelect,
  onContinue,
}: {
  selected: string
  onSelect: (value: string) => void
  onContinue: () => void
}) {
  return (
    <>
      <div className="flex flex-col" style={{ gap: '12px' }}>
        {MOTIVATION_OPTIONS.map((opt, i) => {
          const isSelected = selected === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={cn(
                'flex items-center gap-3 w-full bg-white border rounded-lg text-left',
                'cursor-pointer transition-all duration-200',
                isSelected
                  ? 'border-[#0066CC] bg-[#F0F7FF] shadow-sm'
                  : 'border-[#E8E8E8] hover:bg-[#F0F7FF]'
              )}
              style={{ height: '56px', paddingLeft: '16px', paddingRight: '16px' }}
            >
              <div
                className={cn(
                  'flex items-center justify-center rounded-full flex-shrink-0 text-sm font-semibold transition-colors duration-200',
                  isSelected
                    ? 'bg-[#0066CC] text-white'
                    : 'bg-[#F2F2F2] text-neutral-500'
                )}
                style={{ width: '28px', height: '28px' }}
              >
                {LETTERS[i]}
              </div>
              <span style={{ fontSize: '16px', color: '#1B2A4A' }}>
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 bg-neutral-100 rounded-lg p-4">
        <p className="text-sm text-neutral-800 leading-relaxed">
          Behind on retirement? Managing a windfall? Just want a second opinion?
          The right advisor handles all of it&nbsp;&mdash; the cost of waiting is the
          only thing they can&rsquo;t fix.
        </p>
      </div>

      <StickyButtonContainer className="mt-8">
        <Button
          onClick={onContinue}
          className="min-w-[180px]"
        >
          Continue
        </Button>
      </StickyButtonContainer>
    </>
  )
}

function AgeOptions({
  selected,
  motivation,
  onSelect,
  onContinue,
  onBack,
}: {
  selected: string
  motivation: string
  onSelect: (value: string) => void
  onContinue: () => void
  onBack: () => void
}) {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="w-full flex flex-col" style={{ gap: '12px' }}>
        {AGE_OPTIONS.map((opt, i) => {
          const isSelected = selected === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={cn(
                'animate-fade-in-up flex items-center gap-3 w-full bg-white border rounded-lg text-left',
                'cursor-pointer transition-all duration-200',
                isSelected
                  ? 'border-[#0066CC] bg-[#F0F7FF] shadow-sm'
                  : 'border-[#E8E8E8] hover:bg-[#F0F7FF]'
              )}
              style={{ animationDelay: `${500 + i * 100}ms`, height: '56px', paddingLeft: '16px', paddingRight: '16px' }}
            >
              <div
                className={cn(
                  'flex items-center justify-center rounded-full flex-shrink-0 text-sm font-semibold transition-colors duration-200',
                  isSelected
                    ? 'bg-[#0066CC] text-white'
                    : 'bg-[#F2F2F2] text-neutral-500'
                )}
                style={{ width: '28px', height: '28px' }}
              >
                {LETTERS[i]}
              </div>
              <span style={{ fontSize: '16px', color: '#1B2A4A' }}>
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>

    </div>
  )
}

export default MotivationScreen
