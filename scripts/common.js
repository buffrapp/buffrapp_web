$('document').ready(function() {
  $('#area_picker_pedidos').on('click', function() {
      window.location = 'pedidos.php';
  });
  $('#area_picker_productos').on('click', function() {
      window.location = 'productos.php';
  });
  $('#area_picker_historial').on('click', function() {
      window.location = 'historial.php';
  });
  $('#area_picker_estadisticas').on('click', function() {
      window.location = 'estadisticas.php';
  });
  $('#area_picker_configuraciones').on('click', function() {
      window.location = 'configuraciones.php';
  });
});
