var utime = 500;
var offcount = 0;
var isBusy = false;
var first_id = -1;
var id_pedido;
var id;
let atime = 100;

const GENERAL_OFF_COUNT = 20;
const RESPONSE_ERROR = '1';
const UPDATE_FAILURE = 'Hubo un error al actualizar los pedidos, vamos a probar otra vez en un rato.'

const NO_ORDERS = 'No hay solicitudes.';
const NO_ORDERS_QUEVE = 'No hay pedidos en cola.';
const NO_ORDERS_DONE = 'No hay pedidos finalizados.';

$('document').ready(function () {
  $('.modal').modal();
  $('.tooltipped').tooltip();
  setInterval(function() {
    if (!isBusy && offcount == 0) {
      isBusy = false;
      
      let first_pending = $('.del_pending').last();
      if (first_pending.length > 0) {
        first_id = $('.del_pending').first().attr('id').replace('del', '');
        first_id -= 2;
      }

      if (first_id < 0) {
        $.ajax({
          url: 'api.php',
          type: 'POST',
          data: {
            request: 'getLastOrderId'
          }
        })
        .done(function (data) {
          data = JSON.parse(data);
          
          // Shift slightly to prevent missing data bugs.
          first_id = data - 2;
          
          isBusy = false;
          return;
        });
      } else {
        dynamicUpdatesWorker();
      }
    } else {
      if (offcount > 0) {
        offcount--;
      }
    }
  }, utime);
todo();
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
				                        <span class="card-title">Recibido: ` + data[0]["Recibido"] + `hs</span>
				                        <span class="card-title">Tomado: ` + data[0]["Tomado"] + `hs</span>
				                        <p><a id="" href="#" onclick="ver_alumno(`+data[0][0]+`)">` + data[0]["Usuario"]+data[0]["Curso"]+  `</a> te pidió ` + data[0]["Producto"]+ `.</p>
				                   		<p>$ ` + data[0]["Precio"] + `</p>
				                    </div>

				                  <div class="card-action">
				                    <a id="del_aceptar" class="green-text" href="#" onclick="listo_pedido(` + data[0]["ID_Pedido"] + `)">Listo</a>
				                    <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido_request(` + data[0]["ID_Pedido"] + `)">Rechazar</a>
				                  </div>
				              </div>
				            </div>
				        `;
           $('#del' + data["ID_Pedido"]).hide().fadeIn();
           $('#del' + id_pedido).remove();
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
			    $('#queue_empty').html(NO_ORDERS);
			   }
			 });
            setTimeout(function() {
                verificar_existencia();
            }, atime);
        }, timeout * 2);
    }, atime);

}

function rechazar_pedido() {
  $('#del' + $('#order_id').val()).fadeOut();
    setTimeout(function () {
        $('#del' + $('#order_id').val()).remove();
        //$('#area_picker_pedidos').effect('shake');
        verificar_existencia();
        $.ajax({
          url: 'api.php',
          type: 'POST',
          data: {
            request: 'cancelarOrden',
            content: [$('#order_id').val()]
          }
        })
        .done(function (data) {
         console.log(data);
         M.toast({ html: 'El pedido '+$('#order_id').val()+' fue rechazado.' });
        });
    
    }, atime);
}

function rechazar_pedido_request(id_pedido) {
    $('#order_id').val(id_pedido);
    console.log($('#order_id').val());
    $('#order_remove').modal('open');
    $.ajax({
       url: 'api.php',
       type: 'POST',
       data: {
         request: 'getReasons'
       }
     })
     .done(function (data) {
       data = JSON.parse(data);
       console.log(data);
       let html;

       let Alumnos = `<div class="col s5 lighten-3"><h3>Alumnos</h3>`;
       let Pedidos = `<div class="col s5 lighten-2"><h3>Pedidos</h3>`;
       
       for (let i = 0 ; i < data.length; i++) {
        html = `<p><label><input class="with-gap radio" type="radio" name="motivo" checked value='` + data[i]['ID_Motivo'] + `' /><span id="Motivo_` + data[i]['ID_Motivo'] + `">` + data[i]['Motivo'] + `</span></label></p>`;
        if (data[i]['Tipo'] == '0') {
          Alumnos +=html;
        }else if(data[i]['Tipo'] == '1'){
          Pedidos += html;
        }
        
       };
       html = `</div></div>`;
       Alumnos += html;
       Pedidos += html;
     $('#motivos').html(Pedidos);
     $('#motivos').append('<div class="col s1 inner"></div>');
     $('#motivos').append(Alumnos);
     });
 }

function cancelar_pedido() {
  id_pedido = $('#order_id').val();
    id = $(".radio").val();
    $.ajax({
       url: 'api.php',
       type: 'POST',
       data: {
         request: 'addReport',
         content:[id,id_pedido]
       }
     })
     .done(function (data) {
      console.log(data);
       data = parseInt(data);
       switch (data) {
         case 0:
            completar_pedido(id_pedido);
            let motivo = $("#Motivo_"+id).html()
            M.toast({ html: 'El pedido '+id_pedido+' fue cancelado porque '+motivo+'.' });
            verificar_existencia();
          break;
         case 1:
          M.toast({ html: 'Hubo un error al cancelar el pedido' });
         break;
       }
     });
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
                                <span class="card-title">Recibido: ` + data[0]["Recibido"] + `hs</span>
                                <span class="card-title">Tomado: ` + data[0]["Tomado"] + `hs</span>
                                <span class="card-title">Listo: ` + data[0]["Listo"] + `hs</span>
                                <p><a id="" href="#" onclick="ver_alumno(`+data[0][0]+`)">` + data[0]["Usuario"]+data[0]["Curso"]+  `</a> te pidió ` + data[0]["Producto"]+ `.</p>
                              <p>$ ` + data[0]["Precio"] + `</p>
                            </div>

                          <div class="card-action">
                            <a id="del_aceptar" class="green-text" href="#" onclick="completar_pedido(` + data[0]["ID_Pedido"] + `)">Enregado</a>
                            <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido_request(` + data[0]["ID_Pedido"] + `)">No vino</a>
                          </div>
                      </div>
                    </div>
                `
           if ($('#done_empty').length > 0) {
            $('#del' + data["ID_Pedido"]).hide().fadeIn();
           $('#del' + id_pedido).remove();
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

function dynamicUpdatesWorker() {
  isBusy = true;

  $.ajax({
    url: 'api.php',
    type: 'POST',
    data: {
      request: 'viewOrderRequest',
      optional: [first_id]
    }
  })
  .done(function (data) {
    if (data == RESPONSE_ERROR) {
      M.toast({ html : UPDATE_FAILURE });
      offcount = GENERAL_OFF_COUNT;
      isBusy = false;
    } else {
      data = JSON.parse(data);
      let html = '';
  
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (data[i]['DNI_Cancelado'] != null) {
            if ($('#del' + data[i]['ID_Pedido']).length > 0) {
              let order = $('#del' + data[i]['ID_Pedido']);

              order.fadeOut();

              setTimeout(function () {
                order.remove();

                setTimeout(function () {
                  if ($('.del_pending').last().length < 1) {
                    $('#del_empty').html(NO_ORDERS).fadeIn();
                  }
                }, atime);
              }, atime);
            }
          } else {
            if ($('#del' + data[i]['ID_Pedido']).length < 1) {
              //console.log(data[i]);
              html += `
                  <div id="del` + data[i]["ID_Pedido"] + `" class="del_pending col">
      
                      <div class="card">
                          <div class="card-content">
                              <span class="card-title" >Pedido #` + data[i]["ID_Pedido"] + `</span>
                              <span class="card-title">Recibido: ` + data[i]["Recibido"] + `hs</span>
                              <p><a href="#">` + data[i]["Usuario"]+data[i]["Curso"]+  `</a> te pidió ` + data[i]["Producto"]+ `.</p>
                              <p>$ ` + data[i]["Precio"] + `</p>
                          </div>
      
                        <div class="card-action">
                          <a id="del_aceptar" class="green-text" href="#" onclick="aceptar_pedido(` + data[i]["ID_Pedido"] + `)">Aceptar</a>
                          <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido_request(` + data[i]["ID_Pedido"] + `)">Rechazar</a>
                        </div>
                    </div>
                  </div>
              `;
                  
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
            }
          }
        }
      } else {
        if ($('.del_pending').length < 1) {
          $('#del_empty').html(NO_ORDERS);
        }
      }
      
      isBusy = false;
    }
  })
  .fail(function (error) {
    console.error('Unable to fetch updates: ' + error.responseText);
    M.toast({ html : UPDATE_FAILURE });
    offcount = GENERAL_OFF_COUNT;
    isBusy = false;
  });
}

function todo(){
      
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
            <div id="del` + data[i]["ID_Pedido"] + `" class="del_pending col">

                <div class="card">
                    <div class="card-content">
                        <span class="card-title" >Pedido #` + data[i]["ID_Pedido"] + `</span>
                        <span class="card-title">Recibido: ` + data[i]["Recibido"] + `hs</span>
                        <p><a href="#">` + data[i]["Usuario"]+data[i]["Curso"]+  `</a> te pidió ` + data[i]["Producto"]+ `.</p>
                        <p>$ ` + data[i]["Precio"] + `</p>
                    </div>

                  <div class="card-action">
                    <a id="del_aceptar" class="green-text" href="#" onclick="aceptar_pedido(` + data[i]["ID_Pedido"] + `)">Aceptar</a>
                    <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido_request(` + data[i]["ID_Pedido"] + `)">Rechazar</a>
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
                                <span class="card-title">Recibido ` + data[i]["Recibido"] + `hs</span>
                                <span class="card-title">Tomado: ` + data[i]["Tomado"] + `hs</span>
                                <p><a id="" href="#" onclick="ver_alumno(`+data[i][0]+`)">` + data[i]["Usuario"]+data[i]["Curso"]+  `</a> te pidió ` + data[i][8]+ `.</p>
                              <p>$ ` + data[i]["Precio"] + `</p>
                            </div>

                          <div class="card-action">
                            <a id="del_aceptar" class="green-text" href="#" onclick="listo_pedido(` + data[i]["ID_Pedido"] + `)">Listo</a>
                            <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido_request(` + data[i]["ID_Pedido"] + `)">Rechazar</a>
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
                                <span class="card-title">Recibido: ` + data[i]["Recibido"] + `hs</span>
                                <span class="card-title">Tomado: ` + data[i]["Tomado"] + `hs</span>
                                <span class="card-title">Listo: ` + data[i]["Listo"] + `hs</span>
                                <p><a id="" href="#" onclick="ver_alumno(`+data[i][0]+`)">` + data[i]["Usuario"]+data[i]["Curso"]+ `</a> te pidió ` + data[i]['Producto']+ `.</p>
                              <p>$ ` + data[i]["Precio"] + `</p>
                            </div>

                          <div class="card-action">
                            <a id="del_aceptar" class="green-text" href="#" onclick="completar_pedido(` + data[i]["ID_Pedido"] + `)">Entregado</a>
                            <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido_request(` + data[i]["ID_Pedido"] + `)">No vino</a>
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
}
