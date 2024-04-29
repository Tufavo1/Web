function aumentarTexto() {
    var textElements = document.querySelectorAll('.text');
    textElements.forEach(function(element) {
        var computedStyle = window.getComputedStyle(element);
        var fontSize = parseFloat(computedStyle.getPropertyValue('font-size'));
        element.style.fontSize = (fontSize + 2) + 'px';
    });
}

var btnAumentarTexto = document.getElementById('btn-aumentar-texto');
btnAumentarTexto.addEventListener('click', aumentarTexto);