var atime = 400;

function aceptar_pedido(id_pedido) {
    $('#del' + id_pedido).find('#del_rechazar').remove();
    $('#del' + id_pedido).find('#del_aceptar').remove();
    $('#del' + id_pedido).find('#del_completado').removeClass('hide');
    $('#del' + id_pedido).find('#del_completado_cancelar').removeClass('hide');

    $('#del' + id_pedido).fadeOut();

    setTimeout(function () {
        var timeout = atime;
        if ($('#queue_empty').is(':visible')) {
            setTimeout(function () {
                $('#queue_empty').fadeOut();
            }, atime);
        } else {
            timeout = 0;
        }
    
        setTimeout (function () {
            $('#del' + id_pedido).detach().appendTo('#queued_requests_cards_container').fadeIn().effect('bounce', {}, atime);

            setTimeout(function() {
                verificar_existencia();
            }, atime);
        }, timeout * 2);
    }, atime);
}

function rechazar_pedido(id_pedido) {
    completar_pedido(id_pedido);
    M.toast({ html: 'El pedido '+id_pedido+' fue rechazado.' });
    
    verificar_existencia();
}

function cancelar_pedido(id_pedido) {
    completar_pedido(id_pedido);
    M.toast({ html: 'El pedido '+id_pedido+' fue cancelado por x razon.' });
    
    verificar_existencia();
}

function completar_pedido(id_pedido) {
    $('#del' + id_pedido).fadeOut();
    setTimeout(function () {
        $('#del' + id_pedido).remove();
        $('#area_picker_pedidos').effect('shake');

        verificar_existencia();
    }, atime);
}

function verificar_existencia() {
    if ($('#requests_cards_container').find('div').length < 1) {
        $('#del_empty').fadeIn();
    }

    if ($('#queued_requests_cards_container').find('div').length < 1) {
        $('#queue_empty').fadeIn();
    }
}

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
    var rnd_interval = 0.8; // s
    setInterval(function () {
        rnd = Math.floor(Math.random() * 13);
        if (rnd == rnd_match) {
            console.log('Expected value has been hit!');
            var timeout = atime;
            if ($('#del_empty').is(':visible')) {
                setTimeout(function () {
                    $('#del_empty').fadeOut();
                }, atime);
            } else {
                timeout = 0;
            }

            setTimeout(function () {
                M.toast({html: 'Tenés un nuevo pedido.'});

                rnd = (Math.floor(Math.random() * 9999999));
                $('#requests_cards_container').append(`
                <div id="del` + rnd + `" class="col">
                    <div class="card">
                        <div class="card-content">
                        <span class="card-title">Pedido #` + rnd + `</span>
                        <p>XXXX XXXX te pidió XXXX XXXX.</p>
                        </div>
                        <div class="card-action">
                            <a id="del_aceptar" class="green-text" href="#" onclick="aceptar_pedido(` + rnd + `)">Aceptar</a>
                            <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido(` + rnd + `)">Rechazar</a>
                            <a id="del_completado" class="green-text hide" href="#" onclick="completar_pedido(` + rnd +`)">Listo</a>
                            <a id="del_completado_cancelar" class="green-text hide" href="#" onclick="cancelar_pedido(` + rnd +`)">Cancelar</a>
                        </div>
                    </div>
                </div>
                `)
                $('#del' + rnd).hide().fadeIn();
            }, timeout * 2);
        } else {
           console.log('Random: ' + rnd + '.');
        }
    }, (rnd_interval * 1000));
});
