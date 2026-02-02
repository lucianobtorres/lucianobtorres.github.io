/**
 * Portfolio Landing Page - Main JavaScript
 * Handles scroll animations, smooth scrolling, and interactive elements
 */

(function() {
    'use strict';

    // ===================================
    // SMOOTH SCROLLING
    // ===================================
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===================================
    // SCROLL REVEAL ANIMATIONS
    // ===================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        if (revealElements.length === 0) return;
        
        // Intersection Observer options
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        // Callback when element becomes visible
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Optional: stop observing after reveal
                    // observer.unobserve(entry.target);
                }
            });
        };
        
        // Create observer
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        // Observe all reveal elements
        revealElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ===================================
    // SCROLL INDICATOR
    // ===================================
    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (!scrollIndicator) return;
        
        // Hide scroll indicator after scrolling past hero
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const windowHeight = window.innerHeight;
                    
                    if (scrollY > windowHeight * 0.3) {
                        scrollIndicator.style.opacity = '0';
                        scrollIndicator.style.pointerEvents = 'none';
                    } else {
                        scrollIndicator.style.opacity = '0.8';
                        scrollIndicator.style.pointerEvents = 'auto';
                    }
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }

    // ===================================
    // NAVBAR SCROLL EFFECT (if needed in future)
    // ===================================
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        if (!navbar) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // ===================================
    // TECH BADGE HOVER EFFECTS
    // ===================================
    function initTechBadges() {
        const techBadges = document.querySelectorAll('.tech-badge, .badge');
        
        techBadges.forEach(badge => {
            // Add ripple effect on click (optional enhancement)
            badge.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // ===================================
    // HERO PARALLAX EFFECT (subtle)
    // ===================================
    function initParallax() {
        const hero = document.querySelector('#hero');
        
        if (!hero) return;
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    const heroContent = hero.querySelector('.hero-content');
                    
                    if (heroContent && scrolled < window.innerHeight) {
                        // Subtle parallax effect
                        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
                    }
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }

    // ===================================
    // CARD TILT EFFECT (3D hover)
    // ===================================
    function initCardTilt() {
        const cards = document.querySelectorAll('.card, .project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // ===================================
    // TYPING EFFECT (optional for hero)
    // ===================================
    function initTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        
        if (!heroTitle || heroTitle.dataset.typed) return;
        
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.dataset.typed = 'true';
        
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // ===================================
    // PERFORMANCE TRACKING
    // ===================================
    function logPerformance() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                const perfData = window.performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`🚀 Page loaded in ${loadTime}ms`);
            });
        }
    }

    // ===================================
    // INITIALIZE ALL
    // ===================================
    function init() {
        console.log('🎨 Initializing portfolio...');
        
        // Core features
        initSmoothScrolling();
        initScrollReveal();
        initScrollIndicator();
        
        // Enhanced features
        initParallax();
        initTechBadges();
        
        // Optional: uncomment if you want these effects
        // initCardTilt();
        // initTypingEffect();
        
        // Animate skill bars
        initSkillBars();
        
        // Enhanced parallax cubes
        initBokehParallax();
        
        // Back to Top functionality
        initBackToTop();

        // Avatar Glitch Effect
        initAvatarGlitch();
        
        // Dynamic Experience Counter
        initExperienceCounter();
        
        // Performance tracking (development only)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            logPerformance();
        }
        
        console.log('✅ Portfolio initialized successfully!');
    }
    
    // ===================================
    // DYNAMIC EXPERIENCE COUNTER
    // ===================================
    function initExperienceCounter() {
        const experienceSpan = document.getElementById('experience-years');
        if (!experienceSpan) return;
        
        const startYear = 2005; // Based on 2025 - 19 = 2006
        const currentYear = new Date().getFullYear();
        const years = currentYear - startYear;
        
        experienceSpan.textContent = `${years} anos`;
    }

    // ===================================
    // BACK TO TOP BUTTON
    // ===================================
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (!backToTopBtn) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // SKILL BARS ANIMATION
    // ===================================
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar-item');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        };
        
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    // ===================================
    // AVATAR GLITCH EFFECT
    // ===================================
    function initAvatarGlitch() {
        const aboutSection = document.getElementById('about');
        const photoWrapper = document.querySelector('.about-photo');
        const photoImg = photoWrapper ? photoWrapper.querySelector('img') : null;
        
        if (!aboutSection || !photoWrapper || !photoImg) return;

        const images = [
            "img/eu.JPG",
            "img/cyberpunk_toon_noglasses.png",
            "img/cyberpunk_toon_v2.png",
            "img/cyberpunk_avatar.png"
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        let lastIndex = -1;
        let timeout;

        // --- FUNÇÃO DE ATUALIZAÇÃO CENTRALIZADA ---
        const updateImageEffect = (index) => {
            if (index === lastIndex) return;

            // Sincroniza backgrounds e ativa animação
            photoWrapper.style.backgroundImage = `url('${images[index]}')`;
            photoWrapper.classList.add('glitch-active');
            
            photoImg.src = images[index];
            lastIndex = index;

            // Duração do Glitch (300ms)
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                photoWrapper.classList.remove('glitch-active');
            }, 300);

            // Adiciona Faíscas/Raios
            // No clique ou scroll importante, podemos aumentar para 15-20 raios para ser mais dramático
            for(let i=0; i < 15; i++) {
                setTimeout(() => {
                    createExtremeSpark(photoWrapper);
                }, Math.random() * 200);
            }
        };

        // --- EVENTO: CLIQUE ---
        photoWrapper.style.cursor = 'pointer'; // Feedback visual de que é clicável
        photoWrapper.addEventListener('click', () => {
            // Avança para a próxima imagem (em loop)
            const nextIndex = (lastIndex + 1) % images.length;
            updateImageEffect(nextIndex);
        });

        // --- EVENTO: SCROLL ---
        window.addEventListener('scroll', () => {
            const rect = aboutSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            const totalScrollableDistance = rect.height + windowHeight;
            const scrolledDistance = windowHeight - rect.top;
            
            let scrollPercent = scrolledDistance / totalScrollableDistance;
            scrollPercent = Math.max(0, Math.min(1, scrollPercent));
            
            const index = Math.min(Math.floor(scrollPercent * images.length), images.length - 1);

            updateImageEffect(index);
        });
    }

    function createExtremeSpark(targetContainer) {
        const spark = document.createElement('div');
        const isCyan = Math.random() > 0.5;
        
        // Define a cor aleatória
        spark.className = `spark ${isCyan ? 'spark-cyan' : 'spark-magenta'}`;
        
        // Posicionamento aleatório baseado nas dimensões do container
        const xBase = Math.random() * targetContainer.offsetWidth - 50; 
        const yBase = Math.random() * targetContainer.offsetHeight;
        
        spark.style.left = xBase + 'px';
        spark.style.top = yBase + 'px';
        
        // Largura aleatória do raio
        const width = Math.random() * 180 + 40;
        spark.style.width = width + 'px';
      
        // Define a trajetória do "salto" usando variáveis CSS
        const moveX = (Math.random() - 0.5) * 250;
        const finalX = moveX * 1.2;
        spark.style.setProperty('--mX', `${moveX}px`);
        spark.style.setProperty('--fX', `${finalX}px`);
      
        // Aplica a animação
        spark.style.animation = `spark-extreme 0.25s cubic-bezier(0.1, 0.8, 0.2, 1) forwards`;
      
        // Adiciona ao container e remove após a animação terminar
        targetContainer.appendChild(spark);
        setTimeout(() => spark.remove(), 250);
    }

    // ===================================
    // ENHANCED BOKEH PARALLAX
    // ===================================
    function initBokehParallax() {
        const cubes = document.querySelectorAll('.bokeh-cube');
        
        if (cubes.length === 0) return;
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    
                    cubes.forEach((cube, index) => {
                        // Different scroll speeds for each cube
                        const speed = 0.1 + (index * 0.05);
                        const yOffset = scrolled * speed;
                        
                        cube.style.transform = `translateY(${yOffset}px)`;
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }

    // ===================================
    // EXECUTE ON DOM READY
    // ===================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
