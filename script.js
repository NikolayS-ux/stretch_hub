// =========================================================
// ПОЛНЫЙ КОД ДЛЯ LADY STRETCH HUB - script.js
// УПРАВЛЕНИЕ НАВИГАЦИЕЙ И АУТЕНТИФИКАЦИЕЙ
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // Элементы навигации
    const navButtons = document.querySelectorAll('.nav-button, .quick-link-btn, .back-button');
    const ROOT_SCREEN = 'screen-home';

    // Элементы для Мотивационного Блока
    const authButton = document.getElementById('auth-button');
    const accessCodeInput = document.getElementById('access-code');
    const authMessage = document.getElementById('auth-message');
    const authView = document.getElementById('auth-view');
    const contentView = document.getElementById('detox-content-view');
    
    // Временный "пароль" для проверки дизайна.
    // В будущем заменится на серверную проверку.
    const MOCK_ACCESS_CODE = 'LADY2025'; 

    // 1. ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ ЭКРАНОВ
    function switchScreen(targetId) {
        
        // Скрываем все экраны
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
            screen.classList.add('hidden');
        });
        
        // Показываем целевой экран
        const targetScreen = document.getElementById(targetId);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            targetScreen.classList.add('active');
        }

        // Обновляем активную кнопку в нижнем футере
        document.querySelectorAll('.nav-button').forEach(btn => {
            const btnTarget = btn.getAttribute('data-target');
            if (btnTarget === targetId) {
                btn.classList.add('active');
            } else if (btnTarget === ROOT_SCREEN && targetId === ROOT_SCREEN) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // 2. ОБРАБОТЧИК НАВИГАЦИОННЫХ КНОПОК
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target') || this.getAttribute('data-target-screen');
            if (targetId) {
                switchScreen(targetId);
            }
        });
    });
    
    // 3. ЛОГИКА АУТЕНТИФИКАЦИИ (Мотивационный Блок)
    if (authButton) {
        authButton.addEventListener('click', async () => {
            const code = accessCodeInput.value.trim().toUpperCase();

            if (code === MOCK_ACCESS_CODE) {
                // Успех
                authMessage.textContent = '✅ Доступ разрешен! Загрузка курса...';
                authMessage.style.color = 'var(--primary-color)';
                authButton.disabled = true;

                setTimeout(() => {
                    // Скрываем форму входа и показываем контент
                    if (authView) authView.classList.add('hidden');
                    if (contentView) contentView.classList.remove('hidden');
                }, 1000);

            } else {
                // Ошибка
                authMessage.textContent = '❌ Неверный код доступа.';
                authMessage.style.color = 'var(--accent-color)';
                authButton.disabled = false;
            }
        });
    }

    // 4. ИНИЦИАЛИЗАЦИЯ
    switchScreen(ROOT_SCREEN);
});
