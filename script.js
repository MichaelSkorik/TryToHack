function generateRandomPassword() {
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += Math.floor(Math.random() * 10);
    }
    return password;
}

let currentPassword = localStorage.getItem('currentPassword');
if (!currentPassword) {
    currentPassword = generateRandomPassword();
    localStorage.setItem('currentPassword', currentPassword);
}

const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('passwordInput');
const surrenderBtn = document.getElementById('surrenderBtn');
const messageDiv = document.getElementById('message');

passwordInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
});

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const enteredPassword = passwordInput.value.trim();

    messageDiv.textContent = '';
    messageDiv.className = '';

    if (enteredPassword === currentPassword) {
        messageDiv.textContent = "Успешный вход!";
        messageDiv.classList.add('success');

        currentPassword = generateRandomPassword();
        localStorage.setItem('currentPassword', currentPassword);

        passwordInput.value = '';
        surrenderBtn.textContent = "Сдаюсь!";
    } else {
        messageDiv.textContent = "Неверный пароль!";
        messageDiv.classList.add('error');
        passwordInput.value = '';
    }
});

surrenderBtn.addEventListener('click', function() {
    surrenderBtn.textContent = currentPassword;
});