document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------
    // 1. НАВИГАЦИЯ МЕЖДУ ЭКРАНАМИ
    // -------------------------------------------------------------------

    const navButtons = document.querySelectorAll('#footer-nav .nav-button');
    const actionButtons = document.querySelectorAll('.action-button');
    
    // Функция для переключения экранов
    function switchScreen(targetScreenId) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.add('hidden');
            screen.classList.remove('active');
        });

        const targetScreen = document.getElementById(targetScreenId);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            targetScreen.classList.add('active');
        }
    }

    // Обработка кнопок в футере
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            switchScreen(target);

            // Обновление активного состояния кнопок в футере
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Обработка внутренних кнопок (Быстрые ссылки, Назад)
    actionButtons.forEach(button => {
        if (button.hasAttribute('data-target-screen')) {
            button.addEventListener('click', () => {
                const target = button.getAttribute('data-target-screen');
                switchScreen(target);

                // Если вернулись на Главную, активируем кнопку Главная в футере
                if (target === 'screen-home') {
                    navButtons.forEach(btn => btn.classList.remove('active'));
                    document.querySelector('.nav-button[data-target="screen-home"]').classList.add('active');
                }
            });
        }
    });

    // ЛОГИКА МОТИВАЦИОННОГО БЛОКА УДАЛЕНА, так как он стал ссылкой.

});
