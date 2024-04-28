function showAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('Alerta-custom');
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
}

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
        showAlert("Producto editado exitosamente");
    }
});

$(document).ready(function () {
    if (typeof Storage !== "undefined") {
        let productos = JSON.parse(localStorage.getItem("productos"));
        if (productos === null) {
            showAlert("No se encontraron productos");
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
                showAlert("Producto agregado exitosamente");
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
                showAlert("Producto editado exitosamente");
            },
        });

        $("#btn-eliminar").on("click", function () {
            let idProducto = $("#id-producto").val();
            productos = productos.filter((producto) => producto.id !== idProducto);
            localStorage.setItem("productos", JSON.stringify(productos));
            row.remove();
            $("#productoModal").modal("hide");
            showAlert("Producto eliminado exitosamente");
        });
    } else {
        showAlert("Error cargando los productos");
    }

    if (typeof Storage !== "undefined") {
        var usuariosRegistrados = JSON.parse(localStorage.getItem("RegisteredUsers"));

        if (usuariosRegistrados === null) {
            showAlert("No se encontraron usuarios registrados");
        } else {
            function agregarFilasUsuarios(usuarios) {
                var listaUsuarios = $("#listaUsuarios");
                listaUsuarios.empty();

                usuarios.forEach(function (usuario) {
                    var fila = $("<tr>");
                    fila.append($("<td>").text(usuario.rut));
                    fila.append($("<td>").text(usuario.name + ' ' + usuario.lastname));
                    fila.append($("<td>").text(usuario.email));

                    var botonEditar = $("<button>").addClass("btn-edit").html('<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg>');

                    var botonEliminar = $("<button>").addClass("btn-delete").html('<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/></svg>');

                    botonEditar.on("click", function () {
                        abrirModalEditar(usuario);
                    });

                    botonEliminar.on("click", function () {
                        eliminarUsuario(usuario);
                    });


                    var columnaAcciones = $("<td>");
                    columnaAcciones.append(botonEditar);
                    columnaAcciones.append(" ");
                    columnaAcciones.append(botonEliminar);

                    fila.append(columnaAcciones);

                    listaUsuarios.append(fila);
                });
            }

            agregarFilasUsuarios(usuariosRegistrados);

            function abrirModalEditar(usuario) {
                $("#editName").val(usuario.name);
                $("#editLastname").val(usuario.lastname);
                $("#editBirthday").val(usuario.birthday);
                $("#editNumero").val(usuario.phone);
                $("#editRut").val(usuario.rut);
                $("#editCorreo").val(usuario.email);
                $("#editPassword").val(usuario.password);

                $("#editarUsuarioModal").modal("show");

                $("#guardarCambios").off().on("click", function () {
                    var nuevoNombre = $("#editName").val();
                    var nuevoApellido = $("#editLastname").val();
                    var nuevaFechaNacimiento = $("#editBirthday").val();
                    var nuevoTelefono = $("#editNumero").val();
                    var nuevoRut = $("#editRut").val();
                    var nuevoCorreo = $("#editCorreo").val();
                    var nuevaContraseña = $("#editPassword").val();

                    usuariosRegistrados.forEach(function (usr) {
                        if (usr.rut === usuario.rut) {
                            usr.name = nuevoNombre;
                            usr.lastname = nuevoApellido;
                            usr.birthday = nuevaFechaNacimiento;
                            usr.phone = nuevoTelefono;
                            usr.rut = nuevoRut;
                            usr.email = nuevoCorreo;
                            usr.password = nuevaContraseña;
                        }
                    });

                    localStorage.setItem("RegisteredUsers", JSON.stringify(usuariosRegistrados));
                    agregarFilasUsuarios(usuariosRegistrados);

                    $("#editarUsuarioModal").modal("hide");
                });
            }

            function eliminarUsuario(usuario) {
                var confirmacion = confirm("¿Estás seguro de eliminar al usuario con RUT: " + usuario.rut + "?");

                if (confirmacion) {
                    var usuariosRegistrados = JSON.parse(localStorage.getItem("RegisteredUsers"));

                    var usuariosFiltrados = usuariosRegistrados.filter(function (usr) {
                        return usr.rut !== usuario.rut;
                    });

                    localStorage.setItem("RegisteredUsers", JSON.stringify(usuariosFiltrados));

                    agregarFilasUsuarios(usuariosFiltrados);
                }
            }
        }
    } else {
        showAlert("No tiene local este navegador men");
    }
    if (typeof Storage !== "undefined") {

        $("#agregarUsuarioForm").submit(function (event) {
            event.preventDefault();


            var nombre = $("#nombreUsuario").val();
            var apellido = $("#apellidoUsuario").val();
            var rut = $("#rutUsuario").val();
            var email = $("#emailUsuario").val();
            var contrasenia = $("#contraseniaUsuario").val();

            var nuevoUsuario = {
                name: nombre,
                lastname: apellido,
                rut: rut,
                email: email,
                password: contrasenia
            };

            var usuariosRegistrados = JSON.parse(localStorage.getItem("RegisteredUsers")) || [];

            usuariosRegistrados.push(nuevoUsuario);

            localStorage.setItem("RegisteredUsers", JSON.stringify(usuariosRegistrados));

            showAlert("Usuario agregado exitosamente");

            $("#nombreUsuario").val("");
            $("#apellidoUsuario").val("");
            $("#rutUsuario").val("");
            $("#emailUsuario").val("");
        });

    } else {
        showAlert("Tu navegador no soporta guardar de forma local");
    }
});
