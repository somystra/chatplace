// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeBtn = document.getElementById('themeBtn');
    const htmlElement = document.documentElement;
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeBtn.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        themeBtn.textContent = '🌙';
    }

    // Theme toggle button click handler
    themeBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeBtn.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeBtn.textContent = '🌙';
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Пожалуйста, заполните все поля!');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Пожалуйста, введите правильный email!');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Спасибо! Ваше сообщение отправлено.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // CTA Button Click Handler
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Add scroll animation for feature cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0.7';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // Active navigation link highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navigation a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.style.borderBottom = '3px solid var(--primary-color)';
                link.style.backgroundColor = 'rgba(135, 206, 235, 0.2)';
            } else {
                link.style.borderBottom = 'none';
                link.style.backgroundColor = 'transparent';
            }
        });
    });

    // Social media buttons functionality
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.classList.contains('instagram')) {
                alert('Instagram'язык: @ChatPlace');
            } else if (this.classList.contains('telegram')) {
                alert('Telegram: @ChatPlace');
            }
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button, .social-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            // Add ripple style if not already added
            if (!document.querySelector('style[data-ripple]')) {
                const style = document.createElement('style');
                style.setAttribute('data-ripple', 'true');
                style.textContent = `
                    button, .social-btn {
                        position: relative;
                        overflow: hidden;
                    }
                    .ripple {
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.5);
                        transform: scale(0);
                        animation: ripple-animation 0.6s ease-out;
                        pointer-events: none;
                    }
                    @keyframes ripple-animation {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            this.appendChild(ripple);
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + D for dark mode toggle
        if (e.altKey && e.key === 'd') {
            themeBtn.click();
        }
        
        // Alt + H to scroll to home
        if (e.altKey && e.key === 'h') {
            document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
});

// Prevent console errors in production
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.log('Error: ' + msg);
    return false;
};
