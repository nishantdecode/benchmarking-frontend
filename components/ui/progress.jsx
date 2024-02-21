"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, children, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-6 w-full overflow-hidden border-2 border-gray-600 rounded-0 bg-gray-400", className)}
    {...props}>
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-yellow-400 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}/>
    <div className="absolute top-0 left-[65px] text-black">{children}</div>
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
