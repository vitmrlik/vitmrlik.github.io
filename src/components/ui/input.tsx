import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex bg-background file:bg-transparent disabled:opacity-50 px-3 py-2 border border-input focus-visible:border-ring file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ring-offset-background focus-visible:ring-offset-0 w-full h-10 file:font-medium placeholder:text-muted-foreground file:text-foreground md:text-sm file:text-sm text-base disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
