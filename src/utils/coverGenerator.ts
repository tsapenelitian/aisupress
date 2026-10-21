import { AISU_LOGO_PNG } from "./aisuLogoBase64";

/**
 * Generates an SVG Data URI representing an authentic publication book cover.
 * This guarantees 100% zero broken images, high crispness at any DPI, and instant rendering.
 */
export function generateCoverDataUri(
  title: string,
  author: string,
  category: string = "Penerbit AISU",
  bgGradientStart: string = "#1e293b",
  bgGradientEnd: string = "#0f172a",
  accentColor: string = "#38bdf8"
): string {
  // Wrap title text into 2-3 lines
  const words = title.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + " " + word).trim().length > 20) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += " " + word;
    }
  }
  if (currentLine) lines.push(currentLine.trim());

  const titleLinesSvg = lines
    .slice(0, 4)
    .map(
      (line, i) =>
        `<tspan x="36" dy="${i === 0 ? 0 : 28}">${escapeXml(line)}</tspan>`
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 360 480" width="360" height="480">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradientStart}" />
      <stop offset="100%" stop-color="${bgGradientEnd}" />
    </linearGradient>
    <linearGradient id="spineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(0,0,0,0.5)" />
      <stop offset="50%" stop-color="rgba(255,255,255,0.08)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />
    </linearGradient>
  </defs>

  <!-- Background Canvas -->
  <rect width="360" height="480" fill="url(#bgGrad)" />

  <!-- Book Spine Visual Simulation -->
  <rect x="0" y="0" width="18" height="480" fill="url(#spineGrad)" />
  <line x1="18" y1="0" x2="18" y2="480" stroke="rgba(255,255,255,0.15)" stroke-width="1" />

  <!-- Geometric Abstract Shapes -->
  <circle cx="320" cy="80" r="140" fill="${accentColor}" opacity="0.08" />
  <rect x="220" y="320" width="160" height="160" rx="20" fill="${accentColor}" opacity="0.05" transform="rotate(25 300 400)" />

  <!-- Top Header: Logo / Kategori / Penerbit -->
  <g transform="translate(36, 42)">
    <text font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="700" fill="${accentColor}" letter-spacing="1.5">
      ${escapeXml(category.toUpperCase())}
    </text>
    <text y="18" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="9" fill="rgba(255,255,255,0.55)">
      ASOSIASI INFORMATIKA SUMATERA UTARA
    </text>
  </g>

  <!-- Divider Line -->
  <rect x="36" y="80" width="48" height="3" fill="${accentColor}" rx="1.5" />

  <!-- Main Book Title -->
  <text x="36" y="160" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="22" font-weight="800" fill="#ffffff" letter-spacing="-0.3">
    ${titleLinesSvg}
  </text>

  <!-- Author Name -->
  <g transform="translate(36, 305)">
    <text font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" fill="rgba(255,255,255,0.6)" letter-spacing="0.5">
      PENULIS:
    </text>
    <text y="20" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="600" fill="#ffffff">
      ${escapeXml(author)}
    </text>
  </g>

  <!-- Bottom Publisher Seal: Official AISU Logo (https://www.aisu.or.id/aisu.png) -->
  <line x1="36" y1="432" x2="140" y2="432" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
  <g transform="translate(180, 432)">
    <circle cx="0" cy="0" r="28" fill="#ffffff" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
    <image href="${AISU_LOGO_PNG}" xlink:href="https://www.aisu.or.id/aisu.png" x="-21" y="-22" width="42" height="44" preserveAspectRatio="xMidYMid meet" />
  </g>
  <line x1="220" y1="432" x2="324" y2="432" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
