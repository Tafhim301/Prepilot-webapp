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

  // Brand gradient stops  — updated to new primary palette
  pink:        "#ff3c7e",   // vivid pink/magenta  (gradient end)
  purple:      "#a100ff",   // bright purple       (gradient mid)
  violet:      "#6a00ff",   // deep violet         (gradient start)
  accent:      "#FF2530",   // red accent (play-button / destructive)

  // Alias used for interactive states, label pills
  primary:     "#a100ff",

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
export const GRAD = `linear-gradient(135deg, ${P.violet} 0%, ${P.purple} 50%, ${P.pink} 100%)`;

/** 90° — horizontal border accents, top-edge lines */
export const GRAD_H = `linear-gradient(90deg, ${P.violet} 0%, ${P.purple} 50%, ${P.pink} 100%)`;

/** 160° — section background (base dark — subtle warm purple shift) */
export const GRAD_SECTION = `linear-gradient(160deg, #0e0b18 0%, #0d0b14 55%, #0f0c1a 100%)`;

/** 145° — alternate section (very slightly lighter dark) */
export const GRAD_SECTION_ALT = `linear-gradient(145deg, #100d1c 0%, #0d0b14 55%, #13101e 100%)`;

/** 125° — service page (sharper diagonal) */
export const GRAD_SECTION_SERVICE = `linear-gradient(125deg, #110e1e 0%, #0d0b14 50%, #0f0c1b 100%)`;

/** 175° — pricing page (near-vertical) */
export const GRAD_SECTION_PRICING = `linear-gradient(175deg, #0f0c1b 0%, #0d0b14 50%, #110e1e 100%)`;

/** 200° — contact page (reversed diagonal) */
export const GRAD_SECTION_CONTACT = `linear-gradient(200deg, #0e0b19 0%, #0d0b14 55%, #100e1c 100%)`;

/** 115° — about page (steep diagonal) */
export const GRAD_SECTION_ABOUT = `linear-gradient(115deg, #100d1c 0%, #0d0b14 55%, #0f0c1a 100%)`;

/** 185° — our-work page */
export const GRAD_SECTION_OURWORK = `linear-gradient(185deg, #0e0b18 0%, #0d0b14 55%, #110e1d 100%)`;

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
  background:           "rgba(255,255,255,0.055)",
  backdropFilter:       "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border:               "1px solid rgba(255,255,255,0.10)",
  boxShadow:            "0 4px 28px rgba(0,0,0,0.38), 0 1px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.07)",
};

/** Elevated glass card (featured / highlighted) */
export const cardGlassElevated: React.CSSProperties = {
  background:           "rgba(255,255,255,0.09)",
  backdropFilter:       "blur(28px)",
  WebkitBackdropFilter: "blur(28px)",
  border:               "1px solid rgba(255,255,255,0.14)",
  boxShadow:            "0 8px 44px rgba(0,0,0,0.48), 0 2px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.09)",
};

/** Deep dark surface — used inside dark sections when a card needs to "sink" */
export const cardDark: React.CSSProperties = {
  background: "rgba(0,0,0,0.35)",
  border:     "1px solid rgba(255,255,255,0.07)",
  boxShadow:  "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
};

/** Shadow + gradient ring on hover */
export const cardHoverShadow = `0 16px 48px rgba(161,0,255,0.22), 0 0 0 1px rgba(161,0,255,0.30)`;

// ── Label / Badge Styles ───────────────────────────────────────────────────

/** Section label pill — default (works on all dark sections) */
export const labelLight: React.CSSProperties = {
  background:  "rgba(161,0,255,0.12)",
  borderColor: "rgba(161,0,255,0.30)",
  color:       "#c770ff",
};

/** Section label pill — on deepest-dark surfaces (darkBg) */
export const labelDark: React.CSSProperties = {
  background:  "rgba(161,0,255,0.08)",
  borderColor: "rgba(161,0,255,0.20)",
  color:       "#aa50ee",
};
