document.addEventListener('DOMContentLoaded', function () {
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const loginContainer = document.querySelector('.login-container');
    const registerContainer = document.querySelector('.register-container');

    switchToRegister.addEventListener('click', function (event) {
        event.preventDefault();
        loginContainer.style.opacity = 0;
        setTimeout(function () {
            loginContainer.style.display = 'none';
            registerContainer.style.display = 'block';
            setTimeout(function () {
                registerContainer.style.opacity = 1;
            }, 100);
        }, 500);
    });

    switchToLogin.addEventListener('click', function (event) {
        event.preventDefault();
        registerContainer.style.opacity = 0;
        setTimeout(function () {
            registerContainer.style.display = 'none';
            loginContainer.style.display = 'block';
            setTimeout(function () {
                loginContainer.style.opacity = 1;
            }, 100);
        }, 500);
    });
});
