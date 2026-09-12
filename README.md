# Capra’s Guide to Hi-Fi for Beginners

An interactive, plain-language guide to building a first wired headphone setup. It covers built-in headphone outputs, USB dongles, combined desktop DAC/amplifiers, and separate DAC and amplifier systems.

## Preview locally

No build step or dependencies are required.

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080` in a browser.

## Update the guide

- `index.html` contains the page structure and inline SVG scene layers.
- `styles.css` contains the responsive layout, illustration styling, and accessible interaction states.
- `content.js` contains setup definitions, component explanations, lessons, and references.
- `app.js` manages the guide state and derives the scene, controls, signal path, and equipment list.

Keep setup definitions internally consistent: each arrangement declares its required output, visible components, signal-chain order, and equipment list. Technical claims should remain neutral and be checked against primary documentation.

## Publish

Pushes to `main` deploy the repository to GitHub Pages through `.github/workflows/pages.yml`. In the repository’s **Settings → Pages**, set the source to **GitHub Actions** if it is not selected automatically.
