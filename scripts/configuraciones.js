var titulo;
var explicacion;
var add;
var modal;

$('document').ready(function () {
  
});
document.addEventListener('DOMContentLoaded', function() {
    $('.datepicker').datepicker();
});

function reportes(){
	$('#reportes').attr("disabled", true);
	$('#horarios').attr("disabled", false);
	$('#misdatos').attr("disabled", false);

	titulo = "Editar reportes";
	explicacion = "Editá los motivos por los cuales cancelarias un pedido";
	add = `<a class="btn-floating btn-large waves-effect waves-light modal-trigger green" href="#reports_add">
		      <i class="waves-effect waves-light large material-icons">add</i>
		    </a>`;
	configurarOpcion();

	modal = `<div id="reports_add" class="modal modal-fixed-footer">
			    <div class="modal-content">
			      <h4>Agregá un motivo de reporte</h4>
			        <div class="row">
			         <div class="input-feld col s12">
			         <label>Reportar un</label>
						    <select id="reportarA">
						      <option value="1">Pedido</option>
						      <option value="2">Alumno</option>
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
			</div>`;

	$('#Modal').html(modal);
	$.ajax({
	     url: 'api.php',
	     type: 'POST',
	     data: {
	       request: 'getReasons'
	     }
	   })
	   .done(function (data) {
	     data = JSON.parse(data);
	     console.log(data);
	   });
	   	$('#motivo').val('');
		M.textareaAutoResize($('#motivo'));
	   	$('select').formSelect();
	   	$('.modal').modal();
}

function report_add(){
	if ($('#motivo').val().length < 1) {
	    M.toast({ 'html': 'No podés dejar ningún campo vacío.' });
	  } else {
	    $.ajax({
	      url: 'api.php',
	      type: 'POST',
	      data: {
	        request: 'addReason',
	        content: [$('#motivo').val(),$('#reportarA').val()]
	      }
	    })
	    .done(function (dataO) {
	      console.log(dataO);
	      data = parseInt(dataO);

	      	switch (data) {
		        case 1:
		          M.toast({ 'html': 'Hubo un error al agregar el motivo, intentálo otra vez.' });
		          break;
		        case 2:
		          M.toast({ 'html': 'No tenés permitido agregar motivos.' });
		          break;
		        case 3:
		          M.toast({ 'html': 'Este motivo ya existe.' });
		          break;
		        default:
		        	M.toast({ 'html': 'Motivo agregado con éxito.' });
		        	$('#motivo').val('');
		        break;
	    	}
		});
	}
}

function horarios(){
	$('#horarios').attr("disabled", true);
	$('#reportes').attr("disabled", false);
	$('#misdatos').attr("disabled", false);
	titulo = "Editar Horarios";
	explicacion = "Editá los horarios de atención";
	add = '';
	configurarOpcion();

}

function misdatos(){
	$('#misdatos').attr("disabled", true);
	$('#horarios').attr("disabled", false);
	$('#reportes').attr("disabled", false);
	titulo = "Editar mis datos";
	explicacion = "Editá tus datos personales";
	add = '';
	configurarOpcion();


}

function configurarOpcion(){
	$('#buttonAdd').html(add);
	$('#TituloC').html(titulo);
	$('#explicacion').html(explicacion);
}