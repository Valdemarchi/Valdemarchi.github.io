
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.menu-category-btn');
    const menuCards = document.querySelectorAll('.menu-card');
    
    if (categoryButtons.length === 0 || menuCards.length === 0) return;
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            menuCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    console.log('Меню с категориями инициализировано');
});