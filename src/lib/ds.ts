/**
 * ── DigiTreak Design System ────────────────────────────────────────────────
 * Single source of truth for all design tokens, gradients, and shared styles.
 * Import from here in every component — never redefine locally.
 * ──────────────────────────────────────────────────────────────────────────
 */

// ── Colour Palette ─────────────────────────────────────────────────────────
export const P = {
  // Page / background
  page:        "#f4f1ec",   // warm cream
  pageDim:     "#ede8df",   // slightly deeper cream (alt sections)

  // Text
  ink:         "#1f1a14",   // deep brown-black
  inkMid:      "#7a6e62",   // mid warm grey
  inkLight:    "#a89e94",   // light warm grey

  // Card surfaces
  card:        "#fdfcfb",

  // Borders & fills
  border:      "rgba(0,0,0,0.08)",
  borderMid:   "rgba(0,0,0,0.05)",
  mutedFill:   "rgba(0,0,0,0.03)",

  // Brand gradient stops
  primary:     "#4a3018",   // deep warm brown
  red:         "#8b3a2a",   // dark terracotta
  mid:         "#9b4a28",   // burnt orange
  amber:       "#a85e26",   // warm amber

  // Dark surfaces
  darkBg:      "#1a1208",   // very dark warm brown
  darkBgDeep:  "#110d05",

  // Text on dark
  onDark:      "#f4f1ec",
  onDarkMid:   "#c4bdb4",
  onDarkDim:   "#7a7168",
} as const;

// ── Gradient Definitions ───────────────────────────────────────────────────

/** 135° — buttons, CTAs, highlighted text (primary use) */
export const GRAD = `linear-gradient(135deg, ${P.red} 0%, ${P.mid} 50%, ${P.amber} 100%)`;

/** 90° — horizontal border accents, top-edge lines */
export const GRAD_H = `linear-gradient(90deg, ${P.red} 0%, ${P.mid} 50%, ${P.amber} 100%)`;

/** 160° — subtle section-background wash (light to warm) */
export const GRAD_SECTION = `linear-gradient(160deg, #f8f5f0 0%, #f3ede4 50%, #ede6d8 100%)`;

/** 145° — alternate light section wash */
export const GRAD_SECTION_ALT = `linear-gradient(145deg, #eee9e0 0%, #f4f1ec 50%, #f8f5f0 100%)`;

/** 220° — reversed diagonal for card hover washes */
export const GRAD_WASH = `linear-gradient(220deg, ${P.amber}14 0%, transparent 55%)`;

// ── Gradient Text Style ────────────────────────────────────────────────────
export const GRAD_TEXT = {
  backgroundImage:      GRAD,
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor:  "transparent" as const,
  backgroundClip:       "text" as const,
};

// ── Card Styles ────────────────────────────────────────────────────────────

/** Standard light glass card */
export const cardGlass: React.CSSProperties = {
  background:           "rgba(255,255,255,0.78)",
  backdropFilter:       "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border:               "1px solid rgba(255,255,255,0.92)",
  boxShadow:            "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
};

/** Elevated glass card (featured / highlighted) */
export const cardGlassElevated: React.CSSProperties = {
  background:           "rgba(255,255,255,0.85)",
  backdropFilter:       "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border:               "1px solid rgba(255,255,255,0.95)",
  boxShadow:            "0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)",
};

/** Dark glass card — on dark section backgrounds */
export const cardDark: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border:     "1px solid rgba(255,255,255,0.08)",
  boxShadow:  `0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)`,
};

/** Shadow on hover for light cards */
export const cardHoverShadow = `0 20px 56px rgba(0,0,0,0.11), 0 0 0 1px rgba(168,94,38,0.14)`;

// ── Label / Badge Styles ───────────────────────────────────────────────────

/** Section label pill — on light backgrounds */
export const labelLight: React.CSSProperties = {
  background:  `${P.primary}0d`,
  borderColor: `${P.primary}22`,
  color:       P.primary,
};

/** Section label pill — on dark backgrounds */
export const labelDark: React.CSSProperties = {
  background:  "rgba(255,255,255,0.07)",
  borderColor: "rgba(255,255,255,0.14)",
  color:       P.onDarkMid,
};
