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

  const icon = (id, cls = '') =>
    `<svg class="icon${cls ? ' ' + cls : ''}" aria-hidden="true"><use href="#${id}"/></svg>`;

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
  // One card per batch. Batches whose last day has passed drop off by
  // themselves, so nobody has to remember to edit data.js the morning after a
  // course ends.
  const upcomingList = document.getElementById('upcomingList');
  const today = new Date(new Date().toDateString()); // local midnight
  const live = upcoming
    .filter(u => new Date(u.end) >= today)
    .sort((a, b) => a.start.localeCompare(b.start));

  // "19–21 Sep, 2026". A batch that crosses a month repeats the month
  // ("30 Sep – 2 Oct, 2026") and one that crosses a new year repeats both
  // ("30 Dec 2026 – 1 Jan 2027"), so a range is never ambiguous.
  // en-US, not en-IN: en-IN abbreviates September as "Sept", the rest of the
  // site uses three letters.
  const dayOf   = (iso) => String(Number(iso.slice(8, 10)));
  const monthOf = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short' });
  const yearOf  = (iso) => iso.slice(0, 4);

  function dateRange(u) {
    const { start, end } = u;
    if (start === end) return `${dayOf(start)} ${monthOf(start)}, ${yearOf(start)}`;
    if (yearOf(start) !== yearOf(end)) {
      return `${dayOf(start)} ${monthOf(start)} ${yearOf(start)} – ` +
             `${dayOf(end)} ${monthOf(end)} ${yearOf(end)}`;
    }
    if (monthOf(start) !== monthOf(end)) {
      return `${dayOf(start)} ${monthOf(start)} – ${dayOf(end)} ${monthOf(end)}, ${yearOf(start)}`;
    }
    return `${dayOf(start)}–${dayOf(end)} ${monthOf(start)}, ${yearOf(start)}`;
  }

  // The four facts, each behind the same badge. Icons are decorative — the
  // label beside every one says the same thing — so they stay aria-hidden and
  // the white-on-gold glyph isn't carrying any meaning on its own.
  function fact(iconId, label, text) {
    return `
          <div class="batch-fact">
            <span class="fact-badge">${icon(iconId)}</span>
            <span><span class="sr-only">${label}: </span>${text}</span>
          </div>`;
  }

  // Each card gets a stable id so it can be linked to on its own. The slug
  // comes from the batch's real `title`, not the displayed heading, which is
  // the same string on every card and would collide.
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const cardId = (u) => `batch-${u.start}-${slug(u.title)}`;

  // What each card needs when someone shares it. Kept here rather than in
  // data-* attributes so the text never has to survive a trip through HTML
  // escaping — and so the share menu reads exactly what the card displays.
  const shareable = new Map();

  function batchCard(u) {
    const d = { ...window.SITE_DATA.batchDefaults, ...u };
    const when = dateRange(u);
    const id = cardId(u);
    shareable.set(id, { heading: d.heading, when, time: d.time, venue: d.venue });

    // btn-primary plus .btn-register: the card's call to action, styled where
    // the header's "Enrol Now" used to be defined.
    // A batch with a booking link says Register, because that is what the
    // button does. Without one the only place to send people is the contact
    // form, and a button that scrolls down the page shouldn't claim to be
    // enrolling anyone — so it says Enquire. Set `ctaLabel` on a batch to
    // override either. The scroll itself is the stylesheet's `scroll-behavior:
    // smooth`, which already stands down under prefers-reduced-motion.
    const cta = d.ctaLabel || (u.register ? 'Register' : 'Enquire');
    const button = u.register
      ? `<a href="${u.register}" target="_blank" rel="noopener" class="btn btn-primary btn-register"
            aria-label="${cta} for ${d.heading}, ${when}">${cta}</a>`
      : `<a href="#contact" class="btn btn-primary btn-register reserve-btn" data-program="${u.title}"
            aria-label="${cta} about ${d.heading}, ${when}">${cta}</a>`;

    // Price and note are a pair: the asterisk on one points at the other, so a
    // batch that drops the note drops the asterisk with it. An enquiry-only
    // batch drops both — see the Spine Care batch in data.js.
    const star = d.note ? '<span aria-hidden="true">*</span>' : '';
    const priceEl = d.price
      ? `<p class="batch-price">${d.price}${star}</p>`
      : '';
    const noteEl = d.note ? `<p class="batch-note">*${d.note}</p>` : '';

    return `
      <article class="batch-card${d.price ? '' : ' no-price'}" id="${id}"
               data-program="${d.heading}">
        <div class="batch-heading">
          <h3 class="batch-title">${d.heading}</h3>
          <div class="share">
            <button type="button" class="share-btn" aria-expanded="false"
                    aria-controls="${id}-share" aria-label="Share ${d.heading}, ${when}">
              ${icon('i-share')}
            </button>
            <div class="share-menu" id="${id}-share" hidden>
              <button type="button" class="share-copy" title="Copy link"
                      aria-label="Copy link to ${d.heading}, ${when}">${icon('i-link')}</button>
              <a class="share-wa" href="#" target="_blank" rel="noopener" title="Share on WhatsApp"
                 aria-label="Share ${d.heading}, ${when}, on WhatsApp">${icon('i-whatsapp', 'icon-solid')}</a>
            </div>
          </div>
        </div>
        ${priceEl}
        <div class="batch-facts">
          ${fact('i-calendar', 'Dates', when)}
          ${fact('i-clock', 'Timing', d.time)}
          ${fact('i-pin', 'Location', d.venue)}
          ${fact('i-globe', 'Languages', d.languages)}
        </div>
        <div class="batch-action">
          ${button}
          ${noteEl}
        </div>
      </article>
    `;
  }

  upcomingList.innerHTML = live.map(batchCard).join('');
  if (!live.length) hideSection('upcoming');

  // Pre-select the program in the contact form when someone enquires about a
  // batch that has no booking link of its own — the button only scrolls them
  // to the form, so it has to arrive already filled in.
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

  // ---- Filter by program type ----
  // The options are the distinct headings of the batches actually on the page,
  // so adding a new kind of program to data.js puts it in the list without
  // anyone touching this file. With only one kind there is nothing to filter
  // between, so the whole control stays out of the way.
  const filter = document.getElementById('programFilter');
  const filterToggle = document.getElementById('programFilterToggle');
  const filterPanel = document.getElementById('programFilterPanel');
  const filterValue = document.getElementById('programFilterValue');
  const emptyNote = document.getElementById('upcomingEmpty');
  const headingOf = (u) => ({ ...window.SITE_DATA.batchDefaults, ...u }).heading;
  const programs = [...new Set(live.map(headingOf))].sort((a, b) => a.localeCompare(b));

  // Built as nodes, not markup: a program name is free text and at least one
  // of them already contains an ampersand.
  function optionRow(name, isAll) {
    const row = document.createElement('label');
    row.className = 'multiselect-option';
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.value = name;
    if (isAll) {
      box.dataset.all = '';
      box.checked = true;
    }
    const text = document.createElement('span');
    text.textContent = isAll ? 'All Programs' : name;
    row.append(box, text);
    return row;
  }

  if (programs.length > 1) {
    filterPanel.append(optionRow('', true));
    const sep = document.createElement('div');
    sep.className = 'multiselect-sep';
    filterPanel.append(sep);
    programs.forEach(name => filterPanel.append(optionRow(name, false)));
    filter.hidden = false;
  }

  const allBox = () => filterPanel.querySelector('input[data-all]');
  const programBoxes = () => [...filterPanel.querySelectorAll('input:not([data-all])')];
  const chosen = () => programBoxes().filter(b => b.checked).map(b => b.value);

  function applyFilter() {
    const showAll = allBox() ? allBox().checked : true;
    const wanted = chosen();
    let shown = 0;

    upcomingList.querySelectorAll('.batch-card').forEach(card => {
      // Several types selected means "any of these", not "all of these" — a
      // batch only ever belongs to one program.
      const match = showAll || wanted.includes(card.dataset.program);
      card.hidden = !match;
      if (match) shown += 1;
    });

    emptyNote.hidden = shown > 0;

    // Say what is on, with the panel shut. One name reads better than "1
    // program selected"; past that the names are longer than the button, and
    // the panel is where you go to see exactly which. Nothing pretends to be a
    // selection when there is none.
    filterValue.textContent =
      showAll ? 'All Programs'
      : wanted.length === 0 ? 'None selected'
      : wanted.length === 1 ? wanted[0]
      : `${wanted.length} selected`;
  }

  filterPanel.addEventListener('change', (e) => {
    const box = e.target;
    if (box.dataset.all !== undefined) {
      // Behaves like a reset, not a peer: picking it clears the rest, and
      // clicking it while it is already on leaves it on — turning it off by
      // itself would only empty the page.
      box.checked = true;
      programBoxes().forEach(b => { b.checked = false; });
    } else if (box.checked) {
      allBox().checked = false;
    }
    // A menu on a card that is about to disappear would be left floating over
    // the cards below it.
    closeMenus();
    applyFilter();
  });

  // Same open/close manners as the share menu: click outside or press Escape.
  function closeFilterPanel() {
    filterPanel.hidden = true;
    filterToggle.setAttribute('aria-expanded', 'false');
  }

  filterToggle.addEventListener('click', () => {
    const open = filterToggle.getAttribute('aria-expanded') === 'true';
    filterPanel.hidden = open;
    filterToggle.setAttribute('aria-expanded', String(!open));
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.multiselect')) closeFilterPanel();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || filterPanel.hidden) return;
    closeFilterPanel();
    filterToggle.focus();
  });

  // ---- Share a single batch ----
  // Two ways out: a link to this card, or the same thing as a WhatsApp
  // message. The contact lines are read out of the Get In Touch section every
  // time the menu opens rather than repeated here, so a number changed in
  // index.html changes what gets shared — there is one copy of the phone
  // number and email on this site, and it is the one on the page.
  function contactLines() {
    const out = { emails: [], phones: [] };
    document.querySelectorAll('#contact .contact-details a').forEach(a => {
      const href = a.getAttribute('href') || '';
      const text = a.textContent.trim();
      if (href.startsWith('mailto:')) out.emails.push(text);
      else if (href.startsWith('tel:')) out.phones.push(text);
    });
    return out;
  }

  const cardUrl = (id) => {
    const url = new URL(window.location.href);
    url.hash = id;
    return url.href;
  };

  function shareMessage(id) {
    const c = shareable.get(id);
    const { emails, phones } = contactLines();
    const lines = [
      c.heading,
      `\u{1F4C5} ${c.when}`,
      `\u{1F550} ${c.time}`,
      `\u{1F4CD} ${c.venue}`,
    ];
    // Skip the whole block rather than send "For enquiries:" with nothing
    // under it, which is what would happen if the contact section changed.
    if (emails.length || phones.length) {
      lines.push('', 'For enquiries:');
      emails.forEach(e => lines.push(`\u{1F4E7} ${e}`));
      phones.forEach(p => lines.push(`\u{1F4DE} ${p}`));
    }
    lines.push('', `\u{1F517} ${cardUrl(id)}`);
    return lines.join('\n');
  }

  // Two ways to reach the clipboard, tried in order. navigator.clipboard is
  // the right one but it needs a secure context and a focused document, and
  // it refuses outright on some mobile browsers; plain http — which this is
  // over a LAN, and file:// is its own case — doesn't get it at all. The
  // textarea trick is deprecated and works everywhere, so it catches the rest
  // rather than the visitor being told to copy the link by hand.
  function copyViaTextarea(text) {
    return new Promise((resolve, reject) => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length); // iOS ignores select() on its own
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error('execCommand copy refused'));
    });
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(() => copyViaTextarea(text));
    }
    return copyViaTextarea(text);
  }

  // One live region for the whole section: the copy button's label changes
  // too, but a label changing mid-click isn't reliably announced.
  let hoverTimer = null;

  const shareStatus = document.createElement('p');
  shareStatus.className = 'sr-only';
  shareStatus.setAttribute('role', 'status');
  upcomingList.after(shareStatus);

  function closeMenus(except) {
    upcomingList.querySelectorAll('.share-btn[aria-expanded="true"]').forEach(btn => {
      if (btn === except) return;
      btn.setAttribute('aria-expanded', 'false');
      document.getElementById(btn.getAttribute('aria-controls')).hidden = true;
    });
  }

  // Both ways in — clicking the button and hovering it — come through here, so
  // there is one place that knows what "open" means.
  function openMenu(btn) {
    clearTimeout(hoverTimer);
    if (btn.getAttribute('aria-expanded') === 'true') return;
    closeMenus(btn);
    const menu = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
    // Built on open, not at render: the WhatsApp text has to carry whatever
    // the contact section says right now.
    const id = btn.closest('.batch-card').id;
    menu.querySelector('.share-wa').href =
      'https://wa.me/?text=' + encodeURIComponent(shareMessage(id));
  }

  upcomingList.addEventListener('click', (e) => {
    const toggle = e.target.closest('.share-btn');
    if (toggle) {
      if (toggle.getAttribute('aria-expanded') === 'true') closeMenus();
      else openMenu(toggle);
      return;
    }

    const copy = e.target.closest('.share-copy');
    if (copy) {
      const id = copy.closest('.batch-card').id;
      // Cached the first time, because by the second click the live label is
      // "Link copied" and restoring to that would make it permanent.
      const label = copy.dataset.label ||
        (copy.dataset.label = copy.getAttribute('aria-label'));
      const restore = () => {
        copy.innerHTML = icon('i-link');
        copy.classList.remove('is-copied');
        copy.title = 'Copy link';
        copy.setAttribute('aria-label', label);
        shareStatus.textContent = '';
      };

      copyText(cardUrl(id)).then(() => {
        copy.innerHTML = icon('i-check');
        copy.classList.add('is-copied');
        copy.title = 'Link copied';
        copy.setAttribute('aria-label', 'Link copied');
        shareStatus.textContent = 'Link copied to clipboard.';
      }).catch(() => {
        copy.title = 'Copying was blocked';
        shareStatus.textContent =
          'Copying was blocked by the browser — the link is ' + cardUrl(id);
      }).finally(() => {
        clearTimeout(Number(copy.dataset.timer));
        copy.dataset.timer = String(setTimeout(restore, 2500));
      });
      return;
    }

    if (e.target.closest('.share-wa')) closeMenus();
  });

  // ---- Hover ----
  // Only for a pointer that can actually hover. A touchscreen fires a
  // synthetic mouseenter on tap, which would open the menu and let the click
  // that follows immediately close it again — checked per event rather than
  // once at load, so plugging a mouse into a tablet starts working.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  upcomingList.querySelectorAll('.share').forEach(share => {
    const btn = share.querySelector('.share-btn');

    share.addEventListener('mouseenter', () => {
      if (!finePointer.matches) return;
      clearTimeout(hoverTimer);
      // A beat before opening, so a pointer travelling across the card on its
      // way somewhere else doesn't flick the menu open over the dates.
      hoverTimer = setTimeout(() => openMenu(btn), 120);
    });

    share.addEventListener('mouseleave', () => {
      if (!finePointer.matches) return;
      clearTimeout(hoverTimer);
      // And a beat before closing. The pointer has to cross the gap between
      // the button and the menu; the bridge in the CSS covers it, this covers
      // leaving by any other edge.
      hoverTimer = setTimeout(() => closeMenus(), 240);
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.share')) closeMenus();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = upcomingList.querySelector('.share-btn[aria-expanded="true"]');
    if (!open) return;
    closeMenus();
    open.focus();
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
  const navLinks = [...document.querySelectorAll('.nav-link')];
  // Only the sections the nav actually points at. Taking every section[id]
  // meant scrolling into one without a nav item — Why Sudarshan Kriya, and now
  // Our Programs — left no link lit at all. Read this way, a section with no
  // link of its own simply stays under the heading above it, which is what
  // keeps "About" active across the whole About page.
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(sec => sec && !sec.hidden);

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
