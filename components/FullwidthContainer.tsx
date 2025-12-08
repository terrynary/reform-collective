"use client";

import { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useBreakpoint";
import { mediaQueries } from "@/lib/breakpoints";

interface FullwidthContainerProps {
  children: ReactNode;
  className?: string;
  //Max width for the content (default: 1440px - desktop design width)
  maxWidth?: number;
}

/**
 * Container that handles fullwidth layout above 1440px
 * - Below 1440px: Full width
 * - Above 1440px: Centered with gutters, max-width constraint
 */
export function FullwidthContainer({
  children,
  className = "",
  maxWidth = 1440,
}: FullwidthContainerProps) {
  const isFullwidth = useMediaQuery(mediaQueries.fullwidth);

  if (isFullwidth) {
    return (
      <div
        className={className}
        style={{
          maxWidth: `${maxWidth}px`,
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: `calc((100vw - ${maxWidth}px) / 2)`,
          paddingRight: `calc((100vw - ${maxWidth}px) / 2)`,
        }}
      >
        {children}
      </div>
    );
  }

  return <div className={className}>{children}</div>;
}
