// =============================================
// Typewriter effect for hero section
// =============================================
function initTypewriter() {
  const el = document.getElementById("typewriter");
  if (!el) return;

  const phrases = [
    "Graph Neural Networks for Chemistry",
    "Explainable AI for Materials Science",
    "Data-Driven Ligand Optimization",
    "Cheminformatics & Deep Learning",
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const SPEED_TYPE   = 65;
  const SPEED_DELETE = 30;
  const PAUSE_END    = 2200;
  const PAUSE_START  = 500;

  function tick() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      charIdx--;
    } else {
      charIdx++;
    }

    el.textContent = current.slice(0, charIdx);

    let delay = isDeleting ? SPEED_DELETE : SPEED_TYPE;

    if (!isDeleting && charIdx === current.length) {
      delay = PAUSE_END;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = PAUSE_START;
    }

    setTimeout(tick, delay);
  }

  tick();
}

// =============================================
// Smooth scrolling for internal hash links
// =============================================
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =============================================
// Sticky navbar on scroll
// =============================================
window.addEventListener('scroll', function () {
  const nav = document.querySelector('nav');
  if (nav) nav.classList.toggle('sticky', window.scrollY > 10);
});

// =============================================
// Page fade-out for internal page transitions
// =============================================
document.querySelectorAll('a[href*="pages/"], a[href*="../"]').forEach(anchor => {
  if (anchor.hostname === window.location.hostname) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('http')) {
        e.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(() => { window.location.href = href; }, 350);
      }
    });
  }
});

// =============================================
// Fade-in animation on scroll (one-shot)
// =============================================
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fadeIn-done');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// =============================================
// Slide-in / slide-out on scroll
// =============================================
const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio >= 0.12) {
      entry.target.classList.add('slide-in');
      entry.target.classList.remove('slide-out');
    } else if (entry.intersectionRatio <= 0.08) {
      entry.target.classList.remove('slide-in');
      entry.target.classList.add('slide-out');
    }
  });
}, { threshold: [0.08, 0.12] });

document.querySelectorAll('.slide-in, .slide-out').forEach(el => slideObserver.observe(el));

// =============================================
// Init on DOM ready
// =============================================
document.addEventListener('DOMContentLoaded', initTypewriter);
