document.addEventListener('DOMContentLoaded', function () {
    var loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById("user-btn").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg><span>' + loggedInUser + '</span>';
        
        document.getElementById("user-btn").addEventListener("click", function() {
            var confirmLogout = confirm("¿Estás seguro de cerrar sesión?");
            if (confirmLogout) {
                localStorage.removeItem('loggedInUser');
                window.location.href = "../index.html";
            }
        });
    }

    document.getElementById("user-btn").addEventListener("click", function () {
        document.getElementById("user-panel").classList.toggle("open");
    });

    document.querySelector(".close").addEventListener("click", function () {
        document.getElementById("user-panel").classList.remove("open");
    });

    document.getElementById("register-link").addEventListener("click", function () {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("register-form").style.display = "block";
    });

    document.getElementById("login-link").addEventListener("click", function () {
        document.getElementById("register-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";
    });

    document.getElementById('registration-form').addEventListener('submit', function (event) {
        event.preventDefault();

        var name = document.getElementById('register-name').value;
        var lastname = document.getElementById('register-lastname').value;
        var birthday = document.getElementById('register-birthday').value;
        var phone = document.getElementById('register-phone').value;
        var email = document.getElementById('register-email').value;
        var password = document.getElementById('register-password').value;

        var userInfo = {
            name: name,
            lastname: lastname,
            birthday: birthday,
            phone: phone,
            password: password
        };

        var userInfoString = JSON.stringify(userInfo);

        localStorage.setItem(email, userInfoString);

        document.getElementById('registration-form').reset();
        alert('Usuario registrado exitosamente.');
        localStorage.setItem('loggedInUser', email);
        window.location.href = "HTML/PERFIL.HTML";
    });
});
