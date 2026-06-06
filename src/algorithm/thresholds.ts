// WCAG 2.2 thresholds with a safety epsilon.
//
// WCAG defines AA normal text at 4.5:1 and AA large at 3.0:1. In practice,
// different tools (axe, Firefox DevTools, Chrome DevTools, Lighthouse) compute
// the ratio at slightly different precisions — a color pair that we measure
// as exactly 4.500 can read as 4.49 in another tool and be marked as failing.
//
// To guarantee that any conforming tool agrees, we target a ratio strictly
// above the WCAG threshold. EPSILON = 0.05 covers the precision drift observed
// across the common audit tools.
//
// These constants are used internally by the palette algorithm AND by the
// compatibility matrix classification. The public-facing language stays at
// "4.5" / "3.0" because those are the WCAG numbers users recognize.
export const EPSILON = 0.1
export const AA_NORMAL = 4.5 + EPSILON  // 4.60
export const AA_LARGE = 3.0 + EPSILON   // 3.10
