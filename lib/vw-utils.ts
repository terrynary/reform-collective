import { designWidths } from "./breakpoints";

// Convert design pixels to vw units for responsive scaling

export function pxToVw(px: number, designWidth: number): string {
  return `${(px / designWidth) * 100}vw`;
}

// Convert mobile design pixels to vw
export function mobilePxToVw(px: number): string {
  return pxToVw(px, designWidths.mobile);
}

//Convert tablet design pixels to vw
export function tabletPxToVw(px: number): string {
  return pxToVw(px, designWidths.tablet);
}

//Create a responsive value that scales with vw for mobile/tablet and uses fixed pixels for desktop
export function responsiveSize(
  mobilePx: number,
  tabletPx: number,
  desktopPx: number
): string {
  const mobileVw = mobilePxToVw(mobilePx);
  const tabletVw = tabletPxToVw(tabletPx);

  // Use clamp for smooth scaling between breakpoints
  return `clamp(${mobileVw}, ${tabletVw}, ${desktopPx}px)`;
}
