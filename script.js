// Custom cursor — only on desktop, not mobile/touch
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (!isTouchDevice) {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateCursor() {
    cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .project-card, .skill-tag, .interest-item, .contact-item').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
} else {
  // On mobile/touch: restore normal cursor, hide custom cursor elements
  document.body.style.cursor = 'auto';
  const c = document.getElementById('cursor');
  const r = document.getElementById('cursorRing');
  if (c) c.style.display = 'none';
  if (r) r.style.display = 'none';
}

// Scroll reveal — trigger immediately for elements already in view
const reveals = document.querySelectorAll('.reveal');

function checkReveal() {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}

// Run on load AND on scroll
window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);
checkReveal(); // run immediately

// Hamburger menu
function toggleMenu() {
  const nav = document.getElementById('navLinks');
  const btn = document.getElementById('hamburger');
  nav.classList.toggle('open');
  btn.classList.toggle('open');
}

function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}
