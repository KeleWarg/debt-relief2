'use client'

import * as React from 'react'
import { CheckCircle2, Shield, Users, Clock } from 'lucide-react'
import { Button } from '@/components/ui'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import { MOTIVATION_LABELS } from '@/types/fa-funnel'
import { FAProgressBar } from './FAProgressBar'
import { getGapVariant } from '@/data/affirmation-gap-data'
import type { GapVariant } from '@/data/affirmation-gap-data'
import type { MotivationDriver, AgeRange } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Bar Chart — per approved mockup
// ---------------------------------------------------------------------------

const GOLD = '#F3C060'
const BLUE = '#007AC8'
const BAR_MAX_H = 220
const BAR_W = 72
const BAR_GAP = 44

interface BarChartProps {
  data: GapVariant
  stage: number
}

function GapBarChart({ data, stage }: BarChartProps) {
  const bar1H = (data.bar1Percent / 100) * BAR_MAX_H
  const bar2H = (data.bar2Percent / 100) * BAR_MAX_H

  return (
    <div className="flex flex-col items-center">
      {/* Chart area: pills on sides, bars in center */}
      <div className="flex items-end justify-center" style={{ minHeight: BAR_MAX_H + 8 }}>
        {/* Left pill */}
        <div
          className={cn(
            'flex-1 flex justify-end pr-3 transition-opacity duration-200',
            stage >= 4 ? 'opacity-100' : 'opacity-0'
          )}
          style={{ paddingBottom: bar1H - 6 }}
        >
          <span
            className="inline-block text-sm font-bold text-neutral-900 px-4 py-1 rounded-full whitespace-nowrap"
            style={{ backgroundColor: '#F8F8FA', boxShadow: 'inset 0 0 0.5px rgba(0,0,0,0.11)' }}
          >
            {data.bar1Value}
          </span>
        </div>

        {/* Bars + baseline + connectors */}
        <div className="flex-shrink-0 relative">
          <div className="flex items-end" style={{ height: BAR_MAX_H, gap: BAR_GAP }}>
            <div style={{ width: BAR_W }} className="flex flex-col justify-end h-full">
              <div
                className="w-full"
                style={{
                  backgroundColor: GOLD,
                  borderRadius: '8px 8px 0 0',
                  height: stage >= 2 ? bar1H : 0,
                  transition: 'height 400ms ease-out',
                }}
              />
            </div>
            <div style={{ width: BAR_W }} className="flex flex-col justify-end h-full">
              <div
                className="w-full"
                style={{
                  backgroundColor: BLUE,
                  borderRadius: '8px 8px 0 0',
                  height: stage >= 3 ? bar2H : 0,
                  transition: 'height 500ms ease-out',
                }}
              />
            </div>
          </div>

          {/* Baseline */}
          <div
            className="h-px -mx-4"
            style={{
              backgroundColor: '#000',
              opacity: stage >= 1 ? 1 : 0,
              transition: 'opacity 200ms ease-out',
            }}
          />

          {/* L-shaped connector lines */}
          <svg
            className={cn(
              'absolute inset-0 w-full pointer-events-none transition-opacity duration-200',
              stage >= 4 ? 'opacity-100' : 'opacity-0'
            )}
            style={{ height: BAR_MAX_H, overflow: 'visible' }}
          >
            {/* Bar 1: dot on bar surface (left edge, ~40px from top) → horizontal left → diagonal up-left to pill */}
            <circle cx={0} cy={BAR_MAX_H - bar1H + 40} r={3} fill="black" />
            <line
              x1={0}
              y1={BAR_MAX_H - bar1H + 40}
              x2={-20}
              y2={BAR_MAX_H - bar1H + 40}
              stroke="black"
              strokeWidth={1}
            />
            <line
              x1={-20}
              y1={BAR_MAX_H - bar1H + 40}
              x2={-44}
              y2={BAR_MAX_H - bar1H + 12}
              stroke="black"
              strokeWidth={1}
            />
            <circle cx={-44} cy={BAR_MAX_H - bar1H + 12} r={3} fill="black" />

            {/* Bar 2: dot on bar surface (right edge, ~40px from top) → horizontal right → diagonal up-right to pill */}
            <circle cx={BAR_W * 2 + BAR_GAP} cy={BAR_MAX_H - bar2H + 40} r={3} fill="black" />
            <line
              x1={BAR_W * 2 + BAR_GAP}
              y1={BAR_MAX_H - bar2H + 40}
              x2={BAR_W * 2 + BAR_GAP + 20}
              y2={BAR_MAX_H - bar2H + 40}
              stroke="black"
              strokeWidth={1}
            />
            <line
              x1={BAR_W * 2 + BAR_GAP + 20}
              y1={BAR_MAX_H - bar2H + 40}
              x2={BAR_W * 2 + BAR_GAP + 44}
              y2={BAR_MAX_H - bar2H + 12}
              stroke="black"
              strokeWidth={1}
            />
            <circle cx={BAR_W * 2 + BAR_GAP + 44} cy={BAR_MAX_H - bar2H + 12} r={3} fill="black" />
          </svg>
        </div>

        {/* Right pill */}
        <div
          className={cn(
            'flex-1 flex justify-start pl-3 transition-opacity duration-200',
            stage >= 4 ? 'opacity-100' : 'opacity-0'
          )}
          style={{ paddingBottom: bar2H + 8 }}
        >
          <span
            className="inline-block text-sm font-bold text-neutral-900 px-4 py-1 rounded-full whitespace-nowrap"
            style={{ backgroundColor: '#F8F8FA', boxShadow: 'inset 0 0 0.5px rgba(0,0,0,0.11)' }}
          >
            {data.bar2Value}
          </span>
        </div>
      </div>

      {/* Labels below bars */}
      <div
        className={cn(
          'flex justify-center mt-3 transition-opacity duration-200',
          stage >= 4 ? 'opacity-100' : 'opacity-0'
        )}
        style={{ gap: BAR_GAP }}
      >
        <p className="text-[13px] text-neutral-500 text-center leading-snug" style={{ width: BAR_W + 20 }}>
          {data.bar1Label}
        </p>
        <p className="text-[13px] text-neutral-500 text-center leading-snug" style={{ width: BAR_W + 20 }}>
          {data.bar2Label}
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface AffirmationMomentProps {
  motivationDriver?: MotivationDriver
  ageRange?: AgeRange
  onBack?: () => void
  onNext?: () => void
}

export function AffirmationMoment({ motivationDriver, ageRange, onBack, onNext }: AffirmationMomentProps) {
  const [stage, setStage] = React.useState(0)
  const submittedRef = React.useRef(false)

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 100),    // Header + narrative + baseline
      setTimeout(() => setStage(2), 500),    // Gold bar grows
      setTimeout(() => setStage(3), 1200),   // Blue bar grows (after 400ms + 300ms pause)
      setTimeout(() => setStage(4), 1900),   // Values + source
      setTimeout(() => setStage(5), 2100),   // Goal section + trust + CTA
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleContinue = () => {
    if (submittedRef.current) return
    submittedRef.current = true
    onNext?.()
  }

  const gapData = getGapVariant(motivationDriver, ageRange)
  const goalLabel = motivationDriver ? MOTIVATION_LABELS[motivationDriver] : ''

  if (!gapData) return null

  return (
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <FAProgressBar stepName="affirmation" onBack={onBack} />
      <div className="space-y-6 has-sticky-button mt-6">
        {/* Bar chart */}
        <GapBarChart data={gapData} stage={stage} />

        {/* Source */}
        <p
          className={cn(
            'text-[11px] text-neutral-400 text-center transition-opacity duration-200',
            stage >= 4 ? 'opacity-100' : 'opacity-0'
          )}
        >
          {gapData.source}
        </p>

        {/* Headline */}
        <h1
          className={cn(
            'font-display text-display sm:text-display-md lg:text-display-lg transition-opacity duration-200',
            stage >= 1 ? 'opacity-100' : 'opacity-0'
          )}
          style={{ color: '#1B2A4A' }}
        >
          Here&apos;s what we see for{' '}
          <span style={{ color: '#0066CC' }}>people like you.</span>
        </h1>

        {/* Your goal */}
        <div
          className={cn(
            'flex items-center gap-2 transition-opacity duration-200',
            stage >= 1 ? 'opacity-100' : 'opacity-0'
          )}
        >
          <CheckCircle2 className="w-5 h-5 text-primary-700 shrink-0" />
          <p className="text-sm font-medium text-primary-700">
            Your goal: {goalLabel}
          </p>
        </div>

        {/* Narrative */}
        <p
          className={cn(
            'text-sm text-neutral-700 leading-relaxed transition-opacity duration-200',
            stage >= 1 ? 'opacity-100' : 'opacity-0'
          )}
        >
          {gapData.narrative}
        </p>

        {/* Goal paragraph */}
        <div
          className={cn(
            'transition-all duration-200 space-y-3',
            stage >= 5 ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="w-full border-t border-neutral-200" />
          <p className="text-sm text-neutral-800 leading-relaxed">
            {gapData.goalParagraph}
          </p>
          <p className="text-sm text-neutral-500">
            Next, we&apos;ll get a sense of your financials to understand the best strategy for
            you.
          </p>
        </div>

        {/* CTA */}
        <div
          className={cn(
            'transition-all duration-200 ease-out',
            stage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          )}
        >
          <StickyButtonContainer>
            <Button variant="primary" fullWidth showTrailingIcon onClick={handleContinue}>
              Continue
            </Button>
          </StickyButtonContainer>
        </div>

        {/* Trust stats */}
        <div
          className={cn(
            'transition-all duration-200 ease-out',
            stage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          )}
        >
          <div className="grid grid-cols-3 divide-x divide-neutral-200">
            {[
              { icon: Shield, value: '100%', label: 'Free & confidential' },
              { icon: Users, value: '100K+', label: 'People matched' },
              { icon: Clock, value: '~3 min', label: 'To complete' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1.5 px-2">
                <stat.icon className="w-5 h-5 text-neutral-400" />
                <p className="text-sm font-bold text-neutral-900">{stat.value}</p>
                <p className="text-xs text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AffirmationMoment
