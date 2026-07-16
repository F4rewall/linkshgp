/**
 * Avant Browser Interactive Scripts
 * Features: Card Glow Effect, Smooth Scroll, and Download Micro-interaction
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Feature Cards Glow Effect (Mouse Tracker)
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position inside element
            const y = e.clientY - rect.top;  // y position inside element
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // 2. Interactive Mockup Tab Switcher (just for show)
    const tabs = document.querySelectorAll('.mockup-tab');
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                if (tab.textContent !== '+') {
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                }
            });
        });
    }

    // 3. Download Button Feedback
    const downloadBtn = document.getElementById('main-download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Visual feedback on click
            const originalText = downloadBtn.querySelector('span').textContent;
            downloadBtn.querySelector('span').textContent = 'Iniciando Download...';
            downloadBtn.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                downloadBtn.querySelector('span').textContent = 'Download Concluído!';
                downloadBtn.style.transform = 'scale(1)';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    downloadBtn.querySelector('span').textContent = originalText;
                }, 3000);
            }, 1500);
        });
    }

    // 4. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.feature-card, .specs-box, .faq-item');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        revealOnScroll.observe(el);
    });
});
