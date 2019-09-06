<?php
  $title   = 'Historial'; $secure = true; require_once('includes/header.php');
  $scripts = [ 'historial' ]; 
?>
 <div class="col s6"> <!-- Inner left -->
    <div class="row">
      <h5 class="col s12 grey-text center-align"></h5>
    </div>
      <div class="fixed-action-btn">
    <a class="btn-floating btn-large waves-effect waves-light modal-trigger green" href="#products_add">
      <i class="waves-effect waves-light large material-icons">add</i>
    </a>
  </div>
    <span id="total"> Total de ventas: </span>
    <div id="pedidos">
      
    </div>
   
  </div>
<?php require_once('includes/footer.php'); ?>
