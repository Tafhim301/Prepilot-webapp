/**
 * ── DigiTreak Design System ────────────────────────────────────────────────
 * Dark-first. Gradient is reserved for high-signal moments only.
 * Single source of truth — import from here, never redefine locally.
 * ──────────────────────────────────────────────────────────────────────────
 */

// ── Colour Palette ─────────────────────────────────────────────────────────
export const P = {
  // Page / background — dark purple-black
  page:        "#272236",   // base dark (most sections)
  pageMid:     "#272236",   // alternate section (slightly elevated)
  pageSurface: "#1a1528",   // card surface lifted

  // Text
  ink:         "#f0ecfa",   // headings & primary text (lavender-white)
  inkMid:      "#9080b8",   // body text, secondary (muted lavender)
  inkLight:    "#5a4e78",   // hints, placeholders, dim

  // Card / surface (dark glass)
  card:        "rgba(255,255,255,0.05)",

  // Borders & fills
  border:      "rgba(255,255,255,0.09)",
  borderMid:   "rgba(255,255,255,0.05)",
  mutedFill:   "rgba(255,255,255,0.03)",

  // Brand gradient stops
  pink:        "#E8236C",   // hot pink   (gradient start)
  purple:      "#A030C8",   // mid purple (gradient mid)
  violet:      "#6B2EE8",   // violet     (gradient end)
  accent:      "#FF2530",   // red accent (play-button / destructive)

  // Alias used for interactive states, label pills
  primary:     "#A030C8",

  // Footer / deepest dark
  darkBg:      "#080609",
  darkBgDeep:  "#050408",

  // On-dark aliases (whole site is dark, kept for API compat)
  onDark:      "#f0ecfa",
  onDarkMid:   "#9080b8",
  onDarkDim:   "#5a4e78",
} as const;

// ── Gradient Definitions ───────────────────────────────────────────────────

/** 135° — buttons, CTAs, highlighted text (primary use) */
export const GRAD = `linear-gradient(135deg, ${P.pink} 0%, ${P.purple} 50%, ${P.violet} 100%)`;

/** 90° — horizontal border accents, top-edge lines */
export const GRAD_H = `linear-gradient(90deg, ${P.pink} 0%, ${P.purple} 50%, ${P.violet} 100%)`;

/** 160° — section background (base dark — subtle warm purple shift) */
export const GRAD_SECTION = `linear-gradient(160deg, #0e0b18 0%, #0d0b14 55%, #0f0c1a 100%)`;

/** 145° — alternate section (very slightly lighter dark) */
export const GRAD_SECTION_ALT = `linear-gradient(145deg, #100d1c 0%, #0d0b14 55%, #13101e 100%)`;

/** 220° — reversed diagonal used as card hover wash */
export const GRAD_WASH = `linear-gradient(220deg, ${P.pink}14 0%, ${P.violet}0a 55%, transparent 100%)`;

// ── Gradient Text Style ────────────────────────────────────────────────────
export const GRAD_TEXT = {
  backgroundImage:      GRAD,
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor:  "transparent" as const,
  backgroundClip:       "text" as const,
};

// ── Card Styles (dark glass) ───────────────────────────────────────────────

/** Standard dark glass card */
export const cardGlass: React.CSSProperties = {
  background:           "rgba(255,255,255,0.05)",
  backdropFilter:       "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border:               "1px solid rgba(255,255,255,0.09)",
  boxShadow:            "0 4px 24px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.25)",
};

/** Elevated glass card (featured / highlighted) */
export const cardGlassElevated: React.CSSProperties = {
  background:           "rgba(255,255,255,0.08)",
  backdropFilter:       "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border:               "1px solid rgba(255,255,255,0.13)",
  boxShadow:            "0 8px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)",
};

/** Deep dark surface — used inside dark sections when a card needs to "sink" */
export const cardDark: React.CSSProperties = {
  background: "rgba(0,0,0,0.35)",
  border:     "1px solid rgba(255,255,255,0.07)",
  boxShadow:  "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
};

/** Shadow + gradient ring on hover */
export const cardHoverShadow = `0 16px 48px rgba(168,30,200,0.2), 0 0 0 1px rgba(168,30,200,0.28)`;

// ── Label / Badge Styles ───────────────────────────────────────────────────

/** Section label pill — default (works on all dark sections) */
export const labelLight: React.CSSProperties = {
  background:  "rgba(160,48,200,0.15)",
  borderColor: "rgba(160,48,200,0.32)",
  color:       "#d090f0",
};

/** Section label pill — on deepest-dark surfaces (darkBg) */
export const labelDark: React.CSSProperties = {
  background:  "rgba(160,48,200,0.10)",
  borderColor: "rgba(160,48,200,0.22)",
  color:       "#b870e0",
};
