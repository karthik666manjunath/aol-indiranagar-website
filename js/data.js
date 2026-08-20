// ============================================
// SITE CONTENT DATA
// Edit this file to update programs, upcoming
// batches, and testimonials — no logic changes
// needed in main.js.
//
// `icon` is an id from the <svg> sprite at the top of
// index.html (i-lotus, i-stillness, i-seated, i-wave,
// i-spark, i-sunrise, i-book, i-breath, i-clarity,
// i-bloom, i-globe). Add a new <symbol> there first.
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

  // ---- Upcoming batches ----
  // EMPTY = the whole "Upcoming Programs" section and its nav links hide themselves.
  // The previous entries were invented placeholder dates — publishing those sends
  // people to classes that don't exist. Add real batches and the section reappears.
  // Shape: { day: '05', month: 'Sep', title: <must match a program above>,
  //          category: <must match a category name above>, time: 'Sat & Sun · 7:00 AM – 1:00 PM', seats: 12 }
  // `seats` is optional — omit it and the "Only N seats left" line is left off.
  upcoming: [],

  // ---- Testimonials ----
  // EMPTY = the "Testimonials" section and its nav links hide themselves.
  // The previous four were fabricated names and quotes. Don't publish invented
  // reviews — collect real ones (with the person's permission) and add them here.
  // Shape: { quote: '…', author: 'Full Name', role: 'Occupation, Area', stars: 5 }
  testimonials: [],

};