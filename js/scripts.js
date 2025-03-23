// Smooth scrolling for internal links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Sticky navigation bar on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('sticky', window.scrollY > 0);
});

// Handle fade-out for internal page links
document.querySelectorAll('a[href*="pages/"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        document.body.classList.add('fade-out');
        setTimeout(() => window.location.href = href, 500);
    });
});

// Scroll-triggered animations using Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.15) {
            entry.target.classList.add('slide-in');
            entry.target.classList.remove('slide-out');
        } else if (entry.intersectionRatio <= 0.1) {
            entry.target.classList.remove('slide-in');
            entry.target.classList.add('slide-out');
        }
    });
}, {
    threshold: [0.15, 0.20]
});

// Observe elements with slide-in/slide-out animations
document.querySelectorAll('.slide-in, .slide-out').forEach(element => observer.observe(element));
