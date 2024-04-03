const userBtn = document.getElementById('user-btn');
const userModal = document.getElementById('userModal');
const toggleRegisterLink = document.getElementById('toggleRegisterLink');
const toggleLoginLink = document.getElementById('toggleLoginLink');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

userBtn.addEventListener('click', () => {
    userModal.style.display = 'block';
});

toggleRegisterLink.addEventListener('click', () => {
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
});

toggleLoginLink.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    console.log("Registrarse con:", email, password);
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    console.log("Iniciar sesión con:", email, password);
});
