<?php
  $title   = 'Configuraciones'; $secure = true; require_once('includes/header.php');
  $scripts = [ 'configuraciones' ]; 
?>
<div class="row">
	<a class="waves-effect waves-light btn-large" id="misdatos" onclick="misdatos()"><i class="material-icons right">person</i>Mis datos</a>
	<a class="waves-effect waves-light btn-large" id="horarios" onclick="horarios()"><i class="material-icons right">calendar_today</i>Horarios</a>
	<a class="waves-effect waves-light btn-large" id="reportes" onclick="reportes()"><i class="material-icons right">notification_important</i>Motivos de reportes</a>
</div>

<div class="fixed-action-btn" id="buttonAdd">
</div>

<div class="row">
	<div class="center-align">
		<h5 class="col s12 grey-text" id="TituloC">Configuraciones</h5>
	</div>
</div>

<div class="row">
	<div class="center-align">
		<h5 class="col s12" id="explicacion" >Elegí lo que quieras modificar</h5>
	</div>
</div>

<div class="row">
	<div id="datos" class="col s12">
	</div>
</div>

<div id="reports_add" class="modal modal-fixed-footer">
			    <div class="modal-content">
			      <h4>Agregá un motivo de reporte</h4>
			        <div class="row">
			         <div class="input-feld col s12">
			         <label>Reportar un</label>
						    <select id="reportarA">
						      <option value="1">Pedido</option>
						      <option value="0">Alumno</option>
						    </select>
			          </div>
			        </div>

			        <div class="row">
			          <div class="input-feld col s12">
			            <textarea id="motivo" class="materialize-textarea"></textarea>
          				<label for="motivo">Reporte</label>
			          </div>
			        </div>

			    </div>
			    <div class="modal-footer">
			      <button class="waves-effect waves-green btn-flat" onclick="report_add()">Aceptar</button>
			      <button class="modal-close waves-effect waves-green btn-flat">Cancelar</button>
			    </div>
			</div>



<div id="report_remove" class="modal modal-fixed-footer">
			    <div class="modal-content">
			      <h4>¿Querés eliminar este reporte?</h4>
			      <p>El reporte se eliminará permantemente.</p>
			      <input type="hidden" name="report_id">
			    </div>
			    <div class="modal-footer">
			      <a href="#!" class="modal-close waves-effect waves-green btn-flat" onclick="report_delete()">Sí</a>
			      <a href="#!" class="modal-close waves-effect waves-green btn-flat">No</a>
			    </div>
			  </div>

<div id="report_edit" class="modal modal-fixed-footer">
			    <div class="modal-content">
			      <h4>Agregá un motivo de reporte</h4>
			        <div class="row">
			         <div class="input-feld col s12">
			         <label>Reportar un</label>
						    <select id="reportarA_new">
						      <option value="1">Pedido</option>
						      <option value="0">Alumno</option>
						    </select>
			          </div>
			        </div>
					<input type="hidden" name="report_id_edit">
			        <div class="row">
			          <div class="input-feld col s12">
			            <textarea id="motivo_new" class="materialize-textarea"></textarea>
          				<label for="motivo">Nuevo reporte</label>
			          </div>
			        </div>

			    </div>
			    <div class="modal-footer">
			      <button class="waves-effect waves-green btn-flat" onclick="report_edit()">Aceptar</button>
			      <button class="modal-close waves-effect waves-green btn-flat">Cancelar</button>
			    </div>
			</div>
<div id="horarios_add" class="modal modal-fixed-footer">
			    <div class="modal-content">
			      <h4>Agregá tus horarios disponibles</h4>
			        <div class="row">
			         <div class="input-feld col s12">
			        <div class="row">
			          <div class="input-feld col s12">
			            <input type="text" name='time' id='time' class="timepicker">
          				<label for="tiempo">Horario</label>
			          </div>
			        </div>
			         <label>Dia</label>
						    <select id="Dia" multiple>
						    	<option value="Todo">Todos</option>
							    <option value="Lunes">Lunes</option>
							    <option value="Martes">Martes</option>
							    <option value="Miercoles">Miercoles</option>
							    <option value="Jueves">Jueves</option>
							    <option value="Viernes">Viernes</option>
						    </select>
			          </div>
			        </div>

			    </div>
			    <div class="modal-footer">
			      <button class="waves-effect waves-green btn-flat" onclick="report_add()">Aceptar</button>
			      <button class="modal-close waves-effect waves-green btn-flat">Cancelar</button>
			    </div>
			</div>
<?php require_once('includes/footer.php'); ?>
