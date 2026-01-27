'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

// Validation schema
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type EmailFormData = z.infer<typeof emailSchema>

interface EmailScreenProps {
  initialValue?: string
  onBack?: () => void
  onSubmit?: (email: string) => void
}

/**
 * EmailScreen
 * 
 * Celebratory gate screen - asks for email before showing debt profile
 */
export function EmailScreen({ 
  initialValue = '', 
  onBack, 
  onSubmit 
}: EmailScreenProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: initialValue,
    },
  })
  
  const onFormSubmit = (data: EmailFormData) => {
    onSubmit?.(data.email)
  }
  
  return (
    <FormLayout currentStep={10} onBack={onBack}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="animate-slide-up space-y-6">
        {/* Headline */}
        <h1 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 text-center">
          Congrats! Your debt profile is ready.
        </h1>
        
        {/* Subheading */}
        <p className="text-body text-neutral-500 text-center">
          What&apos;s your email address?
        </p>
        
        {/* Email Input */}
        <div className="pt-2">
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        
        {/* Submit Button */}
        <Button type="submit" fullWidth>
          Continue to Debt Profile
        </Button>
        
        {/* Privacy note */}
        <p className="text-caption text-neutral-500 text-center">
          We respect your privacy. Your email will only be used to send you 
          information about your debt relief options.
        </p>
      </form>
    </FormLayout>
  )
}

export default EmailScreen
