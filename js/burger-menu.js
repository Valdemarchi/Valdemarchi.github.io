
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    if (!burger || !nav) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'burger-overlay';
    document.body.appendChild(overlay);
    
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    overlay.addEventListener('click', closeBurgerMenu);
    
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeBurgerMenu);
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeBurgerMenu();
        }
    });
    
    function closeBurgerMenu() {
        burger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    updateBurgerVisibility();
    window.addEventListener('resize', updateBurgerVisibility);
    
    function updateBurgerVisibility() {
        if (window.innerWidth < 768) {
            burger.style.display = 'flex';
            nav.style.display = 'none';
        } else {
            burger.style.display = 'none';
            nav.style.display = 'block';
            closeBurgerMenu();
        }
    }
});