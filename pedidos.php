<?php $title = 'Pedidos'; $secure = true; require_once('includes/header.php'); 
$scripts = [ 'pedidos' ];?>
  <div class="col s6"> <!-- Inner left -->
    <div class="row">
      <h5 class="col s12 grey-text center-align">Solicitudes</h5>
    </div>
    <div id="requests_cards_container" class="row"> <!-- Card container -->
      <h6 id="del_empty" class="center-align grey-text">No hay solicitudes.</h6>
    </div>
  </div>

  <div class="col s1 inner"></div> <!-- Separator -->

  <div class="col s5"> <!-- Inner right -->
    <div class="row">
      <h5 class="col s12 grey-text center-align">En cola</h5>
    </div>
    <div id="queued_requests_cards_container" class="row"> <!-- Card container -->
      <h6 id="queue_empty" class="center-align grey-text">No hay pedidos en cola.</h6>
    </div>
  </div>
<?php require_once('includes/footer.php'); ?>
