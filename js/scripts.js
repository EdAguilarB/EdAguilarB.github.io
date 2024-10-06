/*!
* Start Bootstrap - Business Frontpage v5.0.9 (https://startbootstrap.com/template/business-frontpage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-frontpage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

// Smooth scrolling for internal links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Only apply smooth scrolling for internal links (starting with #)
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

// Scroll-triggered animations using Intersection Observer with dual thresholds
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.15) {
            // If the element is at least 15% visible, slide in
            entry.target.classList.add('slide-in');
            entry.target.classList.remove('slide-out');
        } else if (entry.intersectionRatio <= 0.1) {
            // If the element is 10% or less visible, slide out
            entry.target.classList.remove('slide-in');
            entry.target.classList.add('slide-out');
        }
    });
}, {
    threshold: [0.15, 0.20] // Trigger at 10% and 15% visibility
});

// Select and observe all elements with the slide-in/slide-out animation
document.querySelectorAll('.slide-in, .slide-out').forEach(element => observer.observe(element));
