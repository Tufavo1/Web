$(document).ready(function () {
    if (typeof Storage !== "undefined") {
        let productos = JSON.parse(localStorage.getItem("productos"));
        if (productos === null) {
            alert("No se encontraron productos");
        } else {
            productos.forEach((producto) => {
                let html = `
                <tr class="editProducto" data-bs-toggle="modal" data-bs-target="#productoModal">
                    <th class="celdaId" scope="row">${producto.id}</th>
                    <td class="celdaImagen"><img src="${producto.imagen}" class="card-img-top" alt=""></td>
                    <td class="celdaNombre">${producto.nombre}</td>
                    <td class="celdaCategoria">${producto.categoria}</td>
                    <td class="celdaStock">${producto.stock}</td>
                    <td class="celdaPrecio">${producto.precio}</td>
                </tr>`;
                $(".listaProductos").append(html);
            });
        }

        let row;
        $(document).on("click", ".editProducto", function () {
            row = $(this);
            $("#id-producto").val($(this).children(".celdaId").text());
            $("#nombre-producto").val($(this).children(".celdaNombre").text());
            $("#selectCategoria").val($(this).children(".celdaCategoria").text());
            $("#inputStock").val($(this).children(".celdaStock").text());
            $("#inputPrecio").val($(this).children(".celdaPrecio").text());
            $("#previewImagen").attr("src", $(this).find("img").attr("src"));
        });

        $("#btn-guardar").on("click", function () {
            if ($("#formularioEditarProducto").valid()) {
                let idProducto = $("#id-producto").val();
                row.children(".celdaNombre").text($("#nombre-producto").val());
                row.children(".celdaCategoria").text($("#selectCategoria").val());
                row.children(".celdaStock").text($("#inputStock").val());
                row.children(".celdaPrecio").text($("#inputPrecio").val());
                
                productos = productos.map((producto) => {
                    if (producto.id === idProducto) {
                        return {
                            ...producto,
                            nombre: $("#nombre-producto").val(),
                            categoria: $("#selectCategoria").val(),
                            stock: $("#inputStock").val(),
                            precio: $("#inputPrecio").val(),
                            imagen: $("#previewImagen").attr("src"),
                        };
                    } else {
                        return producto;
                    }
                });
                
                localStorage.setItem("productos", JSON.stringify(productos));
                
                $("#productoModal").modal("hide");
                alert("Producto editado exitosamente");
            }
        });
        $("#formularioNuevoProducto").validate({
            rules: {
                inputId: {
                    required: true,
                },
                inputImagen: {
                    required: true,
                },
                inputNombre: {
                    required: true,
                },
                selectCategoria: {
                    required: true,
                },
                inputStock: {
                    required: true,
                },
                inputPrecio: {
                    required: true,
                },
            },
            messages: {
                inputId: {
                    required: "Debe ingresar un ID",
                },
                inputImagen: {
                    required: "Debe ingresar una URL de imagen",
                },
                inputNombre: {
                    required: "Debe ingresar un nombre",
                },
                selectCategoria: {
                    required: "Debe seleccionar una categoría",
                },
                inputStock: {
                    required: "Debe ingresar el stock",
                },
                inputPrecio: {
                    required: "Debe ingresar un precio",
                },
            },
            submitHandler: function () {
                let nuevoProducto = {
                    id: $("#inputId").val(),
                    imagen: $("#inputImagen").val(),
                    nombre: $("#inputNombre").val(),
                    categoria: $("#selectCategoria").val(),
                    stock: $("#inputStock").val(),
                    precio: $("#inputPrecio").val(),
                };
                productos.push(nuevoProducto);
                localStorage.setItem("productos", JSON.stringify(productos));
                let html = `
                <tr class="editProducto" data-bs-toggle="modal" data-bs-target="#productoModal">
                    <th class="celdaId" scope="row">${nuevoProducto.id}</th>
                    <td class="celdaImagen"><img src="${nuevoProducto.imagen}" class="card-img-top" alt=""></td>
                    <td class="celdaNombre">${nuevoProducto.nombre}</td>
                    <td class="celdaCategoria">${nuevoProducto.categoria}</td>
                    <td class="celdaStock">${nuevoProducto.stock}</td>
                    <td class="celdaPrecio">${nuevoProducto.precio}</td>
                </tr>`;
                $(".listaProductos").append(html);
                $("#nuevoProductoModal").modal("hide");
                alert("Producto agregado exitosamente");
            },
        });

        $("#formularioEditarProducto").validate({
            rules: {
                nombreProducto: {
                    required: true,
                },
                selectCategoria: {
                    required: true,
                },
                inputStock: {
                    required: true,
                },
                inputPrecio: {
                    required: true,
                },
            },
            messages: {
                nombreProducto: {
                    required: "Debe ingresar un nombre",
                },
                selectCategoria: {
                    required: "Debe seleccionar una categoría",
                },
                inputStock: {
                    required: "Debe ingresar el stock",
                },
                inputPrecio: {
                    required: "Debe ingresar un precio",
                },
            },
            submitHandler: function () {
                let idProducto = $("#id-producto").val();
                productos.forEach((producto) => {
                    if (producto.id === idProducto) {
                        producto.nombre = $("#nombre-producto").val();
                        producto.categoria = $("#selectCategoria").val();
                        producto.stock = $("#inputStock").val();
                        producto.precio = $("#inputPrecio").val();
                    }
                });
                localStorage.setItem("productos", JSON.stringify(productos));
                row.children(".celdaNombre").text($("#nombre-producto").val());
                row.children(".celdaCategoria").text($("#selectCategoria").val());
                row.children(".celdaStock").text($("#inputStock").val());
                row.children(".celdaPrecio").text($("#inputPrecio").val());
                $("#productoModal").modal("hide");
                alert("Producto editado exitosamente");
            },
        });

        $("#btn-eliminar").on("click", function () {
            let idProducto = $("#id-producto").val();
            productos = productos.filter((producto) => producto.id !== idProducto);
            localStorage.setItem("productos", JSON.stringify(productos));
            row.remove();
            $("#productoModal").modal("hide");
            alert("Producto eliminado exitosamente");
        });
    } else {
        alert("Error cargando los productos");
    }
});
