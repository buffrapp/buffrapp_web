let atime = 100;

const NO_ORDERS = 'No hay solicitudes.';
const NO_ORDERS_QUEVE = 'No hay pedidos en cola.';
const NO_ORDERS_DONE = 'No hay pedidos finalizados.';
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
    //console.log(data);
    data = JSON.parse(data);
   let html = '';
   if (data.length > 0) {
     for (let i = 0; i < data.length; i++) {
        //console.log(data[i]);
        html += `
            <div id="del` + data[i]["ID_Pedido"] + `" class="col">

                <div class="card">
                    <div class="card-content">
                        <span class="card-title" >Pedido #` + data[i]["ID_Pedido"] + `</span>
                        <span class="card-title">` + data[i][2] + `</span>
                        <p><a href="#" class="tooltipped" data-position="bottom" data-tooltip="I am a tooltip">` + data[i][3]+ `</a> te pidió ` + data[i][4]+ `.</p>
                        <p>$ ` + data[i][5] + `</p>
                    </div>

                  <div class="card-action">
                    <a id="del_aceptar" class="green-text" href="#" onclick="aceptar_pedido(` + data[i]["ID_Pedido"] + `)">Aceptar</a>
                    <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido(` + data[i]["ID_Pedido"] + `)">Rechazar</a>
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
    for (let i = 0; i < data.length; i++) {
        //console.log(data[i]);
        html += `
                    <div id="del` + data[i]["ID_Pedido"] + `" class="col">

                        <div class="card">
                            <div class="card-content">
                                <span class="card-title">Pedido #` + data[i]["ID_Pedido"] + `</span>
                                <span class="card-title">Recibido ` + data[i][4] + `hs</span>
                                <span class="card-title">Tomado: ` + data[i][5] + `hs</span>
                                <p><a id="" href="#" onclick="ver_alumno(`+data[i][0]+`)">` + data[i][6]+ `</a> te pidió ` + data[i][8]+ `.</p>
                              <p>$ ` + data[i][9] + `</p>
                            </div>

                          <div class="card-action">
                            <a id="del_aceptar" class="green-text" href="#" onclick="listo_pedido(` + data[i]["ID_Pedido"] + `)">Listo</a>
                            <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido(` + data[i]["ID_Pedido"] + `)">Rechazar</a>
                          </div>
                      </div>
                    </div>
                `;
     }
					 
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
			   } else {
			    $('#queue_empty').html(NO_ORDERS_QUEVE);
			   }
	});

//--------FINALIZADOS
   $.ajax({
    url: 'api.php',
    type: 'POST',
    data: {
      request: 'viewOrderReady'
    }
  })
  .done(function (data) {
    console.log(data);
    data = JSON.parse(data);
   let html = '';
   if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
        //console.log(data[i]);
        html += `
                    <div id="del` + data[i]["ID_Pedido"] + `" class="col">

                        <div class="card">
                            <div class="card-content">
                                <span class="card-title">Pedido #` + data[i]["ID_Pedido"] + `</span>
                                <span class="card-title">Recibido: ` + data[i]["Recibido"] + `</span>
                                <span class="card-title">Tomado: ` + data[i]["Tomado"] + `</span>
                                <span class="card-title">Listo: ` + data[i]["Listo"] + `</span>
                                <p><a id="" href="#" onclick="ver_alumno(`+data[i][0]+`)">` + data[i]["Usuario"]+ `</a> te pidió ` + data[i]["Producto"]+ `.</p>
                              <p>$ ` + data[i]["Precio"] + `</p>
                            </div>

                          <div class="card-action">
                            <a id="del_aceptar" class="green-text" href="#" onclick="completar_pedido(` + data[i]["ID_Pedido"] + `)">Entregado</a>
                            <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido(` + data[i]["ID_Pedido"] + `)">No vino</a>
                          </div>
                      </div>
                    </div>
                `;
     }
           
           if ($('#done_empty').length > 0) {
               setTimeout(function() {
                   $('#done_empty').fadeOut();
               }, atime);
               setTimeout(function() {
                   $('#done_requests_cards_container').append(html);
               }, atime * 2);
           } else {
             $('#done_requests_cards_container').append(html);
           }
         } else {
          $('#done_empty').html(NO_ORDERS_DONE);
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
			      content: [id_pedido]
			    }
			  })
			  .done(function (data) {
			    console.log(data);
			    data = JSON.parse(data);
			   let html = '';
			   if (data.length > 0) {
					 html += `
				            <div id="del` + data[0]["ID_Pedido"] + `" class="col">

				                <div class="card">
				                    <div class="card-content">
				                        <span class="card-title">Pedido #` + data[0]["ID_Pedido"] + `</span>
				                        <span class="card-title">Recibido: ` + data[0]["Recibido"] + `</span>
				                        <span class="card-title">Tomado: ` + data[0]["Tomado"] + `</span>
				                        <p><a id="" href="#" onclick="ver_alumno(`+data[0][0]+`)">` + data[0][6]+ `</a> te pidió ` + data[0][8]+ `.</p>
				                   		<p>$ ` + data[0][9] + `</p>
				                    </div>

				                  <div class="card-action">
				                    <a id="del_aceptar" class="green-text" href="#" onclick="listo_pedido(` + data[0]["ID_Pedido"] + `)">Listo</a>
				                    <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido(` + data[0]["ID_Pedido"] + `)">Rechazar</a>
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
			     $('#del' + data["ID_Pedido"]).hide().fadeIn();
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
  $('#del' + id_pedido).fadeOut();
    setTimeout(function () {
        $('#del' + id_pedido).remove();
        //$('#area_picker_pedidos').effect('shake');
        verificar_existencia();
        $.ajax({
          url: 'api.php',
          type: 'POST',
          data: {
            request: 'cancelarOrden',
            content: [id_pedido]
          }
        })
        .done(function (data) {
         console.log(data);
         M.toast({ html: 'El pedido '+id_pedido+' fue rechazado.' });
        });
    
    }, atime);
}

function rechazar_pedido_request(id_pedido) {
    $('#product_id').val(id_pedido);
    console.log($('#product_id').val());
    $('#products_remove').modal('open');
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
        //$('#area_picker_pedidos').effect('shake');
        verificar_existencia();
           $.ajax({
            url: 'api.php',
            type: 'POST',
            data: {
              request: 'finishOrder',
              content: [id_pedido]
            }
          })
          .done(function (data) {
            console.log(data);
            data = JSON.parse(data);
           let html = '';
           if (data==0) 
            M.toast({ html: 'El pedido '+id_pedido+' fue entregado.' });
          });   
    }, atime);
    
}
function listo_pedido(id_pedido){
  $('#del' + id_pedido).fadeOut();

    setTimeout(function () {
        var timeout = atime;
        if ($('#done_empty').is(':visible')) {
            setTimeout(function () {
                $('#done_empty').fadeOut();
            }, atime);
        } else {
            timeout = 0;
        }
    
        setTimeout (function () {
          $.ajax({
          url: 'api.php',
          type: 'POST',
          data: {
            request: 'readyOrder',
            content: [id_pedido]
          }
        })
        .done(function (data) {
          console.log(data);
          data = JSON.parse(data);
         let html = '';
         if (data.length > 0) {
           html += `
                    <div id="del` + data[0]["ID_Pedido"] + `" class="col">

                        <div class="card">
                            <div class="card-content">
                                <span class="card-title">Pedido #` + data[0]["ID_Pedido"] + `</span>
                                <span class="card-title">Recibido: ` + data[0]["Recibido"] + `</span>
                                <span class="card-title">Tomado: ` + data[0]["Tomado"] + `</span>
                                <span class="card-title">Listo: ` + data[0]["Listo"] + `</span>
                                <p><a id="" href="#" onclick="ver_alumno(`+data[0][0]+`)">` + data[0]["Usuario"]+ `</a> te pidió ` + data[0]["Producto"]+ `.</p>
                              <p>$ ` + data[0]["Precio"] + `</p>
                            </div>

                          <div class="card-action">
                            <a id="del_aceptar" class="green-text" href="#" onclick="completar_pedido(` + data[0]["ID_Pedido"] + `)">Listo</a>
                            <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido(` + data[0]["ID_Pedido"] + `)">Rechazar</a>
                          </div>
                      </div>
                    </div>
                `
           if ($('#done_empty').length > 0) {
               setTimeout(function() {
                   $('#done_empty').fadeOut();
               }, atime);
               setTimeout(function() {
                   $('#done_requests_cards_container').append(html);
               }, atime * 2);
           } else {
             $('#done_requests_cards_container').append(html);
           }
           $('#del' + data["ID_Pedido"]).hide().fadeIn();
         } else {
          $('#done_empty').html(NO_ORDERS);
         }
       });
            setTimeout(function() {
                verificar_existencia();
            }, atime);
        }, timeout * 2);
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

function ver_alumno(dni){
   $.ajax({
    url: 'api.php',
    type: 'POST',
    data: {
      request: 'getAlumno',
      content: [dni]
    }
  })
  .done(function (data) {
    console.log(data);
    data = JSON.parse(data);
   let html = '';
   if (data.length > 0) {
    data["E-mail"];
    data["Nombre"];
    data["Curso"];
    data["Division"];

        html += ``;
     }
  });
}
