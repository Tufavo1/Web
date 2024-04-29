document.addEventListener('DOMContentLoaded', function () {
    const filterButton = document.getElementById('filter-button');
    const closeFilterButton = document.getElementById('close-filter');
    const filterPanel = document.getElementById('filter-panel');
    const slides = document.querySelectorAll('.slide');
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    const logoutButton = document.getElementById("Perfil");
    const perfilButton = document.getElementById("ver-perfil");

    let isFilterApplied = false;
    let isFilterPanelOpen = false;

    if (filterButton) {
        filterButton.addEventListener('click', toggleFilterPanel);
    }

    if (closeFilterButton) {
        closeFilterButton.addEventListener('click', hideFilterPanel);
    }

    function toggleFilterPanel() {
        if (!isFilterPanelOpen) {
            filterPanel.style.display = 'block';
            isFilterPanelOpen = true;
        } else {
            hideFilterPanel();
        }
    }

    function hideFilterPanel() {
        filterPanel.style.display = 'none';
        isFilterPanelOpen = false;
    }


    var btnComprar = document.getElementById("btn-comprar");
    if (btnComprar) {
        btnComprar.addEventListener("click", function (event) {
            var carrito = JSON.parse(localStorage.getItem("carrito"));
            if (carrito === null || carrito.length === 0) {
                event.preventDefault();
                showAlert("!Tienes que agregar productos al carrito¡");
            }
        });
    }

    var configDropdown = document.getElementById("config-dropdown");
    var configButton = document.getElementById("config-button");

    configButton.addEventListener("click", function (event) {
        event.stopPropagation();
        configDropdown.style.display = (configDropdown.style.display === 'none') ? 'block' : 'none';
    });

    document.addEventListener("click", function () {
        configDropdown.style.display = 'none';
    });


    if (perfilButton) {
        const baseLocation = window.location.origin;
        perfilButton.addEventListener("click", function () {
            if (loggedInUser && loggedInUser.email === "jose@gmail.com") {
                window.location.href = baseLocation + '/admin.html';
            } else {
                window.location.href = baseLocation + '/perfil.html';
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            const modal = document.getElementById("myModal");
            modal.style.display = "block";
    
            const confirmButton = document.getElementById("confirmButton");
            const cancelButton = document.getElementById("cancelButton");
    
            confirmButton.onclick = function() {
                localStorage.removeItem('LoggedInUser');
                window.location.reload();
                modal.style.display = "none";
            }
    
            cancelButton.onclick = function() {
                modal.style.display = "none";
            }
        });
    }

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

    setInterval(updateClock, 3000);

    updateClock();

    function showAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('Alerta-custom');
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
    }

    function getLocationAndUpdateButton() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        const region = data.address.state;

                        document.getElementById("getLocationBtn").innerHTML = `${region} <svg xmlns="http://www.w3.org/2000/svg"
                width="20" height="20" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>`;

                        document.cookie = `region=${region}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
                    })
                    .catch(error => {
                        console.error('Error al obtener la ubicación:', error);
                        showAlert('Hubo un error al obtener la ubicación. Por favor, intenta nuevamente.');
                    });
            }, function (error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        showAlert("El usuario denegó la solicitud de geolocalización.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        showAlert("La información de ubicación no está disponible.");
                        break;
                    case error.TIMEOUT:
                        showAlert("Se ha agotado el tiempo de espera para obtener la ubicación del usuario.");
                        break;
                    case error.UNKNOWN_ERROR:
                        showAlert("Se produjo un error desconocido al obtener la ubicación.");
                        break;
                }
            });
        } else {
            showAlert("Geolocalización no es soportada por este navegador.");
        }
    }

    function loadRegionFromCookie() {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const regionCookie = cookies.find(cookie => cookie.startsWith('region='));

        if (regionCookie) {
            const region = regionCookie.split('=')[1];
            document.getElementById("getLocationBtn").innerHTML = `${region} <svg xmlns="http://www.w3.org/2000/svg"
                width="20" height="20" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>`;
        }
    }

    document.getElementById("getLocationBtn").addEventListener("click", getLocationAndUpdateButton);
    window.addEventListener('load', loadRegionFromCookie);
});
