# Lexi Sans — proprietary typeface drop-in

The site is architected to load Lexi Sans from this directory:

- `lexi-sans-regular.woff2` (400)
- `lexi-sans-medium.woff2` (500)
- `lexi-sans-semibold.woff2` (600)
- `lexi-sans-bold.woff2` (700)
- `lexi-sans-display.woff2` (700–800, display cut)

`@font-face` declarations live in `src/app/globals.css` with
`font-display: swap` and an engineered fallback stack
(`Helvetica Neue`, system sans) that preserves metrics until the
production files land. No Google Font substitution is used —
the design assumes Lexi Sans exists.

Design intent (for the type designer): geometric construction,
controlled proportions, distinctive terminals, precise counters,
recognizable rhythm at display sizes. The display cut carries the
LEXI wordmark and the FLEEN / 1.0 headline roles.
