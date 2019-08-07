<?php
  $title   = 'Productos'; $secure = true; require_once('includes/header.php');
  $scripts = [ 'products' ];
?>
  <div class="row">
    <div class="col s3 hide-on-med-and-down"> <!-- Left side-->
      <ul id="area_picker" class="collection">
        <li id="area_picker_pedidos" class="collection-item">
          <span class="title"><h5>Pedidos</h5></span>
          <p>Gestioná los pedidos, verificá la reputación del usuario y otros.</p>
        </li>
        <li id="area_picker_productos" class="collection-item">
          <span class="title"><h5>Productos</h5></span>
          <p>Administrá los productos, controlá la disponibilidad y más.</p>
        </li>
        <li id="area_picker_estadisticas" class="collection-item">
          <span class="title"><h5>Estadísticas</h5></span>
          <p>Echále un vistazo al estado del sistema, la cantidad de ventas y otros datos.</p>
        </li>
      </ul>
    </div>
    <div class="col s9"> <!-- Right side -->
      <div id="products_cards_container" class="row"> <!-- Card container -->
        <h5 id="products_empty" class="center-align grey-text">Cargando...</h5>
      </div>
    </div>
  </div>
  <div class="fixed-action-btn">
    <a class="btn-floating btn-large waves-effect waves-light modal-trigger green" href="#products_add">
      <i class="waves-effect waves-light large material-icons">add</i>
    </a>
  </div>

  <div id="products_remove" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4>¿Querés eliminar este producto?</h4>
      <p>El producto se eliminará permantemente.</p>
      <input type="hidden" name="product_id" value="">
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat" onclick="product_delete(true)">Sí</a>
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">No</a>
    </div>
  </div>
<!-- AGREGAR UN PRODUCTO  -->

  <div id="products_add" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4>Agregá un producto</h4>
        <div class="row">
         <div class="input-feld col s12">
            <input class="validate" type="text" name="product_name" id="product_name" />
            <label for="product_name">Ingresá el nombre del producto</label>
          </div>
        </div>

        <div class="row">
          <div class="input-feld col s12">
            <input class="validate" type="text" name="product_price" id="product_price" />
            <label for="product_price">Ingresá el precio</label>
          </div>
        </div>

        <p class="padded_checkbox">
          <label>
            <input type="checkbox" class="filled-in" checked="true" id="product_available" />
            <span>¿Está disponible?</span>
          </label>
        </p>
    </div>
    <!-- BOTONES PARA AGREGAR O CANCELAR UN PEDIDO-->
    <div class="modal-footer">
      <button class="waves-effect waves-green btn-flat" onclick="product_add()">Aceptar</button>
      <button class="modal-close waves-effect waves-green btn-flat">Cancelar</button>
    </div>
  </div>
<?php require_once('includes/footer.php'); ?>
