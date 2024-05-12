$(document).ready(function () {
    function showAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('Alerta-custom');
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
    }

    // Definir las categorías y sus URLs correspondientes
    const categorias = [
        { nombre: "Almuerzos", url: "almuerzos.html" },
        { nombre: "Jugos", url: "jugos.html" },
        { nombre: "Licores", url: "licores.html" },
        { nombre: "Postres", url: "postres.html" }
        // Agrega aquí todas tus categorías con su correspondiente URL
    ];

    // Agregar botones de categoría y tarjetas de productos por categoría
    categorias.forEach(categoria => {
        const html = `
            <div class="categoria-container">
                <button class="categoria-btn" data-url="${categoria.url}">Ver ${categoria.nombre}</button>
                <div class="container-card productos-${categoria.nombre.toLowerCase()} productos"></div>
            </div>`;
        $("#allmain").append(html);
    });

    if (typeof Storage !== "undefined") {
        let productos = JSON.parse(localStorage.getItem("productos"));
        if (productos === null) {
            productos = [];
            productos.push(
                {
                    id: 1001,
                    nombre: "Salteado de verduras con arroz frío",
                    descripcion: "Para el almuerzo o cena ligera prepara un plato que equilibra sabor y nutrición con nuestro Salteado de Verduras con arroz frío, una receta fácil de preparar con el toque único de la base deshidratada para carne Mongoliana.",
                    stock: 5,
                    precio: 40000,
                    categoria: "Almuerzos",
                    imagen: "../IMG/almuerzos/comida1.webp"
                },
                {
                    id: 1002,
                    nombre: "Tarta fácil de Atún y Verduras",
                    descripcion: "Disfruta de una Tarta fácil de Atún y Verduras. Ideal para cuando necesitas cocinar algo rápido, fácil y rico.",
                    stock: 5,
                    precio: 40000,
                    categoria: "Almuerzos",
                    imagen: "../IMG/almuerzos/comida2.webp"
                },
                {
                    id: 1003,
                    nombre: "Tallarines cremosos a las Hierbas",
                    descripcion: "Explora la magia de la cocina internacional desde la comodidad de tu hogar con nuestros Tallarines Cremosos a las Hierbas.",
                    stock: 5,
                    precio: 40000,
                    categoria: "Almuerzos",
                    imagen: "../IMG/almuerzos/comida3.webp"
                },
                {
                    id: 1004,
                    nombre: "Jugo de Apio",
                    descripcion: "El jugo de apio fresco se ha convertido en un fenómeno de moda en la nutrición moderna.",
                    stock: 5,
                    precio: 40000,
                    categoria: "Jugos",
                    imagen: "../IMG/jugos/jugo1.jpg"
                },
                {
                    id: 1005,
                    nombre: "ACAI, BANANO Y AGUA DE COCO",
                    descripcion: "El acai es una fruta sudamericana rica en antioxidantes que podría ayudar a bajar los niveles de colesterol.",
                    stock: 5,
                    precio: 40000,
                    categoria: "Jugos",
                    imagen: "../IMG/jugos/jugo2.jpg"
                },
                {
                    id: 1006,
                    nombre: "PITAYA O FRUTA DE DRAGÓN, MANGO Y PAPAYA",
                    descripcion: "Esta es una bebida con un sabor tropical inconfundible, rica en vitamina C, vitamina B6, fibra, y enzimas que promueven la buena digestión.",
                    stock: 5,
                    precio: 40000,
                    categoria: "Jugos",
                    imagen: "../IMG/jugos/jugo3.jpg"
                },
                {
                    id: 1007,
                    nombre: "Vasitos de crema de queso y mermelada de tomate",
                    descripcion: "Hoy tenemos un postre casero y saludable: unos vasitos de mousse de crema de queso, a los que coronamos con un poco de mermelada de tomate y tomillo, casera.",
                    stock: 5,
                    precio: 40000,
                    categoria: "Postres",
                    imagen: "../IMG/postres/postres1.jpg"
                },
                {
                    id: 1008,
                    nombre: "Tarta de queso con arándanos y base de galleta",
                    descripcion: "Para preparar esta clásica y deliciosa tarta de queso mascarpone con arándanos hemos utilizado unas galletas tipo digestive de base. Y además de los frutos, lleva mermelada de arándanos.",
                    stock: 5,
                    precio: 40000,
                    categoria: "Postres",
                    imagen: "../IMG/postres/postres2.jpg"
                },
                {
                    id: 1009,
                    nombre: "Postre fresco de sandía con bolitas de queso",
                    descripcion: "Para preparar esta clásica y deliciosa tarta de queso mascarpone con arándanos hemos utilizado unas galletas tipo digestive de base. Y además de los frutos, lleva mermelada de arándanos.",
                    stock: 5,
                    precio: 40000,
                    categoria: "Postres",
                    imagen: "../IMG/postres/postres3.jpg"
                },
                {
                    id: 1010,
                    nombre: "PACK 5X WHISKEY MINIATURA JACK DANIEL´S 50CC",
                    descripcion: "Pack miniaturas 50cc Jack Daniel's. · Jack Daniel's Fire. · Jack Daniel's Old N°7. · Jack Daniel's Honey. · Jack Daniel's apple. · Gentleman Jack.",
                    stock: 5,
                    precio: 40000,
                    categoria: "Licores",
                    imagen: "../IMG/licores/licor1.png"
                },
                {
                    id: 1011,
                    nombre: "GLAM ROCK",
                    descripcion: "1x GENTLEMAN JACK 375CC WHISKEY 40° BOTELLA - 1x JACK DANIELS OLD N7 375CC WHISKEY 40° BOTELLA.",
                    stock: 5,
                    precio: 40000,
                    categoria: "Licores",
                    imagen: "../IMG/licores/licor2.webp"
                },
                {
                    id: 1012,
                    nombre: "PACK MINIATURA JACK DANIEL´S SINGLE BARREL 50CC X 10",
                    descripcion: "NUESTRO DISTINTIVO SINGLE BARREL SELECT. Embotellado a 94 grados, Single Barrel Select muestra notas de caramelo y especias, con brillantes notas de fruta y dulces aromas para un Tennessee Whiskey con un sabor sin igual.",
                    stock: 5,
                    precio: 40000,
                    categoria: "Licores",
                    imagen: "../IMG/licores/licor3.webp"
                },
            );
            localStorage.setItem("productos", JSON.stringify(productos));
        }

        const fileName = document.location.pathname.match(/[^\/]+$/)[0];
        let categoriaPage;

        switch (fileName) {
            case "index.html":
                categoriaPage = true;
                break;
            case "Restaurant.html":
                categoriaPage = "Restaurante";
                break;
            case "almuerzos.html":
                categoriaPage = "Almuerzos";
                break;
            case "jugos.html":
                categoriaPage = "Jugos";
                break;
            case "licores.html":
                categoriaPage = "Licores";
                break;
            case "postres.html":
                categoriaPage = "Postres";
                break;
        }

        productos.forEach((producto) => {
            if (producto.stock > 0 && (categoriaPage === true || producto.categoria === categoriaPage)) {
                const categoriaSlug = producto.categoria.toLowerCase();
                const container = $(`.productos-${categoriaSlug}`);

                let html = `
                    <div class="card" data-id="${producto.id}">
                        <img src="${producto.imagen}" class="card-img-top" alt="">
                        <div class="card-body">
                            <h1 class="card-title">${producto.nombre}</h1>
                            <p class="card-text">${producto.descripcion}</p>
                            <p class="Card-categoria" style="display: none">Tipo de platillo: <span id="categoria">${producto.categoria}</span></p>
                            <p class="Card-stock">Disponible: <span id="Stock">${producto.stock}</span></p>
                            <p class="card-price">Precio: $<span id="Precio">${producto.precio}</span></p>
                            <div class="counter">
                                <button class="counter-btn decrement">-</button>
                                <input class="counter-value" type="number" id="contador" placeholder="1" value="1" min="1"
                                    max="${producto.stock}" class="input-quantity" readonly></input>
                                <button class="counter-btn increment">+</button>
                            </div>
                            <div class="button-container">
                                <button class="btn-card" id="abrirResennias">Ver Reseñas</button>
                                <button class="btn-card añadir-platillo">Añadir Platillo</button>
                            </div>
                        </div>
                    </div>`;
                container.append(html);
            }
        });

        $(".productos").on('click', '.counter-btn', function () {
            const card = $(this).closest('.card');
            const stock = parseInt(card.find('.Card-stock #Stock').text());
            const counterValue = card.find('.counter-value');
            const incrementBtn = card.find('.increment');
            let count = parseInt(counterValue.val());

            if ($(this).hasClass('decrement')) {
                if (count > 1) {
                    count--;
                    incrementBtn.prop('disabled', false);
                }
            } else if ($(this).hasClass('increment')) {
                if (count < stock) {
                    count++;
                    if (count === stock) {
                        incrementBtn.prop('disabled', true);
                    }
                } else {
                    showAlert("No hay suficiente stock disponible.");
                    return;
                }
            }

            counterValue.val(count);
        });
    } else {
        showAlert("Error al cargar los productos");
    }

    // Redireccionar al hacer clic en un botón de categoría
    $("#allmain").on("click", ".categoria-btn", function () {
        const url = $(this).data("url");
        window.location.href = url;
    });

    if (typeof Storage !== "undefined") {
        const fileName = document.location.pathname.match(/[^\/]+$/)[0];
        if (fileName === "Restaurant.html") {
            let productos = JSON.parse(localStorage.getItem("productos"));
            if (productos === null) {
                showAlert("No hay productos disponibles.");
                return;
            }

            let productosPorCategoria = {};

            productos.forEach((producto) => {
                if (!productosPorCategoria[producto.categoria]) {
                    productosPorCategoria[producto.categoria] = [];
                }
                productosPorCategoria[producto.categoria].push(producto);
            });

            let productosRestaurante = [];
            for (let categoria in productosPorCategoria) {
                if (productosPorCategoria.hasOwnProperty(categoria)) {
                    if (productosPorCategoria[categoria].length >= 2) {
                        productosRestaurante.push(productosPorCategoria[categoria][0]);
                        productosRestaurante.push(productosPorCategoria[categoria][1]);
                    }
                }
            }

            const container = document.querySelector('.productos');
            productosRestaurante.forEach((producto) => {
                let html = `
                    <div class="card" data-id="${producto.id}">
                    <img src="${producto.imagen}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h1 class="card-title">${producto.nombre}</h1>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="Card-categoria" style="display: none">tipo de platillo: <span id="categoria">${producto.categoria}</span>
                        <p class="Card-stock">Disponible: <span id="Stock">${producto.stock}</span></p>
                        <p class="card-price">Precio: $<span id="Precio">${producto.precio}</span></p>
                        <div class="counter">
                            <button class="counter-btn decrement">-</button>
                            <input class="counter-value" type="number" id="contador" placeholder="1" value="1" min="1"
                                max="${producto.stock}" class="input-quantity" readonly></input>
                            <button class="counter-btn increment">+</button>
                        </div>
                        <div class="button-container">
                            <button class="btn-card" id="abrirResennias">Ver Resennias</button>
                            <button class="btn-card añadir-platillo">Añadir Platillo</button>
                        </div>
                    </div>
                </div>`;
                container.innerHTML += html;
            });
        }
        $(".productos").on('click', '.counter-btn', function () {
            const card = $(this).closest('.card');
            const stock = parseInt(card.find('.Card-stock #Stock').text());
            const counterValue = card.find('.counter-value');
            const incrementBtn = card.find('.increment');
            let count = parseInt(counterValue.val());

            if ($(this).hasClass('decrement')) {
                if (count > 1) {
                    count--;
                    incrementBtn.prop('disabled', false);
                }
            } else if ($(this).hasClass('increment')) {
                if (count < stock) {
                    count++;
                    if (count === stock) {
                        incrementBtn.prop('disabled', true);
                    }
                } else {
                    showAlert("No hay suficiente stock disponible.");
                    return;
                }
            }

            counterValue.val(count);
        });
    } else {
        showAlert("Error al cargar los productos");
    }
});