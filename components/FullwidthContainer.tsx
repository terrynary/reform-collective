import { ReactNode } from "react";

interface FullwidthContainerProps {
  children: ReactNode;
  className?: string;
  //Max width for the content (default: 1440px - desktop design width)
  maxWidth?: number;
}

/**
 * - Below 1440px: Full width
 * - Above 1440px: Centered with gutters, max-width constraint
 */
export function FullwidthContainer({
  children,
  className = "",
  maxWidth = 1440,
}: FullwidthContainerProps) {
  return (
    <div
      className={`fullwidth-container ${className}`}
      style={{
        maxWidth: `${maxWidth}px`,
      }}
    >
      {children}
    </div>
  );
}
