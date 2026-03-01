/* ==========================================================================
   AEGIS 2026 - Main JavaScript
   AI for Evolving, Generalizable, Intelligent Systems
   ETH Zürich Summer School
   ========================================================================== */

(function() {
    'use strict';

    // ==========================================================================
    // Particle Network Animation (Hero Background)
    // ==========================================================================
    class ParticleNetwork {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particles = [];
            this.particleCount = 80;
            this.maxDistance = 150;
            this.mouse = { x: null, y: null, radius: 150 };

            this.init();
            this.animate();
            this.setupEventListeners();
        }

        init() {
            this.resize();
            this.createParticles();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        createParticles() {
            this.particles = [];
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }

        setupEventListeners() {
            window.addEventListener('resize', () => {
                this.resize();
                this.createParticles();
            });

            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });

            this.canvas.addEventListener('mouseleave', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }

        drawParticles() {
            this.particles.forEach(particle => {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
                this.ctx.fill();
            });
        }

        drawConnections() {
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.maxDistance) {
                        const opacity = (1 - distance / this.maxDistance) * 0.3;
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                }
            }
        }

        updateParticles() {
            this.particles.forEach(particle => {
                // Move particles
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > this.canvas.width) {
                    particle.vx *= -1;
                }
                if (particle.y < 0 || particle.y > this.canvas.height) {
                    particle.vy *= -1;
                }

                // Keep particles in bounds
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));

                // Mouse interaction
                if (this.mouse.x !== null && this.mouse.y !== null) {
                    const dx = particle.x - this.mouse.x;
                    const dy = particle.y - this.mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.mouse.radius) {
                        const force = (this.mouse.radius - distance) / this.mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        particle.x += Math.cos(angle) * force * 2;
                        particle.y += Math.sin(angle) * force * 2;
                    }
                }
            });
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.updateParticles();
            this.drawConnections();
            this.drawParticles();
            requestAnimationFrame(() => this.animate());
        }
    }

    // ==========================================================================
    // Navigation
    // ==========================================================================
    class Navigation {
        constructor() {
            this.nav = document.getElementById('nav');
            this.toggle = document.getElementById('nav-toggle');
            this.menu = document.getElementById('nav-menu');
            this.links = document.querySelectorAll('.nav-link');
            this.lastScrollY = 0;
            this.scrollThreshold = 100;

            this.init();
        }

        init() {
            this.setupMobileToggle();
            this.setupSmoothScroll();
            this.setupScrollBehavior();
        }

        setupMobileToggle() {
            this.toggle.addEventListener('click', () => {
                this.toggle.classList.toggle('active');
                this.menu.classList.toggle('active');
                document.body.style.overflow = this.menu.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu when clicking a link
            this.links.forEach(link => {
                link.addEventListener('click', () => {
                    this.toggle.classList.remove('active');
                    this.menu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }

        setupSmoothScroll() {
            this.links.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            const navHeight = this.nav.offsetHeight;
                            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        }

        setupScrollBehavior() {
            let ticking = false;

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        this.handleScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }

        handleScroll() {
            // Navigation stays visible - no hide on scroll
            // Just update lastScrollY for potential future use
            this.lastScrollY = window.pageYOffset;
        }
    }

    // ==========================================================================
    // Schedule Tabs
    // ==========================================================================
    class ScheduleTabs {
        constructor() {
            this.tabs = document.querySelectorAll('.schedule-tab');
            this.days = document.querySelectorAll('.schedule-day');

            if (this.tabs.length > 0) {
                this.init();
            }
        }

        init() {
            this.tabs.forEach(tab => {
                tab.addEventListener('click', () => this.switchTab(tab));
            });
        }

        switchTab(selectedTab) {
            const day = selectedTab.dataset.day;

            // Update tab states
            this.tabs.forEach(tab => {
                tab.classList.toggle('active', tab === selectedTab);
            });

            // Update day content
            this.days.forEach(dayContent => {
                dayContent.classList.toggle('active', dayContent.dataset.day === day);
            });
        }
    }

    // ==========================================================================
    // Scroll Animations
    // ==========================================================================
    class ScrollAnimations {
        constructor() {
            this.animatedElements = document.querySelectorAll('.animate-on-scroll');

            if (this.animatedElements.length > 0) {
                this.init();
            }
        }

        init() {
            // Use Intersection Observer for performance
            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -100px 0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Optionally stop observing after animation
                        // observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            this.animatedElements.forEach(element => {
                observer.observe(element);
            });
        }
    }

    // ==========================================================================
    // Registration Form
    // ==========================================================================
    class RegistrationForm {
        constructor() {
            this.form = document.getElementById('interest-form');

            if (this.form) {
                this.init();
            }
        }

        init() {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        handleSubmit(e) {
            e.preventDefault();

            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());

            // Here you would typically send to a backend or Google Form
            // For now, show a success message
            this.showSuccess();

            // Log data for debugging (remove in production)
            console.log('Form submitted:', data);
        }

        showSuccess() {
            const button = this.form.querySelector('button[type="submit"]');
            const originalContent = button.innerHTML;

            button.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 1.25rem; height: 1.25rem;">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>Thanks! We'll be in touch.</span>
            `;
            button.disabled = true;
            button.style.background = '#10B981';

            // Reset after delay (optional)
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.disabled = false;
                button.style.background = '';
                this.form.reset();
            }, 5000);
        }
    }

    // ==========================================================================
    // Active Navigation Highlighting
    // ==========================================================================
    class ActiveNavHighlight {
        constructor() {
            this.sections = document.querySelectorAll('section[id]');
            this.navLinks = document.querySelectorAll('.nav-link:not(.nav-link-cta)');

            if (this.sections.length > 0) {
                this.init();
            }
        }

        init() {
            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -70% 0px',
                threshold: 0
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.setActiveLink(entry.target.id);
                    }
                });
            }, observerOptions);

            this.sections.forEach(section => {
                observer.observe(section);
            });
        }

        setActiveLink(sectionId) {
            this.navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${sectionId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }

    // ==========================================================================
    // Smooth Reveal for Hero Content
    // ==========================================================================
    class HeroReveal {
        constructor() {
            this.heroContent = document.querySelector('.hero-content');

            if (this.heroContent) {
                this.init();
            }
        }

        init() {
            // Add initial hidden state
            this.heroContent.style.opacity = '0';
            this.heroContent.style.transform = 'translateY(20px)';

            // Reveal after small delay
            setTimeout(() => {
                this.heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                this.heroContent.style.opacity = '1';
                this.heroContent.style.transform = 'translateY(0)';
            }, 200);
        }
    }

    // ==========================================================================
    // Initialize Everything
    // ==========================================================================
    function init() {
        // Initialize particle network
        const canvas = document.getElementById('hero-canvas');
        if (canvas) {
            new ParticleNetwork(canvas);
        }

        // Initialize navigation
        new Navigation();

        // Initialize schedule tabs
        new ScheduleTabs();

        // Initialize scroll animations
        new ScrollAnimations();

        // Initialize registration form
        new RegistrationForm();

        // Initialize active nav highlighting
        new ActiveNavHighlight();

        // Initialize hero reveal
        new HeroReveal();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
