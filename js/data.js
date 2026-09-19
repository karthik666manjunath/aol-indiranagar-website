// ============================================
// SITE CONTENT DATA
// Edit this file to update programs, upcoming
// batches, and testimonials — no logic changes
// needed in main.js.
//
// `icon` is an id from the <svg> sprite at the top of
// index.html (i-lotus, i-stillness, i-seated, i-wave,
// i-spark, i-sunrise, i-book, i-breath, i-clarity,
// i-bloom, i-globe, i-spinecurve). Add a new <symbol>
// there first.
//
// `href` and `ctaLabel` are optional. Every course links
// to #contact and reads "Enquire →" unless you set these —
// used by Spine Care, which has its own page.
// ============================================

window.SITE_DATA = {

  // ---- Programs by category ----
  courseCategories: [
    {
      name: 'Programs',
      tagline: 'Signature Art of Living journeys for a stress-free, happy life',
      courses: [
        {
          icon: 'i-lotus',
          tag: 'Most Popular',
          tagClass: 'tag-accent',
          title: 'Happiness Program',
          desc: 'A transformative journey into the art of living stress-free. Learn practical tools including Sudarshan Kriya, yoga, and wisdom to bring lasting happiness and clarity into daily life.',
        },
        {
          icon: 'i-stillness',
          tag: 'Deep Meditation',
          tagClass: 'tag-calm',
          title: 'Sahaj Samadhi Meditation',
          desc: 'An effortless mantra-based meditation technique that takes you to the deepest state of restful awareness. Experience profound silence, heightened awareness, and inner bliss.',
        },
      ],
    },
    {
      name: 'Yoga Programs',
      tagline: 'Holistic yoga practices for body, breath, and spirit',
      courses: [
        {
          icon: 'i-seated',
          tag: 'All Levels',
          tagClass: 'tag-calm',
          title: 'Sri Sri Yoga',
          desc: 'A holistic approach to yoga combining asanas, pranayama, and meditation. Build strength and flexibility while experiencing deep relaxation, balance, and joy — suitable for every age.',
        },
        {
          icon: 'i-wave',
          tag: 'Restorative',
          tagClass: 'tag-calm',
          title: 'Lemurian Yoga',
          desc: 'A gentle, meditative yoga style rooted in ancient Lemurian wisdom. Slow, flowing movements and deep breath awareness release tension and awaken a profound mind-body connection.',
        },
        {
          icon: 'i-spinecurve',
          tag: 'Posture & Pain Relief',
          tagClass: 'tag-calm',
          title: 'Spine Care Yoga & Posture Program',
          desc: 'Corrects the mechanics behind back, neck and posture pain — sitting mechanics, alignment and targeted strength — for desk workers, chronic pain and prevention alike.',
          href: 'spine-care.html',
          ctaLabel: 'Learn more',
        },
      ],
    },
    {
      name: "Children's Programs",
      tagline: 'Nurturing young minds with yoga, focus, and fun',
      courses: [
        {
          icon: 'i-spark',
          tag: 'For Kids',
          tagClass: 'tag-accent',
          title: 'Intuition Process',
          desc: 'A unique program that helps children tap into their inner intuition and creativity. Builds confidence, sharpens focus, and instills life values through fun, interactive experiences.',
        },
        {
          icon: 'i-sunrise',
          tag: 'Energizing',
          tagClass: 'tag-accent',
          title: 'Utkarsh Yoga',
          desc: 'A dynamic yoga program for children that builds strength, discipline, and self-confidence. Combines asanas, pranayama, and engaging activities to unlock every child\'s full potential.',
        },
        {
          icon: 'i-book',
          tag: 'Focus & Memory',
          tagClass: 'tag-calm',
          title: 'Medha Yoga',
          desc: 'Enhance memory, concentration, and cognitive function through specialized yoga practices. Ideal for students and young minds seeking sharper focus and academic excellence.',
        },
      ],
    },
  ],

  // ---- Upcoming batch card defaults ----
  // Every batch card carries the same heading, price and languages. These are
  // the values it uses; a batch can override any of the three by setting the
  // same key on itself.
  //
  // NOTE: `heading` is what the card displays, and what the filter above the
  // cards groups by. It is NOT the batch's `title` below, which still has to
  // match a program in courseCategories so the contact form can pre-select it. A batch for anything other than the
  // Happiness Program needs its own `heading`, or it inherits this one — the
  // Spine Care batch below sets its own for exactly that reason.
  batchDefaults: {
    heading: 'Happiness Program',
    price: '₹ 2,500',
    languages: 'English, Hindi',
    venue: 'Indiranagar, Bengaluru',
    // Shown when a batch has no `time` of its own.
    time: 'Various timings',
    // The asterisk on the price points at this line, under the button.
    note: 'Your contribution benefits a host of social projects',
    // No `ctaLabel` here on purpose: the button says "Register" when a batch
    // has a `register` link and "Enquire" when it doesn't. Set `ctaLabel` on a
    // batch to override that.
  },

  // ---- Upcoming batches ----
  // A batch drops off the page by itself the day after its `end` date, and
  // when none are left the whole "Upcoming Programs" section and its nav
  // links hide themselves. Cards render sorted by `start`, so order here
  // doesn't matter. Don't invent placeholder dates — that sends people to
  // classes that don't exist.
  // Shape: { start: '2026-09-18', end: '2026-09-20' (ISO dates),
  //          title: <must match a program above>,
  //          time: 'Fri–Sun · 6:00 – 9:00 PM', venue: 'Indiranagar, Bengaluru',
  //          register: 'https://aolt.in/…' }
  // Everything but `start`, `end` and `title` is optional and falls back to
  // batchDefaults above. With `register` the card's button links straight to
  // that page; without it the button opens the contact form with the program
  // pre-selected.
  // The Spine Care dates are also hard-coded in spine-care.html's Details
  // section (that page has no data.js/main.js) — update both if they change.
  upcoming: [
    {
      start: '2026-09-25',
      end: '2026-09-27',
      title: 'Happiness Program',
      time: 'Fri–Sun · 6:00 – 9:00 PM',
      venue: 'Indiranagar, Bengaluru',
      register: 'https://aolt.in/1056654',
    },
    {
      start: '2026-10-01',
      end: '2026-10-04',
      title: 'Spine Care Yoga & Posture Program',
      // Its own heading, so this card stops borrowing the Happiness Program's.
      heading: 'Spine Care Yoga & Posture Program',
      time: 'Thu–Sun · 6:30 – 9:00 AM',
      venue: 'Indiranagar, Bengaluru',
      // No `register` link, so the button reads "Enquire" and scrolls to the
      // contact form with this program already chosen.
      // Enquiry-based, so no price is shown — and with no price there is
      // nothing for the contribution note's asterisk to point at, so that goes
      // too. Setting either to a string brings it back.
      price: null,
      note: null,
    },
    {
      start: '2026-10-02',
      end: '2026-10-04',
      title: 'Happiness Program',
      time: 'Fri–Sun · 9:30 AM – 12:30 PM',
      venue: 'Indiranagar, Bengaluru',
      register: 'https://aolt.in/1034602',
    },
    {
      start: '2026-10-16',
      end: '2026-10-18',
      title: 'Happiness Program',
      time: 'Fri–Sun · 6:00 – 9:00 PM',
      venue: 'Indiranagar, Bengaluru',
      register: 'https://aolt.in/1034600',
    },
  ],

  // ---- Testimonials ----
  // EMPTY = the "Testimonials" section and its nav links hide themselves.
  // The previous four were fabricated names and quotes. Don't publish invented
  // reviews — collect real ones (with the person's permission) and add them here.
  // Shape: { quote: '…', author: 'Full Name', role: 'Occupation, Area', stars: 5 }
  testimonials: [],

};