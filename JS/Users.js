document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registration-form');
    const loginForm = document.getElementById('login-form');
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));

    if (loggedInUser) {
        const userInfoContainer = document.getElementById('user-info');

        if (userInfoContainer) {

            function displayUserInfo() {
                userInfoContainer.innerHTML = '';

                const fullNameParagraph = document.createElement('p');
                fullNameParagraph.innerHTML = `<strong>${loggedInUser.name} ${loggedInUser.lastname}</strong>`;

                const birthdayParagraph = document.createElement('p');
                birthdayParagraph.innerHTML = `<strong>${loggedInUser.birthday}</strong>`;

                const emailInput = document.createElement('input');
                emailInput.setAttribute('type', 'email');
                emailInput.setAttribute('id', 'edit-email');
                emailInput.setAttribute('value', loggedInUser.email);
                emailInput.setAttribute('disabled', 'true');

                const passwordInput = document.createElement('input');
                passwordInput.setAttribute('type', 'password');
                passwordInput.setAttribute('id', 'edit-password');
                passwordInput.setAttribute('placeholder', '******');
                passwordInput.setAttribute('disabled', 'true');

                const phoneInput = document.createElement('input');
                phoneInput.setAttribute('type', 'tel');
                phoneInput.setAttribute('id', 'edit-phone');
                phoneInput.setAttribute('value', loggedInUser.phone);
                phoneInput.setAttribute('disabled', 'true');

                userInfoContainer.appendChild(fullNameParagraph);
                userInfoContainer.appendChild(birthdayParagraph);
                userInfoContainer.appendChild(emailInput);
                userInfoContainer.appendChild(passwordInput);
                userInfoContainer.appendChild(phoneInput);
            }

            displayUserInfo();

            const editButton = document.getElementById('edit-profile');
            editButton.addEventListener('click', function () {
                const emailInput = document.getElementById('edit-email');
                const passwordInput = document.getElementById('edit-password');
                const phoneInput = document.getElementById('edit-phone');
                const saveButton = document.getElementById('save-profile');
                const cancelButton = document.getElementById('cancel-edit');

                emailInput.removeAttribute('disabled');
                passwordInput.removeAttribute('disabled');
                phoneInput.removeAttribute('disabled');

                saveButton.style.display = 'inline-block';
                cancelButton.style.display = 'inline-block';
                editButton.style.display = 'none';
            });

            const cancelButton = document.getElementById('cancel-edit');
            cancelButton.addEventListener('click', function () {
                displayUserInfo();
                const saveButton = document.getElementById('save-profile');
                saveButton.style.display = 'none';
                cancelButton.style.display = 'none';
                editButton.style.display = 'inline-block';
            });

            const profileForm = document.getElementById('profile-form');
            profileForm.addEventListener('submit', function (event) {
                event.preventDefault();

                const emailInput = document.getElementById('edit-email');
                const passwordInput = document.getElementById('edit-password');
                const phoneInput = document.getElementById('edit-phone');

                loggedInUser.email = emailInput.value;
                loggedInUser.password = passwordInput.value;
                loggedInUser.phone = phoneInput.value;
                localStorage.setItem('LoggedInUser', JSON.stringify(loggedInUser));

                const registeredUsers = JSON.parse(localStorage.getItem('RegisteredUsers')) || [];
                const index = registeredUsers.findIndex(user => user.email === loggedInUser.email);
                if (index !== -1) {
                    registeredUsers[index].password = passwordInput.value;
                    registeredUsers[index].phone = phoneInput.value;
                    localStorage.setItem('RegisteredUsers', JSON.stringify(registeredUsers));
                }

                displayUserInfo();

                const saveButton = document.getElementById('save-profile');
                saveButton.style.display = 'none';
                cancelButton.style.display = 'none';
                editButton.style.display = 'inline-block';
            });
        }
    }

    function showAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('Alerta-custom');
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (!localStorage.getItem('LoggedInUser') && !localStorage.getItem('RegisteredUsers')) {
            showAlert('Usuario no registrado. Por favor, regístrate para acceder.');
            return;
        }

        const registeredUsers = JSON.parse(localStorage.getItem('RegisteredUsers'));
        const user = registeredUsers.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('LoggedInUser', JSON.stringify(user));
            window.location.href = '../HTML/Perfil.html';
        } else {
            showAlert('Correo o contraseña inválidos. Por favor, intenta de nuevo.');
        }
    });

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('register-name').value;
        const lastname = document.getElementById('register-lastname').value;
        const birthday = document.getElementById('register-birthday').value;
        const phone = document.getElementById('register-phone').value;
        const rut = document.getElementById('register-rut').value;
        const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]$/;
        if (!rutRegex.test(rut)) {
            showAlert('Por favor, ingresa un RUT válido en el formato XX.XXX.XXX-X.');
            return;
        }
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        if (!name || !lastname || !birthday || !phone || !email || !password) {
            showAlert('Por favor, completa todos los campos del formulario.');
            return;
        }

        const user = {
            name: name,
            lastname: lastname,
            birthday: birthday,
            phone: phone,
            rut: rut,
            email: email,
            password: password
        };

        let registeredUsers = JSON.parse(localStorage.getItem('RegisteredUsers')) || [];

        registeredUsers.push(user);

        localStorage.setItem('RegisteredUsers', JSON.stringify(registeredUsers));

        document.getElementById('register-name').value = '';
        document.getElementById('register-lastname').value = '';
        document.getElementById('register-birthday').value = '';
        document.getElementById('register-phone').value = '';
        document.getElementById('register-rut').value = '';
        document.getElementById('register-email').value = '';
        document.getElementById('register-password').value = '';

        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
    });

});