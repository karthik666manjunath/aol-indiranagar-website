# aol-indiranagar-website

Homepage for the Art of Living Happiness Center, Indiranagar, Bengaluru.

## Running it

Open `index.html`. There is no build step and no dependencies. Fonts, the
logo, the map and the photograph are all served from this repo; the one
third-party request is the Meta Pixel in each page's `<head>`, which lets Ads
Manager count visits from the ads and, via `js/main.js`, taps on Register.

## Where things live

| | |
|---|---|
| `js/data.js` | **All content**: programs, upcoming batches, testimonials. Edit here, not in `main.js`. |
| `js/main.js` | Behaviour only. |
| `css/style.css` | Design tokens are at the top and are the whole system. |
| `img/`, `fonts/` | Assets. |
| `ads/` | Meta ad creatives. Three concepts as HTML on the site's tokens, `sh render.sh` turns them into 1:1 and 9:16 PNGs in `ads/out/`; `copy.md` has the matching ad text. `c-dates.html` names batch dates — edit and re-render when one passes. |

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
`index.html` changes what gets shared.

The message is plain text with plain labels — `Program:`, `Date:`, `Time:`,
`Location:`, `Details:`, `Email:`, `Phone:`, `Register / Enquire:` — and
deliberately carries **no emoji**. The calendar, clock and pin characters it
used to have are astral-plane codepoints, and they arrived as question marks
wherever something in the chain couldn't encode them. Don't reintroduce them.

The contact lookup selects `#contact .contact-details a` and sorts by href
prefix, so the WhatsApp links in that block (`https://wa.me/…`) are ignored and
the two numbers are not listed twice. Keep that class and those prefixes if you
rework the contact block. Copy link tries `navigator.clipboard`
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

## Hero carousel

Four slides at the top of the home page, stacked in one grid cell so the
tallest sets the height and a change of slide is a cross-fade with no reflow.
`#home` — what the nav links to — is the carousel section.

**One component, one scale.** The four slides share `--hc-eyebrow`,
`--hc-title`, `--hc-body` and `--hc-gap`, declared on `.hero-carousel`, and one
CTA: `.btn-register`. Slide 1 is the standalone hero markup, so it arrives
carrying the page-level type scale (`--fs-display`, `.btn-lg`) that suits a
whole first screen and not a quarter of a carousel — at that size it stood
~230px taller than the rest and, because of the shared grid cell, set the
height for all four. `.hc-slide .hero` overrides it back onto the `--hc-*`
scale. **If you add a slide, take the type from these tokens rather than
inventing a size**, or it will silently drive everyone else's height.

`--nav-h` is the fixed header's height (81px, 68px below 768px where the logo
shrinks). `.hero-carousel` pads its top by exactly that: the slide grounds are
`inset: 0` on `.hc-slide`, so they cover the slide but not the shell's padding,
and any extra left a strip of untinted sand between the header and the wash.
Matching it exactly means the ground starts on the header's bottom edge.
**Don't add top padding here** — put breathing room inside the slide, where the
ground covers it.

The dot/arrow row is **overlaid on the foot of the slide**, not laid out under
it. In flow it rendered on the shell's own sand — below every slide's ground —
which is exactly what made it read as a separate strip; the carousel now has no
bottom padding at all and ends where the slide ends. `.hc-slide` carries
`padding-bottom: 46px` so the copy stops short of the controls.

Because the controls now sit **on** the slides, they have to cope with slide 4,
the one photographic (dark) ground. `hcGo()` writes the active slide's kind to
`data-slide` on the carousel, and `.hero-carousel[data-slide="goa"]` flips the
arrows and dots to light. **Add a dark slide and you must add it to that
selector**, or its controls will be near-invisible.

Slide height is `clamp(420px, 56vh, 560px)`, which puts the carousel at roughly
two-thirds to three-quarters of the viewport on a laptop.

Each slide carries its own ground, as a `::before` on the slide itself so it
cross-fades with the copy instead of switching under it: the hero's warm and
cool corners, then a terracotta sweep, then the warm side a shade deeper where
there is something to act on. `.hero-carousel` is plain sand, which is what the
slides blend over mid-transition.

**Slide 2's sweep is contrast-bound, not decorative.** Every word on it is set
in the terracotta family (`--clay-deep`, `--clay`, `--clay-muted`), and `--clay`
needs a background luminance of about `0.76` — roughly `#F5DFD0` — to hold
4.5:1. So the deep terracotta lives in two washes anchored off-canvas at
opposite corners, spent before they reach the centre; the linear layer beneath
is what the copy actually sits on. Below 768px the copy box spans nearly the
full width and the corners reach it, so the washes are pulled back there — at
full strength the claim measured 4.47:1, which clears AA as large text but not
the 4.5 floor the rest of the site keeps. Measured worst case is now 4.78:1 at
500px and 4.91:1 at 1280px, both on the claim. **Re-measure all five text
colours if you deepen or re-aim any of the three layers.**

**Slide 3 used to carry the lockup as a watermark behind the copy, and no
longer does.** It was worth recording why, because the idea is tempting to
retry. The emblem was wider than the copy box so its edges would read in the
clear, and a veil (`::after`) lifted the ground where the words were. But the
copy fills most of the slide at every width, so the emblem and the text wanted
the same pixels: at any opacity where the mark was actually legible, the clay
eyebrow and the clay "explore" link dropped under AA, and the veil that fixed
them erased the mark it was there to show. Strengthening one always cost the
other. The slide now has a plain warm ground and no mark, and every text pair
clears 4.5:1 with room to spare.

If you want the lockup back here, it needs somewhere the copy is not — a
reserved column, not the full-bleed centre.

Slide 4 is the Goa teaser — an announcement, not a course card, so there is no
price, no itinerary and one CTA that goes to `#contact`. It is the only slide
that reverses the page's dark-on-light, because it sits on a photograph.

Two crops of the same frame, both cut from a 2675x3013 original:

| file | size | used |
|---|---|---|
| `goa-getaway.webp` | 1800x782, 68KB | default |
| `goa-getaway-portrait.webp` | 820x1463, 32KB | at 768px and below |

The wide band is 2.3:1 and a phone slide is about 0.56:1, so `cover` on the
band alone threw away nearly all of it and left a narrow vertical strip. The
portrait crop is cut to roughly the phone's own proportions, so the whole scene
survives; it swaps in by overriding `--hc-goa-image` in the 768px block.

Both are EXIF-stripped — the original was a phone photo and would have carried
GPS. Re-cropping from a new original: the wide one wants about 2.3:1 with the
sun near 40% of its height; the portrait one about 0.56:1. Note `sips` silently
skips a crop whose width equals the source's, or whose offset plus size lands
exactly on the edge — give it a pixel of slack either way.

The copy sits **left**, over the open water, which leaves the sun and the
figures on the right of the frame in the clear — that framing is why the band
was cut where it was.

The scrim is in two parts and is **shaped to the copy, not laid over the
frame**: a soft ellipse where the words are, and a light wash elsewhere, so the
photograph stays a photograph. Desktop and mobile are tuned separately, because
the two crops are lit differently — tightest pairs 118% and 125% of what AA
needs, sampled from rendered pixels. Both ellipses are centred on the copy
block, not on the slide; moving the copy means moving them. Dropping the logo
chip shifted the text up 31px and cost the eyebrow 0.4:1 until the desktop
ellipse followed it.

**Swapping a photograph means re-measuring.** These are tuned close: lightening
the desktop scrim by a third dropped the eyebrow to 4.22:1, and shortening the
mobile ellipse dropped "More details coming soon." to 3.51:1 — both under AA.
The method: screenshot the slide with `.hc-inner` hidden, decode the PNG, take
the *lightest* background pixel inside each text box.

Slide 1 is the hero, markup unchanged. Slide 2 restates Why Sudarshan Kriya in
that section's own type, as `<p class="kriya-title">` rather than a second
`<h2>`, so the outline doesn't carry the heading twice. Slide 3 is the next
batch, taken from `live[0]` — the same filtered, date-sorted list the Upcoming
Programs section renders — with its blurb looked up from `courseCategories` by
title, plus a secondary "Explore all upcoming courses" link to `#upcoming` —
one featured course in the carousel, the full list one click away. Nothing is
duplicated or hardcoded, and both original sections stay where they were.

All three slides share one shell — a single `min-height` on `.hc-slide`, one
set of type tokens on `.hero-carousel` (`--hc-title`, `--hc-body`,
`--hc-eyebrow`, `--hc-gap`) and one CTA treatment. Change a token and all three
follow. Slide 1 keeps the page's `<h1>` at display size; it is the landing
headline and matching it to the other two would flatten the page.

**Auto-advance is the one piece of self-starting motion on the site.** Seven
seconds a slide. It pauses while someone is using the carousel — pointer
inside, focus inside, tab in the background — and resumes afterwards; a manual
move (arrow, dot, key or swipe) restarts the clock rather than stopping it, so
a slide never gets cut short right after you land on it. A visitor who has
asked for reduced motion gets no movement at all, and the controls still work.
Inactive slides get `inert` as well as `aria-hidden`, so a faded-out slide's
links can't be tabbed into. Swipes only count when clearly horizontal, and
nothing is `preventDefault`-ed, so vertical scrolling is untouched.

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

## The Happiness Getaway page

`happiness-getaway.html` — an early announcement for the Goa long weekend, not
a registration page: no fees, no itinerary, no session times, one CTA.

**The hero carries the facts; nothing below repeats them.** Dates, place and
program names appear once, up top. The sections under it are there for feeling,
not information — if you find yourself adding a date or a program name to one
of them, it probably belongs in the hero or the FAQ instead. **There is no Art
of Living logo or organiser line anywhere in `<main>`**; the header and footer
carry all of the brand context, and that is deliberate — don't add a lockup
back into the page body. It reuses the site's header, footer, tokens and
buttons; nothing was invented for it. Reached from the footer's **Quick Links** on every page, deliberately not
from the header nav.

The CTA goes to `index.html#contact`, not `#contact` — the Get In Touch section
lives on the homepage and this is a separate page. Don't copy the contact form
here; its handler is in `main.js` and expects the homepage's elements.

The FAQ is `<details>`/`<summary>`, so it opens with no script at all and works
if JavaScript never arrives.

### The middle, between hero and FAQ

One section, `.gw-exp` — the whole middle of the page. The sky photograph is
the ground for all of it: the heading, the rhythm line and the proposition sit
straight on the image, and the four blocks sit on it as a single frosted panel.

Order inside it is fixed by the brief: heading (`TAKE A BREAK. MAKE IT
COUNT.`), then `Breathe · Reflect · Explore`, then the three-line proposition,
then the blocks. The heading is written in sentence case in the markup and
uppercased by `.gw-caps-h`, so assistive tech reads it as words rather than
spelling out letters; that rule also supplies the positive tracking and the
step down in size that caps need against `.gw-h2`'s defaults.

**The four blocks are client-approved copy — don't reword or reorder them.**
They are one panel, not four cards: a translucent warm-white surface with
`backdrop-filter`, hairline borders between cells (borders, not grid gaps, so
no sky shows through the middle), `940px` max width, `22px 26px` cells,
`--clay` titles and `--ink-soft` descriptions at `16px`. There is an
`@supports not` fallback that makes the panel near-opaque where
`backdrop-filter` is missing, because a flat translucent sheet over a photo
goes muddy.

The proposition's three lines are broken with `<br>`, so `.gw-prop` is sized in
`ch` wide enough that none of them wrap on their own.

**The spacing is deliberately tight** — `64px` section padding, `32px` under
the head block, `12px`/`20px` between heading, rhythm line and proposition,
stepping down at `1000px` and again at `768px`. The target is the whole
section inside one laptop screen, and it measures `667px` tall at 1280 and
1440. If you add padding back, check that number first.

**Don't swap `goa-sky.webp` for a beach, sunset or stock wellness photo**, and
don't split this back into separate sections — no morning/afternoon/evening
breakdown, no second benefits or "why this getaway" section. The sky is a sky
because dark text needs a bright, low-detail backdrop to stay legible.

### The closing, `.gw-close`

Minimal and emotional: one sentence and one button on the horizon crop, and
**no heading on purpose** — the line that used to sit here now opens the
experience section, and a second one would just restate it. The section carries
an `aria-label` instead of `aria-labelledby`, because there is no heading left
to point at.

Nothing here repeats the hero — no dates, no program names, no logo, no
organiser line, no "more details coming soon". If you find yourself adding one,
it belongs in the hero or the FAQ.

### The one animation: `.gw-fade`

The `.gw-exp` section fades up once as it scrolls in. It is built so that **content is
never hidden by CSS alone**:

- The stylesheet shows `.gw-fade` normally. A page with no JavaScript, or with
  a broken `page.js`, renders it visibly.
- `page.js` adds `.is-armed` itself, which is what applies `opacity: 0`. Only a
  running script can hide it.
- An `IntersectionObserver` then adds `.is-in` to fade it back. A `2000ms`
  `setTimeout` reveals everything regardless, so a browser without
  `IntersectionObserver` — or one that never fires it — still shows the copy.
- Under `prefers-reduced-motion` nothing is armed at all.

Reuse the class if you add another fade; don't invent a variant that hides
content in the stylesheet.

### Its images, and what is missing

**All four Goa images on the site are crops of one photograph.** There is one
frame, and the page asks for several. What is there:

| file | where |
|---|---|
| `goa-getaway.webp` | carousel slide 4 + this page's hero |
| `goa-getaway-portrait.webp` | both, below 768px |
| `goa-sky.webp` | the `.gw-exp` section — heading, proposition and blocks |
| `goa-horizon.webp` | the closing section |

The closing band is a different *crop*, not a different photograph, which is
the one thing the brief asked for that could not be delivered. **Still needed:
lifestyle imagery** — cafés, people, food, a second location — which is why the
four blocks are type-led, and a genuinely separate sunset frame for the
closing.

Each swaps in by replacing the file, or by pointing the URL in `style.css` at a
new one. **Re-measure contrast after any swap** — the scrims are tuned to these
crops, not generically safe. The tightest pair on this page today is the
`--clay` block titles on the frosted panel at 5.37:1.

## Conventions worth knowing before editing

- **Contrast.** Every foreground/background pair was checked against WCAG AA;
  the lowest on the page is 4.97:1. `--clay` is the official logo's sun orange
  darkened until it passes — the brand orange itself only manages 2.94:1, so it
  can't be used for text or buttons. `--sun` / `--sun-deep` (the gold on the
  batch cards) are **background-only** for the same reason: ink on them is
  5.36:1, but as text they fail. `--ink-faint` is the lightest text on the page
  at 5.18:1 and exists for the contribution note; don't go lighter without
  checking. `--clay-deep` and `--clay-muted` are resting text colours for the
  Kriya heading stack, at 6.81:1 and 6.31:1 on that section's band;
  `--clay-deep` is also the getaway rhythm line and the proposition's
  emphasis line, both of which sit straight on the sky photo: `--clay`
  measured 4.55:1 and 4.39:1 there and missed AA, `--clay-deep` gets 5.46:1
  and 5.98:1. Plain `--clay` is still fine on the frosted panel below, where
  the ground is near-opaque. If you
  add a colour, check it.
- **Vertical rhythm.** `--section-y` is the gap between major sections:
  `88px`, stepping to `72px` at 1000px and `56px` at 768px. `.section`,
  `.cta-banner` and `.gw-close` all read it, so no section invents its own
  gap. Remember two adjacent sections put **twice** this between blocks —
  the old flat `120px` meant 240px of dead space at every seam. It is a
  ceiling, not a target: sections that are deliberately tighter (`.kriya` at
  56, `.gw-exp` at 64, `.gw-faq`'s 64 top) keep their smaller values. Heroes
  are not in this system — they clear the fixed header instead, via
  `--nav-h`.
- **Shape.** One pill and one shadow exist in the whole file, both on the batch
  cards' Register button and card. A pill is a "buy now" shape and that is the
  only literal "buy now" on the page; everything else separates with a
  hairline. Don't spread either.
- **Motion.** There is deliberately no counting statistics, and scroll-reveal
  is kept to one place. Two exceptions exist, both added on request against
  this rule: the hero carousel, and the single `.gw-fade` fade-up on the
  getaway page's cloud band — see both above. Everything else stays still.
  This is a page about not being agitated.
- **The logo** (`img/aol-logo.svg`) is the official asset. Don't recolour,
  redraw or stretch it; height is set in CSS and the width follows.
- **The map** is a static image built from OpenStreetMap tiles, not a Google
  iframe. The ODbL attribution is burned into the image and must stay.

## Open before launch

- [ ] Consent from the people in `img/hero-class.webp` before it is public.
- [ ] Confirm the opening hours claimed in the hero stats strip.
- [ ] Set the real domain in the `canonical` / `og:url` / `og:image` tags.
- [ ] Add real testimonials if you collect them (upcoming batches are in).
