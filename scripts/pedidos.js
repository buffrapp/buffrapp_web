let atime = 400;

const NO_ORDERS = 'No hay solicitudes.';

$('document').ready(function () {
  $('.modal').modal();
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
                        <p>` + data[i][3]+ ` te pidió ` + data[i][4]+ `.</p>
                    </div>

                  <div class="card-action">
                    <a id="del_aceptar" class="green-text" href="#" onclick="aceptar_pedido(` + data[i][1] + `)">Aceptar</a>
                    <a id="del_rechazar" class="green-text" href="#" onclick="rechazar_pedido(` + data[i][1] + `)">Rechazar</a>
                    <a id="del_completado" class="green-text hide" href="#" onclick="completar_pedido(` + data[i][1] +`)">Listo</a>
                    <a id="del_completado_cancelar" class="green-text hide" href="#" onclick="cancelar_pedido(` + data[i][1] +`)">Cancelar</a>
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
});

function product_add() {
  if ($('#product_name').val().length < 1 || $('#product_price').val().length < 1) {
    M.toast({ 'html': 'No podés dejar ningún campo vacío.' });
  } else {
    rnd = 0;
    html = `
    <div id="producto` + rnd + `" class="producto col">
        <div class="card">
            <div class="card-content">
              <span class="card-title">` + $('#product_name').val() + `</span>
              <p>$ ` + $('#product_price').val() + `</p>
              <input type="hidden" name="product_id" id="product_id" value="">
              <p>
                <label>
                  <input type="checkbox" checked="` + $('#product_available').prop('checked') + `" disabled="disabled" />
                  <span>Disponible</span>
                </label>
              </p>
            </div>
            <div class="card-action">
                <a id="product_edit" class="green-text" href="#" onclick="product_edit(` + rnd + `)">Editar</a>
                <a id="product_delete" class="green-text" href="#" onclick="product_delete_request(` + rnd + `)">Eliminar</a>
            </div>
        </div>
    </div>
    `

    $.ajax({
      url: 'api.php',
      type: 'POST',
      data: {
        request: 'addProduct',
        content: [ $('#product_name').val(), $('#product_price').val(), $('#product_available').prop('checked') ]
      }
    })
    .done(function (data) {
      console.log(data);
      data = parseInt(data);

      switch (data) {
        case 0:
          M.toast({ 'html': '¡El producto se agregó con éxito!' });
          $('#products_add').modal('close');
          break;
        case 1:
          M.toast({ 'html': 'Hubo un error al agregar el producto, intentálo otra vez.' });
          break;
        case 2:
          M.toast({ 'html': 'No tenés permitido agregar productos.' });
          break;
      }
    });

    if ($('#products_empty').length > 0) {
        setTimeout(function() {
            $('#products_empty').fadeOut();
        }, atime);
        setTimeout(function() {
            $('#products_cards_container').append(html);
        }, atime * 2);
    } else {
      $('#products_cards_container').append(html);
    }
    $('#product_name').val('');
    $('#product_price').val('');
  }
}

 function product_delete_request(product_id) {
    $('#product_id').val(product_id);
    console.log($('#product_id').val());
    $('#products_remove').modal('open');
 }

 function product_delete() {
   M.toast({ 'html': 'Cargando...' });
   $.ajax({
     url: 'api.php',
     type: 'POST',
     data: {
       request: 'deleteProduct',
       content: [ $('#product_id').val() ]
     }
   })
   .done(function (data) {
     console.log(data);
     data = parseInt(data);

     switch (data) {
       case 0:
         M.toast({ 'html': 'El producto se eliminó con éxito.' });

         setTimeout(function () {
           $('#producto' + $('#product_id').val()).fadeOut();
         }, atime);
         setTimeout(function () {
           $('#producto' + $('#product_id').val()).remove();

           if ($('.producto').length < 1) {
               setTimeout(function() {
                   $('#products_empty').fadeIn();
                   $('#products_empty').html(NO_PRODUCTS)
               }, atime);
           }
         }, atime * 2);
         break;
       case 1:
         M.toast({ 'html': 'Hubo un error al eliminar el producto.' })
         break;
     }
   });
 }
