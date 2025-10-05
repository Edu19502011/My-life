// Homepage specific functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeHomeAnimations();
    initializeSkillBars();
    initializeProjectCards();
    initializeContactForm();
});

// Home page animations
function initializeHomeAnimations() {
    // Animate hero elements on load
    const heroElements = [
        '.hero-badge',
        '.hero-title',
        '.hero-subtitle',
        '.hero-description',
        '.hero-actions'
    ];
    
    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }, index * 200);
        }
    });
    
    // Animate floating icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'scale(0)';
        
        setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
            icon.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }, 1000 + (index * 200));
    });
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                    progressBar.style.transition = 'width 1.5s ease';
                }, 200);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Project cards interactions
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        // Add loading animation for project images
        const projectImage = card.querySelector('.project-image img');
        if (projectImage) {
            projectImage.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            });
            
            projectImage.style.opacity = '0';
            projectImage.style.transform = 'scale(1.1)';
            projectImage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
    });
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
        
        // Add floating label effect
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
        
        // Auto-resize textarea
        const textarea = contactForm.querySelector('textarea');
        if (textarea) {
            textarea.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
        }
    }
}

function handleContactSubmit(e) {
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
        showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
        e.target.reset();
        
        // Reset form states
        const inputs = e.target.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.parentElement.classList.remove('focused');
        });
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Timeline animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        timelineObserver.observe(item);
    });
}

// Skills categories animation
function animateSkillsCategories() {
    const categories = document.querySelectorAll('.skill-category');
    
    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                categoryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    categories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        categoryObserver.observe(category);
    });
}

// Statistics counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Extract number from text
                const numMatch = finalValue.match(/\d+/);
                if (numMatch) {
                    const finalNum = parseInt(numMatch[0]);
                    let currentNum = 0;
                    const increment = finalNum / 50;
                    
                    const counter = setInterval(() => {
                        currentNum += increment;
                        if (currentNum >= finalNum) {
                            target.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            target.textContent = finalValue.replace(/\d+/, Math.floor(currentNum));
                        }
                    }, 30);
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Parallax effect for hero background
function initializeParallax() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.page-background');
    
    if (hero && heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Smooth scroll to top functionality
function initializeScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--accent-gradient);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize all homepage features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initializeHomeAnimations();
    initializeSkillBars();
    initializeProjectCards();
    initializeContactForm();
    animateTimeline();
    animateSkillsCategories();
    animateStats();
    initializeParallax();
    initializeScrollToTop();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .form-group.focused label {
            color: var(--accent-primary);
            transform: translateY(-5px);
            font-size: 0.875rem;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-xl);
        }
    `;
    document.head.appendChild(style);
});

// Export functions for use in other scripts
window.HomePage = {
    initializeHomeAnimations,
    initializeSkillBars,
    initializeProjectCards,
    initializeContactForm,
    animateTimeline,
    animateSkillsCategories,
    animateStats
};