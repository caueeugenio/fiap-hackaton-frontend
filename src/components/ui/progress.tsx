'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

const background = (progress: number) => {
  if (progress >= 80) {
    return 'bg-[#34C759]'
  } else if (progress >= 50) {
    return 'bg-[#D2AC23]'
  } else {
    return 'bg-[#9F2E2E]'
  }
}
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <div className='w-full flex justify-start'>
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-4 w-full max-w-lg overflow-hidden bg-secondary',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={`${background(
          value || 0
        )} h-full w-full flex-1 transition-all flex items-center justify-center`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      >
        <span className='text-white text-xs w-full text-right pr-2'>
          {value}%
        </span>
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  </div>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
