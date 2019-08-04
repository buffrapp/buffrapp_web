$('document').ready(function () {
    $('#area_picker_estadisticas').on('click', function() {
        window.location = 'index.html';
    });
    $('#area_picker_productos').on('click', function() {
        window.location = 'productos.html';
    });
    $('#area_picker_pedidos').on('click', function() {
        window.location = 'pedidos.html';
    });
    var rnd_match = 1;
    var rnd_interval = 1; // s
    setInterval(function () {
        if (Math.floor(Math.random() * 10) == rnd_match) {
            M.toast({html: 'Tenés un nuevo pedido, para verlo, seleccioná "Pedidos".'});
        }
    }, (rnd_interval * 1000));

});