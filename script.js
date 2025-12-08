/**
 * Lady Stretch Сыктывкар - Основной скрипт приложения
 * Версия: 2.1 (С исправленной логикой загрузки расписания)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==============================================
    // КОНСТАНТЫ И НАСТРОЙКИ
    // ==============================================
    const SALON_ID = "02977247-3381-4559-b9ef-1cf88d2731a2"; 
    const LOADING_TIMEOUT = 10000; // 10 секунд для загрузки расписания
    
    // ==============================================
    // 1. ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ
    // ==============================================
    const screens = document.querySelectorAll('.screen');
    const navButtons = document.querySelectorAll('.nav-button');
    const quickLinks = document.querySelectorAll('.quick-link-btn, .back-button');
    const errorMessage = document.getElementById('error-message');
    const schedulePlaceholder = document.querySelector('[data-fit1c-calendar]');
    const scheduleFallback = document.getElementById('schedule-fallback');
    
    // Состояние приложения
    const appState = {
        currentScreen: 'screen-home',
        scheduleLoadAttempted: false // Флаг для первой попытки загрузки
    };
    
    // ==============================================
    // 2. ФУНКЦИИ УТИЛИТЫ
    // ==============================================
    
    /**
     * Показывает сообщение об ошибке
     */
    function showError(message, duration = 5000) {
        if (!errorMessage) return;
        
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        console.error('Ошибка приложения:', message);
        
        if (duration > 0) {
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, duration);
        }
    }
    
    /**
     * Проверяет, загрузился ли виджет расписания, и обрабатывает таймаут.
     */
    function checkScheduleLoadStatus() {
        if (!schedulePlaceholder || !scheduleFallback) return;

        // Проверяем, если ли внутри плейсхолдера еще наш текст 'Расписание загружается...'
        // Если текста нет, значит, Fit1c его заменил своим контентом.
        const isLoaded = !schedulePlaceholder.textContent.includes('Расписание загружается');
        
        if (!isLoaded) {
            // Загрузка не удалась - показываем запасной вариант
            console.error('Ошибка: Таймаут загрузки расписания Fit1c. Показываем запасной вариант.');
            
            // Скрываем loader и placeholder
            schedulePlaceholder.style.display = 'none';
            
            // Показываем запасной вариант
            scheduleFallback.style.display = 'block';
            showError('Не удалось загрузить онлайн расписание. Попробуйте обновить страницу или позвоните нам.', 0); 
        } else {
            // Считаем, что загрузка прошла успешно
            console.log('Расписание Fit1c успешно загружено.');
        }
    }

    /**
     * Запускает таймер для контроля загрузки расписания.
     */
    function startScheduleTimeout() {
        if (appState.scheduleLoadAttempted) return;
        
        appState.scheduleLoadAttempted = true;
        
        setTimeout(() => {
            // Даем Fit1c небольшую задержку после таймаута на случай позднего ответа
            setTimeout(checkScheduleLoadStatus, 500); 
        }, LOADING_TIMEOUT);
    }
    
    /**
     * Переключает экраны и обновляет нижнюю навигацию.
     */
    function showScreen(targetId) {
        // 1. Скрываем все экраны
        screens.forEach(screen => {
            screen.classList.add('hidden');
            screen.classList.remove('active');
        });

        // 2. Показываем целевой экран
        const targetScreen = document.getElementById(targetId);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            targetScreen.classList.add('active');
            appState.currentScreen = targetId;
        }

        // 3. Обновляем активную кнопку в навигации
        navButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-target') === targetId.replace('screen-', '')) {
                button.classList.add('active');
                button.setAttribute('aria-current', 'page');
            } else {
                button.removeAttribute('aria-current');
            }
        });

        // 4. Логика для экрана расписания
        if (targetId === 'screen-schedule') {
            startScheduleTimeout();
        }
        
        // Скрываем сообщение об ошибке, если оно было
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }
    
    // ==============================================
    // 3. ОБРАБОТЧИКИ СОБЫТИЙ
    // ==============================================
    
    // 1. Навигация в футере
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = 'screen-' + button.getAttribute('data-target');
            showScreen(target);
        });
    });

    // 2. Быстрые ссылки и кнопки "Назад"
    quickLinks.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target-screen');
            if (target) {
                showScreen(target);
            }
        });
    });
    
    // 3. Обработка загрузки страницы
    showScreen('screen-home'); // Всегда стартуем с главного экрана

    // Обработчик для мобильного/десктопного баннера (если не используется <picture> - но у нас используется!)
    // В данном случае эта логика не нужна, т.к. используется <picture> и CSS media queries.
    
    console.log('Lady Stretch Hub v.2.1 запущен.');
});
