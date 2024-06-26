$(document).ready(function () {
    let carrito = [];

    function agregarAlCarrito(id, nombre, precio, cantidad, imagen) {
        let productoExistente = carrito.find((producto) => producto.id === id);
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            carrito.push({ id, nombre, precio, cantidad, imagen });
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }

    function actualizarCarrito() {
        let tablaCarrito = $("#carrito-body");
        tablaCarrito.empty();
        carrito.forEach((producto) => {
            let fila = `
                <tr>
                    <td><img src="${producto.imagen}" width="250px" height="auto"></td>
                    <td>${producto.nombre}</td>
                    <td>${producto.cantidad}</td>
                    <td>$${producto.precio}</td>
                    <td><button class="btn-eliminar-producto" data-producto-id="${producto.id}">X</button></td>
                </tr>`;
            tablaCarrito.append(fila);
        });
        calcularTotalCarrito();
    }

    function calcularTotalCarrito() {
        let totalCarrito = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
        $("#total").text(`$${totalCarrito.toFixed(0)}`);
    }

    function cargarCarrito() {
        let contenidoCarrito = localStorage.getItem("carrito");
        if (contenidoCarrito) {
            carrito = JSON.parse(contenidoCarrito);
            actualizarCarrito();
        }
    }

    cargarCarrito();

    // Delegación de eventos para el botón de añadir al carrito
    $(document).on("click", ".añadir-platillo", function () {
        let card = $(this).closest(".card");
        let id = card.data("id");
        let nombre = card.find(".card-title").text();
        let precio = parseFloat(card.find("#Precio").text().trim());
        let cantidad = parseInt(card.find(".counter-value").val());
        let imagen = card.find(".card-img-top").attr("src");

        agregarAlCarrito(id, nombre, precio, cantidad, imagen);
    });

    $(document).on("click", ".btn-eliminar-producto", function () {
        let id = $(this).data("producto-id");
        carrito = carrito.filter((producto) => producto.id !== id);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    });

    $("#vaciar-carrito").click(function () {
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();
    });
});