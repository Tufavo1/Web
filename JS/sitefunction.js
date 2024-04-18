document.addEventListener('DOMContentLoaded', function () {

    var btnComprar = document.getElementById("btn-comprar");
    if (btnComprar) {
        btnComprar.addEventListener("click", function (event) {
            var carrito = JSON.parse(localStorage.getItem("carrito"));
            if (carrito === null || carrito.length === 0) {
                event.preventDefault();
                alert("¡Tienes que agregar productos al carrito para ir a comprar!");
            }
        });
    }
    
    document.getElementById("color-change-btn").addEventListener("click", function () {
        document.querySelector(".slide-content").style.backgroundColor = "white";
        document.querySelector(".slide.active .btn-warning").style.backgroundColor = "orange";
        document.querySelector(".slide.active .btn-warning").style.color = "black";
    });

    var configDropdown = document.getElementById("config-dropdown");
    var configButton = document.getElementById("config-button");

    configButton.addEventListener("click", function (event) {
        event.stopPropagation();
        configDropdown.style.display = (configDropdown.style.display === 'none') ? 'block' : 'none';
    });

    document.addEventListener("click", function () {
        configDropdown.style.display = 'none';
    });

    const slides = document.querySelectorAll('.slide');
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));

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
        window.location.href = '../index.html';
    });

    document.getElementById("user-cart").addEventListener("click", function () {
        let userCart = document.getElementById("user-cart");
        if (userCart) {
            userCart.addEventListener("click", function () {
                let cartContent = document.getElementById("cart-content");
                if (cartContent) {
                    cartContent.style.display = "block";
                }

                let profileContent = document.getElementById("profile-content");
                if (profileContent) {
                    profileContent.style.display = "none";
                }

                let userPanel = document.getElementById("user-panel");
                if (userPanel) {
                    userPanel.classList.add("open");
                }
            });
        }
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

    interact('#clock-container').draggable({
        inertia: true,
        autoScroll: true,
        onmove: dragMoveListener
    });

    function dragMoveListener(event) {
        var target = event.target;
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    interact.maxInteractions(Infinity);

    function updateClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();

        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');

        document.getElementById('clock').textContent = hours + ':' + minutes + ':' + seconds;
    }

    setInterval(updateClock, 1000);

    updateClock();
});
