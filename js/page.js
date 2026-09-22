// ============================================
// Shared chrome behaviour for secondary pages (spine-care.html and any
// future program page). Just the navbar scroll state, the hamburger menu,
// and the footer year — the parts of main.js that don't depend on
// js/data.js or on elements (#coursesGrid, #contactForm, …) that only
// exist on index.html. main.js itself would throw here for that reason,
// so it isn't included on these pages.
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar background on scroll ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
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

  // ---- One-shot fade-up ----
  // The only self-starting motion on a secondary page. It arms the hidden
  // state itself rather than the stylesheet doing it, so the copy is visible
  // unless this code is running and is about to animate it. A failsafe
  // reveals anything still hidden a beat later, in case the observer never
  // fires — invisible copy is a far worse outcome than a missing fade.
  const fading = [...document.querySelectorAll('.gw-fade')];
  const stillMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (fading.length && stillMotion && 'IntersectionObserver' in window) {
    fading.forEach(el => el.classList.add('is-armed'));

    const reveal = (el) => el.classList.add('is-in');
    const seen = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px' });

    fading.forEach(el => seen.observe(el));
    // Belt and braces: whatever has not been reached by now, show.
    setTimeout(() => fading.forEach(reveal), 2000);
  }

  // ---- Footer Year ----
  document.getElementById('year').textContent = new Date().getFullYear();

});
