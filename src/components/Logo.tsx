/**
 * DigiTreak Logo
 * SVG recreation of the brand mark — browser-window shape with pink→purple gradient,
 * title-bar dots, and a red play-button triangle.
 *
 * Usage:
 *   <Logo size={32} />                 — icon only
 *   <Logo size={32} showName />        — icon + "DigiTreak" wordmark
 *   <Logo size={32} showName nameOnly />  — wordmark only (no icon)
 *
 * If you place the raster logo at /public/logo.png you can swap the SVG
 * for a Next.js <Image> by setting the RASTER constant to true.
 */

interface LogoProps {
  size?: number;
  showName?: boolean;
  nameOnly?: boolean;
  className?: string;
}

const GRAD_ID = "dgt-grad";

export default function Logo({
  size = 32,
  showName = false,
  nameOnly = false,
  className,
}: LogoProps) {
  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: size * 0.28 }}
    >
      {!nameOnly && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="DigiTreak logo icon"
          role="img"
          style={{ flexShrink: 0 }}
        >
          <defs>
            {/* Main brand gradient — bottom-left pink → top-right violet */}
            <linearGradient id={GRAD_ID} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%"   stopColor="#E8236C" />
              <stop offset="50%"  stopColor="#A030C8" />
              <stop offset="100%" stopColor="#6B2EE8" />
            </linearGradient>
            <clipPath id="dgt-clip">
              <rect x="0" y="0" width="100" height="100" rx="20" ry="20" />
            </clipPath>
          </defs>

          {/* Background — gradient rounded rect */}
          <rect x="0" y="0" width="100" height="100" rx="20" fill={`url(#${GRAD_ID})`} />

          {/* Title bar separator line */}
          <rect
            x="0" y="26" width="100" height="2"
            fill="rgba(0,0,0,0.28)"
            clipPath="url(#dgt-clip)"
          />

          {/* Three dots */}
          <circle cx="17" cy="14" r="3.8" fill="rgba(0,0,0,0.38)" />
          <circle cx="30" cy="14" r="3.8" fill="rgba(0,0,0,0.38)" />
          <circle cx="43" cy="14" r="3.8" fill="rgba(0,0,0,0.38)" />

          {/* Play triangle — red fill, dark stroke, pointing right */}
          <polygon
            points="36,54 36,88 75,71"
            fill="#FF2530"
            stroke="#0d0b14"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {(showName || nameOnly) && (
        <span
          style={{
            fontWeight: 700,
            fontSize: size * 0.65,
            lineHeight: 1,
            background: "linear-gradient(135deg, #E8236C 0%, #A030C8 50%, #6B2EE8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em",
          }}
        >
          DigiTreak
        </span>
      )}
    </span>
  );
}
