// =========================================================
// ПОЛНЫЙ КОД ДЛЯ LADY STRETCH HUB - script.js
// УПРАВЛЕНИЕ НАВИГАЦИЕЙ И ЭКРАНАМИ
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // Получаем все элементы, которые переключают экраны
    // Сюда входят: .nav-button (футер), .quick-link-btn (Главная), .back-button (Назад)
    const navButtons = document.querySelectorAll('.nav-button, .quick-link-btn, .back-button');
    
    // Флаг для определения, какой экран является "корневым" (по умолчанию Главная)
    const ROOT_SCREEN = 'screen-home';

    // Функция переключения экранов
    function switchScreen(targetId) {
        
        // 1. Скрываем все экраны
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
            screen.classList.add('hidden');
        });
        
        // 2. Показываем целевой экран
        const targetScreen = document.getElementById(targetId);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            targetScreen.classList.add('active');
        }

        // 3. Обновляем активную кнопку в нижнем футере
        document.querySelectorAll('.nav-button').forEach(btn => {
            const btnTarget = btn.getAttribute('data-target');
            
            // Проверяем, если текущая цель или ее "родитель" соответствует кнопке футера
            // Например, если мы на экране motivation, кнопка home все равно должна быть неактивна,
            // если только motivation не является частью home (что не наш случай)
            if (btnTarget === targetId) {
                btn.classList.add('active');
            } else if (btnTarget === ROOT_SCREEN && targetId === ROOT_SCREEN) {
                // Особый случай для Главной
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // 4. Обработчик для всех навигационных кнопок
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Кнопки футера используют data-target. 
            // Кнопки quick-link-btn и back-button используют data-target-screen.
            const targetId = this.getAttribute('data-target') || this.getAttribute('data-target-screen');
            if (targetId) {
                switchScreen(targetId);
            }
        });
    });

    // 5. Инициализация: Убедимся, что при загрузке активен только ROOT_SCREEN
    switchScreen(ROOT_SCREEN);
    
    // ДОПОЛНИТЕЛЬНАЯ ЛОГИКА (Для будущих обновлений)
    
    // Если в будущем будем добавлять логику Детокс-курса
    const motivationButton = document.querySelector('#screen-motivation .action-button.primary-btn');
    if (motivationButton) {
        motivationButton.addEventListener('click', () => {
            alert('Здесь будет экран входа или запуска Детокс-курса.');
            // В будущем здесь будет вызов функции запуска детокс-приложения
        });
    }
});
