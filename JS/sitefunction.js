document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    const buttons = document.querySelectorAll('.btn-select');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    function updateButtonVisibilityAndGreeting(user) {
        const userButton = document.getElementById('user-btn');
        const profileButton = document.getElementById('profile-btn');
        if (user) {
            userButton.style.display = 'none';
            profileButton.style.display = 'inline-block';
            const username = user.name;
            profileButton.querySelector('.nav-link span').textContent = 'Hola, ' + username;
        } else {
            userButton.style.display = 'inline-block';
            profileButton.style.display = 'none';
        }
    }

    updateButtonVisibilityAndGreeting(loggedInUser);

    const logoutLink = document.querySelector('#profile-btn .dropdown-menu .dropdown-item[href="#"]');
    logoutLink.addEventListener('click', function () {
        localStorage.removeItem('LoggedInUser');
        window.location.href = 'Restaurant.html';
    });
    
    document.getElementById("user-cart").addEventListener("click", function () {
        document.getElementById("cart-content").style.display = "block";
        document.getElementById("profile-content").style.display = "none";
        document.getElementById("user-panel").classList.add("open");
    });

    document.getElementById("user-btn").addEventListener("click", function () {
        document.getElementById("cart-content").style.display = "none";
        document.getElementById("profile-content").style.display = "block";
        document.getElementById("user-panel").classList.add("open");
    });

    document.querySelectorAll(".close").forEach(function (closeBtn) {
        closeBtn.addEventListener("click", function () {
            document.getElementById("user-panel").classList.remove("open");
        });
    });

    document.getElementById("register-link").addEventListener("click", function () {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("register-form").style.display = "block";
    });

    document.getElementById("login-link").addEventListener("click", function () {
        document.getElementById("register-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";
    });

    window.addEventListener('scroll', function () {
        slides.forEach(slide => {
            const slideTop = slide.offsetTop;
            const slideBottom = slideTop + slide.offsetHeight;

            const isHalfShown = slideTop < (window.scrollY + window.innerHeight / 2);
            const isNotScrolledPast = window.scrollY < slideBottom;

            if (isHalfShown && isNotScrolledPast) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    });
});
