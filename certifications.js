// Certifications page specific functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeCertificationsAnimations();
    initializeOverviewCounters();
    initializeCertificationFilters();
    initializeCertificationVerification();
});

// Certifications page animations
function initializeCertificationsAnimations() {
    // Animate overview cards
    const overviewCards = document.querySelectorAll('.overview-card');
    
    const overviewObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                overviewObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    overviewCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        overviewObserver.observe(card);
    });
    
    // Animate category sections
    const categorySections = document.querySelectorAll('.category-section');
    
    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 300);
                categoryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    categorySections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        categoryObserver.observe(section);
    });
    
    // Animate certification cards
    const certCards = document.querySelectorAll('.cert-card');
    
    const certObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
                certObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    certCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        certObserver.observe(card);
    });
    
    // Animate validation cards
    const validationCards = document.querySelectorAll('.validation-card');
    
    const validationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                validationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    validationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        validationObserver.observe(card);
    });
}

// Overview counters animation
function initializeOverviewCounters() {
    const counters = document.querySelectorAll('.overview-number[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-count'));
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue;
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentValue);
                    }
                }, 30);
                
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Certification filters (if needed for future implementation)
function initializeCertificationFilters() {
    // This function can be extended to add filtering capabilities
    // For now, we'll just add some interactive effects
    
    const categoryTitles = document.querySelectorAll('.category-title');
    
    categoryTitles.forEach(title => {
        title.addEventListener('click', function() {
            const section = this.parentElement;
            const grid = section.querySelector('.certifications-grid');
            
            // Toggle visibility with animation
            if (grid.style.display === 'none') {
                grid.style.display = 'grid';
                setTimeout(() => {
                    grid.style.opacity = '1';
                    grid.style.transform = 'translateY(0)';
                }, 50);
            } else {
                grid.style.opacity = '0';
                grid.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    grid.style.display = 'none';
                }, 300);
            }
        });
        
        // Add cursor pointer to indicate interactivity
        title.style.cursor = 'pointer';
        title.title = 'Clique para expandir/recolher';
    });
}

// Certification verification system
function initializeCertificationVerification() {
    const verifyButtons = document.querySelectorAll('.verify-btn');
    
    verifyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const certId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            const originalText = this.innerHTML;
            
            // Add loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
            this.disabled = true;
            
            // Simulate verification process
            setTimeout(() => {
                showVerificationModal(certId);
                
                // Reset button
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
}

// Show verification modal
function showVerificationModal(certId) {
    const modal = document.createElement('div');
    modal.className = 'verification-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Verificação de Certificação</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="verification-status">
                        <i class="fas fa-check-circle status-icon"></i>
                        <h4>Certificação Válida</h4>
                        <p class="cert-id-display">ID: ${certId}</p>
                    </div>
                    <div class="verification-details">
                        <p><strong>Status:</strong> Ativa</p>
                        <p><strong>Validade:</strong> Até 2026</p>
                        <p><strong>Emissor:</strong> Amazon Web Services</p>
                        <p><strong>Data de Emissão:</strong> Janeiro 2024</p>
                    </div>
                    <div class="verification-actions">
                        <button class="btn-primary" onclick="window.open('https://aws.amazon.com/certification/', '_blank')">
                            <i class="fas fa-external-link-alt"></i>
                            Verificar no Site Oficial
                        </button>
                        <button class="btn-secondary" onclick="downloadCertificate('${certId}')">
                            <i class="fas fa-download"></i>
                            Baixar Certificado
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .verification-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        }
        
        .modal-content {
            background: var(--bg-secondary);
            border-radius: var(--radius-2xl);
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            box-shadow: var(--shadow-2xl);
            border: 1px solid var(--glass-border);
            animation: modalSlideIn 0.3s ease;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .modal-header h3 {
            color: var(--text-primary);
            font-family: var(--font-display);
            font-size: 1.5rem;
            font-weight: 700;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-secondary);
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius-full);
            transition: var(--transition-normal);
        }
        
        .modal-close:hover {
            background: var(--glass-bg);
            color: var(--error);
        }
        
        .verification-status {
            text-align: center;
            margin-bottom: 2rem;
            padding: 2rem;
            background: var(--glass-bg);
            border-radius: var(--radius-xl);
            border: 1px solid var(--glass-border);
        }
        
        .status-icon {
            font-size: 3rem;
            color: var(--success);
            margin-bottom: 1rem;
        }
        
        .verification-status h4 {
            color: var(--text-primary);
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .cert-id-display {
            color: var(--text-secondary);
            font-family: var(--font-mono);
            font-size: 0.875rem;
        }
        
        .verification-details {
            margin-bottom: 2rem;
        }
        
        .verification-details p {
            margin-bottom: 0.5rem;
            color: var(--text-secondary);
        }
        
        .verification-details strong {
            color: var(--text-primary);
        }
        
        .verification-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .verification-actions .btn-primary,
        .verification-actions .btn-secondary {
            flex: 1;
            min-width: 200px;
        }
    `;
    
    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
    
    // Add modal to document
    document.body.appendChild(modal);
    
    // Handle modal close
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(styleSheet);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Download certificate function
function downloadCertificate(certId) {
    showNotification('Preparando download do certificado...', 'info');
    
    // Simulate download process
    setTimeout(() => {
        showNotification('Certificado baixado com sucesso!', 'success');
        
        // In a real implementation, this would trigger an actual download
        // For demo purposes, we'll just show a notification
        const link = document.createElement('a');
        link.href = '#';
        link.download = `certificado-${certId}.pdf`;
        link.click();
    }, 1500);
}

// Certification card hover effects
function initializeCertCardEffects() {
    const certCards = document.querySelectorAll('.cert-card');
    
    certCards.forEach(card => {
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

// Initialize certification card effects
document.addEventListener('DOMContentLoaded', initializeCertCardEffects);

// Skills progress animation
function animateSkillsProgress() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillTags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        skillsObserver.observe(tag);
    });
}

// Initialize skills animation
document.addEventListener('DOMContentLoaded', animateSkillsProgress);

// Certification timeline visualization
function createCertificationTimeline() {
    const timelineData = [
        { year: 2024, title: 'AWS Solutions Architect Professional', type: 'cloud' },
        { year: 2024, title: 'React Professional Certification', type: 'frontend' },
        { year: 2024, title: 'Node.js Professional Certification', type: 'backend' },
        { year: 2023, title: 'AWS Developer Associate', type: 'cloud' },
        { year: 2023, title: 'Docker Certified Associate', type: 'devops' },
        { year: 2023, title: 'JavaScript Mastery Certification', type: 'frontend' }
    ];
    
    // This could be expanded to create a visual timeline
    // For now, we'll just add some interactive elements
    console.log('Certification Timeline:', timelineData);
}

// Export functions for use in other scripts
window.CertificationsPage = {
    initializeCertificationsAnimations,
    initializeOverviewCounters,
    initializeCertificationFilters,
    initializeCertificationVerification,
    verifyCertification,
    downloadCertificate
};