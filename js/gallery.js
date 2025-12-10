// gallery.js - Функционал для галереи

document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.gallery-category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (categoryButtons.length === 0 || galleryItems.length === 0) return;
    
    // Фильтрация по категориям
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Обновляем активную кнопку
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Фильтруем галерею
            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Простой просмотр изображений (опционально)
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const title = this.querySelector('h4')?.textContent || '';
            const description = this.querySelector('p')?.textContent || '';
            
            // Создаем модальное окно
            const modal = document.createElement('div');
            modal.className = 'gallery-modal active';
            modal.innerHTML = `
                <button class="modal-close">&times;</button>
                <img src="${imgSrc}" alt="${title}" class="modal-img">
                <div class="modal-caption">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Закрытие модального окна
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', () => {
                modal.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
            
            // Закрытие по Escape
            document.addEventListener('keydown', function closeModal(e) {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.removeEventListener('keydown', closeModal);
                }
            });
        });
    });
    
    console.log('Галерея инициализирована');
});