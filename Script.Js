document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu System
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Toggle Menu
    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close Menu on Click Outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service.card, .testimonial-card, .stat').forEach(el => {
        animateOnScroll.observe(el);
    });

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('header-scrolled', window.scrollY > 50);
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.dataset.target;
                const duration = 2000;
                let start = null;

                const animate = timestamp => {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    entry.target.textContent = Math.floor(percentage * target);
                    if (percentage < 1) requestAnimationFrame(animate);
                };

                requestAnimationFrame(animate);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
});
// Team Member Interactions
document.querySelectorAll('.team-member').forEach(member => {
    // 3D Card Rotation
    member.addEventListener('mousemove', (e) => {
        const card = member.querySelector('.member-card');
        const { offsetX: x, offsetY: y } = e;
        const { offsetWidth: width, offsetHeight: height } = card;
        
        const rotateY = (x - width/2) / 8;
        const rotateX = -(y - height/2) / 8;
        
        card.style.transform = `
            translateY(-10px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    });

    member.addEventListener('mouseleave', () => {
        const card = member.querySelector('.member-card');
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// Read More Functionality
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', (e) => {
        const bio = e.target.closest('.member-info').querySelector('.bio');
        bio.style.webkitLineClamp = bio.style.webkitLineClamp ? 'unset' : '3';
        button.querySelector('span').textContent = 
            bio.style.webkitLineClamp ? 'Explore Journey' : 'Show Less';
        button.querySelector('i').classList.toggle('fa-arrow-up');
    });
});
// Cookie Management
const cookieConsent = document.querySelector('.cookie-consent');
const cookieModal = document.querySelector('.cookie-modal');
const acceptAll = document.querySelector('.cookie-accept');
const settingsBtn = document.querySelector('.cookie-settings');
const saveSettings = document.querySelector('.save-settings');
const modalClose = document.querySelector('.modal-close');

// Check if consent exists
function checkCookieConsent() {
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieConsent.classList.add('active');
        }, 2000);
    }
}

// Save consent
function acceptCookies(analytics = true, marketing = true) {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('analyticsCookies', analytics);
    localStorage.setItem('marketingCookies', marketing);
    cookieConsent.classList.remove('active');
    cookieModal.style.display = 'none';
    
    // Load cookies based on preferences
    if(analytics) loadAnalytics();
    if(marketing) loadMarketing();
}

// Event Listeners
acceptAll.addEventListener('click', () => acceptCookies(true, true));
settingsBtn.addEventListener('click', () => cookieModal.style.display = 'block');
modalClose.addEventListener('click', () => cookieModal.style.display = 'none');
saveSettings.addEventListener('click', () => {
    const analytics = document.getElementById('analytics-cookies').checked;
    const marketing = document.getElementById('marketing-cookies').checked;
    acceptCookies(analytics, marketing);
});

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === cookieModal) {
        cookieModal.style.display = 'none';
    }
});

// Initialize
checkCookieConsent();

// Example cookie loading functions
function loadAnalytics() {
    // Initialize Google Analytics
    console.log('Loading analytics cookies...');
}

function loadMarketing() {
    // Load Facebook Pixel
    console.log('Loading marketing cookies...');
}
// Initialize AOS (Animate On Scroll)
document.querySelectorAll('[data-aos]').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
// Add this to script.js
document.querySelectorAll('.philosophy-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
    
    // Animate progress bars
    const bars = card.querySelectorAll('.stat-bar');
    bars.forEach(bar => {
        const percent = bar.dataset.percent;
        bar.style.setProperty('--width', `${percent}%`);
    });
});

// Timeline animation
const timelineProgress = document.querySelector('.timeline-progress');
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / document.body.scrollHeight;
    timelineProgress.style.width = `${Math.min(scrollPercent * 300, 100)}%`;
});