import * as React from 'react'
import { cn } from '@/lib/utils'
import { BankSidebar } from './BankSidebar'
import { BankProgressCounter } from './BankProgressCounter'
import { BankFooter } from './BankFooter'

interface BankFormLayoutProps {
  children: React.ReactNode
  answeredQuestions: number
  totalQuestions: number
  className?: string
}

export function BankFormLayout({
  children,
  answeredQuestions,
  totalQuestions,
  className,
}: BankFormLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Split layout: indigo left panel + white right panel from the very top */}
      <div className="flex flex-1">
        {/* Left indigo panel (logo + sidebar) -- hidden on mobile */}
        <BankSidebar className="hidden lg:flex lg:w-[42%]" />

        {/* Right white content panel */}
        <main className="flex flex-1 flex-col bg-white">
          <div className="flex flex-1 items-center justify-center">
            <div className={cn('w-full max-w-[540px] px-6 py-12 sm:px-10', className)}>
              {children}
            </div>
          </div>

          {/* Progress counter -- inside right panel only */}
          <BankProgressCounter
            answeredQuestions={answeredQuestions}
            totalQuestions={totalQuestions}
            className="py-3"
          />
        </main>
      </div>

      {/* Dark footer -- full width */}
      <BankFooter />
    </div>
  )
}

export default BankFormLayout
