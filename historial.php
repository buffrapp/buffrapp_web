<?php
  $title   = 'Historial'; $secure = true; require_once('includes/header.php');
  $scripts = [ 'historial' ]; 
?>
  <br>
    <nav  class="green">
      <div class="nav-wrapper">
      <form>
        <div class="input-field">
          <input id="search" type="search" onkeyup="buscar()" required>
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons">close</i>
        </div>
      </form>
    </div>
  </nav>
 <div class="col s8"> <!-- Inner left -->
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
      <!-- Modal Trigger -->
  <!-- Modal Structure -->
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Descripción del pedido:</h4>
      <p id="descripcion"></p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cerrar</a>
    </div>
  </div>

<?php require_once('includes/footer.php'); ?>
