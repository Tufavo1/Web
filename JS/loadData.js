$(document).ready(function () {
    function showAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('Alerta-custom');
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
    }

    if (typeof Storage !== "undefined") {
        let productos = JSON.parse(localStorage.getItem("productos"));
        if (productos === null) {
            productos = [];
            productos.push(
                {
                    id: 1,
                    nombre: "Platillo De Entrada",
                    stock: 5,
                    precio: 40000,
                    categoria: "Almuerzos",
                    imagen: "../IMG/comida.jpg"
                },
                {
                    id: 2,
                    nombre: "Postre",
                    stock: 5,
                    precio: 40000,
                    categoria: "Restaurante",
                    imagen: "../IMG/postres.jpg"
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
                let html = `
                <div class="card" data-id="${producto.id}">
                    <img src="${producto.imagen}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h1 class="card-title">${producto.nombre}</h1>
                        <p class="card-text">Nuestra entrada de carne con verduras ofrece una combinación perfecta
                            de tierna carne sazonada y verduras frescas, incluyendo zanahorias, brócoli, pimientos y
                            champiñones, salteados a la perfección para crear un plato delicioso y satisfactorio.
                        </p>
                        <p class="Card-categoria" style="display: none">tipo de platillo: <span id="categoria">${producto.categoria}</span>
                        <p class="Card-stock">Disponible: <span id="Stock">${producto.stock}</span></p>
                        <p class="card-price">Precio: $<span id="Precio">${producto.precio}</span></p>
                        <div class="counter">
                            <button class="counter-btn decrement">-</button>
                            <input class="counter-value" type="number" id="contador" placeholder="1" value="1" min="1"
                                max="10" class="input-quantity" readonly></input>
                            <button class="counter-btn increment">+</button>
                        </div>
                        <div class="button-container">
                            <button class="btn-card">Ver Ingredientes</button>
                            <button class="btn-card añadir-platillo">Añadir Platillo</button>
                        </div>
                    </div>
                </div>`;
                $(".productos").append(html);
            }
        });

        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            const decrementBtn = card.querySelector(".decrement");
            const incrementBtn = card.querySelector(".increment");
            const counterValue = card.querySelector(".counter-value");

            let count = 1;

            decrementBtn.addEventListener('click', function () {
                if (count > 0) {
                    count--;
                    counterValue.value = count;
                }
            });

            incrementBtn.addEventListener('click', function () {
                count++;
                counterValue.value = count;
            });
        });
    } else {
        showAlert("Error al cargar los productos");
    }
});