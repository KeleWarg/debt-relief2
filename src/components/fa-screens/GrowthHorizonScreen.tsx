'use client'

import * as React from 'react'
import { Shield, Users, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'
import { MOTIVATION_LABELS } from '@/types/fa-funnel'
import type { MotivationDriver, AgeRange, IncomeRange, SavingsRange, InvestmentObjective } from '@/types/fa-funnel'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Data model — FV calculations per screen-a-data-model.md
// ---------------------------------------------------------------------------

const SAVINGS_MIDPOINT: Record<SavingsRange, number> = {
  under_50k: 25000, '50k_150k': 100000, '150k_350k': 250000,
  '350k_750k': 550000, '750k_1.5m': 1125000, '1.5m_plus': 2000000,
}

const INCOME_MIDPOINT: Record<IncomeRange, number> = {
  under_50k: 35000, '50k_100k': 75000, '100k_150k': 125000,
  '150k_250k': 200000, '250k_500k': 375000, '500k_plus': 625000, prefer_not_to_say: 75000,
}

const SAVINGS_RATE: Record<AgeRange, number> = {
  under_30: 0.06, thirties: 0.08, forties: 0.10, fifties: 0.12, sixties: 0.05,
}

const ADVISOR_SAVINGS_RATE: Record<AgeRange, number> = {
  under_30: 0.07, thirties: 0.09, forties: 0.11, fifties: 0.13, sixties: 0.05,
}

const CURRENT_RETURN: Record<InvestmentObjective, number> = {
  growth: 0.08, balanced: 0.06, preservation: 0.045, income_generation: 0.055,
}

const ADVISOR_RETURN: Record<InvestmentObjective, number> = {
  growth: 0.10, balanced: 0.08, preservation: 0.06, income_generation: 0.07,
}

const HORIZON_YEARS: Record<AgeRange, number> = {
  under_30: 35, thirties: 30, forties: 25, fifties: 15, sixties: 20,
}

const OBJECTIVE_LABELS: Record<InvestmentObjective, string> = {
  growth: 'Long-term growth', preservation: 'Wealth preservation',
  income_generation: 'Income generation', balanced: 'Balanced growth and safety',
}

const ROTATING_HEADLINES: { line1: string; line2?: string; accent?: string }[] = [
  { line1: 'Vetted Fiduciary Advisors', line2: 'At Your Fingertips', accent: 'At Your Fingertips' },
  { line1: 'Matched to Your Goals', accent: 'Your Goals' },
  { line1: 'Free Consultation', line2: 'No Obligation', accent: 'No Obligation' },
]

const HEADLINE_ROTATE_MS = 2500
const LOADER_DURATION_MS = 10000

function calcFV(principal: number, monthlyRate: number, months: number, monthlyContrib: number): number {
  const compounded = principal * Math.pow(1 + monthlyRate, months)
  const contributions = monthlyContrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  return compounded + contributions
}

function calcDrawdownYears(principal: number, monthlyReturn: number, annualWithdrawRate: number, monthlyContrib: number): number {
  const monthlyWithdraw = (principal * annualWithdrawRate) / 12
  let balance = principal
  let months = 0
  while (balance > 0 && months < 600) {
    balance = balance * (1 + monthlyReturn) + monthlyContrib - monthlyWithdraw
    months++
  }
  return months / 12
}

function getAnchorPoints(
  principal: number, annualReturn: number, monthlyContrib: number, horizonYears: number, isDrawdown: boolean, withdrawRate?: number
): number[] {
  const pts: number[] = [principal]
  const monthlyRate = annualReturn / 12
  const quarters = [0.25, 0.5, 0.75, 1.0]

  if (isDrawdown && withdrawRate) {
    const monthlyWithdraw = (principal * withdrawRate) / 12
    for (const q of quarters) {
      const months = Math.round(horizonYears * 12 * q)
      let bal = principal
      for (let m = 0; m < months; m++) {
        bal = bal * (1 + monthlyRate) + monthlyContrib - monthlyWithdraw
        if (bal < 0) { bal = 0; break }
      }
      pts.push(bal)
    }
  } else {
    for (const q of quarters) {
      const months = Math.round(horizonYears * 12 * q)
      pts.push(calcFV(principal, monthlyRate, months, monthlyContrib))
    }
  }
  return pts
}

function displayRange(value: number): string {
  const low = value * 0.9
  const high = value * 1.1
  return `${formatDollar(low)}–${formatDollar(high)}`
}

function formatDollar(n: number): string {
  if (n >= 5000000) return `$${(Math.round(n / 250000) * 250000 / 1000000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1000000) return `$${(Math.round(n / 100000) * 100000 / 1000000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 500000) return `$${Math.round(n / 50000) * 50}K`
  if (n >= 100000) return `$${Math.round(n / 25000) * 25}K`
  return `$${Math.round(n / 10000) * 10}K`
}

interface GraphData {
  currentPoints: number[]
  advisorPoints: number[]
  horizonYears: number
  currentEndLabel: string
  advisorEndLabel: string
  isDrawdown: boolean
}

function computeGraphData(
  savings: SavingsRange, income: IncomeRange, age: AgeRange, objective: InvestmentObjective
): GraphData {
  const principal = SAVINGS_MIDPOINT[savings]
  const incomeMid = INCOME_MIDPOINT[income]
  const horizon = HORIZON_YEARS[age]
  const isDrawdown = age === 'sixties'

  const currentContrib = (incomeMid * SAVINGS_RATE[age]) / 12
  const advisorContrib = (incomeMid * ADVISOR_SAVINGS_RATE[age]) / 12

  const currentPts = getAnchorPoints(principal, CURRENT_RETURN[objective], currentContrib, horizon, isDrawdown, isDrawdown ? 0.04 : undefined)
  const advisorPts = getAnchorPoints(principal, ADVISOR_RETURN[objective], advisorContrib, horizon, isDrawdown, isDrawdown ? 0.035 : undefined)

  let currentEndLabel: string
  let advisorEndLabel: string

  if (isDrawdown) {
    const currentYears = calcDrawdownYears(principal, CURRENT_RETURN[objective] / 12, 0.04, currentContrib)
    const advisorYears = calcDrawdownYears(principal, ADVISOR_RETURN[objective] / 12, 0.035, advisorContrib)
    const currentAge = 65 + Math.round(currentYears)
    const advisorAge = 65 + Math.round(advisorYears)
    currentEndLabel = `Runs out at ${currentAge}`
    advisorEndLabel = advisorAge >= 95 ? 'Lasts past 95' : `Lasts to ${advisorAge}`
  } else {
    currentEndLabel = displayRange(currentPts[4])
    advisorEndLabel = displayRange(advisorPts[4])
  }

  return { currentPoints: currentPts, advisorPoints: advisorPts, horizonYears: horizon, currentEndLabel, advisorEndLabel, isDrawdown }
}

// ---------------------------------------------------------------------------
// SVG Graph
// ---------------------------------------------------------------------------

const VB_W = 520
const VB_H = 240
const PAD = { top: 30, right: 110, bottom: 40, left: 10 }
const INNER_W = VB_W - PAD.left - PAD.right
const INNER_H = VB_H - PAD.top - PAD.bottom

function pointsToSvg(values: number[], maxVal: number): { path: string; endY: number } {
  const coords = values.map((v, i) => {
    const x = PAD.left + (i / (values.length - 1)) * INNER_W
    const y = PAD.top + INNER_H - (Math.max(0, v) / maxVal) * INNER_H
    return { x, y }
  })

  let d = `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1]
    const curr = coords[i]
    const cpx = (prev.x + curr.x) / 2
    d += ` C ${cpx.toFixed(1)} ${prev.y.toFixed(1)}, ${cpx.toFixed(1)} ${curr.y.toFixed(1)}, ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`
  }

  return { path: d, endY: coords[coords.length - 1].y }
}

interface GraphProps {
  data: GraphData
  animate: boolean
}

function HorizonGraph({ data, animate }: GraphProps) {
  const allVals = [...data.advisorPoints, ...data.currentPoints]
  const maxVal = Math.max(...allVals) * 1.1

  const advisor = pointsToSvg(data.advisorPoints, maxVal)
  const current = pointsToSvg(data.currentPoints, maxVal)

  const lastAdvisor = data.advisorPoints[data.advisorPoints.length - 1]
  const lastCurrent = data.currentPoints[data.currentPoints.length - 1]
  const areaPath = advisor.path +
    ` L ${PAD.left + INNER_W} ${PAD.top + INNER_H} L ${PAD.left} ${PAD.top + INNER_H} Z`

  const clipId = React.useId()
  const [revealed, setRevealed] = React.useState(false)
  const [showLabels, setShowLabels] = React.useState(false)

  React.useEffect(() => {
    if (!animate) return
    const t1 = setTimeout(() => setRevealed(true), 200)
    const t2 = setTimeout(() => setShowLabels(true), 1200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [animate])

  return (
    <div className="p-4 sm:p-6 rounded-lg" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full">
        <defs>
          <clipPath id={clipId}>
            <rect
              x={PAD.left}
              y={0}
              height={VB_H}
              width={revealed ? INNER_W + PAD.right : 0}
              style={{ transition: 'width 800ms ease-out' }}
            />
          </clipPath>
        </defs>

        {/* Gap fill between lines */}
        <path
          d={areaPath}
          fill="#FFB934"
          style={{ opacity: showLabels ? 0.12 : 0, transition: 'opacity 200ms ease-out' }}
        />

        {/* Lines */}
        <g clipPath={`url(#${clipId})`}>
          <path d={current.path} fill="none" stroke="white" strokeWidth="2" strokeDasharray="6 4" />
          <path d={advisor.path} fill="none" stroke="#FFB934" strokeWidth="3" />
        </g>

        {/* X-axis */}
        <line x1={PAD.left} y1={PAD.top + INNER_H} x2={PAD.left + INNER_W} y2={PAD.top + INNER_H} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <text x={PAD.left} y={PAD.top + INNER_H + 20} fontSize="11" fill="rgba(255,255,255,0.5)">Now</text>
        <text x={PAD.left + INNER_W} y={PAD.top + INNER_H + 20} textAnchor="end" fontSize="11" fill="rgba(255,255,255,0.5)">
          {data.horizonYears} years
        </text>

        {/* Endpoint labels */}
        <g style={{ opacity: showLabels ? 1 : 0, transition: 'opacity 200ms ease-out' }}>
          <text x={PAD.left + INNER_W + 8} y={advisor.endY + 4} fontSize="12" fontWeight="600" fill="#FFB934">
            {data.advisorEndLabel}
          </text>
          <text x={PAD.left + INNER_W + 8} y={current.endY + 4} fontSize="11" fill="white">
            {data.currentEndLabel}
          </text>
        </g>

        {/* Legend */}
        <line x1={PAD.left} y1={PAD.top - 14} x2={PAD.left + 20} y2={PAD.top - 14} stroke="#FFB934" strokeWidth="3" />
        <text x={PAD.left + 24} y={PAD.top - 10} fontSize="10" fill="#FFB934">With advisor</text>
        <line x1={PAD.left + 120} y1={PAD.top - 14} x2={PAD.left + 140} y2={PAD.top - 14} stroke="white" strokeWidth="2" strokeDasharray="4 3" />
        <text x={PAD.left + 144} y={PAD.top - 10} fontSize="10" fill="white">Current path</text>
      </svg>

      <p className="text-xs mt-2" style={{ color: 'white', fontStyle: 'italic' }}>
        Based on your inputs and published averages for savings rates and historical returns. Not a projection or guarantee. Individual results vary.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Profile Summary
// ---------------------------------------------------------------------------

function getAgeLabel(age?: AgeRange): string {
  const map: Record<AgeRange, string> = { under_30: 'Under 30', thirties: '30s', forties: '40s', fifties: '50s', sixties: '60s+' }
  return age ? map[age] : ''
}

function getIncomeLabel(income?: IncomeRange): string {
  const map: Record<string, string> = {
    under_50k: 'Under $50K', '50k_100k': '$50K–$100K', '100k_150k': '$100K–$150K',
    '150k_250k': '$150K–$250K', '250k_500k': '$250K–$500K', '500k_plus': '$500K+',
  }
  return income ? map[income] ?? '' : ''
}

function getSavingsLabel(savings?: SavingsRange): string {
  const map: Record<string, string> = {
    under_50k: 'Under $50K', '50k_150k': '$50K–$150K', '150k_350k': '$150K–$350K',
    '350k_750k': '$350K–$750K', '750k_1.5m': '$750K–$1.5M', '1.5m_plus': '$1.5M+',
  }
  return savings ? map[savings] ?? '' : ''
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface GrowthHorizonScreenProps {
  motivationDriver?: MotivationDriver
  ageRange?: AgeRange
  incomeRange?: IncomeRange
  savingsRange?: SavingsRange
  investmentObjective?: InvestmentObjective
  onBack?: () => void
  onNext?: (email?: string) => void
  /** When false, the "Save your progress?" email modal is not shown. Use for the duplicate step before email. */
  showSaveProgressModal?: boolean
  /** 'original' = first step (graph + static profile). 'duplicate' = step before email (loader-style: rotating headlines, media placeholder, animated checklist). */
  variant?: 'original' | 'duplicate'
  /** Optional image or video URL for the media container (duplicate variant only). */
  mediaSrc?: string
  /** 'image' | 'video' — how to render mediaSrc. Default 'image'. */
  mediaType?: 'image' | 'video'
}

export function GrowthHorizonScreen({
  motivationDriver, ageRange, incomeRange, savingsRange, investmentObjective, onBack, onNext,
  showSaveProgressModal = true,
  variant = 'original',
  mediaSrc,
  mediaType = 'image',
}: GrowthHorizonScreenProps) {
  const [stage, setStage] = React.useState(0)
  const [headlineIndex, setHeadlineIndex] = React.useState(0)
  const [checklistStep, setChecklistStep] = React.useState(0)
  const [showModal, setShowModal] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState<string | null>(null)

  const isDuplicate = variant === 'duplicate'

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 100),
      setTimeout(() => setStage(2), 1800),
      setTimeout(() => setStage(3), 2100),
      ...(showSaveProgressModal ? [setTimeout(() => setShowModal(true), 4000)] : []),
    ]
    return () => timers.forEach(clearTimeout)
  }, [showSaveProgressModal])

  // Rotating headline (duplicate only): show each line once, then hold until loader completes.
  React.useEffect(() => {
    if (!isDuplicate || stage < 1) return
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => {
        const next = Math.min(prev + 1, ROTATING_HEADLINES.length - 1)
        if (next === ROTATING_HEADLINES.length - 1) {
          clearInterval(interval)
        }
        return next
      })
    }, HEADLINE_ROTATE_MS)
    return () => {
      clearInterval(interval)
    }
  }, [isDuplicate, stage])

  // Animated checklist (duplicate only): advance every 1.2s when profile section is visible (stage >= 2)
  React.useEffect(() => {
    if (!isDuplicate || stage < 2) return
    const interval = setInterval(() => {
      setChecklistStep((prev) => (prev >= 4 ? prev : prev + 1))
    }, 1200)
    return () => clearInterval(interval)
  }, [isDuplicate, stage])

  const handleSaveEmail = () => {
    const trimmed = email.trim()
    if (!trimmed) { setEmailError('Please enter your email'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) { setEmailError('Please enter a valid email'); return }
    setEmailError(null)
    setShowModal(false)
    onNext?.(trimmed)
  }

  const handleSkip = () => {
    setShowModal(false)
  }

  const handleContinue = () => {
    setShowModal(false)
    onNext?.()
  }

  const goalLabel = motivationDriver ? MOTIVATION_LABELS[motivationDriver] : ''
  const objectiveLabel = investmentObjective ? OBJECTIVE_LABELS[investmentObjective] : ''

  const graphData = (savingsRange && incomeRange && ageRange && investmentObjective)
    ? computeGraphData(savingsRange, incomeRange, ageRange, investmentObjective)
    : null

  const profileRows = [
    { label: 'Goal', value: goalLabel },
    { label: 'Age', value: getAgeLabel(ageRange) },
    { label: 'Income', value: getIncomeLabel(incomeRange) },
    { label: 'Savings', value: getSavingsLabel(savingsRange) },
    { label: 'Objective', value: objectiveLabel },
  ]

  const checklistCopy = [
    `Matching advisors to your goal — ${goalLabel || '...'}`,
    `Confirming availability for your age — ${getAgeLabel(ageRange) || '...'}`,
    `Aligning with your income profile — ${getIncomeLabel(incomeRange) || '...'}`,
    `Reviewing your savings profile — ${getSavingsLabel(savingsRange) || '...'}`,
    `Matching your investment objective — ${objectiveLabel || '...'}`,
  ]

  return (
    <div
      className="relative min-h-screen -mt-[120px] pt-[120px] overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #203070 0%, #1A3B9A 100%)' }}
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 96px,rgba(255,255,255,0.03) 96px,rgba(255,255,255,0.03) 97px),repeating-linear-gradient(90deg,transparent,transparent 96px,rgba(255,255,255,0.03) 96px,rgba(255,255,255,0.03) 97px)`,
        }}
      />
    <div className="relative z-10 w-full max-w-content mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="space-y-6 has-sticky-button mt-6">
        {/* Headline: original = static; duplicate = rotating */}
        <h1
          className={cn(
            'font-display text-headline-lg sm:text-display lg:text-display-md transition-opacity duration-300',
            stage >= 1 ? 'opacity-100' : 'opacity-0'
          )}
          style={{ color: 'white' }}
        >
          {isDuplicate ? (
            (() => {
              const h = ROTATING_HEADLINES[headlineIndex]
              if (h.line2) {
                return (
                  <>
                    {h.line1}
                    <br />
                    <span style={{ color: '#FFB934' }}>{h.line2}</span>
                  </>
                )
              }
              return (
                <>
                  {h.accent ? (
                    <>
                      {h.line1.replace(h.accent, '').trim()}{' '}
                      <span style={{ color: '#FFB934' }}>{h.accent}</span>
                    </>
                  ) : (
                    h.line1
                  )}
                </>
              )
            })()
          ) : (
            <>
              From your profile so far, and your goals, here is your{' '}
              <span style={{ color: '#FFB934' }}>growth horizon with an advisor.</span>
            </>
          )}
        </h1>

        {/* Original: graph. Duplicate: image/video placeholder */}
        {isDuplicate ? (
          <div
            className={cn(
              'w-full flex items-center justify-center overflow-hidden transition-opacity duration-200',
              stage >= 1 ? 'opacity-100' : 'opacity-0'
            )}
            style={{ minHeight: 320 }}
          >
            <div className="w-full aspect-video max-w-3xl rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
              {mediaSrc ? (
                mediaType === 'video' ? (
                  <video
                    src={mediaSrc}
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                    loop
                    autoPlay
                  />
                ) : (
                  <img src={mediaSrc} alt="" className="w-full h-full object-cover" />
                )
              ) : (
                <span className="text-sm text-white/40">Image or video placeholder</span>
              )}
            </div>
          </div>
        ) : (
          graphData && (
            <div className={cn('transition-opacity duration-200', stage >= 1 ? 'opacity-100' : 'opacity-0')}>
              <HorizonGraph data={graphData} animate={stage >= 1} />
            </div>
          )
        )}

        {/* Original: static profile. Duplicate: animated checklist */}
        {isDuplicate ? (
          <div className={cn('transition-opacity duration-300', stage >= 2 ? 'opacity-100' : 'opacity-0')}>
            <p className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: 'white' }}>
              Finding your match
            </p>
            <div className="space-y-3 flex flex-col items-start">
              {checklistCopy.map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  {i < checklistStep ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#22C55E', fill: '#22C55E' }} />
                  ) : i === checklistStep ? (
                    <div
                      className="w-5 h-5 rounded-full border-2 flex-shrink-0 animate-spin"
                      style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#FFB934' }}
                    />
                  ) : (
                    <div
                      className="w-5 h-5 rounded-full border-2 flex-shrink-0"
                      style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                    />
                  )}
                  <span
                    style={{
                      fontSize: '16px',
                      color: i > checklistStep ? 'rgba(255,255,255,0.5)' : 'white',
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={cn('transition-opacity duration-300', stage >= 2 ? 'opacity-100' : 'opacity-0')}>
            <p className="text-sm font-medium uppercase tracking-wider" style={{ color: 'white' }}>
              Your financial profile
            </p>
            <div className="w-full border-t my-4" style={{ borderColor: 'white' }} />
            <div className="space-y-3">
              {profileRows.map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span style={{ fontSize: '16px', color: 'white' }}>{row.label}</span>
                  <span style={{ fontSize: '16px', fontWeight: 500, color: 'white' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div
          className={cn('w-full border-t transition-opacity duration-200', stage >= 2 ? 'opacity-100' : 'opacity-0')}
          style={{ borderColor: 'white' }}
        />

        {/* Continue button — original only; duplicate relies on progress bar loader */}
        {!isDuplicate && (
          <div className={cn('transition-opacity duration-200', stage >= 3 ? 'opacity-100' : 'opacity-0')}>
            <StickyButtonContainer>
              <Button variant="primary" fullWidth showTrailingIcon onClick={handleContinue}>
                Continue
              </Button>
            </StickyButtonContainer>
          </div>
        )}
      </div>

      {/* Email Save Modal — only on original growth horizon, not the duplicate before email */}
      {showSaveProgressModal && showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={handleSkip} />
          <div
            className="relative bg-white rounded-2xl max-w-[900px] w-full flex flex-col md:flex-row overflow-hidden animate-slide-up"
            style={{ maxHeight: '90vh' }}
          >
            {/* Left: Mini graph */}
            {graphData && (
              <div className="hidden md:block md:w-[40%] p-6" style={{ backgroundColor: '#F8F8FA', borderRadius: '16px 0 0 16px' }}>
                <HorizonGraph data={graphData} animate={false} />
              </div>
            )}

            {/* Right: Email save */}
            <div className="flex-1 p-8 flex flex-col">
              <h2 className="font-display text-2xl mb-2" style={{ color: '#1B2A4A' }}>
                Save your progress?
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#666666' }}>
                You&apos;re halfway there. Enter your email to pick up where you left off anytime.
              </p>

              <div className="space-y-3 mb-6">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(null) }}
                  className="w-full h-12 px-4 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  style={{ borderColor: emailError ? '#EB4015' : '#E0E0E0' }}
                />
                {emailError && (
                  <p className="text-xs text-feedback-error">{emailError}</p>
                )}
              </div>

              <Button variant="primary" fullWidth onClick={handleSaveEmail}>
                Save &amp; Continue
              </Button>

              <button
                type="button"
                onClick={handleSkip}
                className="mt-3 text-sm text-center w-full py-2"
                style={{ color: '#999999' }}
              >
                Skip for now
              </button>

              <div className="border-t mt-6 pt-4" style={{ borderColor: '#E0E0E0' }}>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { icon: Shield, value: '100%', label: 'Free & confidential' },
                    { icon: Users, value: '100K+', label: 'People matched' },
                    { icon: Clock, value: '~3 min', label: 'To complete' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <stat.icon className="w-4 h-4 mx-auto mb-1 text-neutral-400" />
                      <p className="text-xs font-bold" style={{ color: '#1B2A4A' }}>{stat.value}</p>
                      <p className="text-[10px]" style={{ color: '#999999' }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[11px] mt-3 text-center" style={{ color: '#999999' }}>
                We&apos;ll send a link so you can pick up where you left off. We won&apos;t share your email.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default GrowthHorizonScreen
