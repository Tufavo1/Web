document.addEventListener('DOMContentLoaded', function () {
    const carritoPanel = document.getElementById('carrito-body');

    const añadirPlatilloButtons = document.querySelectorAll('.añadir-platillo');
    añadirPlatilloButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = button.closest('.card');
            const platillo = {
                id: card.dataset.id,
                nombre: card.querySelector('.card-title').textContent,
                descripcion: card.querySelector('.card-text').textContent,
                precio: parseFloat(card.querySelector('.card-price').textContent),
                cantidad: 1
            };
            agregarAlCarrito(platillo);
            actualizarCarritoUI();
        });
    });

    function agregarAlCarrito(platillo) {
        let cartShop = JSON.parse(localStorage.getItem('cartShop')) || [];
        const index = cartShop.findIndex(item => item.id === platillo.id);
        if (index !== -1) {
            cartShop[index].cantidad++;
        } else {
            cartShop.push(platillo);
        }
        localStorage.setItem('cartShop', JSON.stringify(cartShop));
    }

    function actualizarCarritoUI() {
        carritoPanel.innerHTML = '';

        let cartShop = JSON.parse(localStorage.getItem('cartShop')) || [];
        let total = 0;

        cartShop.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            const row = `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.descripcion}</td>
                <td>${item.cantidad}</td>
                <td>${item.precio ? item.precio.toFixed(2) : ''}</td>
                <td>${subtotalItem.toFixed(2)}</td>
                <td><button class="eliminar-platillo" data-id="${item.id}">Eliminar</button></td>
            </tr>
        `;
            carritoPanel.appendChild(row);
        });

        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
});
