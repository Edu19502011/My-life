// Comments Page Specific Functionality

// Initialize comments page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCommentsAnimations();
    initializeTestimonialFilters();
    initializeTestimonialSearch();
    loadMoreTestimonials();
});

// Comments Page Animations
function initializeCommentsAnimations() {
    // Animate statistics cards
    const statCards = document.querySelectorAll('.stat-card');
    
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    statCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        statObserver.observe(card);
    });
    
    // Animate testimonials
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
                testimonialObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    testimonials.forEach(testimonial => {
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateY(50px) scale(0.95)';
        testimonial.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        testimonialObserver.observe(testimonial);
    });
}

// Testimonial Filters
function initializeTestimonialFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter testimonials
            testimonials.forEach(testimonial => {
                const category = testimonial.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    testimonial.style.display = 'block';
                    setTimeout(() => {
                        testimonial.style.opacity = '1';
                        testimonial.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                } else {
                    testimonial.style.opacity = '0';
                    testimonial.style.transform = 'translateY(-20px) scale(0.9)';
                    setTimeout(() => {
                        testimonial.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonial Search
function initializeTestimonialSearch() {
    const searchInput = document.querySelector('.search-input');
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            testimonials.forEach(testimonial => {
                const name = testimonial.querySelector('.testimonial-name').textContent.toLowerCase();
                const role = testimonial.querySelector('.testimonial-role').textContent.toLowerCase();
                const content = testimonial.querySelector('blockquote').textContent.toLowerCase();
                const project = testimonial.querySelector('.testimonial-project').textContent.toLowerCase();
                
                const matches = name.includes(searchTerm) || 
                               role.includes(searchTerm) || 
                               content.includes(searchTerm) || 
                               project.includes(searchTerm);
                
                if (matches || searchTerm === '') {
                    testimonial.style.display = 'block';
                    setTimeout(() => {
                        testimonial.style.opacity = '1';
                        testimonial.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                } else {
                    testimonial.style.opacity = '0';
                    testimonial.style.transform = 'translateY(-20px) scale(0.9)';
                    setTimeout(() => {
                        testimonial.style.display = 'none';
                    }, 300);
                }
            });
        }, 300));
    }
}

// Load More Testimonials
function loadMoreTestimonials() {
    let currentPage = 1;
    const testimonialsPerPage = 6;
    const allTestimonials = getAllTestimonials(); // This would come from an API in real app
    
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const nextTestimonials = allTestimonials.slice(
                currentPage * testimonialsPerPage,
                (currentPage + 1) * testimonialsPerPage
            );
            
            if (nextTestimonials.length > 0) {
                renderTestimonials(nextTestimonials);
                currentPage++;
                
                if (currentPage * testimonialsPerPage >= allTestimonials.length) {
                    loadMoreBtn.style.display = 'none';
                }
            }
        });
    }
}

function renderTestimonials(testimonials) {
    const container = document.querySelector('.testimonials-grid');
    
    testimonials.forEach((testimonial, index) => {
        const testimonialElement = createTestimonialElement(testimonial);
        testimonialElement.style.opacity = '0';
        testimonialElement.style.transform = 'translateY(50px) scale(0.95)';
        
        container.appendChild(testimonialElement);
        
        setTimeout(() => {
            testimonialElement.style.opacity = '1';
            testimonialElement.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

function createTestimonialElement(testimonial) {
    const element = document.createElement('div');
    element.className = 'testimonial-card';
    element.setAttribute('data-category', testimonial.category || 'all');
    
    element.innerHTML = `
        <div class="testimonial-header">
            <div class="testimonial-avatar">
                <img src="${testimonial.avatar}" alt="${testimonial.name}">
            </div>
            <div class="testimonial-info">
                <h4 class="testimonial-name">${testimonial.name}</h4>
                <p class="testimonial-role">${testimonial.role}</p>
                <div class="testimonial-rating">
                    ${generateStars(testimonial.rating)}
                </div>
            </div>
        </div>
        <div class="testimonial-content">
            <blockquote>${testimonial.content}</blockquote>
        </div>
        <div class="testimonial-footer">
            <span class="testimonial-date">${testimonial.date}</span>
            <span class="testimonial-project">${testimonial.project}</span>
        </div>
    `;
    
    return element;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="fas fa-star${i <= rating ? '' : ' far'}"></i>`;
    }
    return stars;
}

// Mock data - in a real app, this would come from an API
function getAllTestimonials() {
    return [
        {
            name: 'Fernanda Costa',
            role: 'Product Owner, Tech Innovations',
            avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
            rating: 5,
            content: 'Excelente profissional! Eduardo entregou nosso projeto com qualidade excepcional e dentro do prazo. Sua expertise em React e AWS foi fundamental para o sucesso.',
            date: 'Junho 2024',
            project: 'Aplicação Web SaaS',
            category: 'web'
        },
        {
            name: 'Ricardo Almeida',
            role: 'CTO, Digital Solutions Inc',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
            rating: 5,
            content: 'Trabalho impecável na arquitetura do nosso sistema. Eduardo trouxe soluções inovadoras e melhorou significativamente nossa performance.',
            date: 'Maio 2024',
            project: 'Arquitetura de Sistema',
            category: 'architecture'
        },
        {
            name: 'Juliana Santos',
            role: 'Designer UX, Creative Agency',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
            rating: 5,
            content: 'Colaboração maravilhosa! Transformou meus designs em uma interface linda e funcional. Muito atento aos detalhes e requisitos.',
            date: 'Abril 2024',
            project: 'Interface de Usuário',
            category: 'ui'
        },
        {
            name: 'Gustavo Lima',
            role: 'Fundador, StartupNova',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            rating: 5,
            content: 'Eduardo foi essencial para o lançamento do nosso MVP. Profissional completo, com visão estratégica e execução impecável.',
            date: 'Março 2024',
            project: 'MVP Startup',
            category: 'startup'
        }
    ];
}

// Testimonial Form Enhancement
function enhanceTestimonialForm() {
    const form = document.getElementById('testimonialForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Add floating label effect
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
    const textarea = form.querySelector('textarea');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
}

// Initialize form enhancements
document.addEventListener('DOMContentLoaded', enhanceTestimonialForm);

// Social Sharing
function initializeSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const testimonial = button.closest('.testimonial-card');
            const name = testimonial.querySelector('.testimonial-name').textContent;
            const content = testimonial.querySelector('blockquote').textContent.substring(0, 100) + '...';
            
            if (navigator.share) {
                navigator.share({
                    title: `Depoimento de ${name}`,
                    text: content,
                    url: window.location.href
                });
            } else {
                // Fallback - copy to clipboard
                const shareText = `Confira este depoimento de ${name}: ${content} - ${window.location.href}`;
                navigator.clipboard.writeText(shareText).then(() => {
                    showNotification('Link copiado para a área de transferência!', 'success');
                });
            }
        });
    });
}

// Initialize social sharing
document.addEventListener('DOMContentLoaded', initializeSocialSharing);

// Export functions for use in other scripts
window.CommentsPage = {
    initializeCommentsAnimations,
    initializeTestimonialFilters,
    initializeTestimonialSearch,
    loadMoreTestimonials
};