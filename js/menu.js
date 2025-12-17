document.addEventListener('DOMContentLoaded', function() {
    // Функционал фильтрации по категориям
    const categoryButtons = document.querySelectorAll('.menu-category-btn');
    const menuCards = document.querySelectorAll('.menu-card');
    
    if (categoryButtons.length > 0 && menuCards.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Обновляем активную кнопку
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Показываем/скрываем карточки
                menuCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Функционал кнопок "Добавить" / "Добавлено"
    const addButtons = document.querySelectorAll('.menu-card__btn');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const card = this.closest('.menu-card');
            const dishName = card.querySelector('h3').textContent.trim();
            const dishPrice = card.querySelector('.menu-card__price').textContent.trim();
            
            if (this.classList.contains('added')) {
                // Если уже добавлено, удаляем
                this.classList.remove('added');
                this.innerHTML = '<i class="fas fa-plus me-1"></i>Добавить';
                showNotification(`${dishName} удален из корзины`, 'remove');
            } else {
                // Если не добавлено, добавляем
                this.classList.add('added');
                this.innerHTML = '<i class="fas fa-check me-1"></i>Добавлено';
                showNotification(`${dishName} добавлен в корзину`, 'add');
                
                // Анимация добавления
                const btnRect = this.getBoundingClientRect();
                createAddAnimation(btnRect);
            }
        });
    });
    
    // Функция показа уведомления
    function showNotification(message, type) {
        // Удаляем предыдущие уведомления
        const existingNotification = document.querySelector('.add-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Создаем новое уведомление
        const notification = document.createElement('div');
        notification.className = `add-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'add' ? 'check-circle' : 'times-circle'} me-2"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        // Автоматическое удаление через 3 секунды
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    // Функция создания анимации добавления
    function createAddAnimation(btnRect) {
        const animation = document.createElement('div');
        animation.className = 'add-animation';
        animation.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1999;
            left: ${btnRect.left + btnRect.width/2 - 10}px;
            top: ${btnRect.top + btnRect.height/2 - 10}px;
            animation: flyToCart 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        `;
        
        document.body.appendChild(animation);
        
        // Удаляем анимацию после завершения
        setTimeout(() => {
            animation.remove();
        }, 800);
    }
});