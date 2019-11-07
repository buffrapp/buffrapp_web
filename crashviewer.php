<?php
  $title   = 'Gestor de problemas técnicos'; $secure = true; require_once('includes/header.php');
  $scripts = [ 'crashes' ];
?>
      <div id="crashes_cards_container" class="row"> <!-- Card container -->
        <h5 id="crashes_empty" class="center-align grey-text">Cargando...</h5>
      </div>
  <div class="fixed-action-btn">
    <a id="update" class="btn-floating btn-large waves-effect waves-light modal-trigger green" href="#">
      <i class="waves-effect waves-light large material-icons">refresh</i>
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

<?php require_once('includes/footer.php'); ?>
