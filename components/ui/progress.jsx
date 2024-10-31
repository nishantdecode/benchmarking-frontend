"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, children, bg, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-6 w-full overflow-hidden border-0 rounded-0 bg-[#A8A8A8]", className)}
    {...props}>
    <ProgressPrimitive.Indicator
      className={`h-full w-full flex-1 transition-all`}
      style={{ transform: `translateX(-${100 - (value || 0)}%)`, backgroundColor:bg }}/>
    <div className="absolute top-[10%] left-[30%] text-black font-bold">{children}</div>
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
