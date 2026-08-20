# aol-indiranagar-website

Homepage for the Art of Living Happiness Center, Indiranagar, Bengaluru.

## Running it

Open `index.html`. There is no build step, no dependencies, and no external
requests — fonts, the logo, the map and the photograph are all served from this
repo.

## Where things live

| | |
|---|---|
| `js/data.js` | **All content**: programs, upcoming batches, testimonials. Edit here, not in `main.js`. |
| `js/main.js` | Behaviour only. |
| `css/style.css` | Design tokens are at the top and are the whole system. |
| `img/`, `fonts/` | Assets. |

`upcoming` and `testimonials` in `data.js` are empty on purpose. While a list is
empty its section — and every nav and footer link pointing at it — hides itself,
so the page never ships an empty section or a dead anchor. Fill the array and
the section reappears.

## Conventions worth knowing before editing

- **Contrast.** Every foreground/background pair was checked against WCAG AA;
  the lowest on the page is 4.97:1. `--clay` is the official logo's sun orange
  darkened until it passes — the brand orange itself only manages 2.94:1, so it
  can't be used for text or buttons. If you add a colour, check it.
- **Motion.** There is deliberately no scroll-reveal, no counting statistics, no
  auto-advancing carousel. This is a page about not being agitated.
- **The logo** (`img/aol-logo.svg`) is the official asset. Don't recolour,
  redraw or stretch it; height is set in CSS and the width follows.
- **The map** is a static image built from OpenStreetMap tiles, not a Google
  iframe. The ODbL attribution is burned into the image and must stay.

## Open before launch

- [ ] Consent from the people in `img/hero-class.webp` before it is public.
- [ ] Confirm the opening hours claimed in the hero stats strip.
- [ ] Set the real domain in the `canonical` / `og:url` / `og:image` tags.
- [ ] Add real upcoming batches, and real testimonials if you collect them.
