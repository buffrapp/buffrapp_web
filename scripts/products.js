let atime = 400;

$('document').ready(function () {
  $('.modal').modal();
});

function product_add() {
  rnd = 0;
  html = `
  <div id="producto` + rnd + `" class="col">
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
              <a id="product_delete" class="green-text" href="#" onclick="product_delete(` + rnd + `, false)">Eliminar</a>
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
          $('#products_empty').remove();
          $('#products_cards_container').append(html);
      }, atime * 2);
  } else {
    $('#products_cards_container').append(html);
  }
  $('#product_name').val('');
  $('#product_price').val('');
}
