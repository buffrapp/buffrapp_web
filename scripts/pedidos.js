let atime = 400;

const NO_ORDERS = 'No hay solicitudes.';
const NO_ORDERS_QUEVE = 'No hay pedidos en cola.';
$('document').ready(function () {
  $('.modal').modal();
  //------PEDIDOS
  $.ajax({
    url: 'api.php',
    type: 'POST',
    data: {
      request: 'viewOrderRequest'
    }
  })
  .done(function (data) {
    console.log(data);
    data = JSON.parse(data);
   let html = '';
   if (data.length > 0) {
     for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        html += `
            <div id="del` + data[i][1] + `" class="col">

                <div class="card">
                    <div class="card-content">
                        <span class="card-title">Pedido #` + data[i][1] + `</span>
                        <span class="card-title">` + data[i][2] + `</span>
                        <p><a id="" href="#" onclick="ver_alumno(`+data[i][0]+`)">` + data[i][3]+ `</a> te pidió ` + data[i][4]+ `.</p>
                        <p>$ ` + data[i][5] + `</p>
                    </div>

                  <div class="card-action">
                    <a id="del_aceptar" class="green-text" href="#" onclick="aceptar_pedido(` + data[i][1] + `)">Aceptar</a>
                    <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido(` + data[i][1] + `)">Rechazar</a>
                  </div>
              </div>
            </div>
        `
     }
     if ($('#del_empty').length > 0) {
         setTimeout(function() {
             $('#del_empty').fadeOut();
         }, atime);
         setTimeout(function() {
             $('#requests_cards_container').append(html);
         }, atime * 2);
     } else {
       $('#requests_cards_container').append(html);
     }
     $('#del' + data[i][1]).hide().fadeIn();
   } else {
    $('#del_empty').html(NO_ORDERS);
   }
 });

  //--------COLA
    $.ajax({
    url: 'api.php',
    type: 'POST',
    data: {
      request: 'viewOrderQueve'
    }
  })
  .done(function (data) {
    console.log(data);
    data = JSON.parse(data);
   let html = '';
   if (data.length > 0) {
					 html += `
				            <div id="del` + data[i][1] + `" class="col">

				                <div class="card">
				                    <div class="card-content">
				                        <span class="card-title">Pedido #` + data[i][1] + `</span>
				                        <span class="card-title">Recibido: ` + data[i][4] + `</span>
				                        <span class="card-title">Tomado: ` + data[i][5] + `</span>
				                        <p><a id="" href="#" onclick="ver_alumno(`+data[i][0]+`)">` + data[i][6]+ `</a> te pidió ` + data[i][8]+ `.</p>
				                   		<p>$ ` + data[i][9] + `</p>
				                    </div>

				                  <div class="card-action">
				                    <a id="del_aceptar" class="green-text" href="#" onclick="aceptar_pedido(` + data[i][1] + `)">Aceptar</a>
				                    <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido(` + data[i][1] + `)">Rechazar</a>
				                  </div>
				              </div>
				            </div>
				        `
			     if ($('#queue_empty').length > 0) {
			         setTimeout(function() {
			             $('#queue_empty').fadeOut();
			         }, atime);
			         setTimeout(function() {
			             $('#queued_requests_cards_container').append(html);
			         }, atime * 2);
			     } else {
			       $('#queued_requests_cards_container').append(html);
			     }
			     $('#del' + data[i][1]).hide().fadeIn();
			   } else {
			    $('#queue_empty').html(NO_ORDERS_QUEVE);
			   }
	});
});


function aceptar_pedido(id_pedido) {

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
        	$.ajax({
			    url: 'api.php',
			    type: 'POST',
			    data: {
			      request: 'takeOrder',
			      content: [idproducto,'12345678']
			    }
			  })
			  .done(function (data) {
			    console.log(data);
			    data = JSON.parse(data);
			   let html = '';
			   if (data.length > 0) {
					 html += `
				            <div id="del` + data[i][1] + `" class="col">

				                <div class="card">
				                    <div class="card-content">
				                        <span class="card-title">Pedido #` + data[i][1] + `</span>
				                        <span class="card-title">Recibido: ` + data[i][4] + `</span>
				                        <span class="card-title">Tomado: ` + data[i][5] + `</span>
				                        <p><a id="" href="#" onclick="ver_alumno(`+data[i][0]+`)">` + data[i][6]+ `</a> te pidió ` + data[i][8]+ `.</p>
				                   		<p>$ ` + data[i][9] + `</p>
				                    </div>

				                  <div class="card-action">
				                    <a id="del_aceptar" class="green-text" href="#" onclick="aceptar_pedido(` + data[i][1] + `)">Aceptar</a>
				                    <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido(` + data[i][1] + `)">Rechazar</a>
				                  </div>
				              </div>
				            </div>
				        `
			     if ($('#queue_empty').length > 0) {
			         setTimeout(function() {
			             $('#queue_empty').fadeOut();
			         }, atime);
			         setTimeout(function() {
			             $('#queued_requests_cards_container').append(html);
			         }, atime * 2);
			     } else {
			       $('#queued_requests_cards_container').append(html);
			     }
			     $('#del' + data[i][1]).hide().fadeIn();
			   } else {
			    $('#queue_empty').html(NO_ORDERS);
			   }
			 });
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

