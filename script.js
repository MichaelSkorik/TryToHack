// Функция для генерации пароля из 8 случайных цифр
function generateRandomPassword() {
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += Math.floor(Math.random() * 10);
    }
    return password;
}

// Инициализация текущего пароля: проверяем localStorage
let currentPassword = localStorage.getItem('currentPassword');
if (!currentPassword) {
    currentPassword = generateRandomPassword();
    localStorage.setItem('currentPassword', currentPassword);
}
console.log("Текущий пароль:", currentPassword);

const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('passwordInput');
const surrenderBtn = document.getElementById('surrenderBtn');
const messageDiv = document.getElementById('message');

// Ограничение ввода: удаляем любые нецифровые символы
passwordInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
});

// Обработка отправки формы
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const enteredPassword = passwordInput.value.trim();

    // Очищаем предыдущие сообщения
    messageDiv.textContent = '';
    messageDiv.className = '';

    if (enteredPassword === currentPassword) {
        messageDiv.textContent = "Успешный вход!";
        messageDiv.classList.add('success');

        // Генерируем новый пароль после успешного входа
        currentPassword = generateRandomPassword();
        localStorage.setItem('currentPassword', currentPassword);
        console.log("Новый пароль:", currentPassword);

        // Сбрасываем поле ввода и кнопку "Сдаюсь!"
        passwordInput.value = '';
        surrenderBtn.textContent = "Сдаюсь!";
    } else {
        messageDiv.textContent = "Неверный пароль!";
        messageDiv.classList.add('error');
        passwordInput.value = '';
    }
});

// Обработка клика по кнопке "Сдаюсь!"
surrenderBtn.addEventListener('click', function() {
    // Меняем текст кнопки на текущий пароль
    surrenderBtn.textContent = currentPassword;
});