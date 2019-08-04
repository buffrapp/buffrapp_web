<?php $title = 'Pedidos'; $secure = true; require_once('includes/header.php'); ?>
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

    </div>
  </div>
<?php require_once('includes/footer.php'); ?>
