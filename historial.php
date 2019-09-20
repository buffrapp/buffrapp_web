<?php
  $title   = 'Historial'; $secure = true; require_once('includes/header.php');
  $scripts = [ 'Historial' ]; 
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
                  <input class="with-gap" name="radio" id="ID_Pedido" type="radio" onclick="Buscar()" />
                  <span>ID Pedido</span>
                </label>
                <label>
                  <input class="with-gap" name="radio" id="Nombre_Producto" type="radio" onclick="Buscar()" />
                  <span>Nombre del producto</span>
                </label>
                <label>
                  <input class="with-gap" name="radio" id="Nombre_Encargado" type="radio" onclick="Buscar()" />
                  <span>Nombre del encargado</span>
                </label>
                <label>
                  <input class="with-gap" name="radio" id="Nombre_Alumno" type="radio" onclick="Buscar()" />
                  <span>Nombre/apellido de alumno</span>
                </label>
                <label>
                  <input class="with-gap" name="radio" id="DNI_Alumno" type="radio" onclick="Buscar()" />
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
    <br>
     Total de ventas: <span id="total"></span>
    <div id="pedidos">
      
    </div>
   
  </div>
      <!-- Modal Trigger -->
  <!-- Modal Structure -->
  <div id="modal1" class="modal">
    
    <div class="modal-content">
      
<div class="row">
      <h4>Descripción del pedido:</h4>
      
        <p id="descripcion"></p>
    </div>
        <ul class='collapsible popout'>
                        <li>
                          <div class="collapsible-header"><i class="material-icons">access_time</i>Horarios</div>
                          <div class="collapsible-body" id="horarios"></div>
                        </li>

                        <li>
                          <div class="collapsible-header"><i class="material-icons">access_time</i>Alumno</div>
                          <div class="collapsible-body" id="alumno"></div>
                        </li>

                        <li>
                          <div class="collapsible-header"><i class="material-icons">access_time</i>Administrador</div>
                          <div class="collapsible-body" id="administrador"></div>
                        </li>

                        <li>
                          <div class="collapsible-header"><i class="material-icons">access_time</i>Pedido</div>
                          <div class="collapsible-body" id="pedido"></div>
                        </li>
                      </ul>

      
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cerrar</a> 
    </div>
  </div>

<?php require_once('includes/footer.php'); ?>
