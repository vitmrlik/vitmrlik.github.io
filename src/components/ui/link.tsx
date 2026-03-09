import * as React from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

const CustomLink = React.forwardRef<HTMLAnchorElement, LinkProps>(({ className, to, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      to={to}
      className={cn(
        "-mx-0.5 px-0.5 rounded-[2px] outline-none text-primary",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-0",
        "hover:underline inline-flex items-center",
        className,
      )}
      {...props}
    />
  );
});
CustomLink.displayName = "CustomLink";

export { CustomLink as Link };
