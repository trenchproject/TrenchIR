# TrEnCh-IR — Static GitHub Pages edition

A fully static rebuild of the [TrEnCh-IR](https://github.com/trenchproject/Trench-IR) website
("**Tr**anslating **En**vironmental **Ch**ange into organismal responses, using **I**nfra**R**ed imaging"),
designed to be hosted for free on **GitHub Pages** with no server, no Azure, and no database.

The original site was a Node.js / Express app on an Azure App Service, with an Azure Function app
performing thermal image conversion and Azure Blob Storage holding the images. This version reproduces
the entire front-end and replaces the server-dependent pieces as follows:

| Original (Azure) | This static version |
|---|---|
| Server-rendered pages (Express + Handlebars) | Plain static HTML |
| Gallery built live from Blob Storage | Client-side gallery reading `data/images.json`, images served from a GitHub repo |
| Map built live from Blob Storage + Google Maps | Leaflet + OpenStreetMap, points from `data/images.json` (no API key) |
| Individual image page (server) | `page.html` rendered from URL query parameters |
| Upload → Azure Function thermal conversion | **Conversion Tools** page documenting the pipeline and linking the open-source [gtatters](https://github.com/gtatters) tools |

## Pages

- `index.html` — Home
- `about.html` — About
- `science.html` — The Science
- `gallery.html` — Filterable image gallery (client-side)
- `map.html` — Map of geolocated images (Leaflet/OpenStreetMap)
- `page.html` — Individual image view with digital↔thermal slider and palette toggle
- `conversion.html` — Thermal conversion process + open-source tools (replaces Upload)
- `case-studies.html`, `king-penguins.html`, `koalas.html`, `pollination.html` — Educational resources

## Publishing on GitHub Pages

This project uses two repos under the `trenchproject` org:

- **`trenchproject/TrenchIR`** — this website
- **`trenchproject/TrenchIR_gallery`** — the thermal images

1. Push the contents of this folder to `trenchproject/TrenchIR`.
2. In that repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source = Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Save. The site appears at `https://trenchproject.github.io/TrenchIR/` within a minute or two.

The included `.nojekyll` file tells GitHub Pages to serve all files as-is (important so nothing is
stripped or reprocessed).

## Where the images come from

Images are loaded from a GitHub repository via `raw.githubusercontent.com`, configured in
[`data/config.js`](data/config.js):

```js
const TRENCH_CONFIG = {
  OWNER:  "trenchproject",
  REPO:   "TrenchIR_gallery",
  BRANCH: "main",
  PATH:   "images",
};
```

This is already set to the `TrenchIR_gallery` repo. A file named `IRON-foo.jpg` placed at
`images/IRON-foo.jpg` in that repo is then served from
`https://raw.githubusercontent.com/trenchproject/TrenchIR_gallery/main/images/IRON-foo.jpg`.

Edit those four values to point at your own image repo. A file named `IRON-foo.jpg` is then served from:

```
https://raw.githubusercontent.com/OWNER/REPO/BRANCH/PATH/IRON-foo.jpg
```

You can also host the images **inside this same site** — put them in, say, `images/gallery/` and change
`imageBase()` in `config.js` to return `"images/gallery"`.

> **Why a GitHub repo instead of Google Drive / OneDrive?** Drive and OneDrive throttle bulk image
> requests (exactly what a gallery does) and change their hotlink URL formats periodically. Serving from
> a GitHub repo gives stable, rate-limit-free direct URLs. Both Drive and OneDrive *can* work if you
> prefer — just have `imageBase()` / `imageUrl()` return the appropriate direct-image URL.

## Adding images (the metadata schema)

The gallery and map are driven by [`data/images.json`](data/images.json). Each entry:

```jsonc
{
  "name": "my-image.jpg",          // unique id / original filename
  "iron": "IRON-my-image.jpg",     // ironbow temperature image (thumbnail + default view)
  "rainbow": "RAIN-my-image.jpg",  // optional
  "greyscale": "GREY-my-image.jpg",// optional
  "embedded": "EMBED-my-image.jpg",// optional digital photo (enables the slider)
  "flir": "my-image.jpg",          // optional original FLIR jpg (download)
  "raw": "RAW-my-image.tiff",      // optional raw data (download)
  "param": "PARAM-my-image.json",  // optional parameters (download)
  "scientificName": "Genus species",
  "commonName": "Common name",
  "fauna1": "Arthropod", "fauna2": "NA",
  "flora1": "Grass", "flora2": "NA",
  "biome": "terrestrial",          // terrestrial | aquatic  (drives gallery filter)
  "specificBiome": "grassland",
  "substrate": "rock",             // drives gallery filter
  "description": "Free text.",
  "contributor": "Your name", "contributorLink": "example.com",
  "location": "Place, Country",
  "lat": 40.05, "lon": -105.27     // decimal degrees; omit to keep off the map
}
```

All asset fields are **filenames** inside the configured image repo. Omit or blank any asset you don't have.

## Producing the temperature-coded images

Use the open-source tools linked on the **Conversion Tools** page, principally
[Thermimage](https://github.com/gtatters/Thermimage) (R),
[ThermImageJ](https://github.com/gtatters/ThermImageJ) (ImageJ), and
[ThermimageBash](https://github.com/gtatters/ThermimageBash) (command line),
all by [Glenn Tattersall](https://github.com/gtatters). They read the FLIR radiometric JPG, convert raw
data to temperature, and export ironbow/rainbow/greyscale renderings plus raw data and parameters.

## Local preview

```bash
cd trench-ir-static
python3 -m http.server 8000
# then open http://localhost:8000
```

## Credits

Original site by the [TrEnCh Project](https://github.com/trenchproject) / Buckley Lab, University of
Washington; design by Abigail Meyer; template by Colorlib. Thermal conversion tools by Glenn Tattersall.
