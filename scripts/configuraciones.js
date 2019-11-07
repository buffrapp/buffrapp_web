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
			</div>`;

	$('#Modal').html(modal);
	modal = `<div id="report_remove" class="modal modal-fixed-footer">
			    <div class="modal-content">
			      <h4>¿Querés eliminar este reporte?</h4>
			      <p>El reporte se eliminará permantemente.</p>
			      <input type="hidden" name="report_id" value="">
			    </div>
			    <div class="modal-footer">
			      <a href="#!" class="modal-close waves-effect waves-green btn-flat" onclick="report_delete()">Sí</a>
			      <a href="#!" class="modal-close waves-effect waves-green btn-flat">No</a>
			    </div>
			  </div>`;
	$('#Modal').append(modal);
	modal = `<div id="report_edit" class="modal modal-fixed-footer">
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
					<input type="hidden" name="report_id_edit" value="">
			        <div class="row">
			          <div class="input-feld col s12">
			            <textarea id="motivo" class="materialize-textarea"></textarea>
          				<label for="motivo">Reporte</label>
			          </div>
			        </div>

			    </div>
			    <div class="modal-footer">
			      <button class="waves-effect waves-green btn-flat" onclick="report_edit()">Aceptar</button>
			      <button class="modal-close waves-effect waves-green btn-flat">Cancelar</button>
			    </div>
			</div>`;
	$('#Modal').append(modal);
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
	     let html = `<div class="col s12">`;
	     for (let i = 0 ; i < data.length; i++) {
	     	html += `
          <div id="motivo` + data[i]['ID_Motivo'] + `" class="row">
          	<span>` + data[i]['Motivo'] + `</span>
          	<a class="btn-floating right red waves-effect waves-light modal-trigger" onclick="report_delete_request(` + data[i]['ID_Motivo'] + `)"><i class="material-icons">close</i></a>
          	<a class="btn-floating right red waves-effect waves-light modal-trigger" onclick="report_edit(` + data[i]['ID_Motivo'] + `)"><i class="material-icons">edit</i></a>
          </div>
          `;
	     };
	     html += `</div>`;
	   $('#datos').html(html);
	   });

	   	$('#motivo').val('');
		M.textareaAutoResize($('#motivo'));
	   	$('select').formSelect();
	   	$('.modal').modal();
}
function report_edit(){
	$('#report_id_edit').val(product_id);
    $('#report_edit').modal('open');
}
function report_delete_request(id){
    $('#report_id').val(product_id);
    $('#report_remove').modal('open');
}
 function report_delete() {
   $.ajax({
     url: 'api.php',
     type: 'POST',
     data: {
       request: 'deleteReport',
       content: [ $('#report_id').val() ]
     }
   })
   .done(function (data) {
     console.log(data);
     data = parseInt(data);

     switch (data) {
       case 0:
         M.toast({ 'html': 'El reporte se eliminó con éxito.' });
         $('#reporte' + $('#reporte_id').val()).remove();
         break;
       case 1:
         M.toast({ 'html': 'Hubo un error al eliminar el producto.' })
         break;
     }
   });
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