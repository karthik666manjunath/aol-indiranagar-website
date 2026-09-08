// ============================================
// Art of Living Happiness Center - Indiranagar
// Behavior only — content lives in js/data.js
//
// Deliberately quiet. There is no scroll-reveal, no
// counting-up statistics, no auto-advancing carousel
// and no floating back-to-top button. Those are
// attention-grabbing devices, and this is a page about
// not being agitated. Nothing here animates unless the
// visitor asks it to.
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const { courseCategories, upcoming, testimonials } = window.SITE_DATA;

  const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="#${id}"/></svg>`;

  // Hide a section (and every nav/footer link pointing at it) when it has no
  // content, so an empty data list never ships as an empty section or a dead
  // anchor.
  function hideSection(id) {
    document.getElementById(id).hidden = true;
    document.querySelectorAll(`a[href="#${id}"]`).forEach(a => {
      (a.closest('li') || a).hidden = true;
    });
  }

  // ---- Render Categorized Courses ----
  const coursesGrid = document.getElementById('coursesGrid');
  courseCategories.forEach(cat => {
    const block = document.createElement('div');
    block.className = 'course-category';
    block.innerHTML = `
      <div class="category-header">
        <h3>${cat.name}</h3>
        <p>${cat.tagline}</p>
      </div>
      <div class="category-grid">
        ${cat.courses.map(c => `
          <a class="course-row" href="${c.href || '#contact'}" aria-label="${c.ctaLabel || 'Enquire'} about ${c.title}">
            <span class="course-icon">${icon(c.icon)}</span>
            <div class="course-head">
              <h3>${c.title}</h3>
              <span class="course-tag ${c.tagClass}">${c.tag}</span>
            </div>
            <p class="course-desc">${c.desc}</p>
            <span class="course-cta">${c.ctaLabel || 'Enquire'} &rarr;</span>
          </a>
        `).join('')}
      </div>
    `;
    coursesGrid.appendChild(block);
  });

  // ---- Populate the contact form's course picker from the same data ----
  const courseSelect = document.getElementById('course');
  courseCategories.forEach(cat => {
    const group = document.createElement('optgroup');
    group.label = cat.name;
    cat.courses.forEach(c => group.appendChild(new Option(c.title, c.title)));
    courseSelect.appendChild(group);
  });

  // ---- Render Upcoming Programs ----
  const upcomingList = document.getElementById('upcomingList');
  upcoming.forEach(u => {
    const card = document.createElement('div');
    card.className = 'upcoming-card';
    card.innerHTML = `
      <div class="upcoming-date">
        <span class="day">${u.day}</span>
        <span class="month">${u.month}</span>
      </div>
      <div class="upcoming-info">
        <h3>${u.title}</h3>
        <div class="upcoming-meta">
          <span>${u.category}</span>
          <span>${u.time}</span>
          ${u.venue ? `<span>${u.venue}</span>` : ''}
          ${u.seats ? `<span class="seats-left">${u.seats} places</span>` : ''}
        </div>
      </div>
      <a href="#contact" class="btn btn-outline btn-sm reserve-btn" data-program="${u.title}">Enquire</a>
    `;
    upcomingList.appendChild(card);
  });
  if (!upcoming.length) hideSection('upcoming');

  // Pre-select the program in the contact form when enquiring about a batch
  upcomingList.addEventListener('click', (e) => {
    const btn = e.target.closest('.reserve-btn');
    if (!btn) return;
    courseSelect.value = btn.dataset.program;
    // Catches a typo'd `title` in data.js while you're editing it, instead of
    // silently leaving the form's program picker blank for the visitor.
    if (!courseSelect.value) {
      console.warn(`data.js: upcoming batch "${btn.dataset.program}" doesn't match any course title.`);
    }
  });

  // ---- Testimonials ----
  // Manual only. An auto-advancing carousel moves the page out from under
  // whoever is reading it.
  const slider = document.getElementById('testimonialSlider');
  const dotsContainer = document.getElementById('sliderDots');
  let currentSlide = 0;

  testimonials.forEach((t, i) => {
    const slide = document.createElement('div');
    slide.className = `testimonial-slide${i === 0 ? ' active' : ''}`;
    slide.innerHTML = `
      <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
      <p class="testimonial-quote">${t.quote}</p>
      <p class="testimonial-author">${t.author}</p>
      <p class="testimonial-role">${t.role}</p>
    `;
    slider.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = `slider-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  if (!testimonials.length) hideSection('testimonials');

  // ---- Navbar background & active link ----
  // The navbar only gains a background on scroll; it no longer inverts its
  // text colour, because the hero is light now.
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = [...document.querySelectorAll('section[id]')].filter(s => !s.hidden);

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  // ---- Hamburger Menu ----
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  function setMenu(open) {
    hamburger.classList.toggle('open', open);
    navMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  }

  hamburger.addEventListener('click', () => setMenu(!navMenu.classList.contains('open')));
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });

  // ---- Contact Form ----
  // ponytail: hands the enquiry off to the center's mail client — no backend,
  // no signup, nothing to keep running. It previously showed a thank-you and
  // threw the enquiry away, which is worse than having no form at all.
  // For WhatsApp instead (better on mobile in India), swap the mailto line for:
  //   window.location.href = `https://wa.me/919986347648?text=${encodeURIComponent(body)}`;
  // Want submissions in a spreadsheet/inbox without opening a mail app? Point
  // the <form> at a Formspree/Google Form endpoint and delete this handler.
  const CENTER_EMAIL = 'programs.artofliving@gmail.com';
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = form.elements;
    const name = f.name.value.trim();
    const phone = f.phone.value.trim();

    if (!name || !phone) {
      formNote.textContent = 'Please fill in your name and phone number.';
      formNote.className = 'form-note error';
      return;
    }

    const body = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${f.email.value.trim() || '—'}`,
      `Interested in: ${f.course.value || '—'}`,
      '',
      f.message.value.trim(),
    ].join('\n');

    window.location.href = `mailto:${CENTER_EMAIL}`
      + `?subject=${encodeURIComponent(`Website enquiry from ${name}`)}`
      + `&body=${encodeURIComponent(body)}`;

    formNote.textContent = 'Opening your email app to send the enquiry.';
    formNote.className = 'form-note success';
    setTimeout(() => { formNote.textContent = ''; }, 8000);
  });

  // ---- Footer Year ----
  document.getElementById('year').textContent = new Date().getFullYear();

});
