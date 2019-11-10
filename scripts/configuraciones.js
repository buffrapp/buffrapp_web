var titulo;
var explicacion;
var add;
var id;

$('document').ready(function () {
	horarios();
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
	     let html;

	     let Alumnos = `<div class="col s5 lighten-3"><h3>Alumnos</h3>`;
	     let Pedidos = `<div class="col s5 lighten-2"><h3>Pedidos</h3>`;
	     
	     for (let i = 0 ; i < data.length; i++) {
	     	html = `<div id="motivo` + data[i]['ID_Motivo'] + `" class="row">
		          	<span id="motivo_` + data[i]['ID_Motivo'] + `">` + data[i]['Motivo'] + `</span>
		          	<a class="btn-floating right red waves-effect waves-light modal-trigger" onclick="report_delete_request(` + data[i]['ID_Motivo'] + `)"><i class="material-icons">close</i></a>
		          	<a class="btn-floating right red waves-effect waves-light modal-trigger" onclick="report_edit_modal(` + data[i]['ID_Motivo'] + `)"><i class="material-icons">edit</i></a>
		          </div>
		          `;
	     	if (data[i]['Tipo'] == '0') {
	     		Alumnos +=html;
	     	}else if(data[i]['Tipo'] == '1'){
	     		Pedidos += html;
	     	}
	     	
	     };
	     html = `</div></div>`;
	     Alumnos += html;
	     Pedidos += html;
	   //console.log(html);
	   $('#datos').html(Pedidos);
	   $('#datos').append('<div class="col s1 inner"></div>');
	   $('#datos').append(Alumnos);
	   });

	   	$('#motivo').val('');
		M.textareaAutoResize($('#motivo'));
	   	
}
function report_edit_modal(id2){
	id = id2;
	$('#motivo_new').val($('#motivo_'+id).html());
    $('#report_edit').modal('open');
}

function report_edit(){
	if ($('#motivo_new').val().length < 1) {
	    M.toast({ 'html': 'No podés dejar ningún campo vacío.' });
	  } else {
		$.ajax({
	     url: 'api.php',
	     type: 'POST',
	     data: {
	       request: 'editReasons',
	       content: [ id,$('#motivo_new').val(),$('#reportarA_new').val() ]
	     }
	   })
	   .done(function (dataO) {
	     console.log(dataO);
	     data = parseInt(dataO);

	     switch (data) {
	       case 1:
	         M.toast({ 'html': 'Hubo un error al editar el motivo.' })
	         break;
	       default:
	       	data = JSON.parse(dataO);
	       	M.toast({ 'html': 'El reporte se editó con éxito.' });
	         $('#report_edit').modal('close');
	         reportes();
	       break;
	     }
	   });
	}
}

function report_delete_request(id2){
    id = id2;
    $('#report_remove').modal('open');
}
 function report_delete() {
   $.ajax({
     url: 'api.php',
     type: 'POST',
     data: {
       request: 'deleteReasons',
       content: [id]
     }
   })
   .done(function (data) {
     console.log(data);
     data = parseInt(data);

     switch (data) {
       case 0:
         M.toast({ 'html': 'El reporte se eliminó con éxito.' });
         $('#motivo' + id).remove();
         $('#report_remove').modal('close');
         break;
       case 1:
         M.toast({ 'html': 'Hubo un error al eliminar el motivo.' })
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
		        	reportes();
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
	add = `<a class="btn-floating btn-large waves-effect waves-light modal-trigger green" href="#horarios_add">
		      <i class="waves-effect waves-light large material-icons">add</i>
		    </a>`;
	let select = `<div class="row">
					<label>Dia</label>
						    <select id="DiaSelect" multiple>
							    <option value="Lunes">Lunes</option>
							    <option value="Martes">Martes</option>
							    <option value="Miercoles">Miercoles</option>
							    <option value="Jueves">Jueves</option>
							    <option value="Viernes">Viernes</option>
						    </select>
			          </div>
				</div>`
	$.ajax({
     url: 'api.php',
     type: 'POST',
     data: {
       request: 'getOneDay',
       content: [$('#DiaSelect').val()]
     }
   })
   .done(function (data) {
     	console.log(data);
     	data = JSON.parse(data);
     	if (data.length > 0) {
     		let horarios='<div class="row">'+data[0]['Dia']+'</div>';
	     	for (let i = 0; i<data.length; i++) {
	     		horarios += '<div class="row">'+data[i]['Turno']+': '+data[i]['HoraI']+'-'+data[i]['HoraF']+'</div>';
	     	};
	     };
		$('#datos').html(horarios);
		configurarOpcion();
    });
	

}

function misdatos(){
	$('#misdatos').attr("disabled", true);
	$('#horarios').attr("disabled", false);
	$('#reportes').attr("disabled", false);
	titulo = "Editar mis datos";
	explicacion = "Editá tus datos personales";
	add = '';
	$.ajax({
     url: 'api.php',
     type: 'POST',
     data: {
       request: 'getMyOwnData'
     }
   })
   .done(function (data) {
     	console.log(data);
     	data = JSON.parse(data);
     	let datos = `<div class="row">
		          <div class="input-feld col s12">
		            <input type="text" name="name" value="` + data[0]['Nombre'] + `" disabled/>
		            <label for="name">Nombre completo</label>
		          </div>
		        </div>

		        <div class="row">
		          <div class="input-feld col s12">
		            <input name="dni" type="text" value="` + data[0]['DNI'] + `" disabled/>
		            <label for="dni">DNI</label>
		          </div>
		        </div>

		        <div class="row">
		          <div class="input-feld col s12">
		            <input class="validate" type="email" name="email_new" id="email_new" value="` + data[0]['E-mail'] + `">
		            <label for="email_new">E-mail</label>
		          </div>
		        </div>

		        <div class="row">
		          <div class="input-feld col s12">
		            <input class="validate" type="password" name="password_new" id="password_new"/>
		            <label for="password_new">Ingresá nueva contraseña</label>
		          </div>
		        </div>

		        <div class="row">
		          <div class="input-feld col s12">
		            <button id="button" type="submit" class="waves-effect waves-light btn green right modal-trigger" href="#Confirmar">Modificar</button>
		          </div>
		        </div>`;
		$('#datos').html(datos);
   });
	configurarOpcion();
}

function Verificar(){
	if ($('#old_password').val().length < 1) {
		M.toast({ 'html': 'Ingresá tu contraseña para actualizar los datos.' });
	}else{
		if ($('#email_new').val().length < 1) {
			M.toast({ 'html': 'No podes dejar el E-mail vacio.' });
		}else{
			$.ajax({
     		url: 'api.php',
		     type: 'POST',
		     data: {
		       request: 'updateMyOwnData',
		       content: [$('#email_new').val(),$('#password_new').val(),$('#old_password').val()]
		     }
		   })
		   .done(function (dataO) {
		     	data = parseInt(dataO);
		     	switch (data) {
		     		case 1:
		     				M.toast({ 'html': 'Ocurrió un error al acutalizar los datos.' });
		     			break;
		     		case 2:
		     			M.toast({ 'html': 'La verificación no fue correcta.' });
		     			break;
		     		default:
		     				M.toast({ 'html': dataO });
				        	misdatos();
				        	$('#Confirmar').modal('close');
				        	$('#old_password').val('');
		     			break;
		     	}
		   });
		}
		
	}
	
}

function configurarOpcion(){
	$('#buttonAdd').html(add);
	$('#TituloC').html(titulo);
	$('#explicacion').html(explicacion);
}
function tablaHorarios(){
		let datos =  `<table>
				        <thead>
				          <tr>
					            <th>
									Horarios/Dias
								</th>	
								<th>Lunes</th>
								<th>Martes</th>
								<th>Miercoles</th>
								<th>Jueves</th>
								<th>Viernes</th>
				          </tr>
				        </thead>

				        <tbody>
				         	<tr>
								<td>7:30AM</td>
							</tr>
							<tr>
								<td>8AM</td>
							</tr>
							<tr>
								<td>9AM</td>
							</tr>
							<tr>
								<td>10AM</td>
							</tr>
							<tr>
								<td>11AM</td>
							</tr>
							<tr>
								<td>12AM</td>
							</tr>
							<tr>
								<td>13PM</td>
							</tr>
							<tr>
								<td>14PM</td>
							</tr>
							<tr>
								<td>15PM</td>
							</tr>
							<tr>
								<td>16PM</td>
							</tr>
							<tr>
								<td>17PM</td>
							</tr>
							<tr>
								<td>18PM</td>
							</tr>
							<tr>
								<td>19PM</td>
							</tr>
							<tr>
								<td>20PM</td>
							</tr>
							<tr>
								<td>21PM</td>
							</tr>
							<tr>
								<td>21:40PM</td>
							</tr>
				        </tbody>
				      </table>`;
}