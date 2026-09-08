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

  // ---- Footer Year ----
  document.getElementById('year').textContent = new Date().getFullYear();

});
