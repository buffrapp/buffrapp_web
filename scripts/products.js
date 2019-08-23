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
        <div id="producto` + data[i][1] + `" class="producto col">
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

 function product_delete_request(product_id) {
 }

 function product_delete() {
     }
