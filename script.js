document.addEventListener('DOMContentLoaded', () => {
    
    const SALON_ID = "02977247-3381-4559-b9ef-1cf88d2731a2"; // Ваш единственный ID для виджета 1С
    
    // ==============================================
    // ОСНОВНАЯ ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ЭКРАНОВ
    // ==============================================
    const screens = document.querySelectorAll('.screen');
    const navButtons = document.querySelectorAll('.nav-button');
    const quickLinks = document.querySelectorAll('.quick-link-btn, .back-button');

    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.add('hidden');
        });

        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');

            // Обновляем активную кнопку в футере
            navButtons.forEach(btn => {
                const target = 'screen-' + btn.getAttribute('data-target');
                if (target === screenId) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            // Если это экран расписания, запускаем его загрузку
            if (screenId === 'screen-schedule') {
                loadSchedule(SALON_ID);
            }
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const screenId = 'screen-' + button.getAttribute('data-target');
            showScreen(screenId);
        });
    });

    quickLinks.forEach(button => {
        button.addEventListener('click', (e) => {
            const screenId = button.getAttribute('data-target-screen');
            showScreen(screenId);
        });
    });
    
    // ==============================================
    // ЛОГИКА ДИНАМИЧЕСКОЙ ЗАГРУЗКИ РАСПИСАНИЯ 1С
    // ==============================================
    
    /**
     * Динамически загружает виджет 1С с заданным ID студии.
     * @param {string} salonId Уникальный ID салона (студии).
     */
    function loadSchedule(salonId) {
        const scriptContainerId = 'fit1c-config-script';
        let script = document.getElementById(scriptContainerId);

        // 1. Удаляем существующий скрипт, чтобы форсировать перезагрузку 1С
        if (script) {
            script.remove();
        }

        // 2. Очищаем предыдущий контент
        const widgetContainer = document.querySelector('[data-fit1c-calendar]');
        if (widgetContainer) {
            widgetContainer.innerHTML = 'Расписание загружается...';
        }

        // 3. Создаем новый скрипт с правильным ID студии
        script = document.createElement('script');
        script.id = scriptContainerId;
        script.src = 'https://reservi.ru/widget-fit1c.v2/js/config.js';
        script.setAttribute('data-fit-salon-id', salonId);
        
        // 4. Добавляем скрипт в DOM для загрузки виджета
        document.body.appendChild(script);

        // 5. Для лучшего UX прокручиваем экран к началу расписания
        const scheduleScreen = document.getElementById('screen-schedule');
        if (scheduleScreen && !scheduleScreen.classList.contains('hidden')) {
             window.scrollTo({
                top: scheduleScreen.offsetTop - 80, // Прокрутка ниже шапки
                behavior: 'smooth'
            });
        }
    }

    // Инициализация: убедитесь, что при загрузке страницы активна "Главная"
    document.getElementById('screen-home').classList.remove('hidden');
    document.querySelector('.nav-button[data-target="home"]').classList.add('active');
});
