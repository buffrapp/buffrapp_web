var atime = 400;

function product_delete(product_id, check=false) {
  console.log($('#product_id').val());
  if (check) {
    setTimeout(function () {
      $('#producto' + $('#product_id').val()).fadeOut();
    }, atime);
    setTimeout(function () {
      $('#producto' + $('#product_id').val()).remove();
    }, atime * 2);
  } else {
    $('#product_id').val(product_id);
    $('#products_remove').modal('open');
  }
}

function product_add() {
  rnd = (Math.floor(Math.random() * 9999999));
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
  $('#product_price').val('')
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

    $('.modal').modal();
});
