/**
 * Responsive breakpoint utilities
 * - Mobile design: 375px
 * - Tablet design: 1024px
 * - Desktop design: 1440px
 *
 * Media query triggers:
 * - Mobile: below 500px (scales with vw)
 * - Tablet: 501px - 1024px (scales with vw)
 * - Desktop: 1025px - 1440px (fixed pixel values)
 * - Fullwidth: above 1440px (fixed pixel values, centered with gutters)
 */

export const breakpoints = {
  mobile: 500, // Mobile media query trigger
  tablet: 1024, // Tablet design width / desktop trigger
  desktop: 1440, // Desktop design width / fullwidth trigger
} as const;

export const designWidths = {
  mobile: 375,
  tablet: 1024,
  desktop: 1440,
} as const;

export type Breakpoint = "mobile" | "tablet" | "desktop" | "fullwidth";

export const mediaQueries = {
  // Mobile: below 500px (scales with vw)
  mobile: `(max-width: ${breakpoints.mobile - 1}px)`,

  // Tablet: 501px - 1024px (scales with vw)
  tablet: `(min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px)`,

  // Desktop: 1025px - 1440px (fixed pixel values)
  desktop: `(min-width: ${breakpoints.tablet + 1}px) and (max-width: ${
    breakpoints.desktop
  }px)`,

  // Fullwidth: above 1440px (fixed pixel values, centered with gutters)
  fullwidth: `(min-width: ${breakpoints.desktop + 1}px)`,

  // Convenience queries
  tabletAndUp: `(min-width: ${breakpoints.mobile}px)`,
  desktopAndUp: `(min-width: ${breakpoints.tablet + 1}px)`,
} as const;

export const matchMedia = (query: string): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
};

export const getCurrentBreakpoint = (): Breakpoint => {
  if (typeof window === "undefined") return "mobile";

  const width = window.innerWidth;

  if (width > breakpoints.desktop) return "fullwidth";
  if (width > breakpoints.tablet) return "desktop";
  if (width >= breakpoints.mobile) return "tablet";
  return "mobile";
};

export const getVwScale = (
  designWidth: number,
  viewportWidth: number
): number => {
  return viewportWidth / designWidth;
};
