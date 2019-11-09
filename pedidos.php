<?php $title = 'Pedidos'; $secure = true; require_once('includes/header.php'); 
$scripts = [ 'pedidos' ];?>
  <div class="col s3"> <!-- Inner left -->
    <div class="row">
      <h5 class="col s12 grey-text center-align">Solicitudes</h5>
    </div>
    <div id="requests_cards_container" class="row"> <!-- Card container -->
      <h6 id="del_empty" class="center-align grey-text">No hay solicitudes.</h6>
    </div>
  </div>

  <div class="col s1 inner"></div> <!-- Separator -->

  <div class="col s3"> <!-- Inner right -->
    <div class="row">
      <h5 class="col s12 grey-text center-align">En cola</h5>
    </div>
    <div id="queued_requests_cards_container" class="row"> <!-- Card container -->
      <h6 id="queue_empty" class="center-align grey-text">No hay pedidos en cola.</h6>
    </div>
  </div>

  <div class="col s1 inner"></div> <!-- Separator -->

  <div class="col s3"> <!-- Inner right -->
    <div class="row">
      <h5 class="col s12 grey-text center-align">Finalizado</h5>
    </div>
    <div id="done_requests_cards_container" class="row"> <!-- Card container -->
      <h6 id="done_empty" class="center-align grey-text">No hay pedidos finalizados.</h6>
    </div>
  </div>

  <div id="order_remove" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4>¿Querés cancelar este pedido?</h4>
      <p>Se le enviará una notificación al usuario de dicha acción.</p>
      <input type="hidden" name="order_id" value="">
      <form>
      
      <div id="motivos">
        
      </div>
      </form>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat" onclick="order_delete(true)">Sí</a>
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">No</a>
    </div>
  </div>
<?php require_once('includes/footer.php'); ?>
