$(document).ready(function () {
    $('[data-toggle="popover"]').popover({
        html: true,
        content: function () {
            return $('.popover-content').html();
        }
    });

    $('.popover-content tbody').append(`
        <tr>
            <td><img src="image.jpg" alt="Product Image"></td>
            <td>Product Name</td>
            <td>1</td>
            <td>$10.00</td>
        </tr>
    `);

    var totalPrice = 0;
    $('#total-price').text('$' + totalPrice.toFixed(0));

    $('.popover-content .clear-cart').click(function () {
        console.log("Carrito Limpio!");
    });
});
