import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// The site-wide content container — every section/page wraps its content in
// this instead of repeating "mx-auto max-w-7xl px-6 lg:px-8" everywhere.
const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("mx-auto max-w-7xl px-6 lg:px-8", className)}>
    {children}
  </div>
);

export default Container;
