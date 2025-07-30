// Futuristic Portfolio JavaScript
class FuturisticPortfolio {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.cursor = document.querySelector('.cursor');
        this.cursorTrail = document.querySelector('.cursor-trail');
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.init();
    }

    init() {
        this.setupCanvas();
        this.createParticles();
        this.setupEventListeners();
        this.setupLoadingScreen();
        this.setupScrollAnimations();
        this.typewriterEffect();
        this.animate();
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    createParticles() {
        const particleCount = Math.min(100, Math.floor(window.innerWidth / 15));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomNeonColor()
            });
        }
    }

    getRandomNeonColor() {
        const colors = ['#00ff88', '#00d4ff', '#ff0080'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    setupEventListeners() {
        // Custom cursor
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            if (this.cursor) {
                this.cursor.style.left = e.clientX - 10 + 'px';
                this.cursor.style.top = e.clientY - 10 + 'px';
            }
            
            setTimeout(() => {
                if (this.cursorTrail) {
                    this.cursorTrail.style.left = e.clientX - 4 + 'px';
                    this.cursorTrail.style.top = e.clientY - 4 + 'px';
                }
            }, 100);
        });

        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .skill-hex, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (this.cursor) {
                    this.cursor.style.transform = 'scale(2)';
                    this.cursor.style.opacity = '0.8';
                }
            });
            
            el.addEventListener('mouseleave', () => {
                if (this.cursor) {
                    this.cursor.style.transform = 'scale(1)';
                    this.cursor.style.opacity = '1';
                }
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // CTA button click
        const exploreBtn = document.getElementById('explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    const offsetTop = aboutSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }

        // Form submission
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }

        // Skill hex interactions
        document.querySelectorAll('.skill-hex').forEach(hex => {
            hex.addEventListener('click', () => {
                this.animateSkillHex(hex);
            });
        });
    }

    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const loadingProgress = document.querySelector('.loading-progress');
        
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                setTimeout(() => {
                    if (loadingScreen) {
                        loadingScreen.classList.add('hidden');
                    }
                    document.body.style.overflow = 'auto';
                }, 500);
            }
            
            if (loadingProgress) {
                loadingProgress.style.width = progress + '%';
            }
        }, 100);
    }

    typewriterEffect() {
        const nameElement = document.getElementById('name-text');
        const subtitleElement = document.getElementById('subtitle-text');
        const name = 'SANTHOSH BOLLAM';
        
        if (!nameElement) return;
        
        let i = 0;
        const typeInterval = setInterval(() => {
            nameElement.textContent = name.slice(0, i);
            i++;
            
            if (i > name.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    if (subtitleElement) {
                        subtitleElement.style.opacity = '1';
                    }
                }, 500);
            }
        }, 100);
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });

        // Observe project cards
        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });

        // Parallax effect for floating shapes
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.floating-shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + index * 0.2;
                if (shape) {
                    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
                }
            });

            // Update navigation
            this.updateNavigation();
        });
    }

    updateNavigation() {
        const nav = document.querySelector('.nav');
        const scrolled = window.pageYOffset;
        
        if (nav) {
            if (scrolled > 100) {
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                nav.style.background = 'rgba(10, 10, 10, 0.8)';
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x <= 0 || particle.x >= this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= this.canvas.height) {
                particle.vy *= -1;
            }
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx -= (dx / distance) * force * 0.01;
                particle.vy -= (dy / distance) * force * 0.01;
            }
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
            
            // Draw connections
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 80) {
                        this.ctx.save();
                        this.ctx.globalAlpha = (80 - distance) / 80 * 0.2;
                        this.ctx.strokeStyle = particle.color;
                        this.ctx.lineWidth = 1;
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.stroke();
                        this.ctx.restore();
                    }
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }

    animateSkillHex(hex) {
        const skillName = hex.getAttribute('data-skill');
        const skillLevel = hex.getAttribute('data-level');
        
        // Create floating text effect
        const floatingText = document.createElement('div');
        floatingText.innerHTML = `${skillName}<br>${skillLevel}%`;
        floatingText.style.cssText = `
            position: fixed;
            left: ${this.mouse.x}px;
            top: ${this.mouse.y}px;
            background: rgba(0, 255, 136, 0.9);
            color: #0a0a0a;
            padding: 10px 15px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 14px;
            text-align: center;
            pointer-events: none;
            z-index: 1000;
            transform: translate(-50%, -50%);
            animation: floatUp 2s ease-out forwards;
        `;
        
        document.body.appendChild(floatingText);
        
        setTimeout(() => {
            if (document.body.contains(floatingText)) {
                document.body.removeChild(floatingText);
            }
        }, 2000);
        
        // Add CSS animation for floating effect
        if (!document.getElementById('floatUpAnimation')) {
            const style = document.createElement('style');
            style.id = 'floatUpAnimation';
            style.textContent = `
                @keyframes floatUp {
                    0% {
                        opacity: 0;
                        transform: translate(-50%, -50%) translateY(0);
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                        transform: translate(-50%, -50%) translateY(-50px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Updated handleFormSubmission with Formspree integration
    handleFormSubmission(form) {
        const formData = new FormData(form);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const message = formData.get('message')?.trim();

        if (!name || !email || !message) {
            this.showNotification('Please fill in all fields!', 'error');
            return;
        }

        // Send form data to Formspree endpoint
        fetch('https://formspree.io/f/mjkoogrv', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                this.showNotification('Message sent successfully! ✨', 'success');

                form.reset();

                // Reset form labels styles
                const labels = form.querySelectorAll('.form-label');
                labels.forEach(label => {
                    label.style.top = '1rem';
                    label.style.left = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--color-gray-400)';
                    label.style.background = 'transparent';
                    label.style.padding = '0';
                });

                // Trigger particle explosion effect if exists
                if (typeof this.createParticleExplosion === 'function') {
                    this.createParticleExplosion(window.innerWidth / 2, window.innerHeight / 2);
                }
            } else {
                response.json().then(data => {
                    const errors = data.errors ? data.errors.map(e => e.message).join(', ') : 'Failed to send message.';
                    this.showNotification(errors, 'error');
                }).catch(() => {
                    this.showNotification('Failed to send message.', 'error');
                });
            }
        }).catch(() => {
            this.showNotification('Network error: Please try again later.', 'error');
        });
    }

    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.innerHTML = message;
        
        const bgColor = type === 'success' 
            ? 'linear-gradient(45deg, #00ff88, #00d4ff)' 
            : 'linear-gradient(45deg, #ff0080, #ff4444)';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: #0a0a0a;
            padding: 20px 30px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 16px;
            z-index: 10000;
            box-shadow: 0 20px 40px rgba(0, 255, 136, 0.3);
            transform: translateX(400px);
            transition: transform 0.5s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }

    createParticleExplosion(x, y) {
        const explosionParticles = [];
        
        for (let i = 0; i < 20; i++) {
            explosionParticles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                size: Math.random() * 4 + 2,
                opacity: 1,
                color: this.getRandomNeonColor(),
                life: 60
            });
        }
        
        const animateExplosion = () => {
            explosionParticles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.98;
                particle.vy *= 0.98;
                particle.opacity -= 1/60;
                particle.life--;
                
                this.ctx.save();
                this.ctx.globalAlpha = particle.opacity;
                this.ctx.fillStyle = particle.color;
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
                
                if (particle.life <= 0) {
                    explosionParticles.splice(index, 1);
                }
            });
            
            if (explosionParticles.length > 0) {
                requestAnimationFrame(animateExplosion);
            }
        };
        
        animateExplosion();
    }

    // Utility method to add glow effect to elements
    addGlowEffect(element, color) {
        element.style.filter = `drop-shadow(0 0 10px ${color})`;
        element.style.transition = 'filter 0.3s ease';
        
        setTimeout(() => {
            element.style.filter = 'none';
        }, 1000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new FuturisticPortfolio();
    
    // Add some extra interactive effects
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotateX(5deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });
    
    // Add typing sound effect simulation (visual feedback)
    document.addEventListener('keydown', (e) => {
        if (e.target.matches('.form-input')) {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 4px;
                height: 4px;
                background: #00ff88;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            e.target.style.position = 'relative';
            e.target.appendChild(ripple);
            
            setTimeout(() => {
                if (e.target.contains(ripple)) {
                    e.target.removeChild(ripple);
                }
            }, 600);
            
            // Add ripple animation if not exists
            if (!document.getElementById('rippleAnimation')) {
                const style = document.createElement('style');
                style.id = 'rippleAnimation';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: translate(-50%, -50%) scale(10);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    });
    
    console.log('🚀 Futuristic Portfolio Initialized - Welcome to the Future!');
});
