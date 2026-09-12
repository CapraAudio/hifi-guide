# Capra Web Theme

Use this document as the shared visual reference for Capra Audio webpages. It describes the design language established by the Capra Configurator and reused by Capra’s Hi-Fi Guide.

## Design character

Capra webpages should feel precise, technical, restrained, and approachable. Build the interface from warm neutral colors, strong Montserrat typography, square geometry, thin rules, and generous space. Let product imagery or interactive content carry visual complexity while the surrounding interface stays quiet.

- Use flat surfaces and crisp rectangular controls.
- Use thin borders to establish structure.
- Avoid rounded cards, pill controls, decorative gradients, and drop shadows in the page chrome.
- Use color only when it communicates state, category, or meaning.
- Keep copy concise, direct, and practical.

## Core colors

Define the theme with CSS custom properties. These values are the default Capra webpage palette.

```css
:root {
  color-scheme: light;
  --capra-bg: #f4f1ea;
  --capra-surface: #e8e4dc;
  --capra-text: #1b1a18;
  --capra-muted: #6b655d;
  --capra-border: #c9c2b7;
  --capra-active-bg: #1b1a18;
  --capra-active-text: #eeeae2;
}

html[data-theme="dark"] {
  color-scheme: dark;
  --capra-bg: #11110f;
  --capra-surface: #1d1d1a;
  --capra-text: #eeeae2;
  --capra-muted: #aaa59b;
  --capra-border: #48453f;
  --capra-active-bg: #eeeae2;
  --capra-active-text: #171715;
}
```

Use `--capra-bg` for the page, `--capra-surface` for working panels, and `--capra-border` for separators and control outlines. Active controls invert the foreground and background through the active color pair.

Additional colors may be introduced for meaningful content. For example, the Hi-Fi Guide uses purple `#b786ff` for dashed digital connections and amber `#f2b84b` for solid analog connections. Do not use those colors as general decoration.

## Typography

Use Montserrat throughout the interface with weights 400, 500, 600, and 700.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
body {
  font-family: Montserrat, ui-sans-serif, system-ui, sans-serif;
  color: var(--capra-text);
  background: var(--capra-bg);
}
```

- Hero headings use weight 700, tight line height around `0.96`, and negative letter spacing between `-0.05em` and `-0.065em`.
- Section headings use weight 600 or 700 with slightly tight letter spacing.
- Body copy uses weight 400 or 500 and a line height around `1.5`.
- Interface labels use weight 500 or 600, uppercase text, and letter spacing around `0.08em` to `0.14em`.
- Avoid extra-heavy weights above 700.

A typical responsive hero treatment is:

```css
.hero-title {
  max-width: 940px;
  font-size: clamp(3rem, 6.5vw, 6rem);
  font-weight: 700;
  line-height: 0.96;
  letter-spacing: -0.065em;
}
```

## Logo treatment

Use the official Capra mark. Keep its proportions intact and never redraw or distort it.

- In light mode, place the white mark inside a near-black square.
- In dark mode, place the black mark inside a warm off-white square.
- A standard header mark is a `34px` square with about `7px` of internal padding.
- Pair it with the word `CAPRA` in Montserrat 700, uppercase, with approximately `0.12em` letter spacing.
- Keep the logo lockup aligned to the left edge of the content grid.

This repository contains reusable raster assets at `assets/capra-logo-white.png` and `assets/capra-logo-black.png`.

## Page structure

Use a centered content grid with generous horizontal margins.

- Standard header and editorial width: `min(1240px, calc(100% - 40px))`.
- Wide interactive workspace: up to approximately `1320px`.
- Desktop page padding should feel spacious, usually `40px` to `72px` between major regions.
- Use `20px` to `28px` gaps between related panels.
- Separate major regions with whitespace or a `1px` border rather than shadows.

The header should be visually quiet: logo on the left, page or product name centered when space allows, and navigation or utility controls on the right. Use a single bottom border.

## Surfaces and controls

Panels use `--capra-surface` without a shadow or corner radius. Controls use transparent backgrounds and `1px` borders until selected.

```css
.panel {
  padding: 26px;
  background: var(--capra-surface);
}

.control {
  min-height: 42px;
  border: 1px solid var(--capra-border);
  border-radius: 0;
  color: var(--capra-muted);
  background: transparent;
}

.control[aria-pressed="true"],
.control[aria-selected="true"] {
  color: var(--capra-active-text);
  background: var(--capra-active-bg);
}
```

- Keep button labels short and literal.
- Show hover with a darker border or text color.
- Use underlined text buttons for quiet secondary actions such as reset.
- Use inverted filled controls for the current selection or primary action.
- Use border lines inside lists, inspectors, and segmented controls to show grouping.

## Light and dark modes

Support both themes and use the same behavior on every Capra webpage.

1. Store the visitor’s choice under the local storage key `capra-theme`.
2. Set `data-theme="light"` or `data-theme="dark"` on the root `html` element.
3. When no saved choice exists, follow `prefers-color-scheme`.
4. Label the toggle with the destination theme: show `DARK` in light mode and `LIGHT` in dark mode.
5. Update `meta[name="theme-color"]` to `#f4f1ea` or `#11110f` when the mode changes.

Pages on the same Capra GitHub Pages origin will then share the visitor’s preference.

## Responsive behavior

- Preserve the same visual hierarchy at every width.
- Stack multi-column workspaces below roughly `1050px`.
- Hide secondary navigation and centered header labels below roughly `760px`.
- Reduce page gutters to about `14px` to `20px` on phones.
- Stack inspectors beneath the primary interactive area.
- Allow segmented controls and option grids to collapse to two columns and then one column.
- Never require horizontal page scrolling.
- Keep interactive targets at least `42px` tall where practical.

## Accessibility

- Keep normal text at WCAG AA contrast or better.
- Provide a visible `:focus-visible` outline at least `3px` wide.
- Do not communicate state or meaning with color alone.
- Give icon-only controls an accessible name.
- Use native headings, buttons, links, fieldsets, and disclosure elements where possible.
- Respect `prefers-reduced-motion` and remove nonessential animation.
- Give interactive illustrations an equivalent text description.

## Prompt-ready reference

Use this wording when starting another Capra webpage task:

> Follow `CAPRA_WEB_THEME.md` as the visual source of truth. Use the official Capra logo, Montserrat typography, the defined warm-neutral light and dark palettes, square flat panels, thin borders, inverted active controls, shared `capra-theme` behavior, responsive layouts, and accessible interaction states. Preserve color for semantic meaning rather than decoration.

