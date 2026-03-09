import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex items-center disabled:opacity-50 rounded-full w-11 h-6 transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0",
      "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      "border border-transparent",
      "focus-visible:outline-none focus-visible:border-ring/80 focus-visible:ring-2 focus-visible:ring-ring/50",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "block bg-background shadow-lg m-0.5 rounded-full ring-0 w-5 h-5 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 pointer-events-none",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
