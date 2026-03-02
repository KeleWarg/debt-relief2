'use client'

import * as React from 'react'
import type { SavingsRange, MotivationDriver } from '@/types/fa-funnel'
import { Slider } from '@/components/ui/Slider'
import { Button } from '@/components/ui/Button'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'

const BLUE = '#0066CC'

function MoneyStack({ amount }: { amount: number }) {
  const tier = amount < 50000 ? 1 : amount < 150000 ? 2 : amount < 300000 ? 3 : 4
  const rows = Array.from({ length: tier }, (_, i) => i + 1)

  return (
    <div className="flex flex-col items-center -space-y-2">
      {rows.map((count, rowIndex) => (
        <div
          key={`row-${rowIndex}-${tier}`}
          className="flex -space-x-2 animate-money-fade-in"
        >
          {Array.from({ length: count }).map((_, iconIndex) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={`icon-${rowIndex}-${iconIndex}`}
              src="/Money.svg"
              alt=""
              width={52}
              height={40}
              className="w-[52px] h-[40px] animate-money-fade-in"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

const SAVINGS_CONTENT: Record<MotivationDriver, {
  headline: React.ReactNode
  subCopy: string
}> = {
  behind_retirement: {
    headline: <>Now let{'\u2019'}s look at what you{'\u2019'}ve saved. <span style={{ color: BLUE }}>Your savings shape how aggressively your advisor can plan</span> your catch-up strategy.</>,
    subCopy: 'A rough estimate is fine. This helps your advisor understand the gap and how aggressively to plan.',
  },
  family_protection: {
    headline: <>Now let{'\u2019'}s look at what you{'\u2019'}ve set aside. <span style={{ color: BLUE }}>Your savings shape the scope of protection</span> your advisor will recommend.</>,
    subCopy: 'Your total assets shape the scope of protection planning your advisor will recommend.',
  },
  windfall: {
    headline: <>Now let{'\u2019'}s look at what you{'\u2019'}ve saved alongside your new wealth. <span style={{ color: BLUE }}>Your baseline shapes how your advisor positions everything</span>.</>,
    subCopy: "This helps us find advisors experienced at your level of wealth. A ballpark is all we need.",
  },
  optimization: {
    headline: <>Now let{'\u2019'}s see what you{'\u2019'}ve accumulated. <span style={{ color: BLUE }}>Your asset level determines which optimization strategies</span> are available to you.</>,
    subCopy: 'Asset level determines which optimization strategies are available to you. A rough number works.',
  },
  plan_review: {
    headline: <>Now let{'\u2019'}s add your savings to the picture. <span style={{ color: BLUE }}>This gives your advisor a sense of scale</span> before they review your plan.</>,
    subCopy: 'This gives your advisor a sense of scale before they review your plan. Estimates are fine.',
  },
}

interface SavingsRangeScreenProps {
  initialValue?: SavingsRange
  motivationDriver?: MotivationDriver
  onBack?: () => void
  onSubmit?: (value: SavingsRange) => void
}

export function SavingsRangeScreen({
  initialValue,
  motivationDriver,
  onBack,
  onSubmit,
}: SavingsRangeScreenProps) {
  const SLIDER_STEPS = [
    { amount: 25000, label: '$25K', range: 'under_50k' as SavingsRange },
    { amount: 100000, label: '$100K', range: '50k_150k' as SavingsRange },
    { amount: 250000, label: '$250K', range: '150k_350k' as SavingsRange },
    { amount: 550000, label: '$550K', range: '350k_750k' as SavingsRange },
    { amount: 1000000, label: '$1M', range: '750k_1.5m' as SavingsRange },
    { amount: 1500000, label: '$1.5M+', range: '1.5m_plus' as SavingsRange },
  ]

  const initialAmount = initialValue
    ? SLIDER_STEPS.find((s) => s.range === initialValue)?.amount ?? 150000
    : 150000

  const [sliderValue, setSliderValue] = React.useState([initialAmount])

  const currentRange = React.useMemo(() => {
    const val = sliderValue[0]
    if (val < 50000) return 'under_50k' as SavingsRange
    if (val < 150000) return '50k_150k' as SavingsRange
    if (val < 350000) return '150k_350k' as SavingsRange
    if (val >= 350000) return '350k_750k' as SavingsRange
    return '350k_750k' as SavingsRange
  }, [sliderValue])

  const formatSavings = (v: number) => {
    if (v >= 500000) return '$500K+'
    return `$${Math.round(v / 1000)}K`
  }

  const handleSubmit = () => {
    onSubmit?.(currentRange)
  }

  const content = motivationDriver ? SAVINGS_CONTENT[motivationDriver] : null

  return (
    <div className="w-full max-w-content mx-auto px-4 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-8">
      <div className="flex flex-col items-start w-full">
        {/* Section label */}
        <p
          className="animate-fade-in-up text-xs font-medium uppercase tracking-wider text-neutral-400 mb-3"
          style={{ animationDelay: '400ms' }}
        >
          Building your financial profile
        </p>

        {/* Headline */}
        <h1
          className="animate-fade-in-up font-display text-headline-lg sm:text-display lg:text-display-md mb-3"
          style={{ animationDelay: '400ms', color: '#1B2A4A' }}
        >
          {content?.headline ?? <>Whatever you{'\u2019'}ve saved, it{'\u2019'}s workable. <span style={{ color: BLUE }}>That{'\u2019'}s what advisors do.</span></>}
        </h1>

        {/* Sub-copy */}
        <p
          className="animate-fade-in-up leading-relaxed mb-8"
          style={{ animationDelay: '500ms', fontSize: '15px', color: '#666666' }}
        >
          {content?.subCopy ?? "Estimate your total savings and assets, including cash, investments, retirement accounts, and home equity."}
        </p>

        {/* Money stack + Display value */}
        <div className="animate-fade-in-up w-full flex flex-col items-center py-4 mb-6" style={{ animationDelay: '500ms' }}>
          <MoneyStack amount={sliderValue[0]} />
          <p className="text-[56px] font-display leading-none text-neutral-900 mt-6">
            {formatSavings(sliderValue[0])}
          </p>
        </div>

        {/* Slider */}
        <div className="animate-fade-in-up w-full" style={{ animationDelay: '600ms' }}>
          <Slider
            min={0}
            max={500000}
            step={5000}
            value={sliderValue}
            onValueChange={setSliderValue}
            showValue={false}
            markers={[
              { value: 0, label: '$0' },
              { value: 125000, label: '$125K' },
              { value: 250000, label: '$250K' },
              { value: 375000, label: '$375K' },
              { value: 500000, label: '$500K+' },
            ]}
          />
        </div>

        {/* CTA */}
        <div className="animate-fade-in-up w-full mt-8" style={{ animationDelay: '700ms' }}>
          <StickyButtonContainer>
            <Button variant="primary" fullWidth showTrailingIcon onClick={handleSubmit}>
              Continue
            </Button>
          </StickyButtonContainer>
        </div>
      </div>
    </div>
  )
}

export default SavingsRangeScreen
