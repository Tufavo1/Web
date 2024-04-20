document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.search');
    const input = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    const filterButton = document.getElementById('filter-button');
    const closeFilterButton = document.getElementById('close-filter');
    const filterPanel = document.getElementById('filter-panel');
    const formFilter = document.getElementById('filter-form');
    const priceRange = document.getElementById('price-range');
    const cards = document.querySelectorAll('.card');

    let isFilterApplied = false;
    let isFilterPanelOpen = false;

    if (filterButton) {
        filterButton.addEventListener('click', toggleFilterPanel);
    }

    if (closeFilterButton) {
        closeFilterButton.addEventListener('click', hideFilterPanel);
    }

    if (formFilter) {
        formFilter.addEventListener('submit', function (event) {
            event.preventDefault();
            applyFilter();
            hideFilterPanel();
            isFilterApplied = true;
        });
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

    function applyFilter() {
        const selectedPriceRange = priceRange.value;
        const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);

        cards.forEach(function (card) {
            const cardPrice = parseInt(card.querySelector('.card-price span').textContent);
            if (cardPrice >= minPrice && cardPrice <= maxPrice) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (form && input && searchResults) {


        form.addEventListener('input', function () {
            const searchTerm = input.value.toLowerCase();

            const cards = document.querySelectorAll('.card');

            const results = [];
            const suggestions = [];

            cards.forEach(function (card) {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const text = card.querySelector('.card-text').textContent.toLowerCase();

                if (title.includes(searchTerm) || text.includes(searchTerm)) {
                    const imgSrc = card.querySelector('.card-img-top').src;
                    const result = document.createElement('div');
                    result.classList.add('search-result');

                    const img = document.createElement('img');
                    img.classList.add('search-result-img');
                    img.src = imgSrc;
                    result.appendChild(img);

                    const titleElement = document.createElement('h3');
                    titleElement.textContent = card.querySelector('.card-title').textContent;
                    result.appendChild(titleElement);

                    results.push(result);
                } else if (title.includes(searchTerm.split(' ')[0]) || text.includes(searchTerm.split(' ')[0])) {
                    suggestions.push(title);
                }
            });

            searchResults.innerHTML = '';

            if (results.length > 0) {
                results.forEach(function (result) {
                    searchResults.appendChild(result);
                });
                searchResults.style.display = 'block';
            } else {
                searchResults.style.display = 'none';
            }

            if (suggestions.length > 0) {
                console.log('¿Quizás quisiste buscar: ' + suggestions.join(', ') + '?');
            }
        });

        input.addEventListener('blur', function () {
            searchResults.style.display = 'none';
        })
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
