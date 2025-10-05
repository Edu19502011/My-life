// Blog page specific functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeBlogAnimations();
    initializeBlogFilters();
    initializeBlogSearch();
    initializeNewsletterForm();
    loadMorePosts();
});

// Blog animations
function initializeBlogAnimations() {
    // Animate featured post
    const featuredPost = document.querySelector('.featured-post-card');
    if (featuredPost) {
        featuredPost.style.opacity = '0';
        featuredPost.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            featuredPost.style.opacity = '1';
            featuredPost.style.transform = 'translateY(0)';
            featuredPost.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }, 300);
    }
    
    // Animate blog posts
    const postCards = document.querySelectorAll('.post-card');
    
    const postObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
                postObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    postCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        postObserver.observe(card);
    });
    
    // Animate newsletter section
    const newsletterSection = document.querySelector('.newsletter-card');
    if (newsletterSection) {
        const newsletterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    newsletterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        newsletterSection.style.opacity = '0';
        newsletterSection.style.transform = 'translateY(50px)';
        newsletterSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        newsletterObserver.observe(newsletterSection);
    }
}

// Blog filters functionality
function initializeBlogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const postCards = document.querySelectorAll('.post-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter posts
            postCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px) scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Show notification
            if (filter !== 'all') {
                showNotification(`Filtrando artigos por: ${filter}`, 'info');
            } else {
                showNotification('Mostrando todos os artigos', 'info');
            }
        });
    });
}

// Blog search functionality
function initializeBlogSearch() {
    const searchInput = document.getElementById('blogSearch');
    const postCards = document.querySelectorAll('.post-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            const searchTerm = e.target.value.toLowerCase();
            let visibleCount = 0;
            
            postCards.forEach((card, index) => {
                const title = card.querySelector('.post-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.post-excerpt').textContent.toLowerCase();
                const category = card.querySelector('.post-category').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
                
                const matches = title.includes(searchTerm) || 
                               excerpt.includes(searchTerm) || 
                               category.includes(searchTerm) || 
                               tags.includes(searchTerm);
                
                if (matches || searchTerm === '') {
                    visibleCount++;
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px) scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            if (searchTerm) {
                showNotification(`Encontrados ${visibleCount} artigos para: "${searchTerm}"`, 'info');
            }
        }, 300));
    }
}

// Newsletter form handling
function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Add loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscrevendo...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Inscrição realizada com sucesso! Verifique seu email.', 'success');
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Load more posts functionality
function loadMorePosts() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentPage = 1;
    const postsPerPage = 6;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const newPosts = generateMorePosts();
            const postsGrid = document.querySelector('.posts-grid');
            
            if (newPosts.length > 0) {
                renderNewPosts(newPosts, postsGrid);
                currentPage++;
                
                // Hide button if no more posts
                if (currentPage >= 3) {
                    loadMoreBtn.style.display = 'none';
                    showNotification('Todos os artigos foram carregados!', 'info');
                }
            }
        });
    }
}

function generateMorePosts() {
    // Mock data for additional posts
    const additionalPosts = [
        {
            title: "TypeScript 5.0: O que há de Novo",
            category: "javascript",
            excerpt: "Descubra as novas funcionalidades do TypeScript 5.0 e como elas podem melhorar sua experiência de desenvolvimento.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
            date: "Novembro 5, 2024",
            tags: ["TypeScript", "JavaScript"],
            views: "956",
            readTime: "8 min"
        },
        {
            title: "Microservices com Docker Compose",
            category: "tutorial",
            excerpt: "Aprenda a orquestrar microservices usando Docker Compose para ambientes de desenvolvimento eficientes.",
            image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&h=400&fit=crop",
            date: "Outubro 30, 2024",
            tags: ["Docker", "Microservices"],
            views: "1.3k",
            readTime: "18 min"
        },
        {
            title: "GraphQL vs REST: A Batalha Continua",
            category: "nodejs",
            excerpt: "Análise comparativa entre GraphQL e REST APIs, ajudando você a escolher a melhor abordagem para seu projeto.",
            image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop",
            date: "Outubro 25, 2024",
            tags: ["GraphQL", "API"],
            views: "2.4k",
            readTime: "12 min"
        }
    ];
    
    return additionalPosts;
}

function renderNewPosts(posts, container) {
    posts.forEach((post, index) => {
        const postElement = createPostElement(post);
        postElement.style.opacity = '0';
        postElement.style.transform = 'translateY(50px) scale(0.95)';
        
        container.appendChild(postElement);
        
        setTimeout(() => {
            postElement.style.opacity = '1';
            postElement.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post-card';
    article.setAttribute('data-category', post.category);
    
    article.innerHTML = `
        <div class="post-image">
            <img src="${post.image}" alt="${post.title}">
            <div class="post-overlay">
                <a href="#" class="read-more-btn">Ler Artigo</a>
            </div>
        </div>
        <div class="post-content">
            <div class="post-meta">
                <span class="post-category">${post.category.charAt(0).toUpperCase() + post.category.slice(1)}</span>
                <span class="post-date">${post.date}</span>
            </div>
            <h3 class="post-title">
                <a href="#">${post.title}</a>
            </h3>
            <p class="post-excerpt">
                ${post.excerpt}
            </p>
            <div class="post-footer">
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="post-stats">
                    <span><i class="fas fa-eye"></i> ${post.views}</span>
                    <span><i class="fas fa-clock"></i> ${post.readTime}</span>
                </div>
            </div>
        </div>
    `;
    
    return article;
}

// Post card hover effects
function initializePostCardEffects() {
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-2xl)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
    });
}

// Initialize post card effects
document.addEventListener('DOMContentLoaded', initializePostCardEffects);

// Reading progress indicator
function initializeReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 80px;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--accent-gradient);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize reading progress
document.addEventListener('DOMContentLoaded', initializeReadingProgress);

// Social sharing functionality
function initializeSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const post = button.closest('.post-card');
            const title = post.querySelector('.post-title').textContent;
            const url = window.location.href;
            
            if (navigator.share) {
                navigator.share({
                    title: title,
                    url: url
                });
            } else {
                // Fallback - copy to clipboard
                const shareText = `${title} - ${url}`;
                navigator.clipboard.writeText(shareText).then(() => {
                    showNotification('Link copiado para a área de transferência!', 'success');
                });
            }
        });
    });
}

// Export functions for use in other scripts
window.BlogPage = {
    initializeBlogAnimations,
    initializeBlogFilters,
    initializeBlogSearch,
    initializeNewsletterForm,
    loadMorePosts
};