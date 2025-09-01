// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class for styling
    if (scrollTop > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.domain-card, .insight-card, .journey-card, .office-card').forEach(el => {
    observer.observe(el);
});

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            // Simulate form submission
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Subscribed!';
                button.style.background = '#28a745';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    this.reset();
                }, 2000);
            }, 1000);
        }
    });
}

// Research center status indicators
function updateResearchCenters() {
    const researchCenters = {
        'Silicon Valley AI Lab': '🤖',
        'Congo Research Station': '🦍',
        'New York Trading Floor': '📊',
        'Cambridge Research Hub': '🔬',
        'Tokyo Innovation Center': '🌐',
        'Costa Rica Sanctuary': '🍌',
        'London Strategy Office': '💡',
        'Rwanda Conservation Base': '🌿'
    };
    
    const officeCards = document.querySelectorAll('.office-card');
    
    officeCards.forEach(card => {
        const centerName = card.querySelector('.office-name').textContent;
        const iconElement = card.querySelector('.office-time');
        
        if (researchCenters[centerName]) {
            iconElement.textContent = researchCenters[centerName];
        }
    });
}

// Update research center icons
updateResearchCenters();

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        const speed = scrolled * 0.3;
        hero.style.transform = `translateY(${speed}px)`;
    }
});

// Enhanced loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate elements on page load with staggered timing
    const elementsToAnimate = document.querySelectorAll('.hero-label, .hero-title, .hero-description, .hero-purpose, .btn');
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.8s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150 + 500); // Start after 500ms, then stagger by 150ms
    });
    
    // Animate progress circle
    setTimeout(() => {
        const progressCircle = document.querySelector('.progress-circle');
        if (progressCircle) {
            progressCircle.style.opacity = '0';
            progressCircle.style.transform = 'scale(0.8)';
            progressCircle.style.transition = 'all 1s ease-out';
            
            setTimeout(() => {
                progressCircle.style.opacity = '1';
                progressCircle.style.transform = 'scale(1)';
            }, 100);
        }
    }, 1000);
});

// Enhanced progress circle animation
function animateProgressCircle() {
    const progressCircle = document.querySelector('.progress-circle');
    if (progressCircle) {
        // Reset to original gradient
        progressCircle.style.background = 'linear-gradient(45deg, var(--secondary-color), var(--accent-color))';
        
        // Add a subtle rotation animation
        let rotation = 0;
        const rotateInterval = setInterval(() => {
            rotation += 1;
            progressCircle.style.transform = `rotate(${rotation}deg)`;
            
            if (rotation >= 360) {
                rotation = 0;
            }
        }, 100);
        
        // Stop rotation after a few cycles
        setTimeout(() => {
            clearInterval(rotateInterval);
            progressCircle.style.transform = 'rotate(0deg)';
        }, 8000);
    }
}

// Start progress animation when hero is visible
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressCircle();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Enhanced hover effects for cards
document.querySelectorAll('.domain-card, .insight-card, .journey-card, .office-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add a subtle glow effect
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        // Reset to default shadow
        this.style.boxShadow = '';
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for smoother animations
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll handler for better performance
const throttledScrollHandler = throttle(function() {
    // Smooth scroll-based effects
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.1;
    
    // Subtle parallax for hero content
    const heroText = document.querySelector('.hero-text');
    if (heroText && scrolled < window.innerHeight) {
        heroText.style.transform = `translateY(${rate}px)`;
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Enhanced accessibility improvements
document.querySelectorAll('button, a, input').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '3px solid var(--secondary-color)';
        this.style.outlineOffset = '2px';
        this.style.borderRadius = '8px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

// Add keyboard navigation for better accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Preload critical resources
function preloadResources() {
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalFonts.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = url;
        document.head.appendChild(link);
    });
}

preloadResources();

// Add smooth reveal animations for sections
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.domain-card, .insight-card, .journey-card, .office-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}

// Initialize animations after page load
setTimeout(addScrollAnimations, 1500);

console.log('Dudu Trading website loaded successfully! 🚀🦍🤖');
console.log('AI and gorilla intelligence collaboration platform active.');
console.log('When AI and gorillas trade together, the future is unstoppable.');
