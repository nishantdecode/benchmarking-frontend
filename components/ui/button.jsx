import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-darker",
        destructive: "text-red-500 hover:text-red-500",
        outline: "border border-secondary bg-secondary hover:bg-secondary/80 shadow-lg hover:shadow-2xl",
        dropdown: "border-toggle-foreground bg-toggle hover:bg-toggle/80 text-toggle-foreground",
        select: "bg-secondary text-background-foreground hover:bg-toggle/80 hover:text-toggle-foreground border-0 text-xs",
        selectActive: "bg-toggle border-0 text-primary-foreground border-0 border-l-4 border-primary text-xs",
        secondary: "bg-secondary hover:bg-secondary/50 shadow-md hover:shadow-lg",
        toggle: "flex flex-row w-full gap-2 text-xs bg-transparent",
        toggleActive: "flex flex-row w-full gap-2 text-xs bg-toggle text-toggle-foreground",
        ghost: "bg-card/50 hover:text-slate-900",
        link: "text-foreground hover:text-primary",
        input: "border border-primary bg-background"
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
