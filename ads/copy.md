# Ad copy — Happiness Program, Indiranagar

Text to paste into Ads Manager alongside the images in `out/`. Meta cuts
primary text after about 125 characters on mobile ("…See more"), so the first
sentence has to carry the idea on its own. Headlines truncate past about 40.

Same voice as the website: the visitor's problem in their words, then the
answer, then one line on how. No "limited seats", no countdowns.

## A — The hook  (`a-hook-feed.png`, `a-hook-story.png`)

**Primary text**

> Tired, but can't sleep. Busy, but stuck. Relaxing, but still tense.
>
> The body says rest; the mind doesn't listen. Sudarshan Kriya uses the breath — the one language both speak — to bring them back in sync.
>
> Happiness Program, 3 evenings in Indiranagar. Next batch Fri 25 Sep.

**Headline** · Bring your mind in sync with the body
**Description** · Happiness Program · Indiranagar

## B — Relax never works  (`b-relax-feed.png`, `b-relax-story.png`)

**Primary text**

> Telling yourself to relax never works. When the mind won't stop racing, effort only adds noise.
>
> Sudarshan Kriya works underneath the effort: breathe, the body settles, the mind clears. Taught in person over 3 evenings at Art of Living Indiranagar.

**Headline** · Relax is not an instruction
**Description** · Sudarshan Kriya · 3 evenings

## C — The dates  (`c-dates-feed.png`, `c-dates-story.png`)

**Primary text**

> Happiness Program, Indiranagar. Fri–Sun evenings, 6–9 PM.
>
> 25–27 Sep · 2–4 Oct (mornings) · 16–18 Oct. No experience needed, nothing to believe. Register, or ask us anything on WhatsApp.

**Headline** · Next batch: Fri 25 Sep
**Description** · 3 evenings · Indiranagar

## D — Slept, not rested  (use with the A or B images)

Written for the "tired but wired" reader. The hook is the reader's own
observation; line two names the real problem without diagnosing anyone.

**Primary text (full)**

> Eight hours of sleep, and still tired. That isn't a sleep problem.
>
> It's a rest problem. The body lay down; the mind never did. It kept the day running, replaying and planning and bracing, and you woke up having worked all night.
>
> Telling it to stop doesn't work. You've tried. Sudarshan Kriya doesn't ask it to. It uses the breath, the one thing body and mind share, to slow the whole system from underneath, until the mind follows the body down.
>
> Taught in person over three evenings at Art of Living Indiranagar. Fri–Sun, 6–9 PM. Next batch 25–27 Sep. No experience needed, nothing to believe.

**Primary text (short)**

> Eight hours of sleep, and still tired. That isn't a sleep problem.
>
> The body lay down. The mind kept working. Sudarshan Kriya uses the breath to bring the mind down to where the body already is.
>
> Three evenings in Indiranagar. Next batch Fri 25 Sep.

**Headline** · Slept is not the same as rested
**Description** · Happiness Program · 3 evenings

## Destinations

The CTA button depends on where the ad sends people; pick one per campaign.

| Destination | Link | Button |
|---|---|---|
| WhatsApp | +91 99863 47648 (`https://wa.me/919986347648`) | Send WhatsApp Message |
| Register, 25–27 Sep | https://aolt.in/1056654 | Sign Up |
| Register, 2–4 Oct | https://aolt.in/1034602 | Sign Up |
| Register, 16–18 Oct | https://aolt.in/1034600 | Sign Up |
| Register, 18–20 Sep | https://aolt.in/1034608 | (starts tomorrow; don't advertise) |

The aolt.in links open Art of Living's own registration form, so Meta can
count clicks but not completed sign-ups. WhatsApp conversations are counted
natively.

## Which to run

A and B carry no dates, so they don't expire. C names dates and should be
re-rendered when a batch passes (edit the `<ul>` in `c-dates.html`, then
`sh render.sh`). If running only one to start, A: it leads on the feeling the
homepage was built around.
