
import React from "react";
import { Link } from "react-router-dom";
import { TabsTrigger } from "./tabs";
import { cn } from "@/lib/utils";

interface TabsLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  value?: string;
  children: React.ReactNode;
}

const TabsLink = React.forwardRef<HTMLAnchorElement, TabsLinkProps>(
  ({ className, children, to, value, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        to={to}
        className={cn(className)}
        {...props}
      >
        {children}
      </Link>
    );
  }
);
TabsLink.displayName = "TabsLink";

export { TabsLink };
