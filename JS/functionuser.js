document.addEventListener("DOMContentLoaded", function() {
    $("#filter-button").click(function () {
        $("#filter-panel").css("left", "0"); // Abre el panel
    });

    // Maneja el clic en el botón "Cerrar"
    $("#close-filter").click(function () {
        $("#filter-panel").css("left", "-100%"); // Cierra el panel
    });

    // Agrega un manejador de eventos para cerrar el panel al hacer clic en cualquier parte de él
    $("#filter-panel").click(function (e) {
        e.stopPropagation(); // Evita que el clic se propague al elemento padre
    });

    // Evita que el clic en el botón principal cierre el panel inmediatamente
    $("#filter-button").click(function (e) {
        e.stopPropagation();
    });

    // Mostrar y ocultar el formulario de filtro
    $("#filter-button").click(function () {
        $("#filter-form").css("display", "block");
    });

    $("#close-filter").click(function () {
        $("#filter-form").css("display", "none");
    });
});