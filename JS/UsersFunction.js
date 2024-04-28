document.addEventListener('DOMContentLoaded', function () {
    function showAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('Alerta-custom');
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
    }

    var loggedUsers = JSON.parse(localStorage.getItem('LoggedInUser'));
    if (!loggedUsers) {
        showAlert("Debes iniciar sesión para acceder a esta página.");
        window.location.href = 'index.html';
    }

    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            var searchText = this.value.toLowerCase();
            var rows = document.querySelectorAll('.listaProductos tr');

            rows.forEach(function (row) {
                var id = row.cells[0].textContent.toLowerCase();
                var nombre = row.cells[2].textContent.toLowerCase();

                if (id.includes(searchText) || nombre.includes(searchText)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    var searchUser = document.getElementById('search-user');
    if (searchUser) {
        searchUser.addEventListener('input', function () {
            var searchText = this.value.toLowerCase();
            var rows = document.querySelectorAll('#listaUsuarios tr');

            rows.forEach(function (row) {
                var rut = row.cells[0].textContent.toLowerCase();
                var nombre = row.cells[1].textContent.toLowerCase();

                if (rut.includes(searchText) || nombre.includes(searchText)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
});
