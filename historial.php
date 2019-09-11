<?php
  $title   = 'Historial'; $secure = true; require_once('includes/header.php');
  $scripts = [ 'historial' ]; 
?>
  <br>
    <nav  class="green">
      <div class="nav-wrapper">
      <form>
        <div class="input-field">
          <input id="search" type="search" onkeyup="Buscar()" required>
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <div class="row center-align">
                <label>
                  <input type="checkbox" id="ID_Pedido" onclick="Buscar()" />
                  <span>ID Pedido</span>
                </label>
                <label>
                  <input type="checkbox" id="Nombre_Producto" onclick="Buscar()"/>
                  <span>Nombre del producto</span>
                </label>
                <label>
                  <input type="checkbox" id="Nombre_Encargado" onclick="Buscar()"/>
                  <span>Nombre del encargado</span>
                </label>
                <label>
                  <input type="checkbox" id="Nombre_Alumno" onclick="Buscar()"/>
                  <span>Nombre/apellido de alumno</span>
                </label>
                <label>
                  <input type="checkbox" id="DNI_Alumno" onclick="Buscar()"/>
                  <span>DNI de alumno</span>
                </label>
                
          </div>
        </div>
      </form>
    </div>
  </nav>
 <div class="col s8"> <!-- Inner left -->
    <div class="row">
      <h5 class="col s12 grey-text center-align"></h5>
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
