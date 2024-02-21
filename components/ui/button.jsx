import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-darker dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary-darker",
        destructive: "text-red-500 hover:text-red-500 dark:text-red-700 dark:hover:text-red-500",
        outline: "border border-slate-200 bg-secondary hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-secondary dark:hover:bg-slate-800 dark:hover:text-slate-50",
        select: "bg-secondary text-background-foreground hover:bg-slate-100 dark:hover:bg-secondary/80 border-0 dark:border-primary text-xs",
        selectActive: "bg-toggle hover:bg-toggle/60 border-0 text-primary-foreground border-0 border-l-4 border-primary  text-xs",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        toggle: "bg-transparent",
        toggleActive: "bg-toggle",
        ghost: "hover:bg-card hover:text-slate-900 dark:hover:text-slate-50",
        link: "text-foreground hover:text-primary dark:text-foreground dark:hover:text-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
