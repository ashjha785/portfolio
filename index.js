/* ==========================================================================
   Ashutosh Kumar Portfolio — Interactions & Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const header = document.getElementById('site-header');
    let lastScrollY = 0;

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('open');
            mobileMenu.classList.toggle('open');
            mobileMenuBtn.setAttribute('aria-expanded', !isOpen);

            // Toggle icon between hamburger and X
            const svg = mobileMenuBtn.querySelector('svg');
            if (!isOpen) {
                svg.innerHTML = '<path d="M10.5 10.5L29.5 29.5M29.5 10.5L10.5 29.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>';
            } else {
                svg.innerHTML = '<path d="M18.75 28C19.1641 28.0002 19.5 28.3359 19.5 28.75C19.4999 29.1641 19.164 29.4998 18.75 29.5H7.91699C7.50281 29.5 7.16705 29.1642 7.16699 28.75C7.16699 28.3358 7.50278 28 7.91699 28H18.75ZM32.084 19.25C32.4979 19.2504 32.834 19.586 32.834 20C32.8339 20.4139 32.4979 20.7496 32.084 20.75H7.91699C7.50281 20.75 7.16705 20.4142 7.16699 20C7.16699 19.5858 7.50278 19.25 7.91699 19.25H32.084ZM32.084 10.5C32.4979 10.5004 32.834 10.836 32.834 11.25C32.8339 11.6639 32.4979 11.9996 32.084 12H7.91699C7.50282 12 7.16706 11.6642 7.16699 11.25C7.16699 10.8358 7.50278 10.5 7.91699 10.5H32.084Z" fill="currentColor"></path>';
            }
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const svg = mobileMenuBtn.querySelector('svg');
                svg.innerHTML = '<path d="M18.75 28C19.1641 28.0002 19.5 28.3359 19.5 28.75C19.4999 29.1641 19.164 29.4998 18.75 29.5H7.91699C7.50281 29.5 7.16705 29.1642 7.16699 28.75C7.16699 28.3358 7.50278 28 7.91699 28H18.75ZM32.084 19.25C32.4979 19.2504 32.834 19.586 32.834 20C32.8339 20.4139 32.4979 20.7496 32.084 20.75H7.91699C7.50281 20.75 7.16705 20.4142 7.16699 20C7.16699 19.5858 7.50278 19.25 7.91699 19.25H32.084ZM32.084 10.5C32.4979 10.5004 32.834 10.836 32.834 11.25C32.8339 11.6639 32.4979 11.9996 32.084 12H7.91699C7.50282 12 7.16706 11.6642 7.16699 11.25C7.16699 10.8358 7.50278 10.5 7.91699 10.5H32.084Z" fill="currentColor"></path>';
            });
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll-Triggered Animations (IntersectionObserver) ---
    const animateElements = () => {
        // Add animate-in class to all cards and sections
        const elements = [
            ...document.querySelectorAll('.package-banner'),
            ...document.querySelectorAll('.package-link'),
            ...document.querySelectorAll('.section-card'),
            ...document.querySelectorAll('.project-card'),
            ...document.querySelectorAll('.newsletter-wrapper'),
            ...document.querySelectorAll('.projects-header')
        ];

        elements.forEach(el => {
            el.classList.add('animate-in');
        });

        // Add stagger to grids
        document.querySelectorAll('.banner-packages, .projects-grid').forEach(grid => {
            grid.classList.add('stagger-children');
        });

        // Create observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        elements.forEach(el => observer.observe(el));
    };

    // Start animations after a tiny delay to avoid FOC
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            animateElements();
        });
    });

    // --- Contact Form Handler ---
    window.handleContact = (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('contact-email');
        const submitBtn = document.getElementById('contact-submit');

        if (emailInput.value) {
            // Visual feedback
            submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            submitBtn.style.backgroundColor = '#4a7c59';

            // Open mailto
            window.location.href = `mailto:ashjha785@gmail.com?subject=Portfolio Contact&body=Hi Ashutosh,%0D%0A%0D%0AI found your portfolio and wanted to connect.%0D%0A%0D%0AFrom: ${emailInput.value}`;

            // Reset after delay
            setTimeout(() => {
                submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 21 21"><path d="M4.14585 9.87492L14.4584 9.87492L9.60419 5.04158L10.5 4.14575L16.8542 10.4999L10.5 16.8541L9.60419 15.9583L14.4584 11.1249L4.14585 11.1249L4.14585 9.87492Z" fill="currentColor"></path></svg>';
                submitBtn.style.backgroundColor = '';
                emailInput.value = '';
            }, 3000);
        }
    };

    // --- Active Nav Highlighting ---
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-text');

    const highlightNav = () => {
        const scrollPos = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // --- Subtle parallax on hero ---
    const heroTitle = document.getElementById('hero-title');
    const heroSummary = document.getElementById('hero-summary');

    if (heroTitle && heroSummary) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < 600) {
                const offset = scrollY * 0.15;
                heroTitle.style.transform = `translateY(${offset}px)`;
                heroSummary.style.transform = `translateY(${offset * 0.7}px)`;
            }
        }, { passive: true });
    }

});
