document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registro-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío automático del formulario

        // Validación de nombre
        const nombreInput = document.getElementById("nombre");
        const nombreError = document.getElementById("nombre-error");
        if (nombreInput.value.trim() === "") {
            nombreError.textContent = "Por favor, ingresa tu nombre";
            nombreInput.focus();
            return false;
        } else {
            nombreError.textContent = "";
        }

        // Validación de email
        const emailInput = document.getElementById("email");
        const emailError = document.getElementById("email-error");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = "Por favor, ingresa un correo electrónico válido";
            emailInput.focus();
            return false;
        } else {
            emailError.textContent = "";
        }

        // Validación de contraseña
        const passwordInput = document.getElementById("password");
        const passwordError = document.getElementById("password-error");
        if (passwordInput.value.length < 6) {
            passwordError.textContent = "La contraseña debe tener al menos 6 caracteres";
            passwordInput.focus();
            return false;
        } else {
            passwordError.textContent = "";
        }

        // Si todos los campos son válidos, el formulario se envía
        form.submit();
    });
});
