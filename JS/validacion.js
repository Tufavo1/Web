document.addEventListener('DOMContentLoaded', function () {
    // Obtener elementos del DOM
    const userBtn = document.getElementById("user-btn");
    const userPanel = document.getElementById("user-panel");
    const profileBtn = document.getElementById("profile-btn");

    // Verificar si hay un usuario registrado al cargar la página
    const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
    if (loggedUser) {
        toggleButtons(true);
    }

    // Mostrar panel de usuario al hacer clic en el botón de identificación
    userBtn.addEventListener("click", () => {
        userPanel.style.display = "block";
    });

    // Manejar el envío del formulario de registro
    document.getElementById("registration-form").addEventListener("submit", (event) => {
        event.preventDefault();
        
        // Obtener datos del formulario
        const name = document.getElementById("register-name").value;
        const lastname = document.getElementById("register-lastname").value;
        const birthday = document.getElementById("register-birthday").value;
        const phone = document.getElementById("register-phone").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        // Guardar usuario en Local Storage
        const registeredUser = {
            name,
            lastname,
            birthday,
            phone,
            email,
            password
        };
        localStorage.setItem("RegisteredUser", JSON.stringify(registeredUser));

        // Redireccionar al perfil
        redirectToProfile();
    });

    // Manejar el envío del formulario de inicio de sesión
    document.getElementById("login-form").addEventListener("submit", (event) => {
        event.preventDefault();

        // Obtener datos del formulario
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        // Verificar credenciales
        const registeredUser = JSON.parse(localStorage.getItem("RegisteredUser"));
        if (registeredUser && email === registeredUser.email && password === registeredUser.password) {
            // Guardar usuario logueado en Local Storage
            const loggedUser = {
                email: registeredUser.email,
                password: registeredUser.password,
                name: registeredUser.name
            };
            localStorage.setItem("LoggedUser", JSON.stringify(loggedUser));

            // Redireccionar al perfil
            redirectToProfile();
        } else {
            alert("Credenciales incorrectas. Inténtelo de nuevo.");
        }
    });

    // Redireccionar al perfil
    function redirectToProfile() {
        window.location.href = "HTML/Perfil.html";
    }

    // Eliminar sesión y ocultar botón de perfil al hacer clic en el botón de perfil
    profileBtn.addEventListener("click", () => {
        localStorage.removeItem("LoggedUser");
        toggleButtons(false);
    });

    // Función para mostrar u ocultar botones
    function toggleButtons(loggedIn) {
        if (loggedIn) {
            userBtn.style.display = "none";
            profileBtn.style.display = "inline-block";
        } else {
            userBtn.style.display = "inline-block";
            profileBtn.style.display = "none";
        }
    }
});
