'use client'

import * as React from 'react'
import Image from 'next/image'
import { HeroLayout } from '@/components/layout/HeroLayout'
import { MOTIVATION_OPTIONS, AGE_OPTIONS } from '@/types/fa-funnel'
import type { MotivationDriver, AgeRange } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

const ROTATING_PHRASES = [
  'as hard as you do.',
  'for your future.',
  'while you sleep.',
  'for your family.',
  'toward your goals.',
]

const TYPE_SPEED = 60
const DELETE_SPEED = 35
const PAUSE_AFTER_TYPE = 2500
const PAUSE_AFTER_DELETE = 400

function RotatingTypewriter() {
  const [phraseIndex, setPhraseIndex] = React.useState(0)
  const [displayed, setDisplayed] = React.useState('')
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    const phrase = ROTATING_PHRASES[phraseIndex]

    if (!isDeleting && displayed === phrase) {
      const t = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE)
      return () => clearTimeout(t)
    }

    if (isDeleting && displayed === '') {
      const t = setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length)
        setIsDeleting(false)
      }, PAUSE_AFTER_DELETE)
      return () => clearTimeout(t)
    }

    const speed = isDeleting ? DELETE_SPEED : TYPE_SPEED
    const t = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? phrase.slice(0, displayed.length - 1)
          : phrase.slice(0, displayed.length + 1)
      )
    }, speed)
    return () => clearTimeout(t)
  }, [displayed, isDeleting, phraseIndex])

  return (
    <span style={{ color: '#0066CC' }}>
      {displayed}
      <span
        className="inline-block w-[2px] ml-0.5 align-baseline animate-blink"
        style={{ height: '0.85em', backgroundColor: '#0066CC' }}
      />
    </span>
  )
}

const BLUE = '#0066CC'

const AGE_CONTENT: Record<string, {
  confirmation: string
  headline: React.ReactNode
  subCopy: string
}> = {
  behind_retirement: {
    confirmation: 'Got it! You want to catch up on retirement.',
    headline: <>You mentioned being worried about being behind on retirement savings. <span style={{ color: BLUE }}>Your age shapes your plan</span>, let{'\u2019'}s work together.</>,
    subCopy: 'Your age tells an advisor how much runway you have, and which strategies will close the gap fastest.',
  },
  family_protection: {
    confirmation: 'Got it! You want to protect your family.',
    headline: <>You said you want to protect your family. <span style={{ color: BLUE }}>Your age shapes your plan</span> and there{'\u2019'}s no better time than to act now.</>,
    subCopy: 'Your age tells an advisor what type of coverage and estate planning makes the most sense right now.',
  },
  windfall: {
    confirmation: "Got it! You're managing new wealth.",
    headline: <>You mentioned you{'\u2019'}ve received an unexpected income. <span style={{ color: BLUE }}>Your age shapes your plan</span> and now{'\u2019'}s the time to put that money to work.</>,
    subCopy: 'Your age tells an advisor how to balance growing this money with protecting it.',
  },
  optimization: {
    confirmation: 'Got it! You want to optimize your finances.',
    headline: <>You mentioned wanting to stop leaving money on the table. <span style={{ color: BLUE }}>Your age shapes your plan</span> and the best time to start is now.</>,
    subCopy: 'Your age tells an advisor which tax and investment strategies will have the biggest impact.',
  },
  plan_review: {
    confirmation: 'Got it! You want a professional review.',
    headline: <>You mentioned wanting a 2nd opinion on your plan. <span style={{ color: BLUE }}>Your age shapes that plan</span>, let{'\u2019'}s see what we can do together.</>,
    subCopy: 'Your age tells an advisor which parts of your plan to stress-test first.',
  },
}

type Phase = 'motivation' | 'age'

const PHASE_CONTENT = {
  motivation: {
    headline: <>You deserve a plan that works <RotatingTypewriter /></>,
    sub: "What matters most to you right now?",
  },
  age: {
    headline: <>How old are you?</>,
    sub: "Advisors typically assess strategies by your financial horizon which is determined by your age.",
  },
}

interface MotivationScreenProps {
  initialMotivation?: MotivationDriver
  initialAge?: AgeRange
  onSubmit?: (motivation: MotivationDriver, age: AgeRange) => void
  onPhaseChange?: (phase: 'motivation' | 'age') => void
  onMotivationSelect?: (motivation: MotivationDriver) => void
}

type LayoutTransition = 'idle' | 'exiting' | 'pre-enter' | 'entering'

const LAYOUT_EXIT_MS = 350
const LAYOUT_ENTER_MS = 450

export function MotivationScreen({ initialMotivation, initialAge, onSubmit, onPhaseChange, onMotivationSelect }: MotivationScreenProps) {
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
    onMotivationSelect?.(value as MotivationDriver)
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
      {/* Zone 2: Question */}
      <p
        className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
        style={{ animationDelay: '400ms' }}
      >
        Let&apos;s understand you
      </p>
      {ageData && (
        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          {ageData.headline}
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
    <div style={opacityStyle} className="w-full max-w-content mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      {ageContent}
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
              <span className="text-sm sm:text-base" style={{ color: '#1B2A4A' }}>
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 border-t border-neutral-200 pt-4">
        <div className="flex items-start gap-3">
          <Image
            src="/clock-icon.png"
            alt="Clock"
            width={64}
            height={64}
            unoptimized
            className="flex-shrink-0 animate-float"
          />
          <p className="text-sm text-neutral-800 leading-relaxed">
            Behind on retirement savings? Managing a windfall? Just want a second opinion from a professional?
            The right advisor handles all of it for you.
          </p>
        </div>
      </div>

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
