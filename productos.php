<?php
  $title   = 'Productos'; $secure = true; require_once('includes/header.php');
  $scripts = [ 'products' ];
?>
      <div id="products_cards_container" class="row"> <!-- Card container -->
        <h5 id="products_empty" class="center-align grey-text">Cargando...</h5>
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
            <label for="product_name">Ingresá el nombre</label>
          </div>
        </div>

        <div class="row">
          <div class="input-feld col s12">
            <input minlength="0.00" class="validate" type="number" step="0.50" pattern="[0-9]" name="product_price" id="product_price" />
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

  <!--MODIFICAR UN PRODUCTO-->
  <div id="products_modify" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4 id="product_name_modify"></h4>
        <div class="row">
         <div class="input-feld col s12">
            <input class="validate" type="text" name="product_name_new" id="product_name_new" />
            <label for="product_name_new">Ingresá el NUEVO nombre</label>
          </div>
        </div>

        <div class="row">
          <div class="input-feld col s12">
            <input minlength="0.00" class="validate" type="number" step="0.50" pattern="[0-9]" name="product_price_new" id="product_price_new" />
            <label for="product_price_new">Ingresá el NUEVO precio</label>
          </div>
        </div>

        <p class="padded_checkbox">
          <label>
            <input type="checkbox" class="filled-in" checked="true" id="product_available_new" />
            <span>¿Está disponible?</span>
          </label>
        </p>
        <input type="hidden" name="id" id="product_id_new">
    </div>
    <!-- BOTONES PARA AGREGAR O CANCELAR UN PEDIDO-->
    <div class="modal-footer">
      <button class="waves-effect waves-green btn-flat" onclick="product_modify()">Modificar</button>
      <button class="modal-close waves-effect waves-green btn-flat">Cancelar</button>
    </div>
  </div>

<?php require_once('includes/footer.php'); ?>
