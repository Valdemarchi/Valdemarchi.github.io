document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initScrollAnimations();
});

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                closeBurgerMenu();
                
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function closeBurgerMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const overlay = document.querySelector('.burger-overlay');
    
    if (burger?.classList.contains('active')) {
        burger.classList.remove('active');
        nav?.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in-up');
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => observer.observe(el));
} 

// Автопрокрутка карусели отзывов
document.addEventListener('DOMContentLoaded', function() {
    const reviewsCarousel = document.getElementById('reviewsCarousel');
    if (reviewsCarousel) {
        // Инициализация карусели с автопрокруткой
        const carousel = new bootstrap.Carousel(reviewsCarousel, {
            interval: 5000, // 5 секунд между слайдами
            wrap: true,
            pause: 'hover', // останавливается при наведении
            touch: true // поддерживает свайп на мобильных
        });
        
        // Добавляем плавную анимацию
        reviewsCarousel.addEventListener('slide.bs.carousel', function(event) {
            const activeSlide = event.from;
            const nextSlide = event.to;
            
            // Можно добавить дополнительные анимации
        });
    }
});