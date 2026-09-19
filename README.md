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

`testimonials` in `data.js` is empty on purpose. While a list is empty its
section — and every nav and footer link pointing at it — hides itself, so the
page never ships an empty section or a dead anchor. Fill the array and the
section reappears.

`upcoming` batches carry ISO `start`/`end` dates and drop off the page by
themselves the day after they end; when none are left the section hides like
the others. Each one renders as a booking card. A batch with a `register` link
gets a button reading "Register" that goes straight to it; without one the
button reads "Enquire" and scrolls to the contact form with the program
pre-selected. Set `ctaLabel` on a batch to override the wording. The scroll is
the stylesheet's `scroll-behavior: smooth`, which stands down under
`prefers-reduced-motion` along with everything else.

Every card has a share button beside its title offering two icon-only actions,
**Copy link** and **WhatsApp**. It opens on hover as well as on click, but only
where `(hover: hover) and (pointer: fine)` matches — a touchscreen fires a
synthetic `mouseenter` on tap, and letting that through means the tap opens the
menu and the click that follows shuts it again. Both paths go through
`openMenu()`, so the WhatsApp message is rebuilt either way (each labelled with `title` and `aria-label`,
since there is no visible text to read). Copy link turns into a sage tick for
two seconds to confirm. Each card carries a generated `id` (`batch-<start>-<program>`),
so the copied link points at that batch and the card it lands on marks itself
with `:target`. The WhatsApp message is built fresh each time the menu opens
and reads the email and phone numbers **out of the Get In Touch section's
markup** — they are not repeated in `main.js`, so editing the contact block in
`index.html` changes what gets shared. Copy link tries `navigator.clipboard`
and falls back to the old textarea trick, which is what makes it work off
`file://`, over plain http and in Safari.

Every card shows the same heading, price and languages; those live once in
`batchDefaults` in `data.js`, and a batch can override any of them by setting
the same key on itself. The displayed `heading` is separate from the batch's
`title`, which still has to match a program in `courseCategories` so the
contact form can pre-select it. A batch for anything but the Happiness Program
needs its own `heading` or it inherits that one — which is what the Spine Care
batch sets.

Above the cards is a **Program Type** filter: a button that opens a panel of
checkboxes, so several types can be on at once (selected types are OR'd — a
batch belongs to one program). Its options are the distinct `heading`s of the
batches on the page, so a new kind of program appears there the moment one is
added — nothing to update by hand. With only one kind of program the whole
control hides itself, since there'd be nothing to filter between.

"All Programs" is a reset rather than a peer: choosing it clears the individual
checkboxes, and clicking it while it is already on leaves it on, because
turning it off by itself would only empty the page. Unchecking every individual
type does empty the page, and that is when "No upcoming programs available."
appears. The button reports the state with the panel shut — a name for one
selection, a count past that.

It is a checkbox panel rather than `<select multiple>`, which needs ctrl-click
to pick a second option on a desktop and renders as something different in
every mobile browser. Filtering toggles the `hidden` attribute on cards rather
than re-rendering, which keeps the share menus and their listeners intact.

Setting `price` or `note` to `null` on a batch drops that line from the card.
They travel together: the asterisk on the price is what points at the note, so
a card with no note shows no asterisk, and a card with no price gets a
`no-price` class that drops the empty row from the stacked mobile grid. The
Spine Care batch sets both to `null` because it is enquiry-based. The card's
action column is a fixed 20rem wide for the same reason — sized to the note, so
a card without one still lines its facts up with every other card.

## Navigation and page structure

The nav is **Home · About · Upcoming Programs · Contact Us**. There is no
Courses item and no header CTA.

Courses live *inside* the About page: `#about`, then Why Sudarshan Kriya, then
`#courses` under the heading "Our Programs". The `courses` id is deliberately
kept, so every existing route to it still resolves — the hero's "Explore
Courses" button, the Kriya note, five footer links and `spine-care.html` all
still land on the programs list.

That works because the scroll-spy in `main.js` builds its section list **from
the nav links**, not from every `section[id]`. A section with no nav item of
its own — Why Sudarshan Kriya, Our Programs — keeps the heading above it lit,
which is what holds "About" active across the whole About page. Taking every
section instead used to leave no link lit at all while you were in Kriya.

## Why Sudarshan Kriya

Three static cards, every description visible at once. **No JavaScript touches
this section** — nothing to click, nothing hidden, nothing that needs a script
to be readable. If you are tempted to add a tab or accordion here, that was
tried and deliberately removed.

The heading stack is three lines, and size and colour do not rank them the
same way. `.kriya-title` ("Why Sudarshan Kriya") is the small line on top at
`--fs-lg`; `.kriya-claim` ("Telling yourself to relax never works.") is the
display line under it, 44px down to 32px. They traded sizes deliberately — if
you are reading this because one of them looks like the wrong size, that was
the intent.

Both segments of the claim are Lora; the two faces are what tell them apart.
The line runs in the italic — the same face the testimonial quotes use — and
"never works", an `<em>` inside it, steps back to the upright in the deeper
`--clay-deep`. An `<em>` is italic by default, so that upright is stated
explicitly. Note the italic file is **single-weight 400**, not variable like
the roman, so the claim's `font-weight: 500` renders at 400 there.

The band is `--sand-deep`, distinct from the paper section above and the sand
one below, so the paper cards read as cards without needing heavy borders. The
CTA points at `#upcoming`.

The heading stack is the one place on the site where body copy is clay rather
than ink: title `--clay`, claim `--clay` with its `<em>` in `--clay-deep`,
paragraph `--clay-muted`. Everything below it — the cards, the note, the CTA — is
unchanged. The paragraph's colour is scoped to `.kriya-head .kriya-lead`
because `.kriya-lead` shares its sizing rule with `.about-lead`.

## Conventions worth knowing before editing

- **Contrast.** Every foreground/background pair was checked against WCAG AA;
  the lowest on the page is 4.97:1. `--clay` is the official logo's sun orange
  darkened until it passes — the brand orange itself only manages 2.94:1, so it
  can't be used for text or buttons. `--sun` / `--sun-deep` (the gold on the
  batch cards) are **background-only** for the same reason: ink on them is
  5.36:1, but as text they fail. `--ink-faint` is the lightest text on the page
  at 5.18:1 and exists for the contribution note; don't go lighter without
  checking. `--clay-deep` and `--clay-muted` are resting text colours for the
  Kriya heading stack only, at 6.81:1 and 6.31:1 on that section's band. If you
  add a colour, check it.
- **Shape.** One pill and one shadow exist in the whole file, both on the batch
  cards' Register button and card. A pill is a "buy now" shape and that is the
  only literal "buy now" on the page; everything else separates with a
  hairline. Don't spread either.
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
- [ ] Add real testimonials if you collect them (upcoming batches are in).
