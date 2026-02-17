import * as React from 'react'

interface BankProgressCounterProps {
  answeredQuestions: number
  totalQuestions: number
  className?: string
}

export function BankProgressCounter({
  answeredQuestions,
  totalQuestions,
  className,
}: BankProgressCounterProps) {
  return (
    <div className={className}>
      <p className="text-center text-xs italic text-neutral-400">
        {answeredQuestions} of {totalQuestions} questions answered
      </p>
    </div>
  )
}

export default BankProgressCounter
