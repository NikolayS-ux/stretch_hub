document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    
    // Ваш единственный ID для виджета 1С
    const SALON_ID = "02977247-3381-4559-b9ef-1cf88d2731a2"; 
    
    // Получение всех необходимых элементов
    const screens = document.querySelectorAll('.screen');
    const navButtons = document.querySelectorAll('.nav-button');
    const quickLinks = document.querySelectorAll('.quick-link-btn, .back-button');

    // ==============================================
    // 1. ОСНОВНАЯ ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ЭКРАНОВ
    // ==============================================
    function showScreen(screenId) {
        // Скрываем все экраны
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
        
        // Прокрутка к началу экрана при переключении
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // ==============================================
    // 2. УСТАНОВКА ОБРАБОТЧИКОВ СОБЫТИЙ
    // ==============================================

    // Обработчики для кнопок футера (Главная, Расписание, Контакты)
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Получаем ID экрана из data-target (например, "home" -> "screen-home")
            const screenId = 'screen-' + button.getAttribute('data-target');
            showScreen(screenId);
        });
    });

    // Обработчики для быстрых ссылок и кнопок "Назад"
    quickLinks.forEach(button => {
        button.addEventListener('click', () => {
            // Получаем ID экрана из data-target-screen (например, "screen-schedule")
            const screenId = button.getAttribute('data-target-screen');
            showScreen(screenId);
        });
    });
    
    // ==============================================
    // 3. ЛОГИКА ДИНАМИЧЕСКОЙ ЗАГРУЗКИ РАСПИСАНИЯ 1С
    // ==============================================
    
    /**
     * Динамически загружает виджет 1С с заданным ID салона.
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
    }

    // ==============================================
    // 4. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
    // ==============================================
    
    // Убедитесь, что активна "Главная"
    const homeScreen = document.getElementById('screen-home');
    if (homeScreen) {
        homeScreen.classList.remove('hidden');
    }
    
    // Делаем кнопку "Главная" активной в футере
    const homeNavButton = document.querySelector('.nav-button[data-target="home"]');
    if (homeNavButton) {
        homeNavButton.classList.add('active');
    }
}
