'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { GraphConfig, GraphType } from '@/data/affirmation-graph-data'

// ---------------------------------------------------------------------------
// Layout constants (SVG viewBox units)
// ---------------------------------------------------------------------------
const VB_W = 480
const VB_H = 260
const PAD = { top: 20, right: 16, bottom: 40, left: 8 }
const INNER_W = VB_W - PAD.left - PAD.right
const INNER_H = VB_H - PAD.top - PAD.bottom

const NAVY = '#1B2A4A'
const GREY = '#B0B0B0'
const LIGHT_BLUE = '#007AC8'

const NUM_POINTS = 80

// ---------------------------------------------------------------------------
// Curve generation
// ---------------------------------------------------------------------------

interface Point {
  x: number
  y: number
}

function curveValue(
  t: number,
  type: GraphType,
  start: number,
  end: number,
  runsOutAt?: number
): number {
  if (type === 'accumulation') {
    const k = 2.0
    return start + (end - start) * ((Math.exp(k * t) - 1) / (Math.exp(k) - 1))
  }

  if (runsOutAt !== undefined && t >= runsOutAt) return 0
  if (runsOutAt !== undefined) {
    const tN = t / runsOutAt
    return start * (1 - Math.pow(tN, 0.75))
  }

  if (type === 'drawdown') {
    return start - (start - end) * Math.pow(t, 1.3)
  }
  return start - (start - end) * Math.pow(t, 1.1)
}

function generatePoints(
  type: GraphType,
  startNorm: number,
  endNorm: number,
  runsOutAt?: number
): Point[] {
  const pts: Point[] = []
  for (let i = 0; i <= NUM_POINTS; i++) {
    const t = i / NUM_POINTS
    const val = curveValue(t, type, startNorm, endNorm, runsOutAt)
    pts.push({
      x: PAD.left + t * INNER_W,
      y: PAD.top + INNER_H - Math.max(0, val) * INNER_H,
    })
  }
  return pts
}

function pointsToPath(pts: Point[]): string {
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
}

function pointsToAreaPath(pts: Point[]): string {
  if (pts.length === 0) return ''
  const last = pts[pts.length - 1]
  const first = pts[0]
  const bottomY = PAD.top + INNER_H
  return (
    pointsToPath(pts) +
    ` L ${last.x.toFixed(1)} ${bottomY} L ${first.x.toFixed(1)} ${bottomY} Z`
  )
}

function gapFillPath(upper: Point[], lower: Point[]): string {
  if (upper.length === 0 || lower.length === 0) return ''
  const forward = pointsToPath(upper)
  const reversed = [...lower]
    .reverse()
    .map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ')
  return forward + ' ' + reversed + ' Z'
}

// ---------------------------------------------------------------------------
// Normalised curve parameters per graph type
// ---------------------------------------------------------------------------

function getCurveParams(type: GraphType) {
  switch (type) {
    case 'accumulation':
      return {
        withStart: 0.05,
        withEnd: 0.92,
        withoutStart: 0.05,
        withoutEnd: 0.35,
      }
    case 'drawdown':
      return {
        withStart: 0.9,
        withEnd: 0.2,
        withoutStart: 0.9,
        withoutEnd: 0,
        withoutRunsOutAt: 0.7,
      }
    case 'preservation':
      return {
        withStart: 0.85,
        withEnd: 0.6,
        withoutStart: 0.85,
        withoutEnd: 0.1,
      }
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface AdvisorComparisonChartProps {
  config: GraphConfig
  className?: string
}

export function AdvisorComparisonChart({ config, className }: AdvisorComparisonChartProps) {
  const clipId = React.useId()
  const [stage, setStage] = React.useState(0)

  React.useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 200)
    const t2 = setTimeout(() => setStage(2), 1200)
    const t3 = setTimeout(() => setStage(3), 1600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  const params = getCurveParams(config.type)
  const withPts = generatePoints(config.type, params.withStart, params.withEnd)
  const withoutPts = generatePoints(
    config.type,
    params.withoutStart,
    params.withoutEnd,
    (params as { withoutRunsOutAt?: number }).withoutRunsOutAt
  )

  const withD = pointsToPath(withPts)
  const withoutD = pointsToPath(withoutPts)
  const withAreaD = pointsToAreaPath(withPts)
  const gapD = gapFillPath(withPts, withoutPts)

  // X-axis tick labels at 10-year intervals
  const xTicks: { age: number; x: number }[] = []
  const range = config.xEnd - config.xStart
  for (let age = config.xStart; age <= config.xEnd; age += 10) {
    const t = (age - config.xStart) / range
    xTicks.push({ age, x: PAD.left + t * INNER_W })
  }
  if (xTicks.length === 0 || xTicks[xTicks.length - 1].age !== config.xEnd) {
    xTicks.push({ age: config.xEnd, x: PAD.left + INNER_W })
  }

  const xAxisY = PAD.top + INNER_H
  const yLabels = config.yAxisLabels ?? []
  const withEnd = withPts[withPts.length - 1]
  const withoutEnd = withoutPts[withoutPts.length - 1]
  const startPt = withPts[0]

  // Clip-path rect width transitions from 0 → full to create a left-to-right reveal.
  // This works with the dashed "without advisor" line without conflicting strokeDasharray.
  const revealWidth = stage >= 1 ? INNER_W + PAD.right : 0

  return (
    <div className={cn('bg-white border border-neutral-200 rounded-lg overflow-hidden', className)}>
      {/* Graph headline */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-body-sm font-medium text-neutral-800">{config.headline}</p>
      </div>

      {/* SVG chart */}
      <div className="px-3 pb-1">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full"
          aria-label="Advisor comparison chart"
          role="img"
        >
          <defs>
            <clipPath id={clipId}>
              <rect
                x={PAD.left}
                y={0}
                height={VB_H}
                width={revealWidth}
                style={{ transition: 'width 800ms ease-out' }}
              />
            </clipPath>
          </defs>

          {/* Area fills — fade in at stage 2 */}
          <path
            d={withAreaD}
            fill={NAVY}
            className="transition-opacity duration-200"
            style={{ opacity: stage >= 2 ? 0.06 : 0 }}
          />
          <path
            d={gapD}
            fill={LIGHT_BLUE}
            className="transition-opacity duration-200"
            style={{ opacity: stage >= 2 ? 0.1 : 0 }}
          />

          {/* Lines — revealed left-to-right via clipPath */}
          <g clipPath={`url(#${clipId})`}>
            {/* Without advisor — dashed grey */}
            <path
              d={withoutD}
              fill="none"
              stroke={GREY}
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            {/* With advisor — solid navy */}
            <path d={withD} fill="none" stroke={NAVY} strokeWidth="3" />

            {/* Starting dot with pulse ring */}
            <circle cx={startPt.x} cy={startPt.y} r="5" fill={NAVY} />
            <circle
              cx={startPt.x}
              cy={startPt.y}
              r="5"
              fill="none"
              stroke={NAVY}
              strokeWidth="2"
              style={{
                opacity: 0.4,
                animation: 'affirmPulse 2s ease-out infinite',
              }}
            />
          </g>

          {/* "You are here" label */}
          <text
            x={startPt.x}
            y={startPt.y - 12}
            textAnchor="start"
            className="transition-opacity duration-500"
            style={{ opacity: stage >= 1 ? 1 : 0 }}
            fontSize="9"
            fill={NAVY}
            fontWeight="500"
          >
            You are here
          </text>

          {/* X-axis baseline */}
          <line
            x1={PAD.left}
            y1={xAxisY}
            x2={PAD.left + INNER_W}
            y2={xAxisY}
            stroke="#EDEDED"
            strokeWidth="1"
          />

          {/* X-axis tick labels */}
          {xTicks.map((tick) => (
            <text
              key={tick.age}
              x={tick.x}
              y={xAxisY + 16}
              textAnchor="middle"
              fontSize="10"
              fill="#6A6A6A"
            >
              {tick.age}
            </text>
          ))}

          {/* Contextual axis labels */}
          <text x={PAD.left} y={xAxisY + 30} textAnchor="start" fontSize="9" fill="#B0B0B0">
            Your age
          </text>
          <text
            x={PAD.left + INNER_W}
            y={xAxisY + 30}
            textAnchor="end"
            fontSize="9"
            fill="#B0B0B0"
          >
            {config.xEnd}
          </text>

          {/* Y-axis labels */}
          {yLabels.map((label, i) => {
            const frac = i / (yLabels.length - 1)
            const y = PAD.top + INNER_H - frac * INNER_H
            return (
              <text
                key={label}
                x={PAD.left - 4}
                y={y + 3}
                textAnchor="end"
                fontSize="9"
                fill="#B0B0B0"
              >
                {label}
              </text>
            )
          })}

          {/* Endpoint annotations */}
          <text
            x={withEnd.x + 6}
            y={withEnd.y + 3}
            textAnchor="start"
            fontSize="10"
            fontWeight="600"
            fill={NAVY}
            className="transition-opacity duration-500"
            style={{ opacity: stage >= 2 ? 1 : 0 }}
          >
            {config.endpointWithLabel}
          </text>
          <text
            x={withoutEnd.x + 6}
            y={Math.min(withoutEnd.y + 3, xAxisY - 4)}
            textAnchor="start"
            fontSize="10"
            fill={GREY}
            className="transition-opacity duration-500"
            style={{ opacity: stage >= 2 ? 1 : 0 }}
          >
            {config.endpointWithoutLabel}
          </text>

          {/* Legend */}
          <line
            x1={PAD.left}
            y1={PAD.top - 8}
            x2={PAD.left + 20}
            y2={PAD.top - 8}
            stroke={NAVY}
            strokeWidth="3"
          />
          <text x={PAD.left + 24} y={PAD.top - 5} fontSize="9" fill={NAVY}>
            With advisor
          </text>
          <line
            x1={PAD.left + 110}
            y1={PAD.top - 8}
            x2={PAD.left + 130}
            y2={PAD.top - 8}
            stroke={GREY}
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <text x={PAD.left + 134} y={PAD.top - 5} fontSize="9" fill={GREY}>
            Without advisor
          </text>
        </svg>
      </div>

      {/* Key stat + source */}
      <div
        className="px-5 pb-5 transition-all duration-300"
        style={{
          opacity: stage >= 3 ? 1 : 0,
          transform: stage >= 3 ? 'translateY(0)' : 'translateY(6px)',
        }}
      >
        <div className="flex items-start gap-2 text-body-sm text-neutral-600">
          <span className="shrink-0 mt-0.5 text-primary-700">&#x1F4CA;</span>
          <p>
            {config.stat}{' '}
            <span className="text-neutral-400 italic">&mdash; {config.source}</span>
          </p>
        </div>
        <p className="text-[10px] text-neutral-400 mt-2 leading-snug">
          Illustration based on historical averages. Individual results vary. Not a guarantee of
          performance.
        </p>
      </div>
    </div>
  )
}

export default AdvisorComparisonChart
