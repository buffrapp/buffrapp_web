let atime = 400;

const NO_PRODUCTS = 'No hay productos.';

$('document').ready(function () {
  $('.modal').modal();

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
        <div id="producto` + data[i][0] + `" class="producto col">
            <div class="card">
                <div class="card-content">
                  <span class="card-title">` + data[i][1] + `</span>
                  <p>$ ` + data[i][2] + `</p>
                  <input type="hidden" name="product_id" id="product_id" value="">
                  <p>
                    <label>
                      <input type="checkbox" ` + (data[i][3] == 1 ? 'checked' : '') + ` disabled />
                      <span>` + (data[i][3] == 1 ? 'Disponible' : 'No disponible') + `</span>
                    </label>
                  </p>
                </div>
                <div class="card-action">
                    <a id="product_edit" class="green-text" href="#" onclick="product_edit(` + data[i][0] + `)">Editar</a>
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
             $('#products_cards_container').append(html);
         }, atime * 2);
     } else {
       $('#products_cards_container').append(html);
     }
   } else {
    $('#products_empty').html(NO_PRODUCTS);
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
