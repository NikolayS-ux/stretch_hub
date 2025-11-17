document.addEventListener('DOMContentLoaded', () => {
    
    // ВАШ УНИКАЛЬНЫЙ ID
    const SALON_ID = "02977247-3381-4559-b9ef-1cf88d2731a2"; 
    
    // ==============================================
    // 1. ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ
    // ==============================================
    const screens = document.querySelectorAll('.screen');
    const navButtons = document.querySelectorAll('.nav-button');
    const quickLinks = document.querySelectorAll('.quick-link-btn, .back-button');

    // ==============================================
    // 2. ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ ЭКРАНОВ
    // ==============================================
    function showScreen(screenId) {
        
        // 1. Скрываем все экраны и ищем целевой
        screens.forEach(screen => {
            screen.classList.add('hidden');
        });
        const targetScreen = document.getElementById(screenId);
        
        if (!targetScreen) {
            console.error('Ошибка: Экран с ID ' + screenId + ' не найден.');
            return;
        }

        targetScreen.classList.remove('hidden');

        // 2. Обновляем активную кнопку в футере
        navButtons.forEach(btn => {
            const target = 'screen-' + btn.getAttribute('data-target');
            if (target === screenId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
            
        // 3. Загрузка расписания
        if (screenId === 'screen-schedule') {
            loadSchedule(SALON_ID);
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // ==============================================
    // 3. НАЗНАЧЕНИЕ ОБРАБОТЧИКОВ (Самый простой способ)
    // ==============================================

    // А) Обработчики для кнопок футера (Главная, Расписание, Контакты)
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const screenId = 'screen-' + button.getAttribute('data-target');
            showScreen(screenId);
        });
    });

    // Б) Обработчики для быстрых ссылок и кнопок "Назад"
    quickLinks.forEach(button => {
        button.addEventListener('click', () => {
            const screenId = button.getAttribute('data-target-screen');
            showScreen(screenId);
        });
    });
    
    // ==============================================
    // 4. ЛОГИКА ДИНАМИЧЕСКОЙ ЗАГРУЗКИ РАСПИСАНИЯ 1С
    // ==============================================
    function loadSchedule(salonId) {
        const scriptContainerId = 'fit1c-config-script';
        let script = document.getElementById(scriptContainerId);

        if (script) {
            script.remove();
        }

        const widgetContainer = document.querySelector('[data-fit1c-calendar]');
        if (widgetContainer) {
            widgetContainer.innerHTML = 'Расписание загружается...';
        }

        script = document.createElement('script');
        script.id = scriptContainerId;
        script.src = 'https://reservi.ru/widget-fit1c.v2/js/config.js';
        script.setAttribute('data-fit-salon-id', salonId);
        
        document.body.appendChild(script);
    }

    // ==============================================
    // 5. ИНИЦИАЛИЗАЦИЯ
    // ==============================================
    
    // Показываем Главный экран по умолчанию
    document.getElementById('screen-home').classList.remove('hidden');
    // Делаем кнопку Главная активной
    document.querySelector('.nav-button[data-target="home"]').classList.add('active');
});
