document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------
    // 1. НАВИГАЦИЯ МЕЖДУ ЭКРАНАМИ
    // -------------------------------------------------------------------

    const appContainer = document.getElementById('app-container');
    const navButtons = document.querySelectorAll('#footer-nav .nav-button');
    const actionButtons = document.querySelectorAll('.action-button');
    
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

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            switchScreen(target);

            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    actionButtons.forEach(button => {
        if (button.hasAttribute('data-target-screen')) {
            button.addEventListener('click', () => {
                const target = button.getAttribute('data-target-screen');
                switchScreen(target);

                if (target === 'screen-home') {
                    navButtons.forEach(btn => btn.classList.remove('active'));
                    document.querySelector('.nav-button[data-target="screen-home"]').classList.add('active');
                }
            });
        }
    });

    // -------------------------------------------------------------------
    // 2. ЛОГИКА МОТИВАЦИОННОГО БЛОКА (ВХОД ПО КОДУ)
    // -------------------------------------------------------------------

    const authButton = document.getElementById('auth-button');
    const accessCodeInput = document.getElementById('access-code');
    const authMessage = document.getElementById('auth-message');
    const authView = document.getElementById('auth-view');
    const detoxContentView = document.getElementById('detox-content-view');

    // !!! ВАШ СЕКРЕТНЫЙ КОД !!! 
    // ЭТОТ КОД ДОЛЖЕН СОВПАДАТЬ С КОДОМ, КОТОРЫЙ ВЫ ВЫДАЕТЕ КЛИЕНТАМ ПОСЛЕ ОПЛАТЫ.
    const SECRET_ACCESS_CODE = 'DETOX2025'; 

    if (authButton) {
        authButton.addEventListener('click', () => {
            const enteredCode = accessCodeInput.value.trim().toUpperCase(); 

            if (enteredCode === SECRET_ACCESS_CODE) {
                authMessage.textContent = 'Доступ получен! Загружаем материалы...';
                authMessage.style.color = 'green';
                
                setTimeout(() => {
                    authView.classList.add('hidden');
                    detoxContentView.classList.remove('hidden');
                }, 500);

            } else {
                authMessage.textContent = 'Неверный код доступа. Попробуйте снова.';
                authMessage.style.color = 'red';
                accessCodeInput.value = ''; 
            }
        });
    }
});
