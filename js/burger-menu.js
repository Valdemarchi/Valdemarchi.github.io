document.addEventListener('DOMContentLoaded', function() {
    console.log('Burger menu script loaded');
    
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    if (!burger || !nav) {
        console.error('Burger or nav element not found!');
        return;
    }
    
    console.log('Burger element:', burger);
    console.log('Nav element:', nav);
    console.log('Initial window width:', window.innerWidth);
    
    // Создаем оверлей для мобильного меню
    const overlay = document.createElement('div');
    overlay.className = 'burger-overlay';
    document.body.appendChild(overlay);
    
    // Обработчик клика по бургеру
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('Burger clicked');
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        console.log('Menu state:', nav.classList.contains('active') ? 'open' : 'closed');
    });
    
    // Закрытие меню при клике на оверлей
    overlay.addEventListener('click', function() {
        console.log('Overlay clicked - closing menu');
        closeBurgerMenu();
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Nav link clicked - closing menu');
            closeBurgerMenu();
        });
    });
    
    // Закрытие меню при нажатии ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            console.log('ESC pressed - closing menu');
            closeBurgerMenu();
        }
    });
    
    // Функция закрытия меню
    function closeBurgerMenu() {
        burger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Функция обновления видимости бургера
    function updateBurgerVisibility() {
        console.log('Updating burger visibility, width:', window.innerWidth);
        
        if (window.innerWidth < 768) {
            // Мобильный режим
            burger.style.display = 'flex';
            nav.style.display = 'none';
            console.log('Mobile mode: burger visible');
        } else {
            // Десктопный режим
            burger.style.display = 'none';
            nav.style.display = 'block';
            closeBurgerMenu(); // Закрываем меню при переходе на декстоп
            console.log('Desktop mode: burger hidden');
        }
    }
    
    // Инициализация и обработчик изменения размера окна
    updateBurgerVisibility();
    window.addEventListener('resize', function() {
        console.log('Window resized to:', window.innerWidth);
        updateBurgerVisibility();
    });
});