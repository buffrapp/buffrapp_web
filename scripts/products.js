let atime = 200;

const NO_PRODUCTS = 'No hay productos.';

$('document').ready(function () {
  $('.modal').modal();
  todo();
});

function product_add() {
  if ($('#product_name').val().length < 1 || $('#product_price').val().length < 1) {
    M.toast({ 'html': 'No podés dejar ningún campo vacío.' });
  } else {
    $.ajax({
      url: 'api.php',
      type: 'POST',
      data: {
        request: 'addProduct',
        content: [ $('#product_name').val(), $('#product_price').val(), $('#product_available').prop('checked') ]
      }
    })
    .done(function (dataO) {
      console.log(dataO);
      data = parseInt(dataO);

      switch (data) {
        case 1:
          M.toast({ 'html': 'Hubo un error al agregar el producto, intentálo otra vez.' });
          break;
        case 2:
          M.toast({ 'html': 'No tenés permitido agregar productos.' });
          break;
        case 3:
          M.toast({ 'html': 'Este producto ya existe.' });
          break;
        default:
          M.toast({ 'html': '¡El producto se agregó con éxito!' });
          $('#products_add').modal('close');
          let checked = $('#product_available').prop('checked') ? "checked='true'":"";
          let status = checked=="checked='true'"?"Disponible":"No disponible";
          data = JSON.parse(dataO);
          html = `
          <div id="producto` + data[0][0] + `" class="producto col">
              <div class="card">
                  <div class="card-content">
                    <span class="card-title tooltipped truncate" data-html="true" data-position="top" data-tooltip="` + $('#product_name').val() + `">` + $('#product_name').val() + `</span>
                    <p>$ ` + $('#product_price').val() + `</p>
                    <input type="hidden" name="product_id" id="product_id" value="` + data[0][0] + `">
                    <p>
                      <label>
                        <input type="checkbox" `+checked+` disabled="disabled" />
                        <span>`+status+`</span>
                      </label>
                    </p>
                  </div>
                  <div class="card-action">
                      <a id="product_edit" class="green-text" href="#" onclick="product_edit(` + data[0][0] + `)">Editar</a>
                      <a id="product_delete" class="green-text" href="#" onclick="product_delete_request(` + data[0][0] + `)">Eliminar</a>
                  </div>
              </div>
          </div>
          `;
          if ($('#products_empty').length > 0) {
            setTimeout(function() {
               $('#products_empty').fadeOut();
            }, atime);
            setTimeout(function() {
               $('#products_cards_container').append(html).ready(function () {
                  $('.tooltipped').tooltip();
               });
            }, atime * 2);
          } else {
             $('#products_cards_container').append(html).ready(function () {
                $('.tooltipped').tooltip();
             });
          }
          $('#product_name').val('');
          $('#product_price').val('');
          $('#product_available').prop('checked',true);
          break;

      }
    });
    
  }
}
 function product_delete_request(product_id) {
    $('#product_id').val(product_id);
    console.log($('#product_id').val());
    $('#products_remove').modal('open');
 }

 function product_delete() {
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
function todo(){
    $.ajax({
      url: 'api.php',
      type: 'POST',
      data: {
        request: 'getProducts'
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
          <div id="producto` + data[i][0] + `" class="producto col s3">
              <div class="card">
                  <div class="card-content">
                    <span "class="card-title tooltipped truncate" data-html="true" data-position="top" data-tooltip="` + data[i][1] + `" id="product_name_` + data[i][0] + `">` + data[i][1] + `</span>
                    <p>$ <span id="product_price_` + data[i][0] + `">` + data[i][2] + `</span></p>
                    <input type="hidden" name="product_id" id="product_id" value="` + data[i][0] + `">
                    <p>
                      <label>
                        <input id="product_avaliable_` + data[i][0] + `" type="checkbox" ` + (data[i][3] == 1 ? 'checked' : '') + ` disabled />
                        <span id="product_avaliable_text_` + data[i][0] + `">` + (data[i][3] == 1 ? 'Disponible' : 'No disponible') + `</span>
                      </label>
                    </p>
                  </div>
                  <div class="card-action">
                      <a id="product_edit" class="green-text modal-trigger" href="#products_modify" onclick="product_open_modify(` + data[i][0] + `)">Editar</a>
                      <a id="product_delete" class="green-text" href="#" onclick="product_delete_request(` + data[i][0] + `)">Eliminar</a>
                  </div>
              </div>
          </div>
          `
       }

       if ($('#products_empty').length > 0) {
           setTimeout(function() {
               $('#products_empty').fadeOut();
           }, atime);
           setTimeout(function() {
               $('#products_cards_container').append(html).ready(function () {
                  $('.tooltipped').tooltip();
               });
           }, atime * 2);
       } else {
         $('#products_cards_container').append(html).ready(function () {
            $('.tooltipped').tooltip();
         });
       }
     } else {
      $('#products_empty').html(NO_PRODUCTS);
     }
 });
}

function product_open_modify(id){
  $('#product_name_new').val($('#product_name_'+id).html());
  $('#product_price_new').val($('#product_price_'+id).html());
  $('#product_id_new').val(id);
  $('#product_available_new').attr('checked',$('#product_avaliable_'+id).prop('checked'));

}

function product_modify(){
  if ($('#product_name_new').val().length < 1 || $('#product_price_new').val().length < 1) {
    M.toast({ 'html': 'No podés dejar ningún campo vacío.' });
  } else{
    $.ajax({
        url: 'api.php',
        type: 'POST',
        data: {
          request: 'modifyProduct',
          content: [$('#product_id_new').val(), $('#product_name_new').val(), $('#product_price_new').val(), $('#product_available_new').prop('checked') ]
        }
      })
      .done(function (data) {
        console.log(data);
        data = parseInt(data);
        switch (data) {
          case 1:
            M.toast({ 'html': 'ERROR.' });
            break;
          default:
            data = JSON.parse(data);
            $('#product_name_'+data[0]['ID_Producto']).html(data[0]['Nombre']);
            $('#product_price_'+data[0]['ID_Producto']).html(data[0]['Precio']);
            $('#product_id_'+data[0]['ID_Producto']).html(data[0]['ID_Producto']);
            data[0]['Estado']=='1'?$('#product_available_'+data[0]['ID_Producto']).prop(true):$('#product_available_'+data[0]['ID_Producto']).prop(false);
            data[0]['Estado']=='1'?$('#product_available_text_'+data[0]['ID_Producto']).html('Disponible'):$('#product_available_text_'+data[0]['ID_Producto']).html('No disponible');
            $('#products_modify').modal('close');
            M.toast({ 'html': 'Producto modificado con éxito.' });
            break;
      }
    });
  }
}

