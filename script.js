// Global Variables
let particleSystem;
let isDarkTheme = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeParticleSystem();
    initializeScrollAnimations();
    initializeCounters();
    initializeFormHandling();
    initializeMobileMenu();
    initializePageSpecificFeatures();
});

// Initialize page-specific features
function initializePageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            if (typeof HomePage !== 'undefined') {
                HomePage.initializeHomeAnimations();
                HomePage.initializeSkillBars();
                HomePage.initializeProjectCards();
                HomePage.initializeContactForm();
                HomePage.animateTimeline();
                HomePage.animateSkillsCategories();
                HomePage.animateStats();
            }
            break;
        case 'blog.html':
            if (typeof BlogPage !== 'undefined') {
                BlogPage.initializeBlogAnimations();
                BlogPage.initializeBlogFilters();
                BlogPage.initializeBlogSearch();
                BlogPage.initializeNewsletterForm();
                BlogPage.loadMorePosts();
            }
            break;
        case 'certifications.html':
            if (typeof CertificationsPage !== 'undefined') {
                CertificationsPage.initializeCertificationsAnimations();
                CertificationsPage.initializeOverviewCounters();
                CertificationsPage.initializeCertificationFilters();
                CertificationsPage.initializeCertificationVerification();
            }
            break;
        case 'comments.html':
            if (typeof CommentsPage !== 'undefined') {
                CommentsPage.initializeCommentsAnimations();
                CommentsPage.initializeTestimonialFilters();
                CommentsPage.initializeTestimonialSearch();
                CommentsPage.loadMoreTestimonials();
            }
            break;
    }
}

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    isDarkTheme = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon();
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    const newTheme = isDarkTheme ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
    
    // Update particle colors if system exists
    if (particleSystem) {
        particleSystem.updateThemeColors();
    }
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = isDarkTheme ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Navigation Management
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hireButton = document.getElementById('hireButton');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Hire button functionality
    if (hireButton) {
        hireButton.addEventListener('click', () => {
            showNotification('Obrigado pelo interesse! Redirecionando para contato...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html#contact';
            }, 1500);
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Particle System
function initializeParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    particleSystem = new ParticleSystem(canvas);
    particleSystem.start();
}

class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        this.resize();
        this.createParticles();
        
        window.addEventListener('resize', () => this.resize());
        canvas.addEventListener('mousemove', (e) => this.updateMousePosition(e));
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.min(100, Math.floor(window.innerWidth / 20));
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(this.canvas.width, this.canvas.height));
        }
    }
    
    updateMousePosition(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }
    
    updateThemeColors() {
        this.particles.forEach(particle => {
            particle.updateTheme(isDarkTheme);
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.update(this.mouse);
            particle.draw(this.ctx);
        });
        
        // Draw connections
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (100 - distance) / 100 * 0.1;
                    this.ctx.strokeStyle = isDarkTheme ? 
                        `rgba(255, 255, 255, ${opacity})` : 
                        `rgba(99, 102, 241, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    start() {
        this.animate();
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

class Particle {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.baseColor = isDarkTheme ? '#ffffff' : '#6366F1';
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    updateTheme(isDark) {
        this.baseColor = isDark ? '#ffffff' : '#6366F1';
    }
    
    update(mouse) {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;
        
        // Mouse interaction
        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                this.x -= dx * force * 0.01;
                this.y -= dy * force * 0.01;
            }
        }
        
        // Bounce off walls
        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
        
        // Keep particles in bounds
        this.x = Math.max(0, Math.min(window.innerWidth, this.x));
        this.y = Math.max(0, Math.min(window.innerHeight, this.y));
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.baseColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target % 1 === 0 ? target : target.toFixed(1);
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Form Handling
function initializeFormHandling() {
    const testimonialForm = document.getElementById('testimonialForm');
    
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', handleTestimonialSubmit);
    }
    
    // Rating input
    const ratingInputs = document.querySelectorAll('.rating-input i');
    let selectedRating = 0;
    
    ratingInputs.forEach((star, index) => {
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            updateRatingDisplay(selectedRating);
        });
        
        star.addEventListener('mouseenter', () => {
            updateRatingDisplay(index + 1);
        });
    });
    
    document.querySelector('.rating-input').addEventListener('mouseleave', () => {
        updateRatingDisplay(selectedRating);
    });
    
    function updateRatingDisplay(rating) {
        ratingInputs.forEach((star, index) => {
            if (index < rating) {
                star.className = 'fas fa-star active';
            } else {
                star.className = 'far fa-star';
            }
        });
    }
}

function handleTestimonialSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Add loading state
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Depoimento enviado com sucesso! Obrigado pelo feedback.', 'success');
        e.target.reset();
        
        // Reset rating
        document.querySelectorAll('.rating-input i').forEach(star => {
            star.className = 'far fa-star';
        });
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Mobile Menu
function initializeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--accent-primary)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Performance Optimization
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

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    showNotification('Ocorreu um erro. Por favor, recarregue a página.', 'error');
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}